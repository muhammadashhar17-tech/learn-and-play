import type { Word } from "./types";

/**
 * A selection of Sindhi letters, including the ones Urdu does not have.
 * Each card also shows an example word (with its meaning in English and Urdu).
 * `letter.ur` is the matching — or nearest — Urdu letter.
 * Letter names use common Sindhi romanization: doubled letters (bb, jj, dd, gg)
 * for the "implosive" sounds and a dot (ṭ, ḍ, ṛ, ṇ) for the "hard" sounds.
 */
export const ALPHABET: Word[] = [
  { id: "alif", letter: { sd: "ا", ur: "ا", name: "alif" }, emoji: "🥭", en: "Mango", ur: "آم", sd: "انب", roman: { ur: "aam", sd: "anbu" } },
  { id: "be", letter: { sd: "ب", ur: "ب", name: "be" }, emoji: "👑", en: "King", ur: "بادشاہ", sd: "بادشاهه", roman: { ur: "baadshaah", sd: "baadshaahu" } },
  { id: "bbe", letter: { sd: "ٻ", ur: "ب", name: "bbe", sindhiOnly: true }, emoji: "🐐", en: "Goat", ur: "بکری", sd: "ٻڪري", roman: { ur: "bakri", sd: "bbakri" } },
  { id: "bhe", letter: { sd: "ڀ", ur: "بھ", name: "bhe", sindhiOnly: true }, emoji: "👦", en: "Brother", ur: "بھائی", sd: "ڀاءُ", roman: { ur: "bhaai", sd: "bhaau" } },
  { id: "pe", letter: { sd: "پ", ur: "پ", name: "pe" }, emoji: "🐦", en: "Bird", ur: "پرندہ", sd: "پکي", roman: { ur: "parinda", sd: "pakhi" } },
  { id: "te", letter: { sd: "ت", ur: "ت", name: "te" }, emoji: "⭐", en: "Star", ur: "تارا", sd: "تارو", roman: { ur: "taara", sd: "taaro" } },
  { id: "tte", letter: { sd: "ٽ", ur: "ٹ", name: "ṭe", sindhiOnly: true }, emoji: "🧢", en: "Cap", ur: "ٹوپی", sd: "ٽوپي", roman: { ur: "topi", sd: "topi" } },
  { id: "the", letter: { sd: "ٿ", ur: "تھ", name: "ṭhe", sindhiOnly: true }, emoji: "🥶", en: "Cold", ur: "ٹھنڈا", sd: "ٿڌو", roman: { ur: "thanda", sd: "thadho" } },
  { id: "jeem", letter: { sd: "ج", ur: "ج", name: "jeem" }, emoji: "✈️", en: "Aeroplane", ur: "جہاز", sd: "جهاز", roman: { ur: "jahaaz", sd: "jahaazu" } },
  { id: "jje", letter: { sd: "ڄ", ur: "ج", name: "jje", sindhiOnly: true }, emoji: "👅", en: "Tongue", ur: "زبان", sd: "ڄڀ", roman: { ur: "zabaan", sd: "jjibh" } },
  { id: "che", letter: { sd: "چ", ur: "چ", name: "che" }, emoji: "🌙", en: "Moon", ur: "چاند", sd: "چنڊ", roman: { ur: "chaand", sd: "chandu" } },
  { id: "chhe", letter: { sd: "ڇ", ur: "چھ", name: "chhe", sindhiOnly: true }, emoji: "☂️", en: "Umbrella", ur: "چھتری", sd: "ڇٽي", roman: { ur: "chhatri", sd: "chhatti" } },
  { id: "dde", letter: { sd: "ڊ", ur: "ڈ", name: "ḍe", sindhiOnly: true }, emoji: "📦", en: "Box", ur: "ڈبہ", sd: "ڊٻو", roman: { ur: "dabba", sd: "dabbo" } },
  { id: "dde2", letter: { sd: "ڏ", ur: "د", name: "dde", sindhiOnly: true }, emoji: "🦷", en: "Tooth", ur: "دانت", sd: "ڏند", roman: { ur: "daant", sd: "ddandu" } },
  { id: "rre", letter: { sd: "ڙ", ur: "ڑ", name: "ṛe", sindhiOnly: true }, emoji: "🐎", en: "Horse", ur: "گھوڑا", sd: "گهوڙو", roman: { ur: "ghora", sd: "ghorro" } },
  { id: "kaaf", letter: { sd: "ڪ", ur: "ک", name: "kaaf", sindhiOnly: true }, emoji: "📖", en: "Book", ur: "کتاب", sd: "ڪتاب", roman: { ur: "kitaab", sd: "kitaabu" } },
  { id: "khe", letter: { sd: "ک", ur: "کھ", name: "khe" }, emoji: "🥛", en: "Milk", ur: "دودھ", sd: "کير", roman: { ur: "doodh", sd: "khiru" } },
  { id: "gaaf", letter: { sd: "گ", ur: "گ", name: "gaaf" }, emoji: "🌸", en: "Flower", ur: "پھول", sd: "گل", roman: { ur: "phool", sd: "gulu" } },
  { id: "gge", letter: { sd: "ڳ", ur: "گ", name: "gge", sindhiOnly: true }, emoji: "🐄", en: "Cow", ur: "گائے", sd: "ڳئون", roman: { ur: "gaaye", sd: "ggaun" } },
  { id: "nne", letter: { sd: "ڻ", ur: "ن", name: "ṇun", sindhiOnly: true }, emoji: "💧", en: "Water", ur: "پانی", sd: "پاڻي", roman: { ur: "paani", sd: "paanni" } },
  { id: "phe", letter: { sd: "ڦ", ur: "پھ", name: "phe", sindhiOnly: true }, emoji: "🍎", en: "Fruit", ur: "پھل", sd: "ڦل", roman: { ur: "phal", sd: "phalu" } },
  { id: "meem", letter: { sd: "م", ur: "م", name: "meem" }, emoji: "👩", en: "Mother", ur: "ماں", sd: "ماءُ", roman: { ur: "maan", sd: "maau" } },
];
