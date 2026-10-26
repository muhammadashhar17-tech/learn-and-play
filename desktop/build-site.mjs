// Builds the website (with no sub-folder) and copies it into desktop/site,
// which the Windows app serves from inside itself — no internet needed.
import { execSync } from "node:child_process";
import { cpSync, rmSync } from "node:fs";

const root = new URL("..", import.meta.url);
const env = { ...process.env, NEXT_PUBLIC_BASE_PATH: "" };
execSync("npm run build", { cwd: root, stdio: "inherit", env });
rmSync(new URL("site", import.meta.url), { recursive: true, force: true });
cpSync(new URL("out", root), new URL("site", import.meta.url), { recursive: true });
console.log("site copied to desktop/site");
