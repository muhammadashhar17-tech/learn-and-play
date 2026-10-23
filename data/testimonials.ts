import type { Trilingual } from "./types";

/**
 * Sample testimonials for the Home page slider.
 * Replace them with real quotes from your students and teachers.
 */
export interface Testimonial {
  id: string;
  name: Trilingual;
  role: "student" | "teacher" | "parent";
  grade?: number;
  emoji: string;
  quote: Trilingual;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: { en: "Ayesha", ur: "عائشہ", sd: "عائشه" },
    role: "student",
    grade: 5,
    emoji: "👧",
    quote: {
      en: "I love the flashcards! Now I can say all the colours in Sindhi and teach my little brother.",
      ur: "مجھے فلیش کارڈز بہت پسند ہیں! اب میں سارے رنگ سندھی میں بول سکتی ہوں اور اپنے چھوٹے بھائی کو سکھاتی ہوں۔",
      sd: "مون کي فليش ڪارڊ ڏاڍا وڻن ٿا! هاڻي آئون سڀ رنگ سنڌي ۾ چئي سگهان ٿي ۽ پنهنجي ننڍي ڀاءُ کي سيکاريان ٿي.",
    },
  },
  {
    id: "t2",
    name: { en: "Bilal", ur: "بلال", sd: "بلال" },
    role: "student",
    grade: 5,
    emoji: "👦",
    quote: {
      en: "The quiz timer makes my heart race! I got three stars in Science on Hard level.",
      ur: "کوئز کا ٹائمر دل کی دھڑکن تیز کر دیتا ہے! میں نے سائنس میں مشکل درجے پر تین ستارے لیے۔",
      sd: "ڪوئز جو ٽائمر دل جي ڌڙڪن تيز ڪري ڇڏي ٿو! مون سائنس ۾ ڏکئي درجي تي ٽي تارا کٽيا.",
    },
  },
  {
    id: "t3",
    name: { en: "Ms. Saima", ur: "مس صائمہ", sd: "مس صائمه" },
    role: "teacher",
    emoji: "👩‍🏫",
    quote: {
      en: "It works on the classroom projector without internet. The children ask to play it every day.",
      ur: "یہ کلاس کے پروجیکٹر پر انٹرنیٹ کے بغیر چلتی ہے۔ بچے روز اسے کھیلنے کی فرمائش کرتے ہیں۔",
      sd: "هي ڪلاس جي پروجيڪٽر تي انٽرنيٽ کان سواءِ هلي ٿي. ٻار روز ان کي کيڏڻ جي فرمائش ڪن ٿا.",
    },
  },
  {
    id: "t4",
    name: { en: "Zain", ur: "زین", sd: "زين" },
    role: "student",
    grade: 5,
    emoji: "🧒",
    quote: {
      en: "I asked the chatbot about Shah Abdul Latif Bhittai and it told me about Shah Jo Risalo!",
      ur: "میں نے چیٹ بوٹ سے شاہ عبداللطیف بھٹائی کے بارے میں پوچھا تو اس نے شاہ جو رسالو کے بارے میں بتایا!",
      sd: "مون چيٽ بوٽ کان شاهه عبداللطيف ڀٽائي بابت پڇيو ته ان مون کي شاهه جي رسالي بابت ٻڌايو!",
    },
  },
  {
    id: "t5",
    name: { en: "Mr. Asif", ur: "آصف صاحب", sd: "آصف صاحب" },
    role: "parent",
    emoji: "👨",
    quote: {
      en: "My daughter practises Urdu and Sindhi at home with it. It is simple, safe and free.",
      ur: "میری بیٹی گھر پر اس سے اردو اور سندھی کی مشق کرتی ہے۔ یہ آسان، محفوظ اور مفت ہے۔",
      sd: "منهنجي ڌيءَ گهر ۾ ان سان اردو ۽ سنڌي جي مشق ڪري ٿي. هي آسان، محفوظ ۽ مفت آهي.",
    },
  },
];
