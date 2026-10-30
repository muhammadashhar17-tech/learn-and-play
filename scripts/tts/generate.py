"""Makes the recorded voice clips the app plays (public/audio/<lang>/<key>.mp3).

1. npx tsx scripts/tts/collect.ts      -> scripts/tts/texts.json
2. python scripts/tts/generate.py [en ur sd]

Needs: pip install torch transformers soundfile num2words   (CPU is fine)
Voices (free, run on this computer, nothing is sent anywhere):
  en: facebook/mms-tts-eng                 (CC-BY-NC 4.0)
  ur: facebook/mms-tts-urd-script_arabic   (CC-BY-NC 4.0)
  sd: ai4bharat/indic-parler-tts           (Apache 2.0; log in to Hugging Face and
      accept the model's terms once: https://huggingface.co/ai4bharat/indic-parler-tts)

Clips that already exist are skipped, so it can be stopped and run again.
data/audio-manifest.json lists every clip so the app knows which texts have one.
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TEXTS = ROOT / "scripts" / "tts" / "texts.json"
AUDIO = ROOT / "public" / "audio"
MANIFEST = ROOT / "data" / "audio-manifest.json"

DIGITS = re.compile(r"[0-9۰-۹]")


def speech_text(text: str) -> str:
    """Same clean-up as speechText() in lib/speech.ts."""
    text = re.sub(r"[⁦-⁩]", "", text)
    return re.sub(r"\s+", " ", text).strip()


def speech_key(text: str) -> str:
    """Same key as speechKey() in lib/speech.ts: FNV-1a over UTF-8, base 36."""
    h = 0x811C9DC5
    for byte in speech_text(text).encode("utf-8"):
        h ^= byte
        h = (h * 0x01000193) & 0xFFFFFFFF
    digits = "0123456789abcdefghijklmnopqrstuvwxyz"
    out = ""
    while True:
        h, r = divmod(h, 36)
        out = digits[r] + out
        if h == 0:
            return out


def english_words(text: str) -> str:
    """The English voice reads letters only, so spell numbers and symbols out."""
    from num2words import num2words

    text = text.replace("×", " times ").replace("÷", " divided by ").replace("+", " plus ")
    text = text.replace("−", " minus ").replace("=", " equals ").replace("%", " percent").replace("°C", " degrees")
    text = re.sub(r"(\d+)/(\d+)", lambda m: f"{num2words(int(m[1]))} over {num2words(int(m[2]))}", text)
    text = re.sub(r"\d+(\.\d+)?", lambda m: num2words(float(m[0]) if m[1] else int(m[0])), text)
    return text


UR_NUMBERS = (
    "صفر ایک دو تین چار پانچ چھ سات آٹھ نو دس گیارہ بارہ تیرہ چودہ پندرہ سولہ سترہ اٹھارہ انیس بیس "
    "اکیس بائیس تئیس چوبیس پچیس چھبیس ستائیس اٹھائیس انتیس تیس اکتیس بتیس تینتیس چونتیس پینتیس چھتیس "
    "سینتیس اڑتیس انتالیس چالیس اکتالیس بیالیس تینتالیس چوالیس پینتالیس چھیالیس سینتالیس اڑتالیس انچاس "
    "پچاس اکاون باون ترپن چون پچپن چھپن ستاون اٹھاون انسٹھ ساٹھ اکسٹھ باسٹھ تریسٹھ چونسٹھ پینسٹھ چھیاسٹھ "
    "سڑسٹھ اڑسٹھ انہتر ستر اکہتر بہتر تہتر چوہتر پچہتر چھہتر ستتر اٹھہتر اناسی اسی اکیاسی بیاسی تراسی "
    "چوراسی پچاسی چھیاسی ستاسی اٹھاسی نواسی نوے اکانوے بانوے ترانوے چورانوے پچانوے چھیانوے ستانوے اٹھانوے ننانوے"
).split()


def urdu_number(n: int) -> str:
    if n < 100:
        return UR_NUMBERS[n]
    if 1100 <= n < 2000:  # years: 1947 -> انیس سو سینتالیس
        rest = n % 100
        return f"{UR_NUMBERS[n // 100]} سو" + (f" {UR_NUMBERS[rest]}" if rest else "")
    if n < 1000:
        rest = n % 100
        return f"{UR_NUMBERS[n // 100]} سو" + (f" {urdu_number(rest)}" if rest else "")
    rest = n % 1000
    return f"{urdu_number(n // 1000)} ہزار" + (f" {urdu_number(rest)}" if rest else "")


def urdu_words(text: str) -> str:
    """The Urdu voice reads letters only, so spell numbers and maths signs out in Urdu."""
    text = text.replace("½", " آدھا ").replace("cm²", " مربع سینٹی میٹر").replace("cm", " سینٹی میٹر")
    text = re.sub(r"Rs\s*(\d+)", r"\1 روپے", text)  # "Rs 50" is said "50 rupees"
    for sign, word in [("×", "ضرب"), ("÷", "تقسیم"), ("+", "جمع"), ("−", "منفی"), ("=", "برابر"), ("%", "فیصد"), ("°", " ڈگری")]:
        text = text.replace(sign, f" {word} ")
    text = re.sub(r"(\d+)/(\d+)", lambda m: f"{urdu_number(int(m[1]))} بٹا {urdu_number(int(m[2]))}", text)
    text = re.sub(r"(\d+)\.(\d+)", lambda m: f"{urdu_number(int(m[1]))} اعشاریہ " + " ".join(UR_NUMBERS[int(d)] for d in m[2]), text)
    text = re.sub(r"\d+", lambda m: urdu_number(int(m[0])), text)
    return re.sub(r"\s+", " ", text).strip()


class Mms:
    def __init__(self, name: str):
        from transformers import AutoTokenizer, VitsModel

        self.tok = AutoTokenizer.from_pretrained(name)
        self.model = VitsModel.from_pretrained(name)
        self.model.speaking_rate = 0.85  # a little slower, for young learners
        self.rate = self.model.config.sampling_rate

    def __call__(self, text: str):
        import torch

        torch.manual_seed(0)  # same text -> same clip every time
        inputs = self.tok(text, return_tensors="pt")
        if inputs.input_ids.shape[1] == 0:
            return None
        with torch.no_grad():
            return self.model(**inputs).waveform[0].numpy()


class Parler:
    DESCRIPTION = "A female speaker speaks slowly and clearly in a warm, friendly voice. The recording is very clear with no background noise."

    def __init__(self):
        from parler_tts import ParlerTTSForConditionalGeneration
        from transformers import AutoTokenizer

        name = "ai4bharat/indic-parler-tts"
        self.model = ParlerTTSForConditionalGeneration.from_pretrained(name)
        self.tok = AutoTokenizer.from_pretrained(name)
        self.desc_tok = AutoTokenizer.from_pretrained(self.model.config.text_encoder._name_or_path)
        self.rate = self.model.config.sampling_rate

    def __call__(self, text: str):
        import torch

        torch.manual_seed(0)
        desc = self.desc_tok(self.DESCRIPTION, return_tensors="pt")
        prompt = self.tok(text, return_tensors="pt")
        with torch.no_grad():
            audio = self.model.generate(
                input_ids=desc.input_ids,
                attention_mask=desc.attention_mask,
                prompt_input_ids=prompt.input_ids,
                prompt_attention_mask=prompt.attention_mask,
            )
        return audio.cpu().numpy().squeeze()


def voice_for(lang: str):
    if lang == "en":
        return Mms("facebook/mms-tts-eng")
    if lang == "ur":
        return Mms("facebook/mms-tts-urd-script_arabic")
    return Parler()


def prepare(lang: str, text: str):
    """Text the voice can read, or None to leave it to the device voice."""
    if lang == "en":
        return english_words(text).lower()
    # English words inside Urdu/Sindhi text would be skipped by the voice, so the
    # clip would say only half the sentence: leave those to the device voice.
    if re.search(r"[A-Za-z]", text.replace("cm", "").replace("Rs", "")):
        return None
    if lang == "ur":
        return urdu_words(text)
    # Sindhi: numbers are left to the device voice for now.
    if DIGITS.search(text):
        return None
    return text


def trim(wav, rate):
    """Cut silence at both ends and add a short, even pause."""
    import numpy as np

    loud = np.where(np.abs(wav) > 0.01)[0]
    if len(loud):
        wav = wav[max(loud[0] - int(0.1 * rate), 0) : loud[-1] + int(0.2 * rate)]
    peak = np.abs(wav).max() or 1
    return (wav / peak * 0.9).astype("float32")


def main():
    import soundfile as sf

    langs = sys.argv[1:] or ["en", "ur", "sd"]
    texts = json.loads(TEXTS.read_text(encoding="utf-8"))
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8")) if MANIFEST.exists() else {}

    for lang in langs:
        folder = AUDIO / lang
        folder.mkdir(parents=True, exist_ok=True)
        try:
            voice = voice_for(lang)
        except Exception as e:  # model missing or not allowed yet
            print(f"{lang}: voice not available ({e.__class__.__name__}: {str(e)[:120]}) — skipped")
            continue
        made = skipped = 0
        for i, text in enumerate(texts[lang]):
            key = speech_key(text)
            path = folder / f"{key}.mp3"
            spoken = prepare(lang, text)
            if spoken is None:
                path.unlink(missing_ok=True)  # an older clip of a text we no longer voice
                skipped += 1
                continue
            if path.exists():
                continue
            wav = voice(spoken)
            if wav is None or len(wav) < voice.rate * 0.05:
                skipped += 1
                continue
            sf.write(path, trim(wav, voice.rate), voice.rate, format="MP3")
            made += 1
            if made % 50 == 0:
                print(f"{lang}: {i + 1}/{len(texts[lang])}", flush=True)
        print(f"{lang}: {made} new clips, {skipped} left to the device voice", flush=True)

    # The manifest lists what is on disk, so it always matches public/audio.
    for lang in ["en", "ur", "sd"]:
        folder = AUDIO / lang
        manifest[lang] = sorted(p.stem for p in folder.glob("*.mp3")) if folder.exists() else []
    MANIFEST.write_text(json.dumps(manifest, separators=(",", ":")) + "\n", encoding="utf-8")
    print("manifest:", {k: len(v) for k, v in manifest.items()})


if __name__ == "__main__":
    main()
