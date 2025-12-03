import React, { useState, useEffect } from "react";
import { useTranslation, Trans } from 'react-i18next';
import i18n from 'i18next';
import SubPageHeaderTourList from "../../SubPageHeaders/SubPageHeaderTourList";
import FilterTour from "./components/FilterTour";
import TourListItems from "./components/TourListItems";
import Footer from "../../Footer/Footer";
import Head from "next/head";

const TourList = (props) => {
  const [tourListData, setTourListData] = useState([]);
  const [displayListCount, setDisplayListCount] = useState(2);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);
  const [selectedLocationsIds, setSelectedLocationsIds] = useState([]);
  const [sendCategoriesIds, setSendCategoriesIds] = useState([]);
  const [sendLocationsIds, setSendLocationsIds] = useState([]);
  const [countTours, setCountTours] = useState("");
  const [gotSlugCategory, setGotSlugCategory] = useState([]);
  const [gotSlugLocation, setGotSlugLocation] = useState([]);

  const handleFilterChange = (selectedCategoriesIds, selectedLocationsIds) => {
    setSelectedCategoriesIds(selectedCategoriesIds);
    setSelectedLocationsIds(selectedLocationsIds);
    // console.log(selectedCategoriesIds, selectedLocationsIds)
  };

  const handleFilterSubmit = () => {
    const selectedCategoriesIds = props.categoriesFilterInfo.map((filter) => filter.id);
    const selectedLocationsIds = props.locationFilterInfo.map((filter) => filter.id);
    props.handleFilterChange(selectedCategoriesIds, selectedLocationsIds);
  };

  const handleCategorySlug = (initialCategorySlugs, initialLocationSlugs) => {
    setGotSlugCategory(initialCategorySlugs);
    setGotSlugLocation(initialLocationSlugs);
    // console.log("handlecategoryslug initialCategorySlugs, initialLocationSlugs", initialCategorySlugs, initialLocationSlugs)
  };

  useEffect(() => {
    setTimeout(() => {
      // console.log("props.categoryInfoprops.categoryInfo", props.locationInfo, props.categoryInfo);
    }, 1000);
    setSendCategoriesIds(props.gotItSetIt);
    setSendLocationsIds(props.locationId);
  }, []);

  useEffect(() => {
    if (sendCategoriesIds !== props.gotItSetIt || sendLocationsIds !== props.locationId) {
      setSendCategoriesIds(props.gotItSetIt);
      setSendLocationsIds(props.locationId);
    }
  }, [props.gotItSetIt, props.locationId]);

  const counterlen = (toursLength) => {
    setCountTours(toursLength);
  };

  const renderHeader = () => {
    const titleHeaderMain = <Trans i18nKey="tours.title"></Trans>;
    const titleCustomBtn = <Trans i18nKey="common.makeATour"></Trans>;
    const breadcrumbHome = <Trans i18nKey="common.home"></Trans>;
    const BreadcrumbActive = <Trans i18nKey="common.tour"></Trans>;
    return (
      <SubPageHeaderTourList
        addClassName="tours-page"
        BreadcrumbHome={breadcrumbHome}
        BreadcrumbActive={BreadcrumbActive}
        TitleMain={titleHeaderMain}
        CustomToursBtn={titleCustomBtn}
        BtnLinkTo="/make-a-tour"
        locationData={props.locationInfo}
        categoryData={props.categoryInfo}
        populerTourData={props.populerTourInfo}
      />
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const { categoryId, selectedLanguageCode } = props;

  return (
    <div className="tour-wrapper">
      {renderHeader()}
      <div className="tour-list-wrapper">
        <div className="container">
          {/* <p>Category ID: {props.gotItSetIt}</p> */}
          <div className="row">
            <div className={`col-lg-3 col-md-12 col-sm-12 p-sm-0 ${selectedLanguageCode === "ar" ? "ps-lg-5" : "pe-lg-5"}`}>
              {props.locationInfo && props.categoryInfo ?
                <FilterTour
                  handleFilterChange={handleFilterChange}
                  countTours={countTours}
                  sendedCategoryId={sendCategoriesIds}
                  sendedLocationId={sendLocationsIds}
                  locationData={props.locationInfo}
                  categoryData={props.categoryInfo}
                  handlecategoryslug={handleCategorySlug}
                />
                : ''}
              <div className="back-top-btn">
                <button className='ButtonSmall' onClick={scrollToTop}><Trans i18nKey="common.backToTop"></Trans></button>
              </div>
            </div>
            <div className={`col-lg-9 col-md-12 col-sm-12 p-sm-0 ${selectedLanguageCode === "ar" ? "pe-lg-5" : "ps-lg-5"}`}>
              <TourListItems
                selectedCategories={selectedCategoriesIds}
                selectedLocations={selectedLocationsIds}
                countTours={(toursLength) => counterlen(toursLength)}
                locationData={props.locationInfo}
                categoryData={props.categoryInfo}
                selectedLanguageCode={props.selectedLanguageCode}
                gotSlugCategory={gotSlugCategory}
                gotSlugLocation={gotSlugLocation}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer
        locationInfo={props.locationInfo}
        categoryInfo={props.categoryInfo}
        contactDataInfo={props.contactDataInfo}
        selectedLanguageCode={props.selectedLanguageCode}
      />
    </div>
  );
};

export default TourList;
