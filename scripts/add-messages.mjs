// Dev helper: merges a JSON file of { en: {...}, ur: {...}, sd: {...} } namespaces into messages/*.json.
// Usage: node scripts/add-messages.mjs path/to/patch.json
import { readFileSync, writeFileSync } from "node:fs";
const patch = JSON.parse(readFileSync(process.argv[2], "utf8"));
const merge = (a, b) => {
  for (const [k, v] of Object.entries(b))
    a[k] = v && typeof v === "object" && !Array.isArray(v) ? merge(a[k] ?? {}, v) : v;
  return a;
};
for (const l of ["en", "ur", "sd"]) {
  const file = new URL(`../messages/${l}.json`, import.meta.url);
  const data = merge(JSON.parse(readFileSync(file, "utf8")), patch[l]);
  // Keep invisible bidi isolate marks visible as \u escapes for translators.
  const json = JSON.stringify(data, null, 2).replace(/[⁦-⁩]/g, (c) => `\\u${c.charCodeAt(0).toString(16)}`);
  writeFileSync(file, json + "\n");
}
console.log("messages updated");
