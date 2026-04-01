import React, { createContext, useContext, useState, useEffect } 
from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'kannada' | 'hindi' | 'telugu' | 'tamil' | 'english';

interface LanguageContextType {
  selectedLanguage: Language;
  setSelectedLanguage: (lang: Language) => void;
  languageLabels: Record<Language, string>;
}

const defaultLanguage: Language = 'english';

const languageLabels: Record<Language, string> = {
  kannada: 'ಕನ್ನಡ',
  hindi: 'हिंदी',
  telugu: 'తెలుగు',
  tamil: 'தமிழ்',
  english: 'English',
};

const LanguageContext = createContext<LanguageContextType>({
  selectedLanguage: defaultLanguage,
  setSelectedLanguage: () => {},
  languageLabels,
});

export const LanguageProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [selectedLanguage, setSelectedLanguageState] = 
    useState<Language>(defaultLanguage);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const saved = await AsyncStorage.getItem('selectedLanguage');
        if (saved) {
          setSelectedLanguageState(saved as Language);
        }
      } catch (e) {}
    };
    loadLanguage();
  }, []);

  const setSelectedLanguage = async (lang: Language) => {
    setSelectedLanguageState(lang);
    try {
      await AsyncStorage.setItem('selectedLanguage', lang);
    } catch (e) {}
  };

  return (
    <LanguageContext.Provider 
      value={{ selectedLanguage, setSelectedLanguage, languageLabels }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
