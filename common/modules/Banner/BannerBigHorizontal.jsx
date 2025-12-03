import React, { useEffect, useState } from "react";

// import { useBanner } from "../../store/Store";

import i18n from 'i18next';
import Link from "next/link";
import config from "@/common/config/config";
import { fetchBannersData } from "@/pages/api";
import { useRouter } from "next/router";
import Image from "next/image";

export default function BannerBigHorizontal({ frontPageHorizontal }) {
 
  return (
    <>{frontPageHorizontal ?
      <div className="container">
        <Link href={frontPageHorizontal.link ?? "/tours"} className="nounderline">
          <div className="backgroundcolor-wrapper purple-color d-flex align-items-center">
            <div className="banner-text-wrapper">
              <div className="banner-content">
                <p>{i18n.t('common.experienceSaudi')} </p>
                <h3>{frontPageHorizontal?.title ?? "Weekend Tours in Riyadh"}</h3>
                <p className="hideonmobile">
                  {frontPageHorizontal?.content ??
                    "In the ever-growing and flourishing city of Riyadh, you will discover the birthplace of the Kingdom of Saudi Arabia, along with its historical treasures hidden in the old palaces that witnessed the founding of the kingdom."}
                </p>
                <Link href={frontPageHorizontal?.link ?? "/tours"}>
                  {frontPageHorizontal?.link_text ?? "Explore Tours"}
                </Link>
              </div>
            </div>
            <div className="banner-img-wrapper">
              <Image
                width={650}
                height={400}
                // quality={30}
                src={
                  frontPageHorizontal?.image
                    ? config.imageBaseURL + frontPageHorizontal.image
                    : "/assets/images/banner-img.png"
                }
                alt="banner-img"
              />
            </div>
          </div>
        </Link>
      </div>
      : ''}
    </>
  );
}
