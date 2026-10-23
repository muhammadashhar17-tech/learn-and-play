// Works around a Next.js 16 static-export quirk: the client requests segment
// prefetch files as "__next.<a>.<b>.txt" (slashes turned into dots), but the
// exporter writes some of them as nested folders "__next.<a>/<b>.txt".
// This copies every nested file to the flat name the client asks for.
import { cpSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = new URL("../out/", import.meta.url);
let copied = 0;

function flatten(dir, prefix, segDir) {
  for (const name of readdirSync(segDir)) {
    const full = join(segDir, name);
    if (statSync(full).isDirectory()) flatten(dir, `${prefix}.${name}`, full);
    else if (name.endsWith(".txt")) {
      const target = join(dir, `${prefix}.${name}`);
      if (!existsSync(target)) {
        cpSync(full, target);
        copied++;
      }
    }
  }
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) flatten(dir, name, full);
    else if (name !== "_next") walk(full);
  }
}

if (existsSync(OUT)) {
  walk(fileURLToPath(OUT));
  console.log(`fix-export: ${copied} segment file(s) flattened.`);
}
