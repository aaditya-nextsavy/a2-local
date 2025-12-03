import Footer from '@/common/modules/Footer/Footer';
import HeaderBlack from '@/common/modules/Header/HeaderBlack';
import MetaInfo from '@/common/modules/MetaInfo/MetaInfo';
import ThankyouBlock from '@/common/modules/Thankyou/ThankyouBlock';
import { fetchCategory, fetchContactData, fetchLocations, fetchMetaInfoDetails, fetchPopulerTours } from '@/pages/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Index = ({ selectedLanguageCode, locationInfo, categoryInfo, contactDataInfo, populerTourInfo, metaDataInfo }) => {
  const router = useRouter();
  // const selectedLanguageCode = router.locale || 'en';


  const [loader, setLoader] = useState(false); // Define loader in the state
  useEffect(() => {
    // console.log("metaDataInfo", metaDataInfo)
    setTimeout(() => {
      setLoader(true)
    }, 1000);
  }, [metaDataInfo])

  let canonicalPageURL
  if (selectedLanguageCode === 'ar') {
    canonicalPageURL = `/ar/make-a-tour/thank-you`
  } else {
    canonicalPageURL = `/make-a-tour/thank-you`
  }


  return (
    <>
      <MetaInfo metainfo={metaDataInfo} seoCanonical={canonicalPageURL} />
      <HeaderBlack populerTourData={populerTourInfo} categoryData={categoryInfo} />
      {loader ?
        <>
          {/* <MetaInfo metainfo={metaDataInfo} /> */}
          <ThankyouBlock />
          <Footer
            locationInfo={locationInfo}
            categoryInfo={categoryInfo}
            contactDataInfo={contactDataInfo}
            selectedLanguageCode={selectedLanguageCode}
          />
        </>
        : ''}
    </>
  );
}

export const getServerSideProps = async ({ locale }) => {
  const selectedLanguageCode = locale || 'en';
  let userAgent = 'userAgent';
  let deviceId = 'deviceId';
  let slug = "thank-you";

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


export default Index;
