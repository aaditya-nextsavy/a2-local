import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MetaInfo from '@/common/modules/MetaInfo/MetaInfo';
import FullScreenLoader from '@/common/modules/FullScreenLoader/FullScreenLoader';
import Header from '@/common/modules/Header/Header';
import MainBanner from '@/common/modules/Homepage/Components/MainBanner';
import Link from 'next/link';
import PopulerTourSlider from '@/common/modules/Homepage/Components/PopulerTourSlider';
import BannerBigHorizontal from '@/common/modules/Banner/BannerBigHorizontal';
import CategoriesSliderMain from '@/common/modules/CategorySlider/CategoriesSliderMain';
import ExploreSlider from '@/common/modules/explorelocSlider/ExploreSlider';
import FeatureSection from '@/common/modules/Homepage/Components/FeatureSection';
import TestimonialMap from '@/common/modules/Homepage/Components/TestimonialMap';
import OurPartners from '@/common/modules/OurPartners/OurPartners';
import TrendingBlogs from '@/common/modules/TrendingBlogs/TrendingBlogs';
import Footer from '@/common/modules/Footer/Footer';
import BannerBigVerticalLitePurple from '@/common/modules/Banner/BannerBigVerticalLitePurple';
import BannerBigVerticalPink from '@/common/modules/Banner/BannerBigVerticalPink';
import BannerBigVerticalLitePurpleTwo from '@/common/modules/Banner/BannerBigVerticalLitePurpleTwo';
import {
  fetchLocations,
  fetchCategory,
  fetchPopulerTours,
  fetchContactData,
  fetchtestimonialData,
  fetchBlogsData,
  fetchBannersData,
  fetchMetaInfoDetails
} from '@/pages/api/index';

function Home({ selectedLanguageCode, locationInfo, categoryInfo, populerTourInfo, contactDataInfo, trendingBlogsInfo, metaDataInfo,localeData }) {
  const { t, i18n } = useTranslation();
  const [testimonialsInfo, setTestimonialsInfo] = useState([]);
  const [banners, setBanners] = useState([]);
  const [showSSR, setShowSSR] = useState(false);

  let canonicalPageURL
  let schema
  if (selectedLanguageCode === "ar") {
    canonicalPageURL = '/ar'
    schema = {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "name": "آثار العربية",
      "url": "https://www.athaararabia.com",
      "description": ` آثار العربية شركة تنظيم رحلات سياحية داخلية منذ عشرين عاما في المملكة العربية السعودية نفخر بتقديم خدمات السفر والسياحة داخل المملكة مثل السياحة التاريخية والثقافية والترفيهية، المعارض والمؤتمرات وسياحة المغامرات ،خدمات رجال الأعمال، طائرات خاصة ، رحلات بحرية كالغوص ، بالإضافة الى خدمات العمرة. مع افتتاح السياحة في المملكة العربية السعودية للسياح من دول العالم وفق رؤية المملكة 2030 كانت آثار العربية من أولى الشركات الرائدة في تسويق وتنظيم الرحلات داخل المملكة معتمدة على كادر من الموظفين الأكفاء ذوو خبرة في صناعة السياحة ،نفخر بان موظفينا يتكلمون العربية والانجليزية الروسية والألمانية واليابانية والأسبانية والأيطالية . ومستعدون دائما للاستجابة لجميع الاستفسارات`,
    };
  } else {
    canonicalPageURL = '/'
    schema = {
      "@context": "http://schema.org",
      "@type": "WebSite",
      "name": "Athaar Arabia",
      "url": "https://www.athaararabia.com",
      "description": `Athaar Arabia for twenty years is one of the pioneers DMCs of the Kingdom of Saudi Arabia. Being the most experienced DMC, we have the privilege of providing all kinds of tourism-related services like Historical, Cultural, Adventure, Umra Plus, Incentives, Recreational as well as Ecotourism. Simultaneously, we also arrange business meetings, Conferences and Entertainment events as per the requests of our valued local and international partners. With the opening of borders by our honorable Government for international tourists under new Vision 2030, we Athaar Arabia accepted the challenge and successfully prepared ourselves to provide high standards of services to the enthusiasts who are ambitious to enjoy our Discover Saudi Arabia programs with new look of UNESCO heritage sites.`,
    };
  }

  const targetPopulerTour = useRef(null);
  const handleClick = (event) => {
    event.preventDefault();
    if (targetPopulerTour.current) {
      targetPopulerTour.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    console.log("localeData", localeData);
    const fetchData = async () => {
      try {
        const [testimonialData, bannerData] = await Promise.all([
          fetchtestimonialData({ selectedLanguageCode }),
          fetchBannersData({ selectedLanguageCode })
        ]);

        const banners = bannerData.data.reduce((acc, banner) => {
          acc[banner.id] = banner;
          return acc;
        }, {});

        setTestimonialsInfo(testimonialData);
        setBanners(banners);
        setShowSSR(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
setTimeout(() => {
    fetchData();
}, 2000);
  
  }, [selectedLanguageCode]);

  // if (!selectedLanguageCode || !locationInfo || !categoryInfo || !populerTourInfo || !contactDataInfo || !trendingBlogsInfo || !metaDataInfo) {
  //   return <FullScreenLoader />;
  // }

  return (
    <div className='home-page-main-wrapper'>
      {/* <p>{showSSR ? `${t('common.location')}` : 'Loading...'}</p> */}
      <MetaInfo metainfo={metaDataInfo} seoSchema={schema} seoCanonical={canonicalPageURL} />
      {
        selectedLanguageCode === 'ar' ?
          <>
            {
              showSSR ?
                <>
                  <Header populerTourData={populerTourInfo} categoryData={categoryInfo} />
                  <div className='BannerSection BackgroundClrPrimary'>
                    <MainBanner key={146} scrollToDown={[<Link key={147} href="/" className='nounderline arrow-content' onClick={handleClick} style={{ width: "40px", }}>
                      <div className='scroll'>
                        <div className='scroll-arrows'>
                          <span className="down-arrow-1"></span>
                          <span className="down-arrow-2"></span>
                        </div>
                      </div>
                    </Link>]} />
                  </div>
                  <div className='BackgroundClrPrimary' ref={targetPopulerTour}>
                    {populerTourInfo && <PopulerTourSlider list={populerTourInfo} selectedLanguageCode={selectedLanguageCode} />}
                    <BannerBigHorizontal frontPageHorizontal={banners[1]} />
                    <CategoriesSliderMain categoryInfo={categoryInfo} />
                    {/* <div className="container">
                      <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 col-sm-12 my-3">
                          <BannerBigVerticalLitePurple bigVerticalLitePurple={banners[2]} />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 my-3">
                          <BannerBigVerticalPink bigVerticalPink={banners[3]} />
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 my-3">
                          <BannerBigVerticalLitePurpleTwo bigVerticalLitePurpleTwo={banners[4]} />
                        </div>
                      </div>
                    </div> */}
                    <ExploreSlider locationData={locationInfo} />
                    <FeatureSection />
                  </div>
                  <OurPartners />
                  {/* {testimonialsInfo && <TestimonialMap testimonialsInfo={testimonialsInfo} />} */}
                  <div className='BackgroundClrPrimary'>
                    {/* <TrendingBlogs trendingBlogsInfo={trendingBlogsInfo} /> */}
                  </div>
                  <Footer locationInfo={locationInfo} categoryInfo={categoryInfo} contactDataInfo={contactDataInfo} selectedLanguageCode={selectedLanguageCode} />
                </>
                : <FullScreenLoader />
            }
          </>
          :
          <>
            <Header populerTourData={populerTourInfo} categoryData={categoryInfo} />
            <div className='BannerSection BackgroundClrPrimary'>
              <MainBanner key={146} scrollToDown={[<Link key={147} href="/" className='nounderline arrow-content' onClick={handleClick} style={{ width: "40px", }}>
                <div className='scroll'>
                  <div className='scroll-arrows'>
                    <span className="down-arrow-1"></span>
                    <span className="down-arrow-2"></span>
                  </div>
                </div>
              </Link>]} />
            </div>
            <div className='BackgroundClrPrimary' ref={targetPopulerTour}>
              {populerTourInfo && <PopulerTourSlider list={populerTourInfo} selectedLanguageCode={selectedLanguageCode} />}
              <BannerBigHorizontal frontPageHorizontal={banners[1]} />
              <CategoriesSliderMain categoryInfo={categoryInfo} />
              {/* <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-4 col-md-6 col-sm-12 my-3">
                    <BannerBigVerticalLitePurple bigVerticalLitePurple={banners[2]} />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 my-3">
                    <BannerBigVerticalPink bigVerticalPink={banners[3]} />
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12 my-3">
                    <BannerBigVerticalLitePurpleTwo bigVerticalLitePurpleTwo={banners[4]} />
                  </div>
                </div>
              </div> */}
              <ExploreSlider locationData={locationInfo} />
              <FeatureSection />
            </div>
            <OurPartners />
            {/* {testimonialsInfo && <TestimonialMap testimonialsInfo={testimonialsInfo} />} */}
            <div className='BackgroundClrPrimary'>
              {/* <TrendingBlogs trendingBlogsInfo={trendingBlogsInfo} /> */}
            </div>
            <Footer locationInfo={locationInfo} categoryInfo={categoryInfo} contactDataInfo={contactDataInfo} selectedLanguageCode={selectedLanguageCode} />
          </>
      }
    </div >
  );
}

export const getServerSideProps = async ({ locale }) => {
  const selectedLanguageCode = 'en';
  const userAgent = 'userAgent';
  const deviceId = 'deviceId';
  const slug = 'home-page';

  try {
    const [locations, categories, populerTours, contactData, trendingBlogs, metaData] = await Promise.all([
      fetchLocations({ selectedLanguageCode, userAgent, deviceId }),
      fetchCategory({ selectedLanguageCode, userAgent, deviceId }),
      fetchPopulerTours({ selectedLanguageCode, userAgent, deviceId }),
      fetchContactData({ selectedLanguageCode, userAgent, deviceId }),
      fetchBlogsData({ selectedLanguageCode, userAgent, deviceId }),
      fetchMetaInfoDetails({ selectedLanguageCode, userAgent, deviceId, slug })
    ]);

    return {
      props: {
        selectedLanguageCode,
        locationInfo: locations.data,
        categoryInfo: categories.data,
        populerTourInfo: populerTours,
        contactDataInfo: contactData,
        trendingBlogsInfo: trendingBlogs,
        metaDataInfo: metaData,
        localeData:locale,

      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        locationInfo: null,
        categoryInfo: null,
        populerTourInfo: null,
        contactDataInfo: null,
        trendingBlogsInfo: null,
        metaDataInfo: null,
        localeData:locale,

      }
    };
  }
};

export default Home;
