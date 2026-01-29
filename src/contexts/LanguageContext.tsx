import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export const STORAGE_KEY = 'unite_lang';

export type LanguageCode = 'ru' | 'tm';

function getStoredLanguage(): LanguageCode {
  if (typeof window === 'undefined') return 'ru';
  const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
  return stored === 'ru' || stored === 'tm' ? stored : 'ru';
}

interface LanguageContextValue {
  lang: LanguageCode;
  setLang: (code: LanguageCode) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>(getStoredLanguage);

  const setLang = useCallback((code: LanguageCode) => {
    setLangState(code);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, code);
      document.documentElement.lang = code === 'ru' ? 'ru-RU' : 'tk-TM';
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang === 'ru' ? 'ru-RU' : 'tk-TM';
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return value;
}
