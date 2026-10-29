// Publishes a new Windows app version:
//   npm run release
// 1. raises the version (1.0.1 → 1.0.2), 2. builds the site + installer,
// 3. uploads it to GitHub Releases as "latest". Installed apps then find it
// and offer "Update", and the website's download link gives this version.
// Needs the GitHub CLI logged in ("gh auth login").
import { execSync } from "node:child_process";

const here = new URL(".", import.meta.url);
const run = (cmd, env = process.env) => execSync(cmd, { cwd: here, stdio: "inherit", env });

run("npm version patch --no-git-tag-version");
const token = execSync("gh auth token", { encoding: "utf8" }).trim();
run("npm run site");
run("npx electron-builder --win nsis --publish always", { ...process.env, GH_TOKEN: token });
console.log("\n✓ Released. Commit desktop/package.json so the version number is saved.\n");
