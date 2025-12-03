import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Trans } from "react-i18next";
import Head from "next/head";
import Footer from "@/common/modules/Footer/Footer";
import FullScreenLoader from "@/common/modules/FullScreenLoader/FullScreenLoader";
import SubPageHeaderTourDetails from "@/common/modules/SubPageHeaders/SubPageHeaderTourDetails";
import {
  fetchCategory,
  fetchContactData,
  fetchGalleryDetails,
  fetchItineraryDetails,
  fetchLocations,
  fetchPopulerTours,
  fetchRelatedTourDetails,
  fetchTourDetails,
} from "@/pages/api";
import FullScreenGalleryMain from "@/common/modules/Gallery/FullScreenGalleryMain";
import Itinerary from "@/common/modules/Tour/TourDetails/Components/Itinerary";
import IncExc from "@/common/modules/Tour/TourDetails/Components/IncExc";
import WhatToExpect from "@/common/modules/Tour/TourDetails/Components/WhatToExpect";
import Policies from "@/common/modules/Tour/TourDetails/Components/Policies";
import SliderRelated from "@/common/modules/RelatedSlider";

const TourDetails = ({
  selectedLanguageCode,
  tourId,
  tourSlug,
  tourdetailsInfo,
  locationInfo,
  categoryInfo,
  contactDataInfo,
  populerTourInfo,
  tourItineraryInfo,
  tourGalleryInfo,
  relatedToursData,
}) => {
  const router = useRouter();

  const [tourRelatedInfo, setTourRelatedInfo] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  // Handle route transitions with loader
  useEffect(() => {
    const handleStart = (url) => {
      if (url !== router.asPath) setPageLoading(true);
    };
    const handleComplete = () => setPageLoading(false);
    const handleError = () => setPageLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleError);
    };
  }, [router]);

  // Initialize related tours info
  useEffect(() => {
    if (relatedToursData) {
      setTourRelatedInfo(relatedToursData);
    } else {
      setTourRelatedInfo([]);
    }
    setHasMounted(true);
  }, [relatedToursData]);

  // Show loader during page change
  if (pageLoading || !hasMounted) {

    return (
      <>
        <FullScreenLoader />
        <Head>
          <title>{tourdetailsInfo?.meta_title || tourdetailsInfo?.title}</title>
          <meta
            name="description"
            content={
              tourdetailsInfo?.meta_description || tourdetailsInfo?.description
            }
          />
        </Head>
      </>
    );
  }

  const custombuttontourdetails = <Trans i18nKey="tourPage.bookNow" />;
  const breadcrumbHome = <Trans i18nKey="common.home" />;
  const BreadcrumbActive = <Trans i18nKey="common.tour" />;

  return (
    <>
      <Head>
        <title>{tourdetailsInfo.meta_title || tourdetailsInfo.title}</title>
        <meta
          name="description"
          content={
            tourdetailsInfo.meta_description || tourdetailsInfo.description
          }
        />
      </Head>
      <div className="tour-details-wrapper">
        <SubPageHeaderTourDetails
          BreadcrumbHome={breadcrumbHome}
          BreadcrumMiddle={BreadcrumbActive}
          BreadcrumMiddleLink="/tours"
          BreadcrumbActive={tourdetailsInfo.title}
          addClassName="tour-details-header"
          TitleMain={tourdetailsInfo.title}
          CustomToursBtn={custombuttontourdetails}
          BtnLinkTo={`/tour-inquiry/${tourId}/${tourSlug}`}
          Location={tourdetailsInfo.location}
          Days={tourdetailsInfo.days}
          Date={tourdetailsInfo.date}
          Price={tourdetailsInfo.price}
          locationData={locationInfo}
          categoryData={categoryInfo}
          populerTourData={populerTourInfo}
        />
        <div className="tour-info">
          {tourGalleryInfo && (
            <FullScreenGalleryMain
              TourId={tourId}
              tourGalleryInfo={tourGalleryInfo}
            />
          )}
          {tourItineraryInfo && (
            <Itinerary
              TourId={tourId}
              tourItineraryInfo={tourItineraryInfo}
              selectedLanguageCode={selectedLanguageCode}
            />
          )}
        </div>
        <div className="withwhitebg">
          <div className="container">
            {tourdetailsInfo.tours_payment_policy && (
              <Policies
                TourId={tourId}
                thePolicies={tourdetailsInfo.tours_payment_policy}
              />
            )}
            <IncExc
              TourId={tourId}
              inclution={tourdetailsInfo.inclusions}
              exclution={tourdetailsInfo.exclusions}
              selectedLanguageCode={selectedLanguageCode}
            />
            <WhatToExpect TourId={tourId} />
          </div>
        </div>
        {tourRelatedInfo && (
          <SliderRelated TourId={tourId} tourRelatedData={tourRelatedInfo} />
        )}
        <Footer
          locationInfo={locationInfo}
          categoryInfo={categoryInfo}
          contactDataInfo={contactDataInfo}
          selectedLanguageCode={selectedLanguageCode}
        />
      </div>
    </>
  );
};

export default TourDetails;

export async function getServerSideProps({ params, locale }) {
  const { id, slug } = params;
  const selectedLanguageCode = locale || "en";
  const userAgent = "userAgent";
  const deviceId = "deviceId";
  try {
    const TourDetailsData = await fetchTourDetails({
      selectedLanguageCode,
      userAgent,
      deviceId,
      id,
    });
    const locations = await fetchLocations({
      selectedLanguageCode,
      userAgent,
      deviceId,
    });
    const categorys = await fetchCategory({
      selectedLanguageCode,
      userAgent,
      deviceId,
    });
    const contactData = await fetchContactData({
      selectedLanguageCode,
      userAgent,
      deviceId,
    });
    const populerTour = await fetchPopulerTours({
      selectedLanguageCode,
      userAgent,
      deviceId,
    });
    const tourItineraryInfo = await fetchItineraryDetails({
      selectedLanguageCode,
      userAgent,
      deviceId,
      id,
    });
    const tourGalleryInfo = await fetchGalleryDetails({
      selectedLanguageCode,
      userAgent,
      deviceId,
      id,
    });
    const relatedToursData = await fetchRelatedTourDetails({
      selectedLanguageCode,
      userAgent,
      deviceId,
      id,
    });

    // Prevent mismatch between slug and correct tour
    if (slug !== TourDetailsData.slug) {
      return { notFound: true };
    }

    return {
      props: {
        selectedLanguageCode,
        tourId: id,
        tourSlug: slug,
        tourdetailsInfo: TourDetailsData,
        locationInfo: locations.data,
        categoryInfo: categorys.data,
        contactDataInfo: contactData,
        populerTourInfo: populerTour,
        tourItineraryInfo,
        tourGalleryInfo,
        relatedToursData,
      },
    };
  } catch (error) {
    console.error("SSR fetch error:", error);
    return { notFound: true };
  }
}
