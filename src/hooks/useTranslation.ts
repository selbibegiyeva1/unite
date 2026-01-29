import { useLanguage } from '../contexts/LanguageContext';
import { getTranslations, type Translations } from '../locales';

export function useTranslation(): { t: Translations; lang: 'ru' | 'tm' } {
  const { lang } = useLanguage();
  const t = getTranslations(lang);
  return { t, lang };
}
