"use client";

import type { CategoryId } from "@/data/quiz";
import { site } from "@/data/site";
import type { LeaderboardEntry } from "./progress";
import { createLocalStore } from "./storage";

/**
 * Shared online leaderboard (Supabase REST API, table from supabase/schema.sql).
 * The key in data/site.ts is Supabase's public "anon" key: it is meant to be in
 * the website, and the table's rules only allow reading and adding scores.
 * Scores saved while offline wait in `pendingStore` and are sent later.
 */
export const onlineEnabled = !!(site.online.url && site.online.key);

const TABLE = `${site.online.url}/rest/v1/scores`;
const HEADERS = { apikey: site.online.key, Authorization: `Bearer ${site.online.key}` };

interface Row {
  client_id: string;
  name: string;
  points: number;
  correct: number;
  total: number;
  category: CategoryId;
  difficulty: LeaderboardEntry["difficulty"];
  created_at: string;
}

const pendingStore = createLocalStore<LeaderboardEntry[]>("lp-online-pending", []);

async function send(entry: LeaderboardEntry) {
  const res = await fetch(TABLE, {
    method: "POST",
    headers: { ...HEADERS, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({
      client_id: entry.id,
      name: entry.name,
      points: entry.points,
      correct: entry.correct,
      total: entry.total,
      category: entry.category,
      difficulty: entry.difficulty,
    }),
  });
  // 409 = this score was already sent (same client_id): nothing left to do.
  if (!res.ok && res.status !== 409) throw new Error(`HTTP ${res.status}`);
}

/** Sends a score; if the internet is not available it is kept and sent later. Returns true when sent now. */
export async function submitOnline(entry: LeaderboardEntry): Promise<boolean> {
  if (!onlineEnabled) return false;
  try {
    await send(entry);
    return true;
  } catch {
    pendingStore.set((list) => [...list.filter((e) => e.id !== entry.id), entry].slice(-50));
    return false;
  }
}

/** Sends scores that were saved while offline. Safe to call any time. */
export async function flushPending() {
  if (!onlineEnabled) return;
  for (const entry of pendingStore.get()) {
    try {
      await send(entry);
      pendingStore.set((list) => list.filter((e) => e.id !== entry.id));
    } catch {
      return; // still offline: try again next time
    }
  }
}

/** Top scores for everyone, best first. */
export async function fetchOnline(category: CategoryId | "all", limit = 50): Promise<LeaderboardEntry[]> {
  const params = new URLSearchParams({
    select: "client_id,name,points,correct,total,category,difficulty,created_at",
    order: "points.desc,created_at.asc",
    limit: String(limit),
  });
  if (category !== "all") params.set("category", `eq.${category}`);
  const res = await fetch(`${TABLE}?${params}`, { headers: HEADERS, cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const rows = (await res.json()) as Row[];
  return rows.map((r) => ({
    id: r.client_id,
    name: r.name,
    points: r.points,
    correct: r.correct,
    total: r.total,
    category: r.category,
    difficulty: r.difficulty,
    date: Date.parse(r.created_at),
  }));
}
