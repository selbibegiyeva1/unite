import type { LanguageCode } from '../contexts/LanguageContext';
import { ru } from './ru';
import { tm } from './tm';

export { ru } from './ru';
export { tm } from './tm';

export type RuTranslations = typeof ru;
export type TmTranslations = typeof tm;
// Union of all locale shapes so both ru and tm are allowed
export type Translations = RuTranslations | TmTranslations;

const translations: Record<LanguageCode, Translations> = {
  ru,
  tm,
};

export function getTranslations(lang: LanguageCode): Translations {
  return translations[lang];
}
