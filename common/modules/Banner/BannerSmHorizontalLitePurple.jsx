import React from "react";
import i18n from 'i18next';
import Link from "next/link";
import config from "@/common/config/config";

export default function BannerSmHorizontalLitePurple({ id, tourListBanners }) {

  let ID = id / 4
  // console.log("tourListBanners", tourListBanners, ID)
  const handleBannerLinkClick = () => {
    const bannerLink = tourListBanners[ID]?.link;
    if (bannerLink) {
      // Change the URL and refresh the page
      window.location.href = bannerLink;
    }
  };

  
  return (
    tourListBanners ? (
      <>
        <div className="container">
          <div className="backgroundcolor-wrapper BannerSmHorizontal lite-purple-color d-flex align-items-center">
            <div className="banner-text-wrapper">
              <div className="banner-content">
                <p>{i18n.t('common.experienceSaudi')}</p>
                <h3>{tourListBanners[ID]?.title ?? "Weekend Tours in Riyadh"}</h3>
                <Link href={tourListBanners[ID]?.link ?? "/tours"} onClick={handleBannerLinkClick}>
                  {tourListBanners[ID]?.link_text ?? "Explore Tours"}
                </Link>
              </div>
            </div>
            <div className="banner-img-wrapper">
              <img
                src={
                  tourListBanners[ID]?.image
                    ? config.imageBaseURL + tourListBanners[ID]?.image
                    : "/assets/images/verticalbanner.png"
                }
                alt="tourimg.png"
              />
            </div>
          </div>
        </div>
      </>
    ) : <></>

  );
}
