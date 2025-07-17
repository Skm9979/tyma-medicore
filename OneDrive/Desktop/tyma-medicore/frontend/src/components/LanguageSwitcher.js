import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-700 font-semibold">{t('language')}:</span>
      <button
        className={`px-2 py-1 rounded ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <button
        className={`px-2 py-1 rounded ${i18n.language === 'zh' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        onClick={() => changeLanguage('zh')}
      >
        中文
      </button>
    </div>
  );
};

export default LanguageSwitcher; 