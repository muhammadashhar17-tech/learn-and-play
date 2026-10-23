// Builds the site for GitHub Pages and publishes the "out" folder to the
// "gh-pages" branch of this repository's GitHub remote ("origin").
//
//   npm run deploy
//
// The site is then served at https://<user>.github.io/<repo>/
// (GitHub → repository → Settings → Pages → Source: "Deploy from a branch", branch "gh-pages").
import { execSync } from "node:child_process";
import { existsSync, writeFileSync } from "node:fs";

const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const read = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();

const remote = read("git remote get-url origin");
const match = remote.match(/github\.com[:/]([^/]+)\/(.+?)(\.git)?$/);
if (!match) throw new Error(`"origin" is not a GitHub repository: ${remote}`);
const [, owner, repo] = match;

const basePath = `/${repo}`;
const siteUrl = `https://${owner.toLowerCase()}.github.io${basePath}`;
console.log(`\nBuilding for ${siteUrl}/ …\n`);

run("npm run build", {
  env: { ...process.env, NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE_URL: siteUrl },
});

// GitHub Pages runs Jekyll by default, which hides folders starting with "_" (like _next).
if (!existsSync("out/.nojekyll")) writeFileSync("out/.nojekyll", "");

const git = (args) => run(`git ${args}`, { cwd: "out" });
git("init -q");
git("checkout -q -B gh-pages");
git("add -A");
git(`-c user.name="${read("git config user.name") || "Learn & Play"}" -c user.email="${read("git config user.email") || "deploy@localhost"}" commit -q -m "Deploy ${new Date().toISOString()}"`);
git(`push -f -q ${remote} gh-pages`);

console.log(`\n✓ Published. The site updates at ${siteUrl}/ within a minute or two.\n`);
