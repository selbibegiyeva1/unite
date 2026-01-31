import { useEffect, useRef, useState } from 'react';
import { useLanguage, type LanguageCode } from '../../contexts/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';

const SHORT_LABELS: Record<LanguageCode, string> = {
  ru: 'РУ',
  tm: 'ТМ',
};

function LanguageSwitcher() {
  const { lang: language, setLang } = useLanguage();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  const fullLabels: Record<LanguageCode, string> = {
    ru: t.languageSwitcher.russian,
    tm: t.languageSwitcher.turkmen,
  };

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
    setLang(code);
    setIsOpen(false);
  };

  const currentShort = SHORT_LABELS[language];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center justify-around gap-3 outline-0 w-[70px] cursor-pointer py-1.5 px-3 rounded-[8px] hover:bg-[#0000000d] transition-colors"
      >
        <span className="text-[14px] font-medium">{currentShort}</span>
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
          {(['ru', 'tm'] as LanguageCode[]).map((code) => {
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
                {fullLabels[code]}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default LanguageSwitcher;

