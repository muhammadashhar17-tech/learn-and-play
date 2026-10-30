import type { Word } from "./types";

// Words added in the "games" update: extra cards for some existing lessons
// (appended after the original ones) and five new lessons.

export const MORE_ANIMALS: Word[] = [
  { id: "rabbit", emoji: "🐇", en: "Rabbit", ur: "خرگوش", sd: "سهو", roman: { ur: "khargosh", sd: "saho" } },
  { id: "deer", emoji: "🦌", en: "Deer", ur: "ہرن", sd: "هرڻ", roman: { ur: "hiran", sd: "harṇu" } },
  { id: "bear", emoji: "🐻", en: "Bear", ur: "ریچھ", sd: "رڇ", roman: { ur: "reechh", sd: "richhu" } },
  { id: "sheep", emoji: "🐑", en: "Sheep", ur: "بھیڑ", sd: "رڍ", roman: { ur: "bheṛ", sd: "riḍh" } },
  { id: "hen", emoji: "🐔", en: "Hen", ur: "مرغی", sd: "ڪڪڙ", roman: { ur: "murghi", sd: "kukiṛu" } },
  { id: "duck", emoji: "🦆", en: "Duck", ur: "بطخ", sd: "بدڪ", roman: { ur: "batakh", sd: "badak" } },
  { id: "peacock", emoji: "🦚", en: "Peacock", ur: "مور", sd: "مور", roman: { ur: "mor", sd: "moru" } },
  { id: "crow", emoji: "🐦‍⬛", en: "Crow", ur: "کوا", sd: "ڪانءُ", roman: { ur: "kawwa", sd: "kaan'u" } },
];

export const MORE_FRUITS: Word[] = [
  { id: "strawberry", emoji: "🍓", en: "Strawberry", ur: "اسٹرابیری", sd: "اسٽرابيري", roman: { ur: "strawberry", sd: "strawberry" } },
  { id: "pineapple", emoji: "🍍", en: "Pineapple", ur: "انناس", sd: "انناس", roman: { ur: "ananaas", sd: "ananaas" } },
  { id: "pear", emoji: "🍐", en: "Pear", ur: "ناشپاتی", sd: "ناشپاتي", roman: { ur: "naashpaati", sd: "naashpaati" } },
  { id: "coconut", emoji: "🥥", en: "Coconut", ur: "ناریل", sd: "ناريل", roman: { ur: "naariyal", sd: "naariyal" } },
  { id: "cherry", emoji: "🍒", en: "Cherry", ur: "چیری", sd: "چيري", roman: { ur: "cherry", sd: "cherry" } },
];

export const MORE_GREETINGS: Word[] = [
  { id: "sorry", emoji: "🙏", en: "Sorry", ur: "معاف کیجیے", sd: "معاف ڪجو", roman: { ur: "maaf kijiye", sd: "maaf kajo" } },
  { id: "congrats", emoji: "🎉", en: "Congratulations", ur: "مبارک ہو", sd: "مبارڪ هجي", roman: { ur: "mubaarak ho", sd: "mubaarak huje" } },
  { id: "goodnight", emoji: "🌙", en: "Good night", ur: "شب بخیر", sd: "رات سٺي", roman: { ur: "shab bakhair", sd: "raat saṭhi" } },
  { id: "tomorrow", emoji: "👋", en: "See you tomorrow", ur: "کل ملیں گے", sd: "سڀاڻي ملنداسين", roman: { ur: "kal milenge", sd: "subhaaṇe milandaasin" } },
];

export const BODY: Word[] = [
  { id: "head", emoji: "🙂", en: "Head", ur: "سر", sd: "مٿو", roman: { ur: "sar", sd: "mathho" } },
  { id: "eye", emoji: "👁️", en: "Eye", ur: "آنکھ", sd: "اک", roman: { ur: "aankh", sd: "akh" } },
  { id: "ear", emoji: "👂", en: "Ear", ur: "کان", sd: "ڪن", roman: { ur: "kaan", sd: "kanu" } },
  { id: "nose", emoji: "👃", en: "Nose", ur: "ناک", sd: "نڪ", roman: { ur: "naak", sd: "naku" } },
  { id: "mouth", emoji: "👄", en: "Mouth", ur: "منہ", sd: "وات", roman: { ur: "munh", sd: "vaatu" } },
  { id: "teeth", emoji: "🦷", en: "Teeth", ur: "دانت", sd: "ڏند", roman: { ur: "daant", sd: "ddand" } },
  { id: "hair", emoji: "💇", en: "Hair", ur: "بال", sd: "وار", roman: { ur: "baal", sd: "vaar" } },
  { id: "hand", emoji: "✋", en: "Hand", ur: "ہاتھ", sd: "هٿ", roman: { ur: "haath", sd: "hathu" } },
  { id: "foot", emoji: "🦶", en: "Foot", ur: "پاؤں", sd: "پير", roman: { ur: "paaon", sd: "peru" } },
  { id: "leg", emoji: "🦵", en: "Leg", ur: "ٹانگ", sd: "ٽنگ", roman: { ur: "ṭaang", sd: "ṭang" } },
];

export const VEGETABLES: Word[] = [
  { id: "potato", emoji: "🥔", en: "Potato", ur: "آلو", sd: "پٽاٽو", roman: { ur: "aaloo", sd: "paṭaaṭo" } },
  { id: "tomato", emoji: "🍅", en: "Tomato", ur: "ٹماٹر", sd: "ٽماٽو", roman: { ur: "ṭamaaṭar", sd: "ṭamaaṭo" } },
  { id: "onion", emoji: "🧅", en: "Onion", ur: "پیاز", sd: "بصر", roman: { ur: "pyaaz", sd: "basar" } },
  { id: "carrot", emoji: "🥕", en: "Carrot", ur: "گاجر", sd: "گجر", roman: { ur: "gaajar", sd: "gajar" } },
  { id: "garlic", emoji: "🧄", en: "Garlic", ur: "لہسن", sd: "ٿوم", roman: { ur: "lehsan", sd: "thoom" } },
  { id: "chilli", emoji: "🌶️", en: "Chilli", ur: "مرچ", sd: "مرچ", roman: { ur: "mirch", sd: "mirch" } },
  { id: "cucumber", emoji: "🥒", en: "Cucumber", ur: "کھیرا", sd: "ٻانگي", roman: { ur: "kheera", sd: "bbaangi" } },
  { id: "corn", emoji: "🌽", en: "Corn", ur: "مکئی", sd: "مڪئي", roman: { ur: "makai", sd: "makai" } },
  { id: "spinach", emoji: "🥬", en: "Spinach", ur: "پالک", sd: "پالڪ", roman: { ur: "paalak", sd: "paalak" } },
  { id: "peas", emoji: "🫛", en: "Peas", ur: "مٹر", sd: "مٽر", roman: { ur: "maṭar", sd: "maṭar" } },
];

export const TRANSPORT: Word[] = [
  { id: "car", emoji: "🚗", en: "Car", ur: "گاڑی", sd: "گاڏي", roman: { ur: "gaaṛi", sd: "gaaḍi" } },
  { id: "bus", emoji: "🚌", en: "Bus", ur: "بس", sd: "بس", roman: { ur: "bas", sd: "bas" } },
  { id: "train", emoji: "🚆", en: "Train", ur: "ریل گاڑی", sd: "ريل گاڏي", roman: { ur: "rail gaaṛi", sd: "rel gaaḍi" } },
  { id: "bicycle", emoji: "🚲", en: "Bicycle", ur: "سائیکل", sd: "سائيڪل", roman: { ur: "saaikal", sd: "saaikal" } },
  { id: "boat", emoji: "⛵", en: "Boat", ur: "کشتی", sd: "ٻيڙي", roman: { ur: "kashti", sd: "bberi" } },
  { id: "rickshaw", emoji: "🛺", en: "Rickshaw", ur: "رکشہ", sd: "رڪشا", roman: { ur: "rickshaw", sd: "rickshaa" } },
  { id: "truck", emoji: "🚚", en: "Truck", ur: "ٹرک", sd: "ٽرڪ", roman: { ur: "ṭrak", sd: "ṭrak" } },
  { id: "motorbike", emoji: "🏍️", en: "Motorbike", ur: "موٹر سائیکل", sd: "موٽر سائيڪل", roman: { ur: "moṭar saaikal", sd: "moṭar saaikal" } },
  { id: "plane", emoji: "✈️", en: "Aeroplane", ur: "ہوائی جہاز", sd: "هوائي جهاز", roman: { ur: "hawaai jahaaz", sd: "havaai jahaaz" } },
  { id: "donkeycart", emoji: "🛞", en: "Donkey cart", ur: "گدھا گاڑی", sd: "گڏهه گاڏي", roman: { ur: "gadha gaaṛi", sd: "gaḍah gaaḍi" } },
];

export const SCHOOL: Word[] = [
  { id: "school", emoji: "🏫", en: "School", ur: "اسکول", sd: "اسڪول", roman: { ur: "school", sd: "iskool" } },
  { id: "teacher", emoji: "🧑‍🏫", en: "Teacher", ur: "استاد", sd: "استاد", roman: { ur: "ustaad", sd: "ustaad" } },
  { id: "student", emoji: "🧒", en: "Student", ur: "طالب علم", sd: "شاگرد", roman: { ur: "taalib-e-ilm", sd: "shaagird" } },
  { id: "book", emoji: "📕", en: "Book", ur: "کتاب", sd: "ڪتاب", roman: { ur: "kitaab", sd: "kitaab" } },
  { id: "pen", emoji: "🖊️", en: "Pen", ur: "قلم", sd: "قلم", roman: { ur: "qalam", sd: "qalam" } },
  { id: "pencil", emoji: "✏️", en: "Pencil", ur: "پنسل", sd: "پينسل", roman: { ur: "pensil", sd: "pensil" } },
  { id: "bag", emoji: "🎒", en: "School bag", ur: "بستہ", sd: "ٿيلهو", roman: { ur: "basta", sd: "thelho" } },
  { id: "chair", emoji: "🪑", en: "Chair", ur: "کرسی", sd: "ڪرسي", roman: { ur: "kursi", sd: "kursi" } },
  { id: "board", emoji: "⬛", en: "Blackboard", ur: "تختۂ سیاہ", sd: "تختي", roman: { ur: "takhta-e-siyaah", sd: "takhti" } },
  { id: "notebook", emoji: "📒", en: "Notebook", ur: "کاپی", sd: "ڪاپي", roman: { ur: "kaapi", sd: "kaapi" } },
];

export const WEATHER: Word[] = [
  { id: "sun", emoji: "☀️", en: "Sun", ur: "سورج", sd: "سج", roman: { ur: "sooraj", sd: "siju" } },
  { id: "moon", emoji: "🌙", en: "Moon", ur: "چاند", sd: "چنڊ", roman: { ur: "chaand", sd: "chanḍu" } },
  { id: "star", emoji: "⭐", en: "Star", ur: "ستارہ", sd: "تارو", roman: { ur: "sitaara", sd: "taaro" } },
  { id: "cloud", emoji: "☁️", en: "Cloud", ur: "بادل", sd: "ڪڪر", roman: { ur: "baadal", sd: "kakar" } },
  { id: "rain", emoji: "🌧️", en: "Rain", ur: "بارش", sd: "مينهن", roman: { ur: "baarish", sd: "meenhan" } },
  { id: "wind", emoji: "🌬️", en: "Wind", ur: "ہوا", sd: "هوا", roman: { ur: "hawa", sd: "hawaa" } },
  { id: "hot", emoji: "🥵", en: "Hot", ur: "گرم", sd: "گرم", roman: { ur: "garam", sd: "garam" } },
  { id: "cold", emoji: "🥶", en: "Cold", ur: "ٹھنڈا", sd: "ٿڌو", roman: { ur: "ṭhanḍa", sd: "thadho" } },
  { id: "rainbow", emoji: "🌈", en: "Rainbow", ur: "قوس قزح", sd: "اندرڌنش", roman: { ur: "qaus-e-qazah", sd: "indardhanush" } },
  { id: "snow", emoji: "❄️", en: "Snow", ur: "برف", sd: "برف", roman: { ur: "barf", sd: "barf" } },
];
