// Gives out/sw.js a new cache name on every build. A changed sw.js is how
// installed apps (phone / browser) notice a new version and offer "Update".
import { existsSync, readFileSync, writeFileSync } from "node:fs";

const SW = new URL("../out/sw.js", import.meta.url);
if (existsSync(SW)) {
  const stamp = new Date().toISOString().replace(/\D/g, "").slice(0, 14);
  writeFileSync(SW, readFileSync(SW, "utf8").replace(/const CACHE = "[^"]*";/, `const CACHE = "lp-${stamp}";`));
  console.log(`stamp-sw: cache lp-${stamp}`);
}
