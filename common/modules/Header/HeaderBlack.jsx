import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Head } from "next/head";
import { useTranslation, Trans } from "react-i18next";
import { Dropdown } from "react-bootstrap";
import MenuIcon from "../../../public/assets/images/menu-header.svg";
import { useRouter } from "next/router";
import LanguageDropDown from "./components/LanguageDropDown";
import MegaMenuToursMain from "../MegaMenu/MegaMenuToursMain";
import MobileMenu from "./components/MobileMenu";
import PopupBtn from "../LoginPopup/Popup";
import UserProfileIcon from "../UserProfile/UserProfileIcon";
import { useAuth } from "@/lib/AuthContext";
// import LoginPopup from "../LoginPopup/LoginForm";
// import PopupBtn from "../LoginPopup/Popup";
// import UserProfileIcon from "../UserProfile/UserProfileIcon";
// import MobileMenu from "./components/MobileMenu";
// import MegaMenuToursMain from "../MegaMenu/MegaMenuToursMain";
// import LanguageDropDown from "./components/LanguageDropDown";
// import axiosConfig from "../../axios";
// import { useBanner } from "../../store/Store";

const HeaderBlack = ({ populerTourData, categoryData }) => {
  // const store = useBanner();
  // const authToken = store.authToken;

  const { t } = useTranslation();
  const [siteHeader, setHeader] = useState("siteHeader");
  const [loginStatus, setLoginStatus] = useState(0); // 0 for initial, 200 for success
  const [refreshKey, setRefreshKey] = useState(0);

  const router = useRouter();
  const { pathname } = router;
  let getLoginToken


  useEffect(() => {
    if (loginStatus) {
      setRefreshKey((prevKey) => prevKey + 1);
    }
  }, [loginStatus]);

  const updateSiteHeader = (newHeader) => {
    if (newHeader) {
      setHeader("siteHeaderBlack");
    } else {
      setHeader("siteHeader");
    }
  };

  useEffect(() => {
    getLoginToken = localStorage.getItem('Token-for-login');
    if (getLoginToken) {
      setLoginStatus(true)
    } else {
      setLoginStatus(0)
    }
  }, [getLoginToken])
  const { token } = useAuth();

  const ButtonArea = () => {
    return (
      <div className="login-btn">
        {token ? (
          <UserProfileIcon callbackFromParent={handleLogout} statusState={loginState} />
        ) : (
          <PopupBtn statusState={loginState} />
        )}
      </div>
    );
  };

  const loginState = (loginState) => {
    setLoginStatus(loginState);
  };

  const handleLogout = (state) => {
    setLoginStatus(state);
  };

  return (
    <header className={`siteHeaderBlack main-header`} key={refreshKey}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-3 col-lg-2 col-md-6 col-sm-5 col-4">
            <Link href="/">
              <img
                src="/assets/images/logo.png"
                className="logoHeader"
                alt="logo athaar"
              />
            </Link>
          </div>
          <div className="col-xl-6 col-lg-7 hideonmobile">
            <ul className="header-menu">
              <li>
                <Link href="/" className={`nounderline ${pathname === "/" ? "list-items active" : "list-items"}`}>
                  <Trans i18nKey="Header.item1"></Trans>
                </Link>
              </li>
              <li
                className={`${pathname === "/tours"
                  ? "list-items tourdropdown active"
                  : "list-items tourdropdown"
                  }`}
              >
                <MegaMenuToursMain populerTourData={populerTourData} categoryData={categoryData} updateSiteHeader={updateSiteHeader} />
              </li>
              <li>
                <Link href="/blogs" className={`nounderline ${pathname === "/blogs" ? "list-items active" : "list-items"}`}>
                  <Trans i18nKey="Header.item3"></Trans>
                </Link>
              </li>
              <li>
                <Link href="/about-us" className={`nounderline ${pathname === "/about-us" ? "list-items active" : "list-items"}`}>
                  <Trans i18nKey="Header.item4"></Trans>
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className={`nounderline ${pathname === "/contact-us" ? "list-items active" : "list-items"}`}>
                  <Trans i18nKey="Header.item5"></Trans>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-xl-3 col-lg-3 col-md-6 col-sm-7 col-8 onmobilepadding d-flex align-items-center justify-content-end">
            <div className="lang-drpdwn">
              <img
                className="glob-img"
                alt="globe"
                src="/assets/images/glob.png"
              />
              <LanguageDropDown />
            </div>
            <ButtonArea />
            <MobileMenu populerTourData={populerTourData} categoryData={categoryData} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBlack;