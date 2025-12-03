import Header from '@/common/modules/Header/Header';
import HeaderBlack from '@/common/modules/Header/HeaderBlack';
import MegaMenuLocations from '@/common/modules/Header/components/MegaMenuLocations';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useRouter } from 'next/router';
import Footer from '@/common/modules/Footer/Footer';
import { fetchCategory, fetchContactData, fetchLocations, fetchPopulerTours } from './api';
import FullScreenLoader from '@/common/modules/FullScreenLoader/FullScreenLoader';

const PageNotFound = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [locationInfo, setLocationInfo] = useState(null);
    const [categoryInfo, setCategoryInfo] = useState(null);
    const [contactDataInfo, setContactDataInfo] = useState(null);
    const [populerTourDataInfo, setPopulerTourDataInfo] = useState(null);
    const [isClinet, setIsClinets] = useState(false);
    const selectedLanguageCode = router.query.lang || 'en';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userAgent = 'userAgent';
                const deviceId = 'deviceId';

                const locations = await fetchLocations({ selectedLanguageCode, userAgent, deviceId });
                const categorys = await fetchCategory({ selectedLanguageCode, userAgent, deviceId });
                const contactData = await fetchContactData({ selectedLanguageCode, userAgent, deviceId });
                const populerTour = await fetchPopulerTours({ selectedLanguageCode, userAgent, deviceId });

                setLocationInfo(locations.data);
                setCategoryInfo(categorys.data);
                setContactDataInfo(contactData);
                setPopulerTourDataInfo(populerTour);
                setIsClinets(true);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle the error here, e.g., show an error message to the user.
            }
        };

        fetchData();

    }, [selectedLanguageCode]);


    if (!isClinet) {
        return (
            <div className="page-not-found-wrapper">
                <FullScreenLoader />
            </div>
        );
    }


    return (
        <>
            <Head>
                <title>{t('PageNotFound.metaTitle')}</title>
                <meta
                    name="description"
                    content={t('PageNotFound.metaDescription')}
                />
            </Head>
            <div className="page-not-found-wrapper">

                <HeaderBlack populerTourData={populerTourDataInfo} categoryData={categoryInfo} />
                <div className="page-not-found-content">
                    <div className="error-code-wrapper text-align-center">
                        <h1>404</h1>
                        <h2>{t('PageNotFound.NotFoundTitle')}</h2>
                        <p>{t('PageNotFound.NotFoundSubTitle')}</p>
                        <Link href="/" className='nounderline w-50'>
                            <button className='SecondaryButton'>{t('PageNotFound.HomeButton')}</button>
                        </Link>

                    </div>
                </div>

                <Footer locationInfo={locationInfo} categoryInfo={categoryInfo} contactDataInfo={contactDataInfo} selectedLanguageCode={selectedLanguageCode} />
            </div>
        </>
    );
};


export default PageNotFound;
