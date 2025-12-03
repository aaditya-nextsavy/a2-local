import React, { useEffect, useState } from 'react';
import TourList from '@/common/modules/Tour/TourListing/TourList';
import MetaInfo from '@/common/modules/MetaInfo/MetaInfo';
import { fetchCategory, fetchContactData, fetchLocations, fetchMetaInfoDetails, fetchPopulerTours, fetchTourListDetails } from '../api';
import Head from 'next/head';

export async function getServerSideProps({ locale }) {
  const selectedLanguageCode = locale || 'en';
  const userAgent = 'userAgent'; // Replace with actual user agent
  const deviceId = 'deviceId'; // Replace with actual device ID
  const slug = "tours-list";
  

  try {
    const locations = await fetchLocations({ selectedLanguageCode, userAgent, deviceId });
    const categorys = await fetchCategory({ selectedLanguageCode, userAgent, deviceId });
    const populerTour = await fetchPopulerTours({ selectedLanguageCode, userAgent, deviceId });
    const contactData = await fetchContactData({ selectedLanguageCode, userAgent, deviceId });
    const metaData = await fetchMetaInfoDetails({ selectedLanguageCode, userAgent, deviceId, slug });
    const tourList = await fetchTourListDetails({ selectedLanguageCode, userAgent, deviceId });

    return {
      props: {
        selectedLanguageCode,
        tourListData: tourList,
        locations: locations.data,
        categorys: categorys.data,
        populerTour: populerTour,
        contactData: contactData,
        metaData: metaData,
        metaTitle: metaData.title,
        metaDescription: metaData.meta_description,
        metaKeyword: metaData.meta_keyword,
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        selectedLanguageCode,
        tourListData: [],
        locations: [],
        categorys: [],
        populerTour: [],
        contactData: [],
        metaData: [],
        metaTitle: [],
        metaDescription: [],
        metaKeyword: []
      }
    };
  }
}

export default function TourMain({ selectedLanguageCode, locations, categorys, tourListData, populerTour, contactData, metaData, metaTitle, metaDescription, metaKeyword }) {
  const [loading, setLoading] = useState(true);
  // const selectedLanguageCode = 'en'; // You may want to pass this from props if it's dynamic
  useEffect(() => {
    setLoading(false);
    // console.log("metaData", metaTitle, metaDescription, metaKeyword);
  }, [])

  // console.log("tourListData", tourListData)

  let schema
  let canonicalPageURL

  if (selectedLanguageCode === 'ar') {
    canonicalPageURL = `/ar/tours`
    schema = {
      "@context": "http://schema.org",
      "@type": "WebPage",
      "name": "Tour List",
      "description": metaData.meta_description,
      "url": "https://athaararabia.com/ar/tours"
    }

  } else {
    canonicalPageURL = `/tours`
    schema = {
      "@context": "http://schema.org",
      "@type": "WebPage",
      "name": "Tour List",
      "description": metaData.meta_description,
      "url": "https://athaararabia.com/tours"
    }


  }

  return (
    <div className="main-tour">
      <MetaInfo metainfo={metaData} seoSchema={schema} seoCanonical={canonicalPageURL} />
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeyword} />
        <link rel="canonical" href={`https://athaararabia.com/tours`} />
      </Head>
      {loading ? '' :
        <>
          {/* {metaData && <MetaInfo metainfo={metaData} />} */}
          {locations && categorys && contactData && populerTour ?
            <TourList populerTourInfo={populerTour} locationInfo={locations} categoryInfo={categorys} contactDataInfo={contactData} selectedLanguageCode={selectedLanguageCode} />
            : ''}
        </>
      }
    </div>
  );
}
