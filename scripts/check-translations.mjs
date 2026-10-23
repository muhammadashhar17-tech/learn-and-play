// Fails if en.json, ur.json and sd.json do not have exactly the same keys,
// or if a Sindhi string uses Urdu-only letters (ک used for "k", ی, ہ, ے, ھ alone).
import { readFileSync } from "node:fs";

const load = (l) => JSON.parse(readFileSync(new URL(`../messages/${l}.json`, import.meta.url), "utf8"));
const flat = (o, p = "") =>
  Object.entries(o).flatMap(([k, v]) => (v && typeof v === "object" ? flat(v, `${p}${k}.`) : [[`${p}${k}`, v]]));

const base = new Map(flat(load("en")));
let errors = 0;
function report(message) {
  errors++;
  console.error(message);
}
for (const l of ["ur", "sd"]) {
  const m = new Map(flat(load(l)));
  for (const k of base.keys()) if (!m.has(k)) report(`[${l}] missing: ${k}`);
  for (const k of m.keys()) if (!base.has(k)) report(`[${l}] extra: ${k}`);
  for (const [k, v] of m) if (typeof v === "string" && v.trim() === "") report(`[${l}] empty: ${k}`);
}
// Urdu letters that should not appear in Sindhi text (Sindhi uses ي ه instead of ی ہ ے).
for (const [k, v] of flat(load("sd"))) {
  if (typeof v === "string" && /[یہےۃ]/.test(v)) report(`[sd] Urdu letter in: ${k} → ${v}`);
}
if (errors) {
  console.error(`\n${errors} translation problem(s).`);
  process.exit(1);
}
console.log(`Translations OK — ${base.size} keys in en, ur, sd.`);
