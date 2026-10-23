import type { Trilingual } from "../types";

/**
 * What the offline chatbot knows. `keywords` are matched against the student's
 * message (English, Roman Urdu, Urdu and Sindhi spellings); the topic with the
 * most matching keywords wins.
 */
export interface Topic {
  id: string;
  emoji: string;
  keywords: string[];
  answer: Trilingual;
}

export const TOPICS: Topic[] = [
  {
    id: "bhittai",
    emoji: "📜",
    keywords: ["bhittai", "bhitai", "shah abdul latif", "latif", "shah jo risalo", "risalo", "بھٹائی", "لطیف", "رسالو", "ڀٽائي", "لطيف", "ڀٽ"],
    answer: {
      en: "Shah Abdul Latif Bhittai (1689–1752) is the greatest Sufi poet of Sindh. His poems are collected in the book “Shah Jo Risalo”, which teaches love, kindness and courage. His shrine is in Bhit Shah, where people sing his poems every night.",
      ur: "شاہ عبداللطیف بھٹائی (1689–1752) سندھ کے سب سے بڑے صوفی شاعر ہیں۔ ان کی شاعری “شاہ جو رسالو” میں جمع ہے، جو محبت، مہربانی اور ہمت کا درس دیتی ہے۔ ان کا مزار بھٹ شاہ میں ہے جہاں ہر رات ان کا کلام گایا جاتا ہے۔",
      sd: "شاهه عبداللطيف ڀٽائي (1689–1752) سنڌ جو سڀ کان وڏو صوفي شاعر آهي. سندس شاعري “شاهه جو رسالو” ۾ گڏ ٿيل آهي، جيڪا پيار، مهرباني ۽ همت جو سبق ڏئي ٿي. سندس درگاهه ڀٽ شاهه ۾ آهي جتي هر رات سندس ڪلام ڳايو وڃي ٿو.",
    },
  },
  {
    id: "iqbal",
    emoji: "✒️",
    keywords: ["iqbal", "allama", "national poet", "poet of the east", "shair e mashriq", "اقبال", "علامہ", "شاعرِ مشرق", "علامه"],
    answer: {
      en: "Allama Muhammad Iqbal (1877–1938) is the national poet of Pakistan, also called “the Poet of the East”. He wrote in Urdu and Persian and dreamed of a separate homeland for the Muslims of South Asia. His famous poem “Lab pe aati hai dua” is still sung in schools.",
      ur: "علامہ محمد اقبال (1877–1938) پاکستان کے قومی شاعر ہیں جنہیں “شاعرِ مشرق” بھی کہا جاتا ہے۔ انہوں نے اردو اور فارسی میں شاعری کی اور برصغیر کے مسلمانوں کے لیے الگ وطن کا خواب دیکھا۔ ان کی نظم “لب پہ آتی ہے دعا” آج بھی اسکولوں میں پڑھی جاتی ہے۔",
      sd: "علامه محمد اقبال (1877–1938) پاڪستان جو قومي شاعر آهي، جنهن کي “شاعرِ مشرق” به سڏيو وڃي ٿو. هن اردو ۽ فارسي ۾ شاعري ڪئي ۽ برصغير جي مسلمانن لاءِ الڳ وطن جو خواب ڏٺو. سندس نظم “لب پہ آتی ہے دعا” اڄ به اسڪولن ۾ پڙهي وڃي ٿي.",
    },
  },
  {
    id: "quaid",
    emoji: "🏛️",
    keywords: ["quaid", "jinnah", "founder", "qaid", "quaid e azam", "قائد", "جناح", "بانی", "باني"],
    answer: {
      en: "Quaid-e-Azam Muhammad Ali Jinnah (1876–1948) is the founder of Pakistan. He was born in Karachi, Sindh, on 25 December 1876. His famous motto is “Unity, Faith, Discipline”.",
      ur: "قائداعظم محمد علی جناح (1876–1948) پاکستان کے بانی ہیں۔ وہ 25 دسمبر 1876 کو کراچی، سندھ میں پیدا ہوئے۔ ان کا مشہور قول ہے “اتحاد، ایمان، تنظیم”۔",
      sd: "قائداعظم محمد علي جناح (1876–1948) پاڪستان جو باني آهي. هو 25 ڊسمبر 1876 تي ڪراچي، سنڌ ۾ ڄائو. سندس مشهور قول آهي “اتحاد، ايمان، تنظيم”.",
    },
  },
  {
    id: "pakistan",
    emoji: "🌙",
    keywords: ["pakistan", "پاکستان", "پاڪستان", "country", "mulk", "ملک", "ملڪ"],
    answer: {
      en: "Pakistan became independent on 14 August 1947. Its capital is Islamabad and its biggest city is Karachi. It has four provinces: Punjab, Sindh, Khyber Pakhtunkhwa and Balochistan. The national language is Urdu.",
      ur: "پاکستان 14 اگست 1947 کو آزاد ہوا۔ اس کا دارالحکومت اسلام آباد اور سب سے بڑا شہر کراچی ہے۔ اس کے چار صوبے ہیں: پنجاب، سندھ، خیبر پختونخوا اور بلوچستان۔ قومی زبان اردو ہے۔",
      sd: "پاڪستان 14 آگسٽ 1947 تي آزاد ٿيو. ان جي گادي جو هنڌ اسلام آباد ۽ سڀ کان وڏو شهر ڪراچي آهي. ان جا چار صوبا آهن: پنجاب، سنڌ، خيبر پختونخوا ۽ بلوچستان. قومي ٻولي اردو آهي.",
    },
  },
  {
    id: "sindh",
    emoji: "🌴",
    keywords: ["sindh", "سندھ", "سنڌ", "province", "suba", "صوبہ", "صوبو"],
    answer: {
      en: "Sindh is a province in the south of Pakistan, named after the Indus River (Sindhu). Its capital is Karachi. Sindh is home to Mohenjo-daro, one of the oldest cities in the world, and to great Sufi poets like Shah Abdul Latif Bhittai and Sachal Sarmast.",
      ur: "سندھ پاکستان کے جنوب میں ایک صوبہ ہے جس کا نام دریائے سندھ پر رکھا گیا ہے۔ اس کا دارالحکومت کراچی ہے۔ سندھ میں دنیا کے قدیم ترین شہروں میں سے ایک موہن جو دڑو ہے، اور یہ شاہ عبداللطیف بھٹائی اور سچل سرمست جیسے عظیم صوفی شاعروں کی سرزمین ہے۔",
      sd: "سنڌ پاڪستان جي ڏکڻ ۾ هڪ صوبو آهي، جنهن جو نالو سنڌو درياهه تان رکيو ويو آهي. ان جي گادي جو هنڌ ڪراچي آهي. سنڌ ۾ دنيا جي قديم ترين شهرن مان هڪ موهن جو دڙو آهي، ۽ هي شاهه عبداللطيف ڀٽائي ۽ سچل سرمست جهڙن عظيم صوفي شاعرن جي ڌرتي آهي.",
    },
  },
  {
    id: "mohenjodaro",
    emoji: "🏺",
    keywords: ["mohenjo", "mohenjodaro", "mohenjo-daro", "indus valley", "harappa", "موہن جو دڑو", "موہنجو", "موهن جو دڙو", "موهن"],
    answer: {
      en: "Mohenjo-daro, near Larkana in Sindh, was built about 4,500 years ago by the Indus Valley Civilization. It had straight streets, brick houses, drains and a Great Bath. It is a UNESCO World Heritage Site.",
      ur: "موہن جو دڑو سندھ میں لاڑکانہ کے قریب تقریباً 4500 سال پہلے وادیٔ سندھ کی تہذیب نے بنایا تھا۔ اس میں سیدھی گلیاں، اینٹوں کے گھر، نالیاں اور ایک بڑا غسل خانہ تھا۔ یہ یونیسکو کا عالمی ورثہ ہے۔",
      sd: "موهن جو دڙو سنڌ ۾ لاڙڪاڻي جي ويجهو اٽڪل 4500 سال اڳ سنڌو ماٿري جي تهذيب ٺاهيو هو. ان ۾ سڌيون گهٽيون، سرن جا گهر، نيڪال ۽ هڪ وڏو تلاءُ هو. هي يونيسڪو جو عالمي ورثو آهي.",
    },
  },
  {
    id: "indus",
    emoji: "🌊",
    keywords: ["indus", "river", "darya", "دریا", "درياهه", "سنڌو", "دریائے سندھ"],
    answer: {
      en: "The Indus is Pakistan's longest river. It starts in Tibet and flows through Pakistan into the Arabian Sea near Karachi. Farms all over Sindh depend on its water, and it is home to the rare blind Indus river dolphin.",
      ur: "دریائے سندھ پاکستان کا سب سے لمبا دریا ہے۔ یہ تبت سے نکل کر پاکستان سے گزرتا ہوا کراچی کے قریب بحیرۂ عرب میں گرتا ہے۔ سندھ بھر کے کھیت اس کے پانی پر چلتے ہیں، اور اس میں نایاب اندھی ڈولفن بھی رہتی ہے۔",
      sd: "سنڌو درياهه پاڪستان جو سڀ کان ڊگهو درياهه آهي. هي تبت مان نڪري پاڪستان مان وهندو ڪراچي جي ويجهو عربي سمنڊ ۾ ڇوڙ ڪري ٿو. سڄي سنڌ جا کيت ان جي پاڻي تي هلن ٿا، ۽ ان ۾ ناياب انڌي بلهڻ به رهي ٿي.",
    },
  },
  {
    id: "karachi",
    emoji: "🏙️",
    keywords: ["karachi", "کراچی", "ڪراچي", "capital of sindh", "city of lights"],
    answer: {
      en: "Karachi is the capital of Sindh and the biggest city of Pakistan. It lies on the Arabian Sea and has Pakistan's main port. It is called the “City of Lights”, and Quaid-e-Azam was born and is buried there.",
      ur: "کراچی سندھ کا دارالحکومت اور پاکستان کا سب سے بڑا شہر ہے۔ یہ بحیرۂ عرب کے کنارے ہے اور یہاں پاکستان کی بڑی بندرگاہ ہے۔ اسے “روشنیوں کا شہر” کہتے ہیں، اور قائداعظم یہیں پیدا ہوئے اور یہیں دفن ہیں۔",
      sd: "ڪراچي سنڌ جي گادي جو هنڌ ۽ پاڪستان جو سڀ کان وڏو شهر آهي. هي عربي سمنڊ جي ڪناري تي آهي ۽ هتي پاڪستان جو وڏو بندرگاهه آهي. ان کي “روشنين جو شهر” چون ٿا، ۽ قائداعظم هتي ڄائو ۽ هتي دفن آهي.",
    },
  },
  {
    id: "sachal",
    emoji: "🎶",
    keywords: ["sachal", "sarmast", "سچل", "سرمست"],
    answer: {
      en: "Sachal Sarmast (1739–1827) was a Sufi poet from Daraza near Khairpur, Sindh. He wrote in seven languages, including Sindhi, Siraiki and Persian, and is called the “poet of seven languages”.",
      ur: "سچل سرمست (1739–1827) سندھ میں خیرپور کے قریب درازا کے صوفی شاعر تھے۔ انہوں نے سندھی، سرائیکی اور فارسی سمیت سات زبانوں میں شاعری کی، اس لیے انہیں “ہفت زبان شاعر” کہا جاتا ہے۔",
      sd: "سچل سرمست (1739–1827) سنڌ ۾ خيرپور جي ويجهو درازا جو صوفي شاعر هو. هن سنڌي، سرائڪي ۽ فارسي سميت ستن ٻولين ۾ شاعري ڪئي، تنهنڪري کيس “هفت زبان شاعر” سڏيو وڃي ٿو.",
    },
  },
  {
    id: "qalandar",
    emoji: "🕌",
    keywords: ["qalandar", "shahbaz", "sehwan", "قلندر", "شہباز", "سیہون", "شهباز", "سيوهڻ"],
    answer: {
      en: "Lal Shahbaz Qalandar was a famous Sufi saint. His beautiful shrine is in Sehwan Sharif, Sindh, and thousands of people visit it every year. The song “Dama Dam Mast Qalandar” is about him.",
      ur: "لعل شہباز قلندر ایک مشہور صوفی بزرگ تھے۔ ان کا خوبصورت مزار سیہون شریف، سندھ میں ہے جہاں ہر سال ہزاروں لوگ آتے ہیں۔ مشہور گیت “دما دم مست قلندر” انہی کے بارے میں ہے۔",
      sd: "لعل شهباز قلندر هڪ مشهور صوفي بزرگ هو. سندس سهڻي درگاهه سيوهڻ شريف، سنڌ ۾ آهي جتي هر سال هزارين ماڻهو اچن ٿا. مشهور گيت “دما دم مست قلندر” سندس باري ۾ آهي.",
    },
  },
  {
    id: "thar",
    emoji: "🐪",
    keywords: ["thar", "desert", "registan", "تھر", "ٿر", "صحرا", "ریگستان", "رڻ"],
    answer: {
      en: "The Thar Desert in Sindh is the largest desert in Pakistan. People there keep camels, goats and peacocks, and when the monsoon rain comes the sand turns green with grass.",
      ur: "سندھ کا صحرائے تھر پاکستان کا سب سے بڑا صحرا ہے۔ وہاں لوگ اونٹ، بکریاں اور مور پالتے ہیں، اور مون سون کی بارش میں ریت گھاس سے ہری ہو جاتی ہے۔",
      sd: "سنڌ جو ٿر رڻ پاڪستان جو سڀ کان وڏو رڻ آهي. اتي ماڻهو اُٺ، ٻڪريون ۽ مور پالين ٿا، ۽ مينهن پوڻ سان واري گاهه سان سائي ٿي وڃي ٿي.",
    },
  },
  {
    id: "ajrak",
    emoji: "🧣",
    keywords: ["ajrak", "ajrak", "topi", "sindhi cap", "culture", "ثقافت", "اجرک", "اجرڪ", "ٽوپي", "ٹوپی", "ثقافت"],
    answer: {
      en: "The Ajrak and the Sindhi topi (cap) are symbols of Sindhi culture. The Ajrak is a block-printed cloth, usually deep red and blue, given as a gift of respect. Sindhi Culture Day is celebrated every December.",
      ur: "اجرک اور سندھی ٹوپی سندھی ثقافت کی علامتیں ہیں۔ اجرک ٹھپے سے چھپا ہوا کپڑا ہے، عموماً گہرا لال اور نیلا، جو عزت کے تحفے کے طور پر دیا جاتا ہے۔ سندھی ثقافت کا دن ہر سال دسمبر میں منایا جاتا ہے۔",
      sd: "اجرڪ ۽ سنڌي ٽوپي سنڌي ثقافت جون نشانيون آهن. اجرڪ ٺپي سان ڇپيل ڪپڙو آهي، عام طور تي گهرو ڳاڙهو ۽ نيرو، جيڪو عزت جي تحفي طور ڏنو وڃي ٿو. سنڌي ثقافت جو ڏينهن هر سال ڊسمبر ۾ ملهايو وڃي ٿو.",
    },
  },
  {
    id: "sindhi-language",
    emoji: "🔤",
    keywords: ["sindhi language", "sindhi zaban", "سندھی زبان", "سنڌي ٻولي", "sindhi alphabet", "سنڌي الف ب"],
    answer: {
      en: "Sindhi is one of the oldest languages of South Asia. In Pakistan it is written in an Arabic-based script with 52 letters — including special letters like ٻ, ڄ, ڏ and ڳ that Urdu does not have. Try the Alphabet lesson to learn them!",
      ur: "سندھی جنوبی ایشیا کی قدیم ترین زبانوں میں سے ایک ہے۔ پاکستان میں یہ عربی رسم الخط میں 52 حروف کے ساتھ لکھی جاتی ہے — جن میں ٻ، ڄ، ڏ اور ڳ جیسے خاص حروف ہیں جو اردو میں نہیں۔ انہیں سیکھنے کے لیے حروفِ تہجی کا سبق آزمائیں!",
      sd: "سنڌي ڏکڻ ايشيا جي قديم ترين ٻولين مان هڪ آهي. پاڪستان ۾ هي عربي لپيءَ ۾ 52 اکرن سان لکي وڃي ٿي — جن ۾ ٻ، ڄ، ڏ ۽ ڳ جهڙا خاص اکر آهن جيڪي اردو ۾ ناهن. انهن کي سکڻ لاءِ الف ب جو سبق آزمايو!",
    },
  },
  {
    id: "independence",
    emoji: "🎉",
    keywords: ["independence", "14 august", "azadi", "آزادی", "آزادي", "یوم آزادی", "flag", "jhanda", "جھنڈا", "جهنڊو", "anthem", "tarana", "ترانہ", "ترانو"],
    answer: {
      en: "Pakistan celebrates Independence Day on 14 August. The flag is dark green with a white stripe, a crescent and a star. The national anthem, “Pak Sarzameen”, was written by Hafeez Jalandhari.",
      ur: "پاکستان 14 اگست کو یومِ آزادی مناتا ہے۔ جھنڈا گہرا سبز ہے جس میں ایک سفید پٹی، ہلال اور ستارہ ہے۔ قومی ترانہ “پاک سرزمین” حفیظ جالندھری نے لکھا۔",
      sd: "پاڪستان 14 آگسٽ تي آزادي جو ڏينهن ملهائي ٿو. جهنڊو گهرو سائو آهي جنهن ۾ هڪ اڇي پٽي، چنڊ ۽ تارو آهي. قومي ترانو “پاڪ سرزمين” حفيظ جالنڌري لکيو.",
    },
  },
];

export const FUN_FACTS: Trilingual[] = [
  {
    en: "The blind Indus river dolphin lives only in the Indus River. It finds its way using sound instead of eyes!",
    ur: "اندھی ڈولفن صرف دریائے سندھ میں رہتی ہے۔ یہ آنکھوں کے بجائے آواز سے راستہ ڈھونڈتی ہے!",
    sd: "انڌي بلهڻ رڳو سنڌو درياهه ۾ رهي ٿي. اها اکين بدران آواز سان رستو ڳولي ٿي!",
  },
  {
    en: "K2, in Pakistan, is the second-highest mountain in the world — 8,611 metres tall!",
    ur: "پاکستان کا کے ٹو دنیا کا دوسرا سب سے اونچا پہاڑ ہے — 8611 میٹر اونچا!",
    sd: "پاڪستان جو ڪي ٽو دنيا جو ٻيو نمبر سڀ کان اوچو جبل آهي — 8611 ميٽر اوچو!",
  },
  {
    en: "Mohenjo-daro had covered drains 4,500 years ago — long before many modern cities!",
    ur: "موہن جو دڑو میں 4500 سال پہلے ڈھکی ہوئی نالیاں تھیں — بہت سے جدید شہروں سے بہت پہلے!",
    sd: "موهن جو دڙو ۾ 4500 سال اڳ ڍڪيل نيڪال هئا — ڪيترن ئي جديد شهرن کان گهڻو اڳ!",
  },
  {
    en: "Sindh grows some of the sweetest mangoes in the world. The Sindhri mango is famous everywhere!",
    ur: "سندھ میں دنیا کے میٹھے ترین آم اگتے ہیں۔ سندھڑی آم ہر جگہ مشہور ہے!",
    sd: "سنڌ ۾ دنيا جا مٺا ترين انب ٿين ٿا. سنڌڙي انب هر هنڌ مشهور آهي!",
  },
  {
    en: "A markhor, Pakistan's national animal, has spiral horns that can grow longer than a metre!",
    ur: "پاکستان کے قومی جانور مارخور کے مڑے ہوئے سینگ ایک میٹر سے بھی لمبے ہو سکتے ہیں!",
    sd: "پاڪستان جي قومي جانور مارخور جا وريل سڱ هڪ ميٽر کان به ڊگها ٿي سگهن ٿا!",
  },
  {
    en: "Your heart beats about 100,000 times every day without taking a break!",
    ur: "آپ کا دل روزانہ تقریباً ایک لاکھ بار دھڑکتا ہے، بغیر کسی وقفے کے!",
    sd: "توهان جي دل روزانو اٽڪل هڪ لک ڀيرا ڌڙڪي ٿي، بنا ڪنهن وقفي جي!",
  },
  {
    en: "Honey never goes bad. Honey found in very old tombs could still be eaten!",
    ur: "شہد کبھی خراب نہیں ہوتا۔ بہت پرانے مقبروں سے ملنے والا شہد بھی کھایا جا سکتا تھا!",
    sd: "ماکي ڪڏهن به خراب نه ٿيندي آهي. تمام پراڻن مقبرن مان مليل ماکي به کائي سگهجي ٿي!",
  },
  {
    en: "Shah Jo Risalo has been translated into many languages, including English, Urdu and German.",
    ur: "شاہ جو رسالو کا انگریزی، اردو اور جرمن سمیت کئی زبانوں میں ترجمہ ہو چکا ہے۔",
    sd: "شاهه جي رسالي جو انگريزي، اردو ۽ جرمن سميت ڪيترين ئي ٻولين ۾ ترجمو ٿي چڪو آهي.",
  },
  {
    en: "Octopuses have three hearts and blue blood!",
    ur: "آکٹوپس کے تین دل ہوتے ہیں اور اس کا خون نیلا ہوتا ہے!",
    sd: "آڪٽوپس کي ٽي دليون ٿين ٿيون ۽ ان جو رت نيرو هوندو آهي!",
  },
  {
    en: "Keenjhar Lake near Thatta gives drinking water to the city of Karachi.",
    ur: "ٹھٹھہ کے قریب کینجھر جھیل کراچی شہر کو پینے کا پانی دیتی ہے۔",
    sd: "ٺٽي جي ويجهو ڪينجهر ڍنڍ ڪراچي شهر کي پيئڻ جو پاڻي ڏئي ٿي.",
  },
  {
    en: "Light from the Sun takes about 8 minutes to reach the Earth.",
    ur: "سورج کی روشنی کو زمین تک پہنچنے میں تقریباً 8 منٹ لگتے ہیں۔",
    sd: "سج جي روشني کي ڌرتيءَ تائين پهچڻ ۾ اٽڪل 8 منٽ لڳن ٿا.",
  },
  {
    en: "Sindhi has special letters like ٻ and ڳ for sounds made by pulling air inwards — they are called implosive sounds!",
    ur: "سندھی میں ٻ اور ڳ جیسے خاص حروف ہیں جن کی آواز ہوا اندر کھینچ کر نکلتی ہے!",
    sd: "سنڌي ۾ ٻ ۽ ڳ جهڙا خاص اکر آهن جن جو آواز هوا اندر ڇڪي نڪرندو آهي!",
  },
];
