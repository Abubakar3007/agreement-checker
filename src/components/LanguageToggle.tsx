import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center px-3 py-2 space-x-2 text-gray-700 transition-colors rounded-lg hover:bg-gray-100 hover:text-gray-900"
      aria-label="Toggle language"
    >
      <Globe className="w-5 h-5" />
      <span className="text-sm font-medium">
        {i18n.language === 'en' ? 'हिं' : 'EN'}
      </span>
    </button>
  );
};