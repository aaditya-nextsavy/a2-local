import React, { useEffect, useState } from 'react'
import i18n from 'i18next';
import Link from 'next/link';
import config from '@/common/config/config';
import { useRouter } from 'next/router';
import { fetchBannersData } from '@/pages/api';
import Image from 'next/image';

export default function BannerBigVerticalPink({bigVerticalPink}) {
  if(!bigVerticalPink){
    return <></>
  }
  return (
    <>
    <Link href={bigVerticalPink?.link ?? "/tours"} className='nounderline' target="_blank" rel="noopener noreferrer">
      <div className="big-banner-vertical Pink-color d-flex flex-column">
        <div className="vertical-banner-text">
          <div className="vertical-banner-content banner-content">
            <p className='vertical-banner-sub-title'>{i18n.t('common.experienceSaudi')}</p>
            <h3 className='vertical-banner-main-title'>{bigVerticalPink?.title ?? "Weekend Tours in Riyadh"}</h3>
            <Link href={bigVerticalPink?.link ?? "/tours"} className='vertical-banner-link' target="_blank" rel="noopener noreferrer">{bigVerticalPink?.link_text ?? "Explore Tours"}</Link>
          </div>
        </div>
        <div className="vertical-banner-img">
        <Image width={400} height={250}
        //  quality={30}
            src={
              bigVerticalPink?.image
                ? config.imageBaseURL + bigVerticalPink.image
                : "/assets/images/verticalbanner.png"
            }
            alt="tourimg.png"
          />
        </div>
      </div>
    </Link>
    </>
  )
}
