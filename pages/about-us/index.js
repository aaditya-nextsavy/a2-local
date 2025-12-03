import React, { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import SubPageHeader from '@/common/modules/SubPageHeaders/SubPageHeader';
import FullScreenLoader from '@/common/modules/FullScreenLoader/FullScreenLoader';
import { fetchCategory, fetchContactData, fetchLocations, fetchMetaInfoDetails, fetchPopulerTours } from '../api';
import Image from 'next/image';
import ThankyouBlock from '@/common/modules/Thankyou/ThankyouBlock';
import Footer from '@/common/modules/Footer/Footer';
import MetaInfo from '@/common/modules/MetaInfo/MetaInfo';

function AboutUs({ selectedLanguageCode, locationInfo, categoryInfo, contactDataInfo, populerTourInfo, metaDataInfo }) {
    const { t } = useTranslation();
    const titleHeaderMain = `${t('aboutUs.title')}`
    const titleCustomBtn = <Trans i18nKey="common.makeATour"></Trans>
    const titleHeaderSub = <Trans i18nKey="Header.item4"></Trans>
    const customTourTitleSub = <Trans i18nKey="common.customTourTitle"></Trans>
    const customTourTitleDesc = <Trans i18nKey="common.customTourSubTitle"></Trans>
    const [fullScreenLoader, setFullScreenLoader] = useState(true)
    const [isClient, setIsClient] = useState(false)

    let canonicalPageURL
    let schema
    console.log("contactDataInfo", contactDataInfo[0]);
    if (selectedLanguageCode === "ar") {
        canonicalPageURL = '/ar/about-us'
        schema = {
            "@context": "http://schema.org",
            "@type": "Organization",
            "name": "آثار العربية",
            "url": "https://www.athaararabia.com",
            "sameAs": [
                "https://www.linkedin.com/company/athaararabia",
                "https://www.instagram.com/athaararabia/",
                "https://twitter.com/athaararabia"
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": [`${contactDataInfo[0].mobile_number}`, `${contactDataInfo[0].phone_number}`],
                "email": `${contactDataInfo[0].email_address}`,
                "contactType": "Customer Service"
            },
            "description": "آثار العربية شركة تنظيم رحلات سياحية داخلية منذ عشرين عاما في المملكة العربية السعودية نفخر بتقديم خدمات السفر والسياحة داخل المملكة مثل السياحة التاريخية والثقافية والترفيهية، المعارض والمؤتمرات وسياحة المغامرات ،خدمات رجال الأعمال، طائرات خاصة ، رحلات بحرية كالغوص ، بالإضافة الى خدمات العمرة. مع افتتاح السياحة في المملكة العربية السعودية للسياح من دول العالم وفق رؤية المملكة 2030 كانت آثار العربية من أولى الشركات الرائدة في تسويق وتنظيم الرحلات داخل المملكة معتمدة على كادر من الموظفين الأكفاء ذوو خبرة في صناعة السياحة ،نفخر بان موظفينا يتكلمون العربية والانجليزية الروسية والألمانية واليابانية والأسبانية والأيطالية . ومستعدون دائما للاستجابة لجميع الاستفسارات",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "طريق الملك فهد, حي المؤتمرات",
                "addressLocality": "الرياض",
                "addressRegion": "الرياض",
                "postalCode": "12711",
                "addressCountry": "المملكة العربية السعودية"
            }
        }
    } else {
        canonicalPageURL = '/about-us'
        schema = {
            "@context": "http://schema.org",
            "@type": "Organization",
            "name": "Athaar Arabia",
            "url": "https://www.athaararabia.com",
            "sameAs": [
                "https://www.linkedin.com/company/athaararabia",
                "https://www.instagram.com/athaararabia/",
                "https://twitter.com/athaararabia"
            ],
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": [`${contactDataInfo[0].mobile_number}`, `${contactDataInfo[0].phone_number}`],
                "email": `${contactDataInfo[0].email_address}`,
                "contactType": "Customer Service"
            },
            "description": "Athaar Arabia for twenty years is one of the pioneers DMCs of the Kingdom of Saudi Arabia. Being the most experienced DMC, we have the privilege of providing all kinds of tourism-related services like Historical, Cultural, Adventure, Umra Plus, Incentives, Recreational as well as Ecotourism. Simultaneously, we also arrange business meetings, Conferences and Entertainment events as per the requests of our valued local and international partners. With the opening of borders by our honorable Government for international tourists under new Vision 2030, we Athaar Arabia accepted the challenge and successfully prepared ourselves to provide high standards of services to the enthusiasts who are ambitious to enjoy our Discover Saudi Arabia programs with new look of UNESCO heritage sites.",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "King Fahd Rd, Al Mutamarat",
                "addressLocality": "Riyadh",
                "addressRegion": "Riyadh",
                "postalCode": "12711",
                "addressCountry": "Saudi Arabia"
            }
        }
    }

    useEffect(() => {
        setIsClient(true)
        setTimeout(() => {
            setFullScreenLoader(false)
        }, 1000);
    }, [selectedLanguageCode])

    return (
        <>
            <MetaInfo metainfo={metaDataInfo} seoSchema={schema} seoCanonical={canonicalPageURL} />
            {isClient ?
                <>
                    {fullScreenLoader ? <FullScreenLoader /> : ''}
                    <div className="about-us-wrapper">
                        <SubPageHeader
                            TitleSub={titleHeaderSub}
                            TitleMain={titleHeaderMain}
                            CustomToursTitleSub={customTourTitleSub}
                            CustomToursTitleDesc={customTourTitleDesc}
                            CustomToursBtn={titleCustomBtn}
                            BtnLinkTo="/make-a-tour"
                            addClassName="about-us-header"
                            locationData={locationInfo}
                            categoryData={categoryInfo}
                            populerTourData={populerTourInfo}
                            suppressHydrationWarning={true}
                        />
                        <div className="about-is-content withwhitebg">
                            <div className="container">
                                <div className="about-us-part-one">
                                    <div className="row align-items-center">
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                            <div className='SectionTitle'>
                                                <h5><Trans i18nKey="aboutUs.companyProfile"></Trans></h5>
                                                <h2><Trans i18nKey="aboutUs.whatIsAthaar"></Trans></h2>
                                            </div>
                                            <div className="about-us-description about-us-part-one-description">
                                                <p><Trans i18nKey="aboutUs.whatIsAthaarPara1"></Trans></p>
                                                <p><Trans i18nKey="aboutUs.whatIsAthaarPara2"></Trans></p>
                                                <p className='whatisathaar-para'><Trans i18nKey="aboutUs.whatIsAthaarPara3"></Trans></p>
                                                <p><Trans i18nKey="aboutUs.whatIsAthaarPara4"></Trans></p>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                            <div className="about-us-img about-us-part-one-img">
                                                <Image quality={75} width={400} height={500} src="/assets/images/about-us-img-1.jpg" alt="about-us-img-people.png" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="about-us-part-two">
                                    <div className="row flex-column-reverse flex-lg-row align-items-center">
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                            <div className='about-us-img about-us-part-two-img'>
                                                <Image quality={75} width={400} height={500} src="/assets/images/about-us-img-2.jpg" alt="about-us-img-people.png" />
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                            <div className='about-us-description about-us-part-two-description'>
                                                <div className='SectionTitle'>
                                                    <h5><Trans i18nKey="common.missionValues"></Trans></h5>
                                                    <h2><Trans i18nKey="aboutUs.whatAthaarWantsToDeliver"></Trans></h2>
                                                </div>
                                                <ul className='about-us-page-list-two p-0'>
                                                    <li><Trans i18nKey="aboutUs.whatAthaarWantsToDeliverPoint1"></Trans></li>
                                                    <li><Trans i18nKey="aboutUs.whatAthaarWantsToDeliverPoint2"></Trans></li>
                                                    <li><Trans i18nKey="aboutUs.whatAthaarWantsToDeliverPoint3"></Trans></li>
                                                    <li><Trans i18nKey="aboutUs.whatAthaarWantsToDeliverPoint4"></Trans></li>
                                                    <li><Trans i18nKey="aboutUs.whatAthaarWantsToDeliverPoint5"></Trans></li>
                                                    <li><Trans i18nKey="aboutUs.whatAthaarWantsToDeliverPoint6"></Trans></li>
                                                    <li><Trans i18nKey="aboutUs.whatAthaarWantsToDeliverPoint7"></Trans></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="about-us-special-message-wrapper text-center">
                                <div className="container">
                                    <div className="SectionTitle">
                                        <h5><Trans i18nKey="common.messageFromCeo"></Trans></h5>
                                    </div>
                                    <div className="message-content">
                                        <p><Trans i18nKey="aboutUs.specialMessagePara1"></Trans></p>
                                        <p><Trans i18nKey="aboutUs.specialMessagePara2"></Trans></p>
                                        <p><Trans i18nKey="aboutUs.specialMessagePara3"></Trans></p>
                                    </div>
                                    <div className="about-us-special-message-title">

                                        <div className="about-us-special-message-ceo-info">
                                            <h5><Trans i18nKey="aboutUs.ceoName"></Trans></h5>
                                            <p><Trans i18nKey="aboutUs.designationCEO"></Trans></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="about-us-counter-box-wrapper">
                                    <div className="about-us-counter-box">
                                        <div className="row">
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                <h2>1200+</h2>
                                                <p><Trans i18nKey="aboutUs.tourDone"></Trans></p>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                <h2>80+</h2>
                                                <p><Trans i18nKey="aboutUs.yearlyTours"></Trans></p>
                                            </div>
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                                                <h2>14400+</h2>
                                                <p><Trans i18nKey="aboutUs.happyClients"></Trans></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="about-us-part-three">
                                    <div className="row align-items-center">
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                            <div className='SectionTitle'>
                                                <h5><Trans i18nKey="aboutUs.ourServices"></Trans></h5>
                                                <h2><Trans i18nKey="aboutUs.whatWeProvide"></Trans></h2>
                                            </div>
                                            <div className="about-us-description about-us-part-three-description">
                                                <h6><Trans i18nKey="aboutUs.whatWeProvideSub"></Trans></h6>
                                                <ul className='about-us-page-list-two p-0'>
                                                    <li><Trans i18nKey="aboutUs.whatWeProvidePoint1"></Trans></li>
                                                    <li><Trans i18nKey="aboutUs.whatWeProvidePoint2"></Trans></li>
                                                    <li><Trans i18nKey="aboutUs.whatWeProvidePoint3"></Trans></li>
                                                    <li><Trans i18nKey="aboutUs.whatWeProvidePoint4"></Trans></li>
                                                    <li><Trans i18nKey="aboutUs.whatWeProvidePoint5"></Trans></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                            <div className="about-us-img about-us-part-three-img">
                                                <Image src="/assets/images/about-us-img-3.png" alt="about-us-img-people.png" quality={75} width={400} height={500}   />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ThankyouBlock />
                        </div>
                        <Footer locationInfo={locationInfo} categoryInfo={categoryInfo} contactDataInfo={contactDataInfo} selectedLanguageCode={selectedLanguageCode} />
                    </div>

                </>
                : ''}
        </>
    )
}
export const getServerSideProps = async ({ locale }) => {
    const selectedLanguageCode = locale || 'en';
    let userAgent = 'userAgent';
    let deviceId = 'deviceId';
    let slug = "about-us"

    try {
        const locations = await fetchLocations({ selectedLanguageCode, userAgent, deviceId });
        const categorys = await fetchCategory({ selectedLanguageCode, userAgent, deviceId });
        const contactData = await fetchContactData({ selectedLanguageCode, userAgent, deviceId });
        const populerTour = await fetchPopulerTours({ selectedLanguageCode, userAgent, deviceId });
        const metaData = await fetchMetaInfoDetails({ selectedLanguageCode, userAgent, deviceId, slug })
        return {
            props: {
                selectedLanguageCode,
                locationInfo: locations.data,
                categoryInfo: categorys.data,
                contactDataInfo: contactData,
                populerTourInfo: populerTour,
                metaDataInfo: metaData,
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
            }
        };
    }
}

export default AboutUs
