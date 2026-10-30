// Publishes a new Windows app version:
//   npm run release
// 1. raises the version (1.0.1 → 1.0.2), 2. builds the site + installer,
// 3. uploads it to GitHub Releases as "latest". Installed apps then find it
// and offer "Update", and the website's download link gives this version.
// Needs the GitHub CLI logged in ("gh auth login").
import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const here = new URL(".", import.meta.url);
const run = (cmd, env = process.env) => execSync(cmd, { cwd: here, stdio: "inherit", env });

run("npm version patch --no-git-tag-version");
const token = execSync("gh auth token", { encoding: "utf8" }).trim();
run("npm run site");
run("npx electron-builder --win nsis --publish always", { ...process.env, GH_TOKEN: token });

// Keep the Android app on the newest release too, so its "latest" download link works.
const apk = new URL("../mobile/dist/Learn-and-Play.apk", import.meta.url);
if (existsSync(apk)) {
  const { version } = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf8"));
  run(`gh release upload v${version} "${fileURLToPath(apk)}" --clobber`);
}
console.log("\n✓ Released. Commit desktop/package.json and package-lock.json so the version number is saved.\n");
