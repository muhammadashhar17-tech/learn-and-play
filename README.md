# Learn & Play · سیکھو اور کھیلو · سکو ۽ کيڏو

A free, multilingual learning web app for **primary school students (Class 1–5)** in Sindh, Pakistan.
It is **one website in three languages**: the switch at the top of every page
(EN · اردو · سنڌي) changes the whole site between **English, Urdu and Sindhi**
(with proper right-to-left layout). It runs **without a server or database** and
can be installed on phones as an app.

**Live site:** https://muhammadashhar17-tech.github.io/learn-and-play/

## What's inside

| Page | What students can do |
|---|---|
| **Home** | Animated welcome, feature cards, live stats, testimonials |
| **Quiz** | 5 subjects × 15 questions, Easy / Medium / Hard, timer, sounds, confetti, results with review |
| **Learn** | 8 lessons (Alphabet, Numbers, Colours, Animals, Family, Greetings, Fruits, Days) with 3D flip cards, Roman pronunciation, "Listen" buttons and a mini quiz |
| **Chatbot** | "Saathi", an offline helper that translates words, solves sums, shares fun facts and answers questions about Pakistan, Sindh, Bhittai and Iqbal (understands English, Urdu and Roman Urdu) |
| **My Progress** | Quiz history, best scores, lessons completed, 12 badges, a chart, reset button |
| **Leaderboard** | Top scores saved on this device |
| **About / Contact** | About the app and school; a contact form that opens the visitor's e-mail app |

### Made for primary school (Class 1–5)
Each quiz level matches a class band: **Easy = Class 1–2** (40 s per question),
**Medium = Class 3–4** (30 s) and **Hard = Class 5** (20 s). The Home page explains
this in its "A level for every class" section, and the Contact page has an FAQ.
Contact person shown in the app: **Sana**, sanaqureshi1947@gmail.com (`data/site.ts`
and `Contact.personName` in the message files).

### Design
The look follows the **UI/UX Pro Max** skill's recommendation for children's
education apps: "claymorphism" (soft 3D cards and buttons), Nunito + DM Sans for
English, and one consistent SVG icon family (Lucide) instead of emoji icons.

Everything a student does is saved in their own browser (`localStorage`). Nothing is
sent anywhere.

**Built with:** Next.js 16 (App Router, static export) · TypeScript · Tailwind CSS 4 ·
Framer Motion · next-intl · lucide-react.

---

## 1. Run it on your computer

You need **Node.js 20 or newer** ([download](https://nodejs.org)).

```bash
npm install        # first time only
npm run dev        # start the app
```

Open **http://localhost:3000**. You will be sent to `/en`, or to `/ur` or `/sd` if
you chose that language before.

Other useful commands:

```bash
npm run build      # build the final website into the "out" folder
npm run preview    # serve the built "out" folder at http://localhost:3000
npm run lint       # check code quality
npm run check:i18n # check that en/ur/sd translation files match
npm run icons      # regenerate icons + Open Graph image from public/icon.svg
```

> The installable/offline (PWA) part only switches on in the built version
> (`npm run build` then `npm run preview`), not in `npm run dev`.

---

## 2. Before you deploy — make it yours

1. **School name:** set to "Govt Girls School" (`schoolName` in `messages/en.json`,
   `messages/ur.json` and `messages/sd.json`). Change it there if needed.
2. **Contact:** Sana, sanaqureshi1947@gmail.com (`contactEmail` in `data/site.ts`,
   `personName` in the message files).
3. **Testimonials:** replace the sample quotes in `data/testimonials.ts`.
4. **Translations:** ask a native speaker to check the list in
   [`TRANSLATIONS_TO_REVIEW.md`](./TRANSLATIONS_TO_REVIEW.md).
5. *(After deploying)* set your real web address. See step 3.6 below.

---

## 3. Publish for free

### Option A — GitHub Pages (already set up)

The live site above is hosted on GitHub Pages. After changing anything, publish
the new version with one command:

```bash
git push            # save your code on GitHub
npm run deploy      # build and publish the website (gh-pages branch)
```

The site updates within 1–2 minutes. `npm run deploy` builds the app for the
`/learn-and-play/` sub-folder and pushes the result to the `gh-pages` branch, which
GitHub serves. (If you rename the repository, the address and sub-folder follow the
new name automatically.)

### Option B — Vercel (through GitHub)

### 3.1 Put the code on GitHub
1. Create a free account at **https://github.com** if you don't have one.
2. Click **New repository** → name it `learn-and-play` → keep it **Public** or
   **Private** → **Create repository** (do *not* add a README there).
3. In a terminal inside this project folder, run the commands GitHub shows you,
   which look like this:

   ```bash
   git add .
   git commit -m "Learn & Play"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/learn-and-play.git
   git push -u origin main
   ```

### 3.2 Create a Vercel account
1. Go to **https://vercel.com/signup**.
2. Choose **Continue with GitHub** and allow access. The **Hobby** plan is free.

### 3.3 Import the project
1. On the Vercel dashboard click **Add New… → Project**.
2. Find `learn-and-play` in the list and click **Import**.
3. Vercel detects **Next.js** automatically. Leave every setting as it is:
   - Build command: `npm run build`
   - Output: detected automatically (the app is a static export)
4. Click **Deploy** and wait about 1–2 minutes.

### 3.4 Open your site
Vercel shows a link such as `https://learn-and-play-abc123.vercel.app`. Open it on a
phone and on the classroom computer. 🎉

### 3.5 Updating the site later
Every time you `git push` changes to GitHub, Vercel rebuilds and publishes the new
version automatically.

### 3.6 Use your real address for sharing previews (recommended)
In Vercel open **Project → Settings → Environment Variables** and add:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | your site address, e.g. `https://learn-and-play-abc123.vercel.app` |

Then go to **Deployments → ⋯ → Redeploy**. Links shared on WhatsApp or Facebook will
now show the correct preview image and title.

*(Optional)* Under **Settings → Domains** you can add a free `*.vercel.app` name that
is easier to remember, or connect your school's own domain.

---

## 4. Tips for the school demo

- Open the site **once while online**. It is then cached, so it keeps working if
  the Wi-Fi drops.
- On phones, use the browser menu → **Add to Home screen / Install app**.
- On a projector, use the browser's zoom (Ctrl + / Ctrl −) if text looks small.
- "Listen" buttons appear only when the device has a voice for that language.
  Windows and Android usually have English. Urdu voices can be added in the system's
  language/speech settings. Most devices have no Sindhi voice, so that button stays
  hidden rather than mispronouncing words.
- To start fresh before the demo, use **My Progress → Reset my progress** and
  **Leaderboard → Clear leaderboard**.

---

## 5. Project structure

```
app/
  layout.tsx, page.tsx, not-found.tsx   root redirect + global 404 page
  [locale]/                             every page, once per language (en, ur, sd)
    layout.tsx  template.tsx            <html lang dir>, fonts, navbar, footer, page transition
    page.tsx quiz/ learn/ learn/[lesson]/ chat/ progress/ leaderboard/ about/ contact/
  sitemap.ts robots.ts                  SEO files (generated at build time)
components/                             UI, grouped by page (home, quiz, learn, chat, progress…)
data/                                   ALL content: quiz questions, lesson words, chatbot facts
  quiz/  lessons/  chatbot/  testimonials.ts  site.ts
i18n/                                   language routing (next-intl)
lib/                                    logic: storage, progress & badges, sounds, speech, quiz
  chat/                                 chatbot engine (rule-based; swap point for a real AI)
messages/                               en.json · ur.json · sd.json — every piece of UI text
public/                                 icons, Open Graph image, manifest, service worker
scripts/                                icon generator, translation checker, export fix
```

### Adding content
- **A quiz question:** add an entry to the right file in `data/quiz/` (write the
  question and options in `en`, `ur` and `sd`; `answer` is the index of the correct option).
- **A flashcard word:** add an entry to a list in `data/lessons/words.ts`.
- **A chatbot topic:** add an entry to `TOPICS` in `data/chatbot/knowledge.ts`,
  with keywords in English, Roman Urdu, Urdu and Sindhi.
- **Any interface text:** add the same key to all three `messages/*.json` files, then
  run `npm run check:i18n`.

### Connecting a real AI chatbot later
The chat page only talks to the `ChatEngine` interface in `lib/chat/types.ts`.
`lib/chat/index.ts` explains how to swap the offline engine for one that calls an AI
API. Keep any API key on a server, never inside this website.

---

## 6. Notes for developers

- `next.config.ts` uses `output: "export"`, so `npm run build` writes plain HTML to `out/`.
- Sub-folder hosting: set `NEXT_PUBLIC_BASE_PATH` (e.g. `/learn-and-play`) and
  `NEXT_PUBLIC_SITE_URL` at build time (`npm run deploy` does this). Leave both empty
  for Vercel or a custom domain. Use `withBase()` from `lib/base-path.ts` for any plain
  `<a href>` or file URL; Next.js `<Link>` handles it automatically.
- `scripts/fix-export.mjs` runs automatically after every build (`postbuild`). It
  works around a Next.js 16 static-export quirk: the client asks for some prefetch
  files at flat paths (`__next.a.b.txt`) while the exporter writes them in folders
  (`__next.a/b.txt`).
- Locale routing has no middleware (static export can't use it). The root `/` page
  redirects in the browser to the saved or browser language.
- Fonts: Poppins (English), Noto Nastaliq Urdu (Urdu, extra line-height),
  Noto Naskh Arabic (Sindhi), all via `next/font`. Letter-spacing is forced off for
  Arabic-script text, because it breaks the joins between letters. Only the regular
  Nastaliq weight is loaded: its bold file breaks joins such as "سندھی", so the
  browser draws bold Urdu from the regular font instead.
