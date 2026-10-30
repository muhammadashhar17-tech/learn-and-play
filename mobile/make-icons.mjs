// Draws the Android launcher icons and splash screens from the app logo.
// Run with: npm run icons   (uses `sharp` from the website's node_modules)
import { existsSync, readdirSync, renameSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(new URL("../package.json", import.meta.url));
const sharp = require("sharp");

const RES = fileURLToPath(new URL("./android/app/src/main/res/", import.meta.url));
const BRAND = "#1f5fbf";
const BG = "#f2f7fe";

// The book-and-play logo (same drawing as public/icon.svg's maskable version), on a 64×64 grid.
const LOGO = `<path d="M14 20c6-3 12-3 18 1v25c-6-4-12-4-18-1z" fill="#fff"/><path d="M50 20c-6-3-12-3-18 1v25c6-4 12-4 18-1z" fill="#dbeafe"/><path d="M38 28l8 5-8 5z" fill="#facc15"/>`;

const svg = (body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">${body}</svg>`);
// Full icon: rounded blue square with the logo (old Android versions).
const square = svg(`<rect width="512" height="512" rx="112" fill="${BRAND}"/><g transform="translate(96 96) scale(5)">${LOGO}</g>`);
const round = svg(`<circle cx="256" cy="256" r="256" fill="${BRAND}"/><g transform="translate(96 96) scale(5)">${LOGO}</g>`);
// Adaptive icon foreground: logo inside the 66/108 safe zone, transparent around it.
const foreground = svg(`<g transform="translate(136 136) scale(3.75)">${LOGO}</g>`);

const LAUNCHER = { mdpi: 48, hdpi: 72, xhdpi: 96, xxhdpi: 144, xxxhdpi: 192 };
for (const [density, size] of Object.entries(LAUNCHER)) {
  const dir = `${RES}mipmap-${density}/`;
  await sharp(square, { density: 300 }).resize(size, size).png().toFile(`${dir}ic_launcher.png`);
  await sharp(round, { density: 300 }).resize(size, size).png().toFile(`${dir}ic_launcher_round.png`);
  const fg = Math.round((size * 108) / 48);
  await sharp(foreground, { density: 300 }).resize(fg, fg).png().toFile(`${dir}ic_launcher_foreground.png`);
}

// Splash screens: logo tile centred on the app's light background, at each file's own size.
for (const dir of readdirSync(RES).filter((d) => d.startsWith("drawable"))) {
  const file = `${RES}${dir}/splash.png`;
  if (!existsSync(file)) continue;
  const { width, height } = await sharp(file).metadata();
  const logo = Math.round(Math.min(width, height) * 0.32);
  const tile = await sharp(square, { density: 300 }).resize(logo, logo).png().toBuffer();
  await sharp({ create: { width, height, channels: 4, background: BG } })
    .composite([{ input: tile, gravity: "center" }])
    .png()
    .toFile(`${file}.tmp`);
  renameSync(`${file}.tmp`, file);
}

console.log("Android icons and splash screens updated");
