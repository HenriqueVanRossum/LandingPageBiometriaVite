import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/i18n/I18nProvider';

const BackToHomeButton = () => {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <button
      onClick={() => navigate('/')}
      className="mt-10 inline-flex items-center justify-center rounded-xl
                 bg-white text-slate-900 px-6 py-3 font-semibold
                 hover:bg-gray-200 transition"
    >
      {t('common.backHome')}
    </button>
  );
};

export default BackToHomeButton;
