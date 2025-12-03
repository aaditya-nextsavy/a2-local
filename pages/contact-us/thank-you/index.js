import Footer from '@/common/modules/Footer/Footer';
import HeaderBlack from '@/common/modules/Header/HeaderBlack';
import MetaInfo from '@/common/modules/MetaInfo/MetaInfo';
import ThankyouBlock from '@/common/modules/Thankyou/ThankyouBlock';
import { fetchCategory, fetchContactData, fetchLocations, fetchMetaInfoDetails, fetchPopulerTours } from '@/pages/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Index = ({ selectedLanguageCode, locationInfo, categoryInfo, contactDataInfo, populerTourInfo, metaDataInfo }) => {
  const router = useRouter();
  // const selectedLanguageCode = router.query.lang || 'en';


  const [loader, setLoader] = useState(false); // Define loader in the state
  useEffect(() => {
    setTimeout(() => {
      setLoader(true)
    }, 1000);
  }, [])


  // const FetchData = async () => {
  //   let userAgent = 'userAgent'; // Define userAgent
  //   let deviceId = 'deviceId';   // Define deviceId

  //   try {
  //     const locations = await fetchLocations({ selectedLanguageCode, userAgent, deviceId });
  //     const categories = await fetchCategory({ selectedLanguageCode, userAgent, deviceId });
  //     const contactData = await fetchContactData({ selectedLanguageCode, userAgent, deviceId });

  //     setLocationInfo(locations.data);
  //     setCategoryInfo(categories.data);
  //     setContactDataInfo(contactData);
  //     setLoader(false);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     setLoader(false); // Make sure to set loader to false in case of an error
  //   }
  // };

  // useEffect(() => {
  //   FetchData();
  // }, [selectedLanguageCode]); // Include actual dependencies

  return (
    <>{loader ?
      <>
        <MetaInfo metainfo={metaDataInfo} />
        <HeaderBlack populerTourData={populerTourInfo} categoryData={categoryInfo} />
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
  let slug = "thank-you"

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
        selectedLanguageCode,
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
