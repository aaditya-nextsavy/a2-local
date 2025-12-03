import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import i18n from 'i18next';
import ThankyouBlock from '@/common/modules/Thankyou/ThankyouBlock';
import Footer from '@/common/modules/Footer/Footer';
import SubPageHeader from '@/common/modules/SubPageHeaders/SubPageHeader';
import FullScreenLoader from '@/common/modules/FullScreenLoader/FullScreenLoader';
import MetaInfo from '@/common/modules/MetaInfo/MetaInfo';
import { fetchCategory, fetchContactData, fetchLocations, fetchMetaInfoDetails, fetchPopulerTours, fetchTermsOfUseDetails } from '../api';
import { useRouter } from 'next/router';


const PrivacyPolicy = ({ locationInfo, categoryInfo, contactDataInfo, populerTourInfo, metaDataInfo, termsDataInfo }) => {
    const [policyData, setPolicyData] = useState([]);
    const [fullScreenLoader, setFullScreenLoader] = useState(true)
    const router = useRouter();
    const selectedLanguageCode = router.locale || 'en';

    useEffect(() => {
        setPolicyData(termsDataInfo.data.text)
        setTimeout(() => {
            setFullScreenLoader(false)
        }, 800);
    }, [selectedLanguageCode, termsDataInfo]);

    let schema
    let canonicalPageURL


    if (selectedLanguageCode === 'ar') {
        canonicalPageURL = '/ar/privacy-policy'
        schema = {
            "@context": "http://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy",
            "description": metaDataInfo.meta_description,
            "url": "https://athaararabia.com/ar/privacy-policy",
        }
    } else {
        canonicalPageURL = '/privacy-policy'
        schema = {
            "@context": "http://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy",
            "description": metaDataInfo.meta_description,
            "url": "https://athaararabia.com/privacy-policy",
        }
    }


    return (
        <div className='faqs-wrapper'>
            <MetaInfo metainfo={metaDataInfo} seoSchema={schema} seoCanonical={canonicalPageURL} />
            {fullScreenLoader ? <FullScreenLoader /> :
                <>
                    <SubPageHeader
                        TitleSub={i18n.t('common.privacyPolicy')}
                        TitleMain={i18n.t('privacyPolicy.headerTitle')}
                        CustomToursTitleSub={i18n.t('common.customTourTitle')}
                        CustomToursTitleDesc={i18n.t('common.customTourSubTitle')}
                        CustomToursBtn={i18n.t('common.makeATour')}
                        BtnLinkTo="/make-a-tour"
                        addClassName="faqs-header"
                        locationData={locationInfo}
                        categoryData={categoryInfo}
                        populerTourData={populerTourInfo}
                    />

                    <div className="faq-content-wrapper pricavy-policy-page">
                        <div className="container">
                            <div className="faq-accordion-all-wrapper pricavy-policy-wrapper pb-4" dangerouslySetInnerHTML={{ __html: policyData }}>

                                {/* Add your policyData rendering logic here */}

                            </div>
                        </div>
                    </div>
                    <ThankyouBlock />
                    <Footer
                        locationInfo={locationInfo}
                        categoryInfo={categoryInfo}
                        contactDataInfo={contactDataInfo}
                        selectedLanguageCode={selectedLanguageCode}
                    />
                </>}
        </div>
    );
};


export const getServerSideProps = async ({ locale }) => {
    const selectedLanguageCode = locale || 'en';
    let userAgent = 'userAgent';
    let deviceId = 'deviceId';
    let slug = "privacy-policy";

    try {
        const locations = await fetchLocations({ selectedLanguageCode, userAgent, deviceId });
        const categorys = await fetchCategory({ selectedLanguageCode, userAgent, deviceId });
        const contactData = await fetchContactData({ selectedLanguageCode, userAgent, deviceId });
        const populerTour = await fetchPopulerTours({ selectedLanguageCode, userAgent, deviceId });
        const metaData = await fetchMetaInfoDetails({ selectedLanguageCode, userAgent, deviceId, slug })
        const termsData = await fetchTermsOfUseDetails({ selectedLanguageCode, userAgent, deviceId })
        return {
            props: {
                selectedLanguageCode,
                locationInfo: locations.data,
                categoryInfo: categorys.data,
                contactDataInfo: contactData,
                populerTourInfo: populerTour,
                metaDataInfo: metaData,
                termsDataInfo: termsData,
            }
        };
    } catch (error) {
        console.error('Error in getServerSideProps:', error);
        return {
            props: {
                locationInfo: null, // Handle the error by setting locationInfo to null or an appropriate value
                categoryInfo: null,
                contactDataInfo: null,
                populerTourInfo: null,
                metaDataInfo: null,
                termsDataInfo: null,
            }
        };
    }
}

export default PrivacyPolicy;
