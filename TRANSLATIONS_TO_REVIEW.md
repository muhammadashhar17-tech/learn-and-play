# Translations to review

All Urdu and Sindhi text in this app was written carefully, but **not by a native
speaker**. Please ask an Urdu teacher and a Sindhi teacher to check the items below
(and ideally skim everything) before the app is shown to students.

Where the text lives:

| What | File |
|---|---|
| All buttons, titles, messages, chatbot phrases | `messages/en.json`, `messages/ur.json`, `messages/sd.json` |
| Quiz questions | `data/quiz/*.ts` |
| Flashcard words + Roman pronunciation | `data/lessons/alphabet.ts`, `data/lessons/words.ts` |
| Chatbot answers and fun facts | `data/chatbot/knowledge.ts` |
| Home page testimonials (samples) | `data/testimonials.ts` |

After editing `messages/*.json`, run `npm run check:i18n`. It confirms all three
files have the same keys and warns if Urdu-only letters (ی ہ ے) slip into Sindhi.

> Some Urdu/Sindhi strings contain `⁦ … ⁩`. These are invisible
> "left-to-right isolate" marks that keep sums like `144 ÷ 12` in the right order
> inside right-to-left text. Please keep them when editing.

---

## ⚠️ Must change before the demo

- **School name:** `About.schoolName` in all three message files currently says
  "Your School Name" / "آپ کے اسکول کا نام" / "توهان جي اسڪول جو نالو".
- **Contact e-mail:** `contactEmail` in `data/site.ts` is a placeholder
  (`contact@yourschool.edu.pk`).
- **Testimonials** in `data/testimonials.ts` are sample quotes. Replace them with
  real ones, or remove them.

---

## Sindhi — words I am least sure about

### Flashcard words (`data/lessons/words.ts`)

| English | Sindhi used | Question |
|---|---|---|
| Fourteen / Eighteen / Nineteen | چوڏهن / ارڙهن / اڻويهه | Spelling and the Roman forms (`chodhan`, `arṛhan`, `uṇvih`) |
| Purple | واڱڻائي | Is this the common word children use? |
| Brown | ناسي | Same question |
| Orange (colour) | نارنگي | Same word as the fruit — acceptable? |
| Guava | زيتون | Colloquial in Sindh; would امرود / جام be better? |
| Dates | کارڪ | This often means *dried* dates. کجور for fresh? |
| Grapes | ڊاک | Check spelling |
| Apple | صوف | Check spelling |
| Pomegranate | ڏاڙهون | Check spelling |
| Watermelon | هندوانو | Check spelling |
| Cow | ڳئون | Check spelling / Roman `ggaun` |
| Lion | شينهن | Check spelling |
| Monkey | باندر | Check spelling |
| Donkey | گڏهه | Check spelling |
| Grandfather / Grandmother | ڏاڏو / ڏاڏي | Paternal — correct? |
| Aunt (mother's sister) | ماسي | Correct? |
| Wednesday / Thursday | اربع / خميس | Some regions say ٻڌر / وسپت — which should we teach? |
| Good morning | صبح جو سلام | Natural, or too literal? |
| Thank you | مهرباني | Or شڪريو? |
| Please | مهرباني ڪري | Correct? |

### Alphabet lesson (`data/lessons/alphabet.ts`)

- The **letter names** use a common romanization (`bbe`, `jje`, `dde`, `gge` for the
  implosive sounds and `ṭe`, `ḍe`, `ṛe`, `ṇun` for the retroflex sounds). Please give
  the names that Sindhi teachers actually use in class.
- Example words: ڄڀ (tongue), ڇٽي (umbrella), ڊٻو (box), ٿڌو (cold), ڳئون (cow). Check
  each one and the nearest Urdu letter shown on the card.
- Roman pronunciations ending in `-u` (e.g. `anbu`, `chandu`, `gulu`) follow Sindhi's
  short final vowel. Are these helpful for children, or should they be simpler?

### Interface text (`messages/sd.json`)

- `گادي جو هنڌ` for "capital", used in quiz questions too
- `ليڊر بورڊ` (Leaderboard), `ڊوائيس` (device), `ڪوئز` (quiz): are loanwords fine?
- Badge names: `ڳالهائو` (Chatterbox), `ڪتابي ڪيڙو` (Bookworm), `کوجي` (Explorer),
  `ڏکئي جو هيرو` (Hard Hero)
- `سترنگي پينگهه` (rainbow) in the Colours lesson description
- `راند روند ۾` (playfully) in the About page
- Chatbot: `ٻڙي سان ورهائي نٿو سگهجي` (can't divide by zero), `بلهڻ` (dolphin)

### Quiz questions (`data/quiz/*.ts`)

- Science sci-12 (states of water): `ٻاڦ ٿيڻ` (evaporation), `ٺهڪڻ` (condensation — very unsure),
  `ڄمڻ` (freezing), `ڳرڻ` (melting). Urdu: `عملِ تبخیر`, `تکثیف`: are these the words used in Class 5 books?
- Math math-12: "LCM" as `ذو اضعافِ اقل` (Urdu) and `ننڍي ۾ ننڍو گڏيل ضربي` (Sindhi): please use the term from the Class 5 textbook.
- Science: `سيارو` (planet), `ڪشش ثقل` (gravity), `رڳڙ` (friction), `ٽهڪي ٿو` (boils)
- GK: `سورج مکي` (sunflower), `نم` (neem), `ٻڙ` (banyan), `رڻ جو جهاز` (ship of the desert)
- Language: lang-6 uses مهرباني as the answer for "thank you" — consistent with the lesson?

---

## Urdu — items to double-check

- `نارنجی` for the colour orange, `مالٹا` for the fruit
- `بحرِ منجمد شمالی` (Arctic Ocean) in a quiz answer: too difficult for Class 5?
- "Class 5" is written `جماعت پنجم` (Urdu) and `پنجين ڪلاس` (Sindhi): match what the school uses?
- Badge names: `باتونی`, `کتابی کیڑا`, `کھوجی`, `مشکل کا ہیرو`
- `سلام دعا` as the title of the Greetings lesson
- Chatbot greeting `وعلیکم السلام` is used as a reply to any "hello"

---

## Facts to verify (all languages)

Please ask a teacher to confirm these statements used by the chatbot and quiz:

- Sindh became a separate province from the Bombay Presidency in **1936** (quiz his-13).
- The Sindhi alphabet has **52 letters** (chatbot "Sindhi language" answer).
- Sachal Sarmast wrote in **seven languages** (chatbot).
- Sindhi Culture Day is celebrated **in December** (chatbot "Ajrak" answer).
- Shah Abdul Latif's poems are sung at Bhit Shah **every night** (chatbot).
- Manchar is the **largest freshwater lake** in Pakistan (quiz gk-14).
- The national game of Pakistan is **hockey** (quiz gk-15).
- In the Sindhi chatbot answer about Allama Iqbal, the poem title
  “لب پہ آتی ہے دعا” is deliberately left in Urdu script.
