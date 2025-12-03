import React, { useState, useEffect } from 'react';
import { Trans } from 'react-i18next';
import axiosConfig from '@/common/config/axios';
import config from '@/common/config/config';
import FullScreenLoader from '@/common/modules/FullScreenLoader/FullScreenLoader';
import Link from 'next/link';
import { fetchBannersData, fetchCategory, fetchLocations, fetchTourListDetails } from '@/pages/api';
import BannerSmHorizontalLitePurple from '@/common/modules/Banner/BannerSmHorizontalLitePurple';
import { useRouter } from 'next/router';
import SmallLoader from '@/common/modules/SmallLoader/SmallLoader';

export default function TourListItems(props) {
  const [tourListData, setTourListData] = useState([]);
  const [displayListCount, setDisplayListCount] = useState(6);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [CategoriesID, setCategoriesID] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [LocationId, setLocationId] = useState([]);
  const [location, setLocation] = useState([]);
  const [countTours, setCountTours] = useState('');
  const [loading, setLoading] = useState(true);
  const [tourListBanners, setTourListBanners] = useState([]);
  const [smallLoader, setSmallLoader] = useState(false)
  const router = useRouter()
  const selectedLanguageCode = router.locale || 'en';
  let userAgent = 'userAgent';
  let deviceId = 'deviceId';

  useEffect(() => {
    // Retrieve the categories and locations query parameters from the URL
    const initialCategoryParam = router.query.categories || '';
    const initialLocationParam = router.query.locations || '';

    const initialCategorySlugs = initialCategoryParam.split(',');
    const initialLocationSlugs = initialLocationParam.split(',');

    // console.log("TourListItems && TourListItems", initialCategorySlugs, initialLocationSlugs);

    if (initialCategorySlugs || initialLocationSlugs) {
      setSmallLoader(true)
    }

    let queryCategories;
    let queryLocations;

    const getFilterData = async () => {
      try {
        const categoryData = await fetchCategory({ selectedLanguageCode, userAgent, deviceId });
        const locationData = await fetchLocations({ selectedLanguageCode, userAgent, deviceId });
        queryCategories = categoryData.data;
        queryLocations = locationData.data;

        // After fetching the data, proceed to match and set the IDs
        const categoryIDs = initialCategorySlugs.map((slug) => {
          const matchedCategory = queryCategories.find(category => category.slug === slug);
          if (matchedCategory) {
            return matchedCategory.id;
          }
          return null;
        }).filter(id => id !== null);

        const locationIDs = initialLocationSlugs.map((slug) => {
          const matchedLocation = queryLocations.find(location => location.slug === slug);
          if (matchedLocation) {
            return matchedLocation.id;
          }
          return null;
        }).filter(id => id !== null);

        setCategoriesID(categoryIDs);
        setLocationId(locationIDs);

        const selectedCategories = categoryIDs;
        const selectedLocations = locationIDs;

        setTimeout(() => {
          getTourList(selectedCategories, selectedLocations);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call getFilterData to start the data fetching process
    getFilterData();


    // setSelectedCategories(props.selectedCategories);
    // setSelectedLocations(props.selectedLocations);

  }, [router.query]);

  useEffect(() => {
    if (
      props.selectedCategories !== selectedCategories ||
      props.selectedLocations !== selectedLocations
    ) {
      // getTourList(props.selectedCategories, props.selectedLocations);
      setSelectedCategories(props.selectedCategories);
      setSelectedLocations(props.selectedLocations);
    }

  }, [props.selectedCategories, props.selectedLocations]);


  const getTourList = async (selectedCategories = [], selectedLocations = []) => {
    var selectedLanguageCode = props.selectedLanguageCode;
    var deviceId = 'deviceId';
    var userAgent = 'userAgent';

    var categoryIds = selectedCategories.length < 2 ? selectedCategories : selectedCategories.join(',');
    var locationIds = selectedLocations.length < 2 ? selectedLocations : selectedLocations.join(',');

    // console.log("merger category and location", categoryIds, locationIds)

    try {
      const tourListDataInfo = await fetchTourListDetails({
        selectedLanguageCode,
        userAgent,
        deviceId,
        categoryIds,
        locationIds,
      });
      const BannerData = await fetchBannersData({ selectedLanguageCode, userAgent, deviceId });

      let thebanner = BannerData.data;
      const tourListData = tourListDataInfo.data;

      setTourListData(tourListData);
      setLoading(false);
      var toursLength = tourListData.length;
      setCountTours(toursLength);
      setSmallLoader(false)

      const filteredForBannerList = thebanner
        .map((data) => {
          if (data.id >= 5) {
            return data;
          } else {
            return null;
          }
        })
        .filter((item) => item !== null);

      setTourListBanners(filteredForBannerList);
    } catch (e) {
      // Handle error
      setLoading(false);
    }
  };

  const increaseListCount = () => {
    setDisplayListCount(displayListCount + 4);
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <div className="d-flex align-items-baseline justify-content-between pb-3">
        <div className="total-tours-count">
          <p>
            {smallLoader ? '' : <> <b>{tourListData.length}</b> <Trans i18nKey="tours.toursAvailable" /></>}
          </p>
        </div>
      </div>
      {loading ? '' : <>
        {smallLoader ? <SmallLoader /> : <>
          {tourListData.length >= 1 ? (
            <div className="tour-card-wrapper">
              {tourListData.slice(0, displayListCount).map((listData, index) => (
                <div key={index}>
                  {index > 0 && index % 4 === 0 && (
                    <>
                      <BannerSmHorizontalLitePurple
                        id={index}
                        totalCount={tourListData.length}
                        tourListBanners={tourListBanners}
                      />
                    </>
                  )}
                  <div className="tour-card" id={listData.id}>
                    <div className="row">
                      <div className="tour-card-img col-xl-4 col-lg-4 col-md-4 col-sm-12">
                        <img src={config.imageBaseURL + listData.image} alt={listData.image_alt} />
                      </div>
                      <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
                        <div className="tour-card-details">
                          <div className="tour-content">
                            {listData.title ? <h4 className="tour-card-title">{listData.title}</h4> : ''}
                            {listData.description ? <p className="tour-card-desc">{listData.description}</p> : ''}
                            {listData.categoryName ? <span className="d-none">{listData.categoryName}</span> : ''}
                            <div className="tour-card-tags-wrapper d-flex align-items-center">
                              {listData.locationName ? (
                                <div className="card-tags d-flex align-items-center location">
                                  <img src="/assets/images/location.svg" alt="" />
                                  <p>{listData.locationName}</p>
                                </div>
                              ) : (
                                ''
                              )}
                              {listData.days ? (
                                <div className="card-tags d-flex align-items-center days">
                                  <img src="/assets/images/time-stamp.svg" alt="" />
                                  <p>
                                    {listData.days} <Trans i18nKey="common.day" />
                                  </p>
                                </div>
                              ) : (
                                ''
                              )}
                              <div className="card-tags d-flex align-items-center date">
                                <img src="/assets/images/calendar.svg" alt="" />
                                <p>{listData.date ? listData.date : <Trans i18nKey="common.datesMayVary" />}</p>
                              </div>
                            </div>
                          </div>
                          <div className="tour-price-btn row align-items-center">
                            <div className="tour-price col-lg-6 col-md-6 col-sm-6">
                              {listData.oldPrice ? (
                                <div className="old-price">
                                  <p className="cross-line">{listData.oldPrice} SAR</p>
                                </div>
                              ) : (
                                ''
                              )}

                              <div className="current-price d-flex">
                                {listData.price ? (
                                  <>
                                    <p>
                                      {listData.price} SAR
                                    </p>
                                    <span> / <Trans i18nKey="common.person" /></span>
                                  </>
                                ) : (
                                  <p><span><Trans i18nKey="common.priceOnRequest" /></span></p>
                                )}
                              </div>
                            </div>
                            <div className="tour-btn col-lg-6 col-md-6 col-sm-6">
                              <Link href={`/tours/[id]/[slug]`} as={`/tours/${listData.id}/${listData.slug}`} className="nounderline">
                                <button className="SecondaryButton"><Trans i18nKey="common.viewTourButton" /></button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-trip-found d-flex align-items-center">
              <img src="/assets/images/travel-explore.svg" alt="" />
              <div className="no-trip-data">
                <h6><Trans i18nKey="common.noTripsFound" /></h6>
                <p><Trans i18nKey="common.pleaseTryDifferentFilter" /></p>
              </div>
            </div>
          )}


          <div className="loadMoreBtn">
            {displayListCount < tourListData.length && (
              <button className="TertiaryButton" onClick={increaseListCount}>
                <Trans i18nKey="common.loadMore" />
              </button>
            )}
          </div>
        </>} </>}
    </>
  );
}
