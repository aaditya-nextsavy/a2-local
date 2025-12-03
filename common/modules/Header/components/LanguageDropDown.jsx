import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const LanguageDropDown = () => {
    const { i18n } = useTranslation();
    const router = useRouter();

    const detectedLanguage = i18n.language;
    const languageCode = detectedLanguage;

    const [langVal, setLangVal] = useState(languageCode);
    const [isLanguageChanged, setIsLanguageChanged] = useState(false);
    const [isClinet, setIsClient] = useState(false);

    const lngs = {
        en: { nativeName: 'EN', fullName: 'English' },
        ar: { nativeName: 'AR', fullName: 'Arabic' },
    };

    useEffect(() => {
        document.body.dir = i18n.dir();
    }, [i18n.dir()]);

    useEffect(() => {
        setIsClient(true);
        if (!isLanguageChanged) {
            handleSelect(router.locale);
        }
    }, [router.locale]);

    const handleSelect = (language) => {
        if (language !== langVal) {
            setLangVal(language);
            i18n.changeLanguage(language);
            localStorage.setItem('language_code', language);
            setIsLanguageChanged(true);
            router.push(router.pathname, router.asPath, { locale: language });
        }
    };

    return (
        <Dropdown className="language-dropdown-wrapper">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {lngs[langVal]?.nativeName || langVal}
            </Dropdown.Toggle>
            <Dropdown.Menu className="language-dropdown-menu-items">
                {Object.keys(lngs).map((lng) => (
                    <Dropdown.Item key={lng} onClick={() => handleSelect(lng)}>
                        {lngs[lng].nativeName}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default LanguageDropDown;
