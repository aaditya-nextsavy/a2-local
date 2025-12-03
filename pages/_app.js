import '@/styles/globals.css';
import '@/styles/style.css';
import '@/styles/headerStyle.css'
import '@/styles/responsive.css'
import '@/styles/populertour.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Suspense, useEffect } from 'react';
import { appWithTranslation, useTranslation } from 'next-i18next';
import '../i18n';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from '@/lib/AuthContext';

function App({ Component, pageProps, router }) {

  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  useEffect(() => {
    const bodyElement = document.querySelector('body');

    if (bodyElement) {
      if (router.locale === 'ar') {
        bodyElement.setAttribute('dir', 'rtl');
        bodyElement.classList.add("arabic-content-wrapper");
      } else {
        bodyElement.setAttribute('dir', 'ltr');
        bodyElement.classList.remove("arabic-content-wrapper");
      }
    }
  }, [router.locale]);

  const dir = router.query.lang || router.locale === 'ar' ? 'rtl' : 'ltr';

  return (
    // <div dir={dir} className={router.locale === 'ar' ? 'arabic-content-wrapper' : ''}> 
    // <Suspense fallback="Loading">
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
    // </Suspense >
    // </div>
  );
}

export default appWithTranslation(App);