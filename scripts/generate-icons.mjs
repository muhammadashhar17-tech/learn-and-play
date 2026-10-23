// Generates PNG icons, favicon.ico and the Open Graph image from SVG.
// Run with: npm run icons   (uses `sharp`, which ships with Next.js)
import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const pub = new URL("../public/", import.meta.url);
const icon = await readFile(new URL("icon.svg", pub));

const square = (size, file) =>
  sharp(icon, { density: 512 }).resize(size, size).png().toFile(fileOf(file));

await square(192, "icon-192.png");
await square(512, "icon-512.png");
await square(180, "apple-touch-icon.png");

// Maskable icon: logo on a full-bleed background with safe-zone padding.
const maskable = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#1f5fbf"/><g transform="translate(96 96) scale(5)"><path d="M14 20c6-3 12-3 18 1v25c-6-4-12-4-18-1z" fill="#fff"/><path d="M50 20c-6-3-12-3-18 1v25c6-4 12-4 18-1z" fill="#dbeafe"/><path d="M38 28l8 5-8 5z" fill="#facc15"/></g></svg>`,
);
await sharp(maskable).png().toFile(fileOf("icon-maskable-512.png"));

// favicon.ico = ICO header wrapping a 48px PNG (supported by all modern browsers).
const png48 = await sharp(icon, { density: 512 }).resize(48, 48).png().toBuffer();
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(1, 4);
header.writeUInt8(48, 6);
header.writeUInt8(48, 7);
header.writeUInt16LE(1, 10);
header.writeUInt16LE(32, 12);
header.writeUInt32LE(png48.length, 14);
header.writeUInt32LE(22, 18);
await writeFile(fileOf("favicon.ico"), Buffer.concat([header, png48]));

// Open Graph image 1200x630.
const logoInner = `<path d="M14 20c6-3 12-3 18 1v25c-6-4-12-4-18-1z" fill="#fff"/><path d="M50 20c-6-3-12-3-18 1v25c6-4 12-4 18-1z" fill="#dbeafe"/><path d="M38 28l8 5-8 5z" fill="#facc15"/>`;
const og = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f70cc"/><stop offset="1" stop-color="#102341"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#bg)"/>
<g fill="#ffffff" opacity="0.07">${Array.from({ length: 12 }, (_, r) => Array.from({ length: 22 }, (_, c) => `<circle cx="${c * 56 + 20}" cy="${r * 56 + 20}" r="3"/>`).join("")).join("")}</g>
<circle cx="1150" cy="40" r="150" fill="#facc15" opacity="0.18"/>
<circle cx="160" cy="560" r="140" fill="#60a5fa" opacity="0.25"/>
<g transform="translate(90 150) scale(3.4)"><rect width="64" height="64" rx="18" fill="#ffffff" opacity="0.15"/>${logoInner}</g>
<text x="340" y="260" font-family="Poppins, Segoe UI, Arial, sans-serif" font-size="92" font-weight="800" fill="#ffffff">Learn &amp; Play</text>
<text x="344" y="330" font-family="Poppins, Segoe UI, Arial, sans-serif" font-size="36" fill="#dbeafe">Quizzes · Flashcards · Chatbot</text>
<text x="344" y="384" font-family="Poppins, Segoe UI, Arial, sans-serif" font-size="30" fill="#bfdbfe">English · Urdu · Sindhi — for students of Sindh</text>
<rect x="344" y="440" width="300" height="64" rx="32" fill="#facc15"/>
<text x="494" y="483" text-anchor="middle" font-family="Poppins, Segoe UI, Arial, sans-serif" font-size="30" font-weight="700" fill="#102341">Free to play!</text>
</svg>`);
await sharp(og).png().toFile(fileOf("og.png"));

console.log("Icons generated in /public");

function fileOf(name) {
  return fileURLToPath(new URL(name, pub));
}
