import React from 'react';
import { LanguageContext, ILanguageValue } from '@models/LanguageData/LanguageProvider';

function useLanguage(): ILanguageValue {
  return React.useContext(LanguageContext) as ILanguageValue;
}

export default useLanguage;
