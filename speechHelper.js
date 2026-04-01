import * as Speech from "expo-speech";

const LANGUAGE_CODES = {
  kannada: "kn-IN",
  hindi: "hi-IN",
  telugu: "te-IN",
  tamil: "ta-IN",
  english: "en-US",
};

export function speak(text, language) {
  const code = LANGUAGE_CODES[language] ?? "en-US";
  Speech.speak(text, { language: code, pitch: 1.0, rate: 0.9 });
}

export function stopSpeaking() {
  Speech.stop();
}

export async function isSpeaking() {
  return await Speech.isSpeakingAsync();
}

