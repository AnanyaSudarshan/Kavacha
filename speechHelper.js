import * as Speech from "expo-speech";

const LOCALE_BY_LANG = { en: "en-IN", kn: "kn-IN", hi: "hi-IN", te: "te-IN", ta: "ta-IN" };

// Speak a given text in the selected language
export function speakText(language, text) {
  if (!text || !String(text).trim()) return;
  const locale = LOCALE_BY_LANG[language] || LOCALE_BY_LANG.en;
  Speech.speak(String(text), { language: locale, pitch: 1.0, rate: 0.85 });
}

// Speak using a translation key with safe fallbacks
export function speakByKey(language, key, translations) {
  const t = translations || {};
  const byLang = (t[language] && t[language][key]) || "";
  const byEn = (t.en && t.en[key]) || "";
  speakText(language, byLang || byEn || "");
}

// Stop any ongoing speech safely
export function stopSpeaking() {
  try {
    Speech.stop();
  } catch (_) {}
}

/*
Example usage:

import translations from "./translations";
import { speakText, speakByKey, stopSpeaking } from "./speechHelper";

speakText("hi", "नमस्ते");
speakByKey("kn", "selectLanguage", translations);
stopSpeaking();
*/

