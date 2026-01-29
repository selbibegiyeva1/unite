import type { LanguageCode } from '../contexts/LanguageContext';
import { ru } from './ru';
import { tm } from './tm';

export { ru } from './ru';
export { tm } from './tm';

export type Translations = typeof ru;

const translations: Record<LanguageCode, Translations> = {
  ru,
  tm,
};

export function getTranslations(lang: LanguageCode): Translations {
  return translations[lang];
}
