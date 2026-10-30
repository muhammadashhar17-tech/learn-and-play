import type { Trilingual } from "../types";
import type { Game } from "./types";
import { t3 } from "./types";
import { sample } from "./util";

type Pair = [Trilingual, Trilingual];

export const GK_GAMES: Game[] = [
  {
    id: "capitals",
    kind: "match",
    subject: "gk",
    level: "medium",
    title: t3("Provinces and Capitals", "صوبے اور دارالحکومت", "صوبا ۽ گاديءَ جا هنڌ"),
    intro: t3("Match each part of Pakistan with its capital city.", "پاکستان کے ہر حصے کو اس کے دارالحکومت سے ملائیں۔", "پاڪستان جي هر حصي کي ان جي گاديءَ واري شهر سان ملايو."),
    lesson: [
      t3("Pakistan has four provinces: Punjab, Sindh, Khyber Pakhtunkhwa and Balochistan.", "پاکستان کے چار صوبے ہیں: پنجاب، سندھ، خیبر پختونخوا اور بلوچستان۔", "پاڪستان جا چار صوبا آهن: پنجاب، سنڌ، خيبر پختونخوا ۽ بلوچستان."),
      t3("A capital is the city where the government of a place works.", "دارالحکومت وہ شہر ہے جہاں کسی جگہ کی حکومت کام کرتی ہے۔", "گاديءَ جو هنڌ اهو شهر آهي جتي ڪنهن جاءِ جي حڪومت ڪم ڪري ٿي."),
      t3("Karachi, the capital of Sindh, is Pakistan's biggest city and port.", "سندھ کا دارالحکومت کراچی پاکستان کا سب سے بڑا شہر اور بندرگاہ ہے۔", "سنڌ جي گادي جو هنڌ ڪراچي پاڪستان جو سڀ کان وڏو شهر ۽ بندرگاهه آهي."),
    ],
    pairs: () =>
      sample<Pair>(
        [
          [t3("Pakistan", "پاکستان", "پاڪستان"), t3("Islamabad", "اسلام آباد", "اسلام آباد")],
          [t3("Sindh", "سندھ", "سنڌ"), t3("Karachi", "کراچی", "ڪراچي")],
          [t3("Punjab", "پنجاب", "پنجاب"), t3("Lahore", "لاہور", "لاهور")],
          [t3("Khyber Pakhtunkhwa", "خیبر پختونخوا", "خيبر پختونخوا"), t3("Peshawar", "پشاور", "پشاور")],
          [t3("Balochistan", "بلوچستان", "بلوچستان"), t3("Quetta", "کوئٹہ", "ڪوئيٽا")],
          [t3("Gilgit-Baltistan", "گلگت بلتستان", "گلگت بلتستان"), t3("Gilgit", "گلگت", "گلگت")],
        ],
        6,
      ),
  },
  {
    id: "heroes",
    kind: "match",
    subject: "gk",
    level: "hard",
    title: t3("Our Heroes", "ہمارے ہیرو", "اسان جا هيرو"),
    intro: t3("Match each great person with what they are famous for.", "ہر عظیم شخصیت کو اس کے کارنامے سے ملائیں۔", "هر عظيم شخصيت کي سندس ڪارنامي سان ملايو."),
    lesson: [
      t3("Quaid-e-Azam Muhammad Ali Jinnah founded Pakistan in 1947.", "قائداعظم محمد علی جناح نے 1947 میں پاکستان بنایا۔", "قائداعظم محمد علي جناح 1947ع ۾ پاڪستان ٺاهيو."),
      t3("Allama Iqbal dreamed of a separate homeland and wrote poems that inspire us.", "علامہ اقبال نے الگ وطن کا خواب دیکھا اور ہمت دلانے والی شاعری کی۔", "علامه اقبال الڳ وطن جو خواب ڏٺو ۽ همت ڏياريندڙ شاعري ڪئي."),
      t3("Shah Abdul Latif Bhittai is the great Sufi poet of Sindh. His poems are in Shah jo Risalo.", "شاہ عبداللطیف بھٹائی سندھ کے عظیم صوفی شاعر ہیں۔ ان کی شاعری شاہ جو رسالو میں ہے۔", "شاهه عبداللطيف ڀٽائي سنڌ جو عظيم صوفي شاعر آهي. سندس شاعري شاهه جي رسالي ۾ آهي."),
    ],
    pairs: () =>
      sample<Pair>(
        [
          [t3("Quaid-e-Azam", "قائداعظم", "قائداعظم"), t3("Founder of Pakistan", "بانیٔ پاکستان", "پاڪستان جو باني")],
          [t3("Allama Iqbal", "علامہ اقبال", "علامه اقبال"), t3("Poet of the East", "شاعرِ مشرق", "مشرق جو شاعر")],
          [t3("Shah Abdul Latif Bhittai", "شاہ عبداللطیف بھٹائی", "شاهه عبداللطيف ڀٽائي"), t3("Sufi poet of Sindh", "سندھ کے صوفی شاعر", "سنڌ جو صوفي شاعر")],
          [t3("Fatima Jinnah", "فاطمہ جناح", "فاطمه جناح"), t3("Mother of the Nation", "مادرِ ملت", "قوم جي ماءُ")],
          [t3("Liaquat Ali Khan", "لیاقت علی خان", "لياقت علي خان"), t3("First Prime Minister", "پہلے وزیرِاعظم", "پهريون وزيراعظم")],
          [t3("Abdul Sattar Edhi", "عبدالستار ایدھی", "عبدالستار ايڌي"), t3("Helped poor people all his life", "ساری زندگی غریبوں کی مدد کی", "سڄي زندگي غريبن جي مدد ڪئي")],
          [t3("Malala Yousafzai", "ملالہ یوسفزئی", "ملاله يوسفزئي"), t3("Nobel Prize for girls' education", "لڑکیوں کی تعلیم کے لیے نوبیل انعام", "ڇوڪرين جي تعليم لاءِ نوبل انعام")],
          [t3("Arfa Karim", "ارفع کریم", "ارفع ڪريم"), t3("Youngest computer expert", "کم عمر ترین کمپیوٹر ماہر", "سڀ کان ننڍي عمر جي ڪمپيوٽر ماهر")],
        ],
        6,
      ),
  },
  {
    id: "symbols",
    kind: "match",
    subject: "gk",
    level: "medium",
    title: t3("National Symbols", "قومی علامات", "قومي نشانيون"),
    intro: t3("Match each national symbol of Pakistan.", "پاکستان کی ہر قومی علامت کو ملائیں۔", "پاڪستان جي هر قومي نشانيءَ کي ملايو."),
    lesson: [
      t3("National symbols show what a country is proud of.", "قومی علامات بتاتی ہیں کہ ملک کو کس بات پر فخر ہے۔", "قومي نشانيون ٻڌائين ٿيون ته ملڪ کي ڪهڙي ڳالهه تي فخر آهي."),
      t3("Pakistan's flag is green and white with a crescent and a star.", "پاکستان کا جھنڈا سبز اور سفید ہے جس پر چاند اور ستارہ ہے۔", "پاڪستان جو جهنڊو سائو ۽ اڇو آهي جنهن تي چنڊ ۽ تارو آهي."),
      t3("The markhor, our national animal, lives high in the northern mountains.", "مارخور، ہمارا قومی جانور، شمالی پہاڑوں میں رہتا ہے۔", "مارخور، اسان جو قومي جانور، اتر جي جبلن ۾ رهي ٿو."),
    ],
    pairs: () =>
      sample<Pair>(
        [
          [t3("National animal", "قومی جانور", "قومي جانور"), t3("🐐 Markhor", "🐐 مارخور", "🐐 مارخور")],
          [t3("National bird", "قومی پرندہ", "قومي پکي"), t3("🐦 Chukar", "🐦 چکور", "🐦 چڪور")],
          [t3("National flower", "قومی پھول", "قومي گل"), t3("🌼 Jasmine", "🌼 چنبیلی", "🌼 چنبيلي")],
          [t3("National tree", "قومی درخت", "قومي وڻ"), t3("🌲 Deodar", "🌲 دیودار", "🌲 ديودار")],
          [t3("National sport", "قومی کھیل", "قومي راند"), t3("🏑 Hockey", "🏑 ہاکی", "🏑 هاڪي")],
          [t3("National language", "قومی زبان", "قومي ٻولي"), t3("Urdu", "اردو", "اردو")],
          [t3("National poet", "قومی شاعر", "قومي شاعر"), t3("Allama Iqbal", "علامہ اقبال", "علامه اقبال")],
          [t3("National fruit", "قومی پھل", "قومي ميوو"), t3("🥭 Mango", "🥭 آم", "🥭 انب")],
        ],
        6,
      ),
  },
];
