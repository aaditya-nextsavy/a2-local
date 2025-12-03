import React, { Component, useState } from "react";
import MegaMenuCategories from "./components/MegaMenuCategories";
import MegaMenuLocations from "./components/MegaMenuLocations";

import Dropdown from "react-bootstrap/Dropdown";


import { useTranslation, Trans } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import MegaMenuPopulerTours from "./components/MegaMenuPopulerTours";

export default function MegaMenuToursMain({ populerTourData, categoryData, updateSiteHeader }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter(); // Use the useRouter hook

  // Extract the selected language code from the query parameters
  const selectedLanguageCode = router.query.lang || 'en';
  // localStorage.getItem("language_code");
  const handleMouseEnter = () => {
    // console.log("handleMouseEnter", true)
    setShowDropdown(true)
  }

  const handleMouseLeave = () => {
    // console.log("handleMouseLeave", false)
    setShowDropdown(false)
  }
  const handleDropdownToggle = (isOpen) => {
    // Send true when the dropdown is open, and false when it's closed
    updateSiteHeader(isOpen);
  };

  return (
    <div className="toursMenuWrapper megamenumain">
      <Dropdown
      // onMouseLeave={handleMouseLeave}
      // onMouseEnter={handleMouseEnter}
      onToggle={handleDropdownToggle}
      >
        <Dropdown.Toggle className={showDropdown ? "toursBtn show" : "toursBtn"} id="dropdown-basic">
          <Trans i18nKey="Header.item2"></Trans>
        </Dropdown.Toggle>

        <Dropdown.Menu className={showDropdown ? "show" : ""}>
          <div className="container megaMenuWrapper">
            <div className="row megaMenuRow">
              {/* <MegaMenuLocations locationData={locationData} suppressHydrationWarning={true}/> */}
              <MegaMenuPopulerTours populerTourData={populerTourData} />
              <MegaMenuCategories categoryData={categoryData} suppressHydrationWarning={true}/>
            </div>
            <div className="seeAllBtn">
              <Link href="/tours" className="nounderline">
                <Trans i18nKey="Header.seeAllTours"></Trans>
                <i
                  class={
                    selectedLanguageCode === "ar"
                      ? "fa-solid fa-arrow-left pe-2"
                      : "fa-solid fa-arrow-right ps-2"
                  }
                ></i>
              </Link>
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
