import React from 'react';
import { useRouter } from 'next/router';

import TourList from './TourListing/TourList';

function useLocation() {
  const router = useRouter();
  const searchParams = new URLSearchParams(router.asPath.split('?')[1]);

  return searchParams;
}

export default function TourMain() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.toString());
  const categoriesID = searchParams.get("categories-id");
  const locationID = searchParams.get("location-id");

  console.log("categoriesID, locationID", categoriesID, locationID);

  return (
    <div className="main-tour">
      <TourList gotItSetIt={categoriesID} locationId={locationID} />
    </div>
  );
}
