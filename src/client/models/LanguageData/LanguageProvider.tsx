import { IParentComponentProps } from '@types';
import React from 'react';

export type LanguageType = 'ko' | 'en';

export interface ILanguageValue {
  language: LanguageType;
  changeLanguage: (lang: LanguageType) => void;
}

export const DEFAULT_LANG = 'ko';

export const LanguageContext = React.createContext<ILanguageValue | null>(null);

function LanguageProvider({ children }: IParentComponentProps) {
  const [language, setLanguage] = React.useState<LanguageType>(DEFAULT_LANG);

  const changeLanguage = (lang: LanguageType) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
