// components/LanguageSwitcher.js
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const router = useRouter();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    router.push(router.pathname, router.asPath, { locale: lng });
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ar')}>Arabic</button>
    </div>
  );
};

export default LanguageSwitcher;
