import React from "react";
import MobileMegaMenu from "./MobileMegaMenu";
import { useTranslation, Trans } from "react-i18next";
import Link from "next/link";

function MobileMenuLinks({ menuStatus, populerTourData, categoryData }) {
  return (
    <div className={`${menuStatus} mobile-menu-open-links`} id='menu'>
      <ul className="mobileMenuList">
        <li className="mobileMenuItems active d-flex align-items-center justify-content-between ">
          <Link href='/' className="nounderline"><Trans i18nKey="Header.item1"></Trans></Link>
        </li>
        <li className="mobileMenuItems hasSubMenu "><MobileMegaMenu populerTourData={populerTourData} categoryData={categoryData}/></li>
        <li className="mobileMenuItems d-flex align-items-center justify-content-between ">
          <Link href='/blogs' className="nounderline"><Trans i18nKey="Header.item3"></Trans></Link>
        </li>
        <li className="mobileMenuItems d-flex align-items-center justify-content-between ">
          <Link href='/about-us' className="nounderline"><Trans i18nKey="Header.item4"></Trans></Link>
        </li>
        <li className="mobileMenuItems d-flex align-items-center justify-content-between ">
          <Link href='/contact-us' className="nounderline"><Trans i18nKey="Header.item5"></Trans></Link>
        </li>
        <li className="mobileMenuItems d-flex align-items-center justify-content-between ">
          <Link href='/faqs' className="nounderline"><Trans i18nKey="faqs.title"></Trans></Link>
        </li>
        <li className="mobileMenuItems d-flex align-items-center justify-content-between ">
          <Link href='/privacy-policy' className="nounderline"><Trans i18nKey="common.privacyPolicy"></Trans></Link>
        </li>
        <li className="mobileMenuItems d-flex align-items-center justify-content-between ">
          <Link href='/terms-of-use' className="nounderline"><Trans i18nKey="common.termsOfUse"></Trans></Link>
        </li>
      </ul>
    </div>
  )
}

export default MobileMenuLinks;
