import { useEffect, useRef, useState } from 'react';

type LanguageCode = 'ru' | 'tm';

const STORAGE_KEY = 'unite_lang';

const LANGUAGE_LABELS: Record<LanguageCode, { short: string; full: string }> = {
  ru: { short: 'РУ', full: 'Русский' },
  tm: { short: 'ТМ', full: 'Туркменский' },
};

function getInitialLanguage(): LanguageCode {
  if (typeof window === 'undefined') {
    return 'ru';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
  if (stored === 'ru' || stored === 'tm') {
    return stored;
  }

  return 'ru';
}

function LanguageSwitcher() {
  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === 'ru' ? 'ru-RU' : 'tk-TM';
  }, [language]);

  // Close on ESC and outside click (like Sidebar)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const current = LANGUAGE_LABELS[language];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-around gap-3 outline-0 w-[70px] cursor-pointer py-1.5 px-3 rounded-[8px] hover:bg-[#0000000d] transition-colors"
      >
        <span className="text-[14px] font-medium">{current.short}</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-transform duration-200`}
        >
          <path
            d="M3.87883 5.29289L0.293044 1.70711C-0.336921 1.07714 0.109246 0 1.00015 0H8.17172C9.06263 0 9.50879 1.07714 8.87883 1.70711L5.29304 5.29289C4.90252 5.68342 4.26935 5.68342 3.87883 5.29289Z"
            fill="black"
          />
        </svg>
      </button>

      <div
        className={`absolute left-1/2 -translate-x-1/2 mt-4 w-[220px] rounded-[10px] border border-[#0000001A] bg-white px-[10px] py-[13px] shadow-sm z-50 transition-all duration-200 ${
          isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        <div className="flex flex-col">
          {(['tm', 'ru'] as LanguageCode[]).map((code) => {
            const labels = LANGUAGE_LABELS[code];
            const isActive = code === language;

            return (
              <button
                key={code}
                type="button"
                onClick={() => handleSelect(code)}
                className={`w-full text-left px-[10px] py-[8.5px] rounded-[8px] text-[12px] font-medium cursor-pointer transition-colors ${
                  isActive ? 'bg-[#EEF3FF]' : 'bg-white'
                }`}
              >
                {labels.full}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LanguageSwitcher;

