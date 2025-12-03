import { useState } from 'react';
import Link from 'next/link';
import MegaMenuCategories from './MegaMenuCategories';
import MegaMenuLocations from './MegaMenuLocations';
import { useTranslation, Trans } from "react-i18next";
import { useRouter } from 'next/router';
import MegaMenuPopulerTours from './MegaMenuPopulerTours';

export default function MobileMegaMenu({ populerTourData, categoryData }) {
    const [isShown, setIsShown] = useState(false);
    const [isShownLoc, setIsShownLoc] = useState(false);
    const [isShownCat, setIsShownCat] = useState(false);

    const handleClick = event => {
        setIsShown(current => !current);
    };
    const handleLocations = event => {
        setIsShownLoc(current => !current);
    };
    const handleCategories = event => {
        setIsShownCat(current => !current);
    };

    const router = useRouter(); // Use the useRouter hook

    // Extract the selected language code from the query parameters
    const selectedLanguageCode = router.query.lang || 'en';
    // setTimeout(() => {
      // console.log("MobileMegaMenu + selectedLanguageCode + router.query.lang", selectedLanguageCode)
    // }, 1000);
    return (
        <>
            <h5 className={`nounderline withSubmenu d-flex align-items-center justify-content-between mb-1 ${isShown ? 'opened' : 'closed'}`} onClick={handleClick}><Trans i18nKey="Header.item2"></Trans> <i className={`fa-solid ${isShown ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i></h5>

            {isShown && (
                <>
                    <ul className='toursSubMenuMain'>
                        <li><h5
                            className={`nounderline withSubmenu d-flex align-items-center  ${isShownLoc ? 'opened' : 'closed'}`} onClick={handleLocations}> <Trans i18nKey="Popular.SubTitle"></Trans> <i className={`fa-solid ${isShownLoc ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i></h5
                        ></li>
                        {isShownLoc && <Locations populerTourData={populerTourData} />}
                        <li><h5
                            className={`nounderline withSubmenu d-flex align-items-center ${isShownCat ? 'opened' : 'closed'}`} onClick={handleCategories}><Trans i18nKey="common.categories"></Trans> <i className={`fa-solid ${isShownCat ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i></h5
                        ></li>
                        {isShownCat && <Categories categoryData={categoryData} />}
                        <li>
                            <Link href="/tours" className="nounderline">
                                <Trans i18nKey="Header.seeAllTours"></Trans>
                                <i className={
                                    selectedLanguageCode === "ar"
                                        ? "fa-solid fa-arrow-left pe-2"
                                        : "fa-solid fa-arrow-right ps-2"
                                }
                                ></i>
                            </Link>
                        </li>
                    </ul>
                </>
            )}
        </>
    );
}

function LoadingIndicator() {
    return <p>Loading...</p>;
}

function Locations({ populerTourData }) {

    return (
        <ul className='MenuLocations MenuPopulerTours SubMenu'>
            {populerTourData ? (

                <MegaMenuPopulerTours populerTourData={populerTourData} />
            ) : (
                <LoadingIndicator />
            )}
        </ul>
    );
}

function Categories({ categoryData }) {
    return (
        <ul className='MenuCategories SubMenu'>
            {categoryData ? (
                <MegaMenuCategories categoryData={categoryData} />
            ) : (
                <LoadingIndicator />
            )}
        </ul>
    );
}
