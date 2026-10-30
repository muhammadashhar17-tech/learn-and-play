import type { Game, QuickQuestion } from "./types";
import { t3 } from "./types";
import { choice, ltr, nearNumbers, rand, sample } from "./util";

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

// ---------- Sum Pairs ----------
function sumPairs(): [string, string][] {
  const used = new Set<number>();
  const pairs: [string, string][] = [];
  while (pairs.length < 6) {
    const a = rand(1, 9);
    const b = rand(1, 9);
    if (used.has(a + b)) continue;
    used.add(a + b);
    pairs.push([`${a} + ${b}`, `${a + b}`]);
  }
  return pairs;
}

// ---------- Times Table Race ----------
function timesQuestions(): QuickQuestion[] {
  return range(40).map(() => {
    const a = rand(2, 10);
    const b = rand(2, 10);
    const right = a * b;
    const wrong = [...new Set([a * (b + 1), a * (b - 1), (a + 1) * b, right + 2].filter((n) => n !== right && n > 0))];
    return choice(`${a} × ${b} = ?`, String(right), sample(wrong, 3).map(String), {
      explain: t3(
        `${a} × ${b} = ${right}`,
        ltr(`${a} × ${b} = ${right}`),
        ltr(`${a} × ${b} = ${right}`),
      ),
    });
  });
}

// ---------- Count and Tap ----------
const COUNT_EMOJI = ["🍎", "⭐", "🐟", "🌸", "🎈", "🐥", "🍌", "⚽", "🚗", "🦋"];

function countQuestions(): QuickQuestion[] {
  return range(10).map((i) => {
    const n = rand(i < 4 ? 2 : 5, i < 4 ? 7 : 15);
    const emoji = COUNT_EMOJI[rand(0, COUNT_EMOJI.length - 1)];
    return choice(
      t3("How many do you see?", "آپ کو کتنے نظر آ رہے ہیں؟", "توهان کي ڪيترا نظر اچن ٿا؟"),
      String(n),
      nearNumbers(n, 3, 3, 1).map(String),
      { visual: { type: "count", emoji, n } },
    );
  });
}

// ---------- Bigger or Smaller ----------
function compareQuestions(): QuickQuestion[] {
  return range(10).map((i) => {
    const max = i < 4 ? 20 : i < 7 ? 100 : 999;
    const a = rand(1, max);
    const b = i === 5 ? a : rand(1, max);
    const sign = a > b ? ">" : a < b ? "<" : "=";
    const why =
      sign === ">"
        ? t3(`${a} is bigger than ${b}`, `${ltr(a)} بڑا ہے ${ltr(b)} سے`, `${ltr(a)} وڏو آهي ${ltr(b)} کان`)
        : sign === "<"
          ? t3(`${a} is smaller than ${b}`, `${ltr(a)} چھوٹا ہے ${ltr(b)} سے`, `${ltr(a)} ننڍو آهي ${ltr(b)} کان`)
          : t3(`${a} and ${b} are equal`, `${ltr(a)} اور ${ltr(b)} برابر ہیں`, `${ltr(a)} ۽ ${ltr(b)} برابر آهن`);
    const options = [">", "<", "="];
    return {
      prompt: t3("Which sign goes in the box?", "خانے میں کون سا نشان آئے گا؟", "خاني ۾ ڪهڙو نشان ايندو؟"),
      visual: { type: "big", text: `${a}  ☐  ${b}` },
      options,
      answer: options.indexOf(sign),
      explain: why,
    };
  });
}

// ---------- Tell the Time ----------
const fmt = (h: number, m: number) => `${h}:${String(m).padStart(2, "0")}`;

function clockQuestions(): QuickQuestion[] {
  return range(10).map((i) => {
    const h = rand(1, 12);
    const m = i < 3 ? 0 : i < 6 ? [0, 30][rand(0, 1)] : [0, 15, 30, 45][rand(0, 3)];
    const right = fmt(h, m);
    const wrong = new Set<string>();
    while (wrong.size < 3) {
      const opt = fmt([h, (h % 12) + 1, h === 1 ? 12 : h - 1][rand(0, 2)], [0, 15, 30, 45][rand(0, 3)]);
      if (opt !== right) wrong.add(opt);
    }
    return choice(t3("What time is it?", "کیا وقت ہوا ہے؟", "ڪهڙو وقت ٿيو آهي؟"), right, [...wrong], {
      visual: { type: "clock", h, m },
      explain: t3(
        `The short hand points to ${h} and the long hand to ${m === 0 ? 12 : m / 5}, so it is ${right}.`,
        `چھوٹی سوئی ${ltr(h)} پر اور بڑی سوئی ${ltr(m === 0 ? 12 : m / 5)} پر ہے، اس لیے ${ltr(right)} بجے ہیں۔`,
        `ننڍي سُئي ${ltr(h)} تي ۽ وڏي سُئي ${ltr(m === 0 ? 12 : m / 5)} تي آهي، تنهنڪري ${ltr(right)} ٿيا آهن.`,
      ),
    });
  });
}

// ---------- Rupee Shop ----------
const SHOP = [
  { emoji: "✏️", name: t3("pencil", "پنسل", "پينسل"), price: 15 },
  { emoji: "🧽", name: t3("eraser", "ربڑ", "ربڙ"), price: 10 },
  { emoji: "📒", name: t3("notebook", "کاپی", "ڪاپي"), price: 40 },
  { emoji: "🧃", name: t3("juice", "جوس", "جوس"), price: 30 },
  { emoji: "🍌", name: t3("banana", "کیلا", "ڪيلو"), price: 5 },
  { emoji: "📏", name: t3("ruler", "اسکیل", "اسڪيل"), price: 20 },
  { emoji: "🍪", name: t3("biscuits", "بسکٹ", "بسڪيٽ"), price: 25 },
  { emoji: "🖍️", name: t3("crayons", "رنگین پنسلیں", "رنگين پينسلون"), price: 50 },
];

function shopQuestions(): QuickQuestion[] {
  return range(10).map((i) => {
    const [a, b] = sample(SHOP, 2);
    const total = a.price + b.price;
    if (i % 2 === 0) {
      return choice(
        t3(
          `You buy ${a.emoji} ${a.name.en} (Rs ${a.price}) and ${b.emoji} ${b.name.en} (Rs ${b.price}). How much in total?`,
          `آپ نے ${a.emoji} ${a.name.ur} (${ltr(`Rs ${a.price}`)}) اور ${b.emoji} ${b.name.ur} (${ltr(`Rs ${b.price}`)}) خریدا۔ کل کتنے روپے ہوئے؟`,
          `توهان ${a.emoji} ${a.name.sd} (${ltr(`Rs ${a.price}`)}) ۽ ${b.emoji} ${b.name.sd} (${ltr(`Rs ${b.price}`)}) ورتا. ڪل ڪيترا رپيا ٿيا؟`,
        ),
        `Rs ${total}`,
        nearNumbers(total, 3, 10, 5).map((n) => `Rs ${n}`),
        { explain: t3(`${a.price} + ${b.price} = ${total}`, ltr(`${a.price} + ${b.price} = ${total}`), ltr(`${a.price} + ${b.price} = ${total}`)) },
      );
    }
    const change = 100 - total;
    return choice(
      t3(
        `You buy ${a.emoji} ${a.name.en} and ${b.emoji} ${b.name.en} for Rs ${total} and pay Rs 100. How much change do you get?`,
        `آپ نے ${a.emoji} ${a.name.ur} اور ${b.emoji} ${b.name.ur} ${ltr(`Rs ${total}`)} میں خریدے اور ${ltr("Rs 100")} دیے۔ کتنے پیسے واپس ملیں گے؟`,
        `توهان ${a.emoji} ${a.name.sd} ۽ ${b.emoji} ${b.name.sd} ${ltr(`Rs ${total}`)} ۾ ورتا ۽ ${ltr("Rs 100")} ڏنا. ڪيترا پئسا واپس ملندا؟`,
      ),
      `Rs ${change}`,
      nearNumbers(change, 3, 10, 0).map((n) => `Rs ${n}`),
      { explain: t3(`100 − ${total} = ${change}`, ltr(`100 − ${total} = ${change}`), ltr(`100 − ${total} = ${change}`)) },
    );
  });
}

// ---------- Pizza Fractions ----------
function fractionQuestions(): QuickQuestion[] {
  return range(10).map(() => {
    const parts = rand(2, 8);
    const filled = rand(1, parts - 1);
    const right = `${filled}/${parts}`;
    const wrong = new Set<string>([`${parts}/${filled}`, `${parts - filled}/${parts}`, `${filled}/${parts + 1}`]);
    wrong.delete(right);
    while (wrong.size < 3) wrong.add(`${rand(1, 7)}/${rand(2, 9)}`);
    return choice(
      t3("What fraction of the pizza is coloured?", "پیزا کا کتنا حصہ رنگین ہے؟", "پيزا جو ڪيترو حصو رنگين آهي؟"),
      right,
      [...wrong].filter((w) => w !== right).slice(0, 3),
      {
        visual: { type: "pie", parts, filled },
        explain: t3(
          `${parts} equal parts, ${filled} coloured → ${right}`,
          `${ltr(parts)} برابر حصے، ${ltr(filled)} رنگین ← ${ltr(right)}`,
          `${ltr(parts)} برابر حصا، ${ltr(filled)} رنگين ← ${ltr(right)}`,
        ),
      },
    );
  });
}

// ---------- What Comes Next? ----------
function patternQuestions(): QuickQuestion[] {
  const emojiPatterns = [
    ["🔴", "🔵"],
    ["⭐", "⭐", "🌙"],
    ["🍎", "🍌", "🍇"],
    ["🐱", "🐶", "🐶"],
  ];
  return range(10).map((i) => {
    if (i < 3) {
      const unit = emojiPatterns[rand(0, emojiPatterns.length - 1)];
      const shown = range(unit.length * 2 + 1).map((k) => unit[k % unit.length]);
      const right = unit[shown.length % unit.length];
      const options = [...new Set([...unit, "🟢", "🐸"])].slice(0, 4);
      return {
        prompt: t3("What comes next?", "اگلا کیا آئے گا؟", "اڳيون ڇا ايندو؟"),
        visual: { type: "big", text: `${shown.join(" ")} ?` },
        options,
        answer: options.indexOf(right),
      };
    }
    const step = [2, 3, 5, 10, -2, -5][rand(0, 5)];
    const start = step > 0 ? rand(0, 20) : rand(40, 80);
    const seq = range(4).map((k) => start + step * k);
    const right = start + step * 4;
    const sign = step > 0 ? `+${step}` : `${step}`;
    return choice(
      t3("What number comes next?", "اگلا عدد کون سا ہے؟", "اڳيون انگ ڪهڙو آهي؟"),
      String(right),
      nearNumbers(right, 3, 4, 0).map(String),
      {
        visual: { type: "big", text: `${seq.join(", ")}, ?` },
        explain: t3(`The step is ${sign} each time.`, `ہر بار ${ltr(sign)} ہو رہا ہے۔`, `هر ڀيري ${ltr(sign)} ٿي رهيو آهي.`),
      },
    );
  });
}

export const MATH_GAMES: Game[] = [
  {
    id: "count-fun",
    kind: "quick",
    subject: "math",
    level: "easy",
    title: t3("Count and Tap", "گنو اور دبائیں", "ڳڻيو ۽ دٻايو"),
    intro: t3("Count the pictures and tap the right number.", "تصویریں گنیں اور صحیح عدد دبائیں۔", "تصويرون ڳڻيو ۽ صحيح انگ دٻايو."),
    lesson: [
      t3("Touch or point to each thing once as you count.", "گنتے وقت ہر چیز کو ایک بار چھوئیں یا اس کی طرف اشارہ کریں۔", "ڳڻڻ وقت هر شيءِ کي هڪ ڀيرو ڇهو يا ان ڏانهن اشارو ڪريو."),
      t3("The last number you say tells you how many there are.", "آخری عدد جو آپ بولتے ہیں وہی بتاتا ہے کہ کل کتنے ہیں۔", "آخري انگ جيڪو توهان چئو ٿا، اهو ئي ٻڌائي ٿو ته ڪل ڪيترا آهن."),
      t3("Count row by row so you don't miss any.", "قطار بہ قطار گنیں تاکہ کوئی رہ نہ جائے۔", "قطار به قطار ڳڻيو ته جيئن ڪو به رهجي نه وڃي."),
    ],
    questions: countQuestions,
  },
  {
    id: "sum-pairs",
    kind: "match",
    subject: "math",
    level: "easy",
    title: t3("Sum Pairs", "جمع کے جوڑے", "جوڙ جا جوڙا"),
    intro: t3("Match each sum with its answer.", "ہر جمع کو اس کے جواب سے ملائیں۔", "هر جوڙ کي ان جي جواب سان ملايو."),
    lesson: [
      t3("Adding means putting things together: 3 apples + 2 apples = 5 apples.", `جمع کا مطلب ہے چیزوں کو ملانا: ${ltr("3 + 2 = 5")} سیب۔`, `جوڙ جو مطلب آهي شين کي گڏ ڪرڻ: ${ltr("3 + 2 = 5")} صوف.`),
      t3("Start from the bigger number and count on: 7 + 2 → 8, 9.", `بڑے عدد سے شروع کر کے آگے گنیں: ${ltr("7 + 2 → 8, 9")}`, `وڏي انگ کان شروع ڪري اڳتي ڳڻيو: ${ltr("7 + 2 → 8, 9")}`),
      t3("Changing the order does not change the answer: 4 + 5 = 5 + 4.", `ترتیب بدلنے سے جواب نہیں بدلتا: ${ltr("4 + 5 = 5 + 4")}`, `ترتيب بدلائڻ سان جواب نٿو بدلجي: ${ltr("4 + 5 = 5 + 4")}`),
    ],
    pairs: sumPairs,
  },
  {
    id: "shapes",
    kind: "match",
    subject: "math",
    level: "easy",
    title: t3("Shape Match", "شکلوں کا میل", "شڪلين جو ميل"),
    intro: t3("Match each shape with what makes it special.", "ہر شکل کو اس کی خاص بات سے ملائیں۔", "هر شڪل کي ان جي خاص ڳالهه سان ملايو."),
    lesson: [
      t3("A side is a straight line of a shape. A corner is where two sides meet.", "ضلع شکل کی سیدھی لکیر ہے۔ کونا وہاں ہوتا ہے جہاں دو ضلع ملتے ہیں۔", "پاسو شڪل جي سڌي ليڪ آهي. ڪنڊ اتي ٿئي ٿي جتي ٻه پاسا ملن ٿا."),
      t3("Count the sides to name a shape: 3 = triangle, 4 = square or rectangle, 5 = pentagon, 6 = hexagon.", `ضلع گن کر شکل پہچانیں: ${ltr("3")} = تکون، ${ltr("4")} = مربع یا مستطیل، ${ltr("5")} = مخمس، ${ltr("6")} = مسدس۔`, `پاسا ڳڻي شڪل سڃاڻو: ${ltr("3")} = ٽڪنڊو، ${ltr("4")} = چورس يا مستطيل، ${ltr("5")} = پنج ڪنڊو، ${ltr("6")} = ڇهه ڪنڊو.`),
      t3("A circle is round: it has no sides and no corners.", "دائرہ گول ہوتا ہے: اس کا نہ کوئی ضلع ہوتا ہے نہ کونا۔", "گول دائرو گول ٿئي ٿو: ان جو نه ڪو پاسو آهي نه ڪنڊ."),
    ],
    pairs: () =>
      sample(
        [
          [t3("🔺 Triangle", "🔺 تکون", "🔺 ٽڪنڊو"), t3("3 sides", "3 ضلع", "3 پاسا")],
          [t3("🟥 Square", "🟥 مربع", "🟥 چورس"), t3("4 equal sides", "4 برابر ضلع", "4 برابر پاسا")],
          [t3("▬ Rectangle", "▬ مستطیل", "▬ مستطيل"), t3("2 long and 2 short sides", "2 لمبے اور 2 چھوٹے ضلع", "2 ڊگها ۽ 2 ننڍا پاسا")],
          [t3("⚪ Circle", "⚪ دائرہ", "⚪ گول دائرو"), t3("No corners at all", "کوئی کونا نہیں", "ڪا به ڪنڊ ناهي")],
          [t3("⬟ Pentagon", "⬟ مخمس", "⬟ پنج ڪنڊو"), t3("5 sides", "5 ضلع", "5 پاسا")],
          [t3("⬢ Hexagon", "⬢ مسدس", "⬢ ڇهه ڪنڊو"), t3("6 sides", "6 ضلع", "6 پاسا")],
          [t3("⭐ Star", "⭐ ستارہ", "⭐ تارو"), t3("5 points", "5 نوکیں", "5 چوٽيون")],
        ] as [ReturnType<typeof t3>, ReturnType<typeof t3>][],
        6,
      ),
  },
  {
    id: "compare",
    kind: "quick",
    subject: "math",
    level: "easy",
    title: t3("Bigger or Smaller", "بڑا یا چھوٹا", "وڏو يا ننڍو"),
    intro: t3("Choose >, < or = to compare two numbers.", "دو عدد کا موازنہ کرنے کے لیے > ، < یا = چنیں۔", "ٻن انگن جو ڀيٽ ڪرڻ لاءِ > ، < يا = چونڊيو."),
    lesson: [
      t3("> means “is bigger than” and < means “is smaller than”.", "> کا مطلب ہے “سے بڑا” اور < کا مطلب ہے “سے چھوٹا”۔", "> جو مطلب آهي “کان وڏو” ۽ < جو مطلب آهي “کان ننڍو”."),
      t3("The open mouth of the sign always eats the bigger number: 9 > 4.", `نشان کا کھلا منہ ہمیشہ بڑے عدد کو کھاتا ہے: ${ltr("9 > 4")}`, `نشان جو کليل وات هميشه وڏي انگ کي کائي ٿو: ${ltr("9 > 4")}`),
      t3("Compare tens first, then ones: 45 < 54 because 4 tens are less than 5 tens.", `پہلے دہائیاں دیکھیں، پھر اکائیاں: ${ltr("45 < 54")} کیونکہ 4 دہائیاں 5 سے کم ہیں۔`, `پهريان ڏهاڪا ڏسو، پوءِ ايڪا: ${ltr("45 < 54")} ڇو ته 4 ڏهاڪا 5 کان گهٽ آهن.`),
    ],
    questions: compareQuestions,
  },
  {
    id: "number-order",
    kind: "order",
    subject: "math",
    level: "easy",
    title: t3("Line Them Up", "ترتیب سے لگائیں", "ترتيب سان رکو"),
    intro: t3("Tap the numbers from smallest to biggest.", "اعداد کو سب سے چھوٹے سے سب سے بڑے تک دبائیں۔", "انگن کي سڀ کان ننڍي کان سڀ کان وڏي تائين دٻايو."),
    lesson: [
      t3("When we put numbers in order going up, the smallest comes first.", "جب ہم اعداد کو بڑھتی ترتیب میں لگاتے ہیں تو سب سے چھوٹا پہلے آتا ہے۔", "جڏهن انگن کي وڌندڙ ترتيب ۾ رکون ٿا ته سڀ کان ننڍو پهريان اچي ٿو."),
      t3("A number with more digits is bigger: 100 is bigger than 99.", `زیادہ ہندسوں والا عدد بڑا ہوتا ہے: ${ltr("100")} بڑا ہے ${ltr("99")} سے۔`, `وڌيڪ عددن وارو انگ وڏو ٿئي ٿو: ${ltr("100")} وڏو آهي ${ltr("99")} کان.`),
      t3("If they have the same digits, compare hundreds, then tens, then ones.", "اگر ہندسے برابر ہوں تو پہلے سیکڑے، پھر دہائیاں، پھر اکائیاں دیکھیں۔", "جيڪڏهن عدد برابر هجن ته پهريان سؤ، پوءِ ڏهاڪا، پوءِ ايڪا ڏسو."),
    ],
    sets: () =>
      [20, 100, 999].map((max) => {
        const nums = new Set<number>();
        while (nums.size < 5) nums.add(rand(1, max));
        return {
          prompt: t3("Smallest to biggest", "چھوٹے سے بڑے تک", "ننڍي کان وڏي تائين"),
          steps: [...nums].sort((a, b) => a - b).map((n) => ({ label: String(n) })),
        };
      }),
  },
  {
    id: "patterns",
    kind: "quick",
    subject: "math",
    level: "medium",
    title: t3("What Comes Next?", "اگلا کیا ہے؟", "اڳيون ڇا آهي؟"),
    intro: t3("Find the rule of the pattern and pick the next one.", "سلسلے کا اصول ڈھونڈیں اور اگلا چنیں۔", "سلسلي جو اصول ڳوليو ۽ اڳيون چونڊيو."),
    lesson: [
      t3("A pattern repeats or grows in the same way every time.", "سلسلہ ہر بار ایک ہی طرح دہراتا یا بڑھتا ہے۔", "سلسلو هر ڀيري هڪ ئي طرح ورجائي ٿو يا وڌي ٿو."),
      t3("Find the step between numbers: 2, 4, 6 → each is +2.", `اعداد کے درمیان فرق ڈھونڈیں: ${ltr("2, 4, 6")} ← ہر بار ${ltr("+2")}`, `انگن جي وچ ۾ فرق ڳوليو: ${ltr("2, 4, 6")} ← هر ڀيري ${ltr("+2")}`),
      t3("Use the same step once more to find the next number.", "اگلا عدد معلوم کرنے کے لیے وہی فرق ایک بار اور لگائیں۔", "اڳيون انگ ڳولڻ لاءِ ساڳيو فرق هڪ ڀيرو ٻيهر لڳايو."),
    ],
    questions: patternQuestions,
  },
  {
    id: "times-race",
    kind: "quick",
    subject: "math",
    level: "medium",
    seconds: 60,
    title: t3("Times Table Race", "پہاڑوں کی دوڑ", "پهاڙن جي ڊوڙ"),
    intro: t3("Answer as many times-table questions as you can in 60 seconds!", "60 سیکنڈ میں جتنے ہو سکیں پہاڑوں کے سوال حل کریں!", "60 سيڪنڊن ۾ جيترا ٿي سگهن پهاڙن جا سوال حل ڪريو!"),
    lesson: [
      t3("Multiplying is quick adding: 3 × 4 means 4 + 4 + 4 = 12.", `ضرب جلدی جمع ہے: ${ltr("3 × 4")} یعنی ${ltr("4 + 4 + 4 = 12")}`, `ضرب تڪڙو جوڙ آهي: ${ltr("3 × 4")} يعني ${ltr("4 + 4 + 4 = 12")}`),
      t3("Any number × 10 gets a zero at the end: 7 × 10 = 70.", `کسی بھی عدد کو 10 سے ضرب دیں تو آخر میں صفر لگتا ہے: ${ltr("7 × 10 = 70")}`, `ڪنهن به انگ کي 10 سان ضرب ڏيو ته آخر ۾ ٻڙي لڳي ٿي: ${ltr("7 × 10 = 70")}`),
      t3("The order does not matter: 6 × 3 = 3 × 6 = 18.", `ترتیب سے فرق نہیں پڑتا: ${ltr("6 × 3 = 3 × 6 = 18")}`, `ترتيب سان فرق نٿو پوي: ${ltr("6 × 3 = 3 × 6 = 18")}`),
    ],
    questions: timesQuestions,
  },
  {
    id: "clock",
    kind: "quick",
    subject: "math",
    level: "medium",
    title: t3("Tell the Time", "وقت بتائیں", "وقت ٻڌايو"),
    intro: t3("Read the clock and pick the right time.", "گھڑی دیکھ کر صحیح وقت چنیں۔", "گھڙيال ڏسي صحيح وقت چونڊيو."),
    lesson: [
      t3("The short hand shows the hour. The long hand shows the minutes.", "چھوٹی سوئی گھنٹہ بتاتی ہے۔ بڑی سوئی منٹ بتاتی ہے۔", "ننڍي سُئي ڪلاڪ ٻڌائي ٿي. وڏي سُئي منٽ ٻڌائي ٿي."),
      t3("Long hand on 12 → o'clock (3:00). Long hand on 6 → half past (3:30).", `بڑی سوئی 12 پر ← پورے بجے (${ltr("3:00")})۔ بڑی سوئی 6 پر ← ساڑھے (${ltr("3:30")})۔`, `وڏي سُئي 12 تي ← پورا ٿيا (${ltr("3:00")}). وڏي سُئي 6 تي ← ساڍا (${ltr("3:30")}).`),
      t3("For the long hand, each number is 5 minutes: 3 → 15 minutes, 9 → 45 minutes.", `بڑی سوئی کے لیے ہر عدد 5 منٹ ہے: ${ltr("3")} ← 15 منٹ، ${ltr("9")} ← 45 منٹ۔`, `وڏي سُئي لاءِ هر انگ 5 منٽ آهي: ${ltr("3")} ← 15 منٽ، ${ltr("9")} ← 45 منٽ.`),
    ],
    questions: clockQuestions,
  },
  {
    id: "rupee-shop",
    kind: "quick",
    subject: "math",
    level: "medium",
    title: t3("Rupee Shop", "روپے کی دکان", "رپئي جو دڪان"),
    intro: t3("Go shopping! Add the prices and work out the change.", "خریداری کریں! قیمتیں جمع کریں اور بقایا نکالیں۔", "خريداري ڪريو! قيمتون جوڙيو ۽ باقي پئسا ڳڻيو."),
    lesson: [
      t3("Pakistan's money is the rupee, written Rs.", "پاکستان کی کرنسی روپیہ ہے، جسے Rs لکھتے ہیں۔", "پاڪستان جي ڪرنسي رپيو آهي، جنهن کي Rs لکندا آهن."),
      t3("To find the total, add the prices together.", "کل رقم معلوم کرنے کے لیے قیمتیں جمع کریں۔", "ڪل رقم ڳولڻ لاءِ قيمتون جوڙيو."),
      t3("Change = money you give − total price. Rs 100 − Rs 65 = Rs 35.", `بقایا = دی گئی رقم − کل قیمت۔ ${ltr("100 − 65 = 35")}`, `باقي = ڏنل رقم − ڪل قيمت. ${ltr("100 − 65 = 35")}`),
    ],
    questions: shopQuestions,
  },
  {
    id: "fractions",
    kind: "quick",
    subject: "math",
    level: "hard",
    title: t3("Pizza Fractions", "پیزا کے کسر", "پيزا جا ڪسر"),
    intro: t3("Look at the pizza and name the coloured fraction.", "پیزا دیکھیں اور رنگین حصے کا کسر بتائیں۔", "پيزا ڏسو ۽ رنگين حصي جو ڪسر ٻڌايو."),
    lesson: [
      t3("A fraction is a part of a whole thing that is cut into equal parts.", "کسر کسی پوری چیز کا حصہ ہے جسے برابر حصوں میں کاٹا گیا ہو۔", "ڪسر ڪنهن پوري شيءِ جو حصو آهي جنهن کي برابر حصن ۾ ڪٽيو ويو هجي."),
      t3("The bottom number is how many equal parts. The top number is how many we take.", "نیچے والا عدد بتاتا ہے کل کتنے برابر حصے ہیں۔ اوپر والا بتاتا ہے کتنے لیے۔", "هيٺيون انگ ٻڌائي ٿو ڪل ڪيترا برابر حصا آهن. مٿيون ٻڌائي ٿو ڪيترا ورتا."),
      t3("3/4 means 4 equal slices and 3 of them are taken.", `${ltr("3/4")} کا مطلب ہے 4 برابر ٹکڑے جن میں سے 3 لیے۔`, `${ltr("3/4")} جو مطلب آهي 4 برابر ٽڪرا جن مان 3 ورتا.`),
    ],
    questions: fractionQuestions,
  },
];
