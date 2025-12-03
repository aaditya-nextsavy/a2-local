import { fetchCategory, fetchLocations } from "@/pages/api";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Trans } from "react-i18next";

export default function FilterTour(props) {
  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const selectedLanguageCode = router.locale || 'en';
  let userAgent = 'userAgent';
  let deviceId = 'deviceId';

  useEffect(() => {
    // Retrieve the categories and locations query parameters from the URL
    const initialCategoryParam = router.query.categories || '';
    const initialLocationParam = router.query.locations || '';

    // Split the query parameters into arrays of slugs
    const initialCategorySlugs = initialCategoryParam.split(',').filter((slug) => slug);
    const initialLocationSlugs = initialLocationParam.split(',').filter((slug) => slug);

    // Initialize filteredCategories and filteredLocations with the initial slugs
    setFilteredCategories(initialCategorySlugs);
    setFilteredLocations(initialLocationSlugs);

    // console.log("initialCategoryParam && initialLocationParam", initialCategorySlugs, initialLocationSlugs)
    props.handlecategoryslug(initialCategorySlugs, initialLocationSlugs)
    // Now, you can continue with your existing code
    getFilterData();
    setIsLoading(true);
  }, [router.query]);

  const getFilterData = async () => {
    try {
      const categoryData = await fetchCategory({ selectedLanguageCode, userAgent, deviceId });
      const locationData = await fetchLocations({ selectedLanguageCode, userAgent, deviceId });
      setCategories(categoryData.data);
      setLocations(locationData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCategoriesFilter = (category) => {
    // console.log("category filter", category);
    const categorySlug = category.slug;
    let updatedCategories = [...filteredCategories]; // Initialize the variable

    // Check if the category is already in the filteredCategories
    if (filteredCategories.includes(categorySlug)) {
      // If it's already in the filteredCategories, remove it
      updatedCategories = filteredCategories.filter((slug) => slug !== categorySlug);
    } else {
      // If it's not in the filteredCategories, add it
      updatedCategories = [...filteredCategories, categorySlug];
    }

    setFilteredCategories(updatedCategories);
    // console.log("updatedCategories", updatedCategories)
    // Update the URL with comma-separated category slugs
    const selectedCategories = updatedCategories.filter(Boolean).join(',');;
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          categories: selectedCategories || undefined, // Remove the categories query param if it's empty
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleLocationFilter = (location) => {
    // console.log("location filter", location);
  
    const locationSlug = location.slug;
      console.log("inside filters of tour details, slud id :  ", locationSlug)
    let updatedLocations = [...filteredLocations]; // Initialize the variable

    // Check if the location is already in the filteredLocations
    if (filteredLocations.includes(locationSlug)) {
      // If it's already in the filteredLocations, remove it
      updatedLocations = filteredLocations.filter((slug) => slug !== locationSlug);
    } else {
      // If it's not in the filteredLocations, add it
      updatedLocations = [...filteredLocations, locationSlug];
    }

    setFilteredLocations(updatedLocations);
    // console.log("updatedLocations", updatedLocations)
    // Update the URL with comma-separated location slugs
    const selectedLocations = updatedLocations.filter(Boolean).join(',');;
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          locations: selectedLocations || undefined, // Remove the locations query param if it's empty
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const hideAndShowFilters = () => {
    setActive(!active);
  };

  const resetFilter = () => {
    setFilteredCategories([]);
    setFilteredLocations([]);

    const selectedCategoriesIds = [];
    const selectedLocationsIds = [];
    props.handleFilterChange(selectedCategoriesIds, selectedLocationsIds);

    router.push(router.pathname, undefined, { shallow: true });
  };

  const toursLength = props.countTours;
  const className = active ? "helloThisIsNewClass" : "";
  const filterCloseOpen = active ? <Trans i18nKey="common.close" /> : <Trans i18nKey="common.filter" />;

  const cate = filteredCategories.length > 1 ? "cate" : "";
  const loca = filteredLocations.length > 1? "loca" : "";

  return (
    <div className={`filter-wrapper-main-wrapper position-relative ${className}`}>
      <div className="filter-wrapper-setup">
        <div className="filter-wrapper">
          <div className="filter-bar d-flex align-items-center justify-content-between">
            <button className="filter-close-btn d-block d-lg-none" onClick={hideAndShowFilters}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <h6>
              <Trans i18nKey="tours.filterBy" />
            </h6>
            <button className="ButtonSmall ResetFilter" onClick={resetFilter}>
              <Trans i18nKey="tours.resetFilters" />
            </button>
          </div>
          {isLoading ? (
            <div className="filter-items-wrapper-mobile">
              <div className="filter-categories filter-block">
                <h6>
                  <Trans i18nKey="common.categories" />
                </h6>
                {categories ? (
                  categories.map((category) => (
                    <div
                      key={category.id}
                      className="form-checkbox-wrapper d-flex align-items-center justify-content-between"
                    >
                      <div className="checkbox-wrapper d-flex align-items-center justify-content-between">
                        <label className="d-flex align-items-center">
                          <input
                            onClick={() => {
                              handleCategoriesFilter(category);
                            }}
                            value={filteredCategories}
                            className={
                              filteredCategories.includes(category.slug)
                                ? "checked"
                                : "notchecked"
                            }
                            type="checkbox"
                            name={category.title}
                          />
                          <span className="checkboxlabel">{category.title}</span>
                        </label>
                      </div>
                      <div className="total-categories">
                        {category.tour_count ? <p>{category.tour_count}+</p> : ''}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="categories wait mb-0">
                    <Trans i18nKey="common.loading" />...
                  </p>
                )}
              </div>
              <div className="filter-location filter-block">
                <h6>
                  <Trans i18nKey="common.location" />
                </h6>
                {locations ? (
                  locations.map((location) => (
                    <div
                      className="form-checkbox-wrapper"
                      key={location.id}
                    >
                      <div className="checkbox-wrapper d-flex align-items-center">
                        <label className="d-flex align-items-center">
                          <input
                            onClick={() => {
                              handleLocationFilter(location);
                            }}
                            value={filteredLocations}
                            className={
                              !filteredLocations.includes(location.slug)
                                ? "notCheckd"
                                : "checked"
                            }
                            type="checkbox"
                            name={location.location}
                          />
                          <span className="checkboxlabel">{location.location}</span>
                        </label>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="categories wait mb-0">
                    <Trans i18nKey="common.loading" />...
                  </p>
                )}
              </div>
            </div>
          ) : ''}
          <div className="filter-mobile-counter-tour-btn mx-3">
            <button className="SecondaryButton d-block d-lg-none" onClick={hideAndShowFilters}>
              <Trans i18nKey="common.show" /> {toursLength} <Trans i18nKey="common.tour" />
            </button>
          </div>
        </div>
        <div className="filterbtn">
          <button className={`ButtonSmall ${cate} ${loca}`} onClick={hideAndShowFilters}>
            {filterCloseOpen}
          </button>
        </div>
      </div>
      {/* <ScrollButton /> */}
    </div>
  );
}