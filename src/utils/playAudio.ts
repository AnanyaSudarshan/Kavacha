import { Audio } from 'expo-av';
import { Language } from '../context/LanguageContext';

const audioFiles: Record<string, any> = {
  kannada: require('../../assets/audio/kannada.mp3'),
  hindi: require('../../assets/audio/hindi.mp3'),
  telugu: require('../../assets/audio/telugu.mp3'),
  tamil: require('../../assets/audio/tamil.mp3'),
  english: require('../../assets/audio/english.mp3'),
};

const languageSelectionFiles = [
  require('../../assets/audio/kannada.mp3'),
  require('../../assets/audio/hindi.mp3'),
  require('../../assets/audio/telugu.mp3'),
  require('../../assets/audio/tamil.mp3'),
  require('../../assets/audio/english.mp3'),
];

export const playLanguageSelection = async (
  cancelRef: { cancelled: boolean }
) => {
  try {
    const sounds: Audio.Sound[] = [];
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });

    for (let i = 0; i < languageSelectionFiles.length; i++) {
      if (cancelRef.cancelled) break;

      const { sound } = await Audio.Sound.createAsync(
        languageSelectionFiles[i]
      );
      sounds.push(sound);
      await sound.setVolumeAsync(1.0);

      if (cancelRef.cancelled) {
        await sound.unloadAsync();
        break;
      }

      await sound.playAsync();

      await new Promise<void>((resolve) => {
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) resolve();
        });
      });

      await sound.unloadAsync();

      if (i < languageSelectionFiles.length - 1) {
        await new Promise((r) => setTimeout(r, 400));
      }
    }
  } catch (e) {
    console.log("playLanguageSelection error", e);
  }
};

export const playVoiceForLanguage = async (
  language: Language,
  cancelRef: { cancelled: boolean }
) => {
  try {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    if (cancelRef.cancelled) return;

    const file = audioFiles[language];
    if (!file) return;

    const { sound } = await Audio.Sound.createAsync(file);
    await sound.setVolumeAsync(1.0);

    if (cancelRef.cancelled) {
      await sound.unloadAsync();
      return;
    }

    await sound.playAsync();

    await new Promise<void>((resolve) => {
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) resolve();
      });
    });

    await sound.unloadAsync();
  } catch (e) {
    console.log("playVoiceForLanguage error", e);
  }
};
