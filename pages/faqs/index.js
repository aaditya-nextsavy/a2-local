import React, { useEffect, useState } from 'react';
import { Trans } from 'react-i18next';
import i18n from 'i18next';
import ThankyouBlock from '@/common/modules/Thankyou/ThankyouBlock';
import Footer from '@/common/modules/Footer/Footer';
import SubPageHeader from '@/common/modules/SubPageHeaders/SubPageHeader';
import FullScreenLoader from '@/common/modules/FullScreenLoader/FullScreenLoader';
import MetaInfo from '@/common/modules/MetaInfo/MetaInfo';
import { fetchCategory, fetchContactData, fetchLocations, fetchMetaInfoDetails, fetchPopulerTours, fetchfaqsDetails } from '../api';
import { useRouter } from 'next/router';


const PrivacyPolicy = ({ locationInfo, categoryInfo, contactDataInfo, populerTourInfo, metaDataInfo, faqsDataInfo }) => {
    const [fullScreenLoader, setFullScreenLoader] = useState(true)
    const router = useRouter();
    const selectedLanguageCode = router.locale || 'en';
    const [faqCategories, setFaqCategories] = useState([]);
    let language_code = selectedLanguageCode
    let faqsForSchema = faqsDataInfo[0].faqs
    useEffect(() => {
        console.log("faqsForSchema", faqsForSchema)
        setTimeout(() => {
            setFullScreenLoader(false)
            setFaqCategories(faqsDataInfo)
        }, 800);
    }, [language_code, faqsDataInfo]);

    // Initialize the open state for each FAQ item
    const [faqOpenStates, setFaqOpenStates] = useState({});

    // Function to toggle the open state of a FAQ item
    const toggleFaqOpenState = (categoryId, faqId) => {
        // console.log("test faqs")
        // setFaqOpenStates(prevOpenStates => ({
        //     ...prevOpenStates,
        //     [`${categoryId}_${faqId}`]: !prevOpenStates[`${categoryId}_${faqId}`]
        // }));
    };

    const generateFaqSchema = (faqData, locale) => {
        const languageMap = {
            en: 'content_en',
            ar: 'content_ar',
            // ja: 'content_ja',
            // it: 'content_it',
        };

        const titleMap = {
            en: 'title_en',
            ar: 'title_ar',
            // ja: 'title_ja',
            // it: 'title_it',
        };

        const contentKey = languageMap[locale];
        const titleKey = titleMap[locale];

        const mainEntity = faqData.flatMap(category =>
            category.faqs.map(faq => ({
                "@type": "Question",
                "name": faq[titleKey],
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq[contentKey]
                }
            }))
        );

        return {
            "@context": "http://schema.org",
            "@type": "FAQPage",
            "mainEntity": mainEntity
        };
    };

    const faqSchema = generateFaqSchema(faqsDataInfo, language_code);

    let schema = faqSchema
    let canonicalPageURL

    if (selectedLanguageCode === 'ar') {
        canonicalPageURL = '/ar/faqs'
    } else {
        canonicalPageURL = '/faqs'
    }

    return (
        <div className='faqs-wrapper'>
            <MetaInfo metainfo={metaDataInfo} seoSchema={schema} seoCanonical={canonicalPageURL} />
            {fullScreenLoader ? <FullScreenLoader /> :
                <>
                    <SubPageHeader
                        TitleSub={i18n.t('faqs.title')}
                        TitleMain={i18n.t('faqs.headerTitle')}
                        CustomToursTitleSub={i18n.t('common.customTourTitle')}
                        CustomToursTitleDesc={i18n.t('common.customTourSubTitle')}
                        CustomToursBtn={i18n.t('common.makeATour')}
                        BtnLinkTo="/make-a-tour"
                        addClassName="faqs-header"
                        locationData={locationInfo}
                        categoryData={categoryInfo}
                        populerTourData={populerTourInfo}
                    />


                    <div className="faq-content-wrapper">
                        <div className="container">
                            <div className="faq-accordion-all-wrapper">
                                {!faqCategories ? (
                                    ''
                                ) : (
                                    faqCategories.map(category => (
                                        category.faqs.length > 0 && (
                                            <div key={category.id} className="faq-category-accordion-wrapper faq-bottom-padding">
                                                <div className='SectionTitle'>
                                                    <h5>{category[`title_${language_code}`]}</h5>
                                                </div>
                                                <div className="accordion" id={`faqAccordion_${category.id}`}>
                                                    {category.faqs.map(faq => (
                                                        <div key={faq.id} className="accordion-item faq-accordion-item">
                                                            <div className={`accordion-header faq-accordion-header ${faqOpenStates[`${category.id}_${faq.id}`] ? '' : 'collapsed'}`}>
                                                                <button className={`faq-accordion-button ${faqOpenStates[`${category.id}_${faq.id}`] ? 'active' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target={`#faq_${category.id}_${faq.id}`} aria-expanded={faqOpenStates[`${category.id}_${faq.id}`]} onClick={() => toggleFaqOpenState(category.id, faq.id)}>
                                                                    {faq[`title_${language_code}`]}
                                                                </button>
                                                            </div>
                                                            <div id={`faq_${category.id}_${faq.id}`} className={`accordion-collapse collapse ${faqOpenStates[`${category.id}_${faq.id}`] ? 'show' : ''}`}>
                                                                <div className="accordion-body faq-accordion-body">
                                                                    {faq[`content_${language_code}`]}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    ))
                                )}
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
    let slug = "faqs-page";

    try {
        const locations = await fetchLocations({ selectedLanguageCode, userAgent, deviceId });
        const categorys = await fetchCategory({ selectedLanguageCode, userAgent, deviceId });
        const contactData = await fetchContactData({ selectedLanguageCode, userAgent, deviceId });
        const populerTour = await fetchPopulerTours({ selectedLanguageCode, userAgent, deviceId });
        const metaData = await fetchMetaInfoDetails({ selectedLanguageCode, userAgent, deviceId, slug })
        const faqsData = await fetchfaqsDetails({ userAgent, deviceId })
        return {
            props: {
                selectedLanguageCode,
                locationInfo: locations.data,
                categoryInfo: categorys.data,
                contactDataInfo: contactData,
                populerTourInfo: populerTour,
                metaDataInfo: metaData,
                faqsDataInfo: faqsData,
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
                faqsDataInfo: null,
            }
        };
    }
}

export default PrivacyPolicy;
