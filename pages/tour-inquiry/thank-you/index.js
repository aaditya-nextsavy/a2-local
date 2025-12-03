import Footer from '@/common/modules/Footer/Footer';
import HeaderBlack from '@/common/modules/Header/HeaderBlack';
import ThankyouBlock from '@/common/modules/Thankyou/ThankyouBlock';
import { fetchCategory, fetchContactData, fetchLocations, fetchPopulerTours } from '@/pages/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const Index = ({ locationInfo, categoryInfo, contactDataInfo, populerTourInfo }) => {
  const router = useRouter();
  const selectedLanguageCode = router.query.lang || 'en';


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

export const getServerSideProps = async ({ query }) => {
  const selectedLanguageCode = query.lang || 'en';
  let userAgent = 'userAgent';
  let deviceId = 'deviceId';

  try {
    const locations = await fetchLocations({ selectedLanguageCode, userAgent, deviceId });
    const categorys = await fetchCategory({ selectedLanguageCode, userAgent, deviceId });
    const contactData = await fetchContactData({ selectedLanguageCode, userAgent, deviceId });
    const populerTour = await fetchPopulerTours({ selectedLanguageCode, userAgent, deviceId });
    return {
      props: {
        selectedLanguageCode,
        locationInfo: locations.data,
        categoryInfo: categorys.data,
        contactDataInfo: contactData,
        populerTourInfo: populerTour,
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
      }
    };
  }
}


export default Index;
