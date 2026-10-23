"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed store. Components subscribe with `useStore()`
 * and re-render when the value changes (in this tab or another tab).
 * During static pre-rendering the default value is used, so the HTML the
 * server produces always matches the first client render.
 */
export interface LocalStore<T> {
  get(): T;
  set(next: T | ((prev: T) => T)): void;
  reset(): void;
  subscribe(listener: () => void): () => void;
  getServerSnapshot(): T;
}

export function createLocalStore<T>(key: string, fallback: T): LocalStore<T> {
  const listeners = new Set<() => void>();
  let cache: { raw: string | null; value: T } | null = null;

  function read(): T {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(key);
    } catch {
      return fallback;
    }
    if (cache && cache.raw === raw) return cache.value;
    let value = fallback;
    if (raw !== null) {
      try {
        const parsed = JSON.parse(raw);
        // Merge objects with the fallback so newly added fields get defaults.
        value =
          fallback && typeof fallback === "object" && !Array.isArray(fallback)
            ? ({ ...fallback, ...parsed } as T)
            : (parsed as T);
      } catch {
        value = fallback;
      }
    }
    cache = { raw, value };
    return value;
  }

  function emit() {
    listeners.forEach((l) => l());
  }

  function onStorage(e: StorageEvent) {
    if (e.key === key || e.key === null) emit();
  }

  return {
    get: read,
    set(next) {
      const value =
        typeof next === "function" ? (next as (prev: T) => T)(read()) : next;
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // Storage full or blocked (private mode) — keep working in memory.
        cache = { raw: JSON.stringify(value), value };
      }
      emit();
    },
    reset() {
      try {
        window.localStorage.removeItem(key);
      } catch {
        /* ignore */
      }
      cache = null;
      emit();
    },
    subscribe(listener) {
      listeners.add(listener);
      if (listeners.size === 1) window.addEventListener("storage", onStorage);
      return () => {
        listeners.delete(listener);
        if (listeners.size === 0)
          window.removeEventListener("storage", onStorage);
      };
    },
    getServerSnapshot: () => fallback,
  };
}

export function useStore<T>(store: LocalStore<T>): T {
  return useSyncExternalStore(store.subscribe, store.get, store.getServerSnapshot);
}

/** True after hydration — use to show skeletons instead of default values. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

function noopSubscribe() {
  return () => {};
}
