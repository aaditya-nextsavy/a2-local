import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation, Trans } from "react-i18next";
import { useRouter } from "next/router";
import LanguageDropDown from "./components/LanguageDropDown";
import MegaMenuToursMain from "../MegaMenu/MegaMenuToursMain";
import MobileMenu from "./components/MobileMenu";
import PopupBtn from "../LoginPopup/Popup";
import UserProfileIcon from "../UserProfile/UserProfileIcon";
import { useAuth } from "@/lib/AuthContext";
import FullScreenLoader from "../FullScreenLoader/FullScreenLoader";


const Header = ({ populerTourData, categoryData }) => {
  // const store = useBanner();
  // const authToken = store.authToken;

  const { t } = useTranslation();
  const [siteHeader, setHeader] = useState("siteHeader");
  const [loginStatus, setLoginStatus] = useState(0); // 0 for initial, 200 for success
  const [refreshKey, setRefreshKey] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const { pathname } = router;

  let getloginStatus

  const listenScrollEvent = () => {
    if (window.scrollY < 73) {
      setHeader("siteHeader");
    } else if (window.scrollY > 70) {
      setHeader("siteHeaderBlack");
    }
  };

  // useEffect(() => {
  //   if (loginStatus) {
  //     setRefreshKey((prevKey) => prevKey + 1);
  //   }

  // }, [loginStatus]);

  useEffect(() => {
    getloginStatus = localStorage.getItem('Token-for-login');
    if (getloginStatus) {
      // console.log("token in localStorage", getloginStatus);
      setLoginStatus(true)
    } else {
      setLoginStatus(0)
    }
    // console.log("useEffect loginStatus", loginStatus, loginStatus);
  }, [getloginStatus])

  useEffect(() => {
    setIsClient(true)
    window.addEventListener("scroll", listenScrollEvent);
    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  const loginState = (loginState) => {
    // console.log("loginStatus", loginStatus);
    setLoginStatus(loginState);
  };
  const { token, loading } = useAuth();
  const ButtonArea = () => {
    // console.log("auth things", token);
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

  const handleLogout = (state) => {
    setLoginStatus(state);
  };
  const updateSiteHeader = (newHeader) => {
    if (newHeader) {
      setHeader("siteHeaderBlack");
    } else {
      setHeader("siteHeader");
    }
  };
  if (loading) {
    return <FullScreenLoader />;
  }
  return (
    <header className={`${siteHeader} main-header`} >
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
                <MegaMenuToursMain populerTourData={populerTourData} categoryData={categoryData} suppressHydrationWarning={true} updateSiteHeader={updateSiteHeader} />
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
            <MobileMenu populerTourData={populerTourData} categoryData={categoryData} suppressHydrationWarning={true} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
