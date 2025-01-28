import { LocalizedString } from "@types";
import React, { createContext, useContext, useState, ReactNode } from "react";
const i18n = require('i18n-js');
i18n.fallbacks = true;
i18n.locale = 'en-US'

interface LanguageContextType {
  currentLanguage: keyof LocalizedString;
  changeLanguage: (langCode : keyof LocalizedString) => void
}

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: i18n.locale as keyof LocalizedString,
  changeLanguage: () => {},
});

// Language Provider
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<keyof LocalizedString>(i18n.locale as keyof LocalizedString);
    
  const changeLanguage = (langCode:  keyof LocalizedString) => {
    i18n.locale = langCode;
    setCurrentLanguage(langCode);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook to Use Context
export const useLanguage = () => useContext(LanguageContext);