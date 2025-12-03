import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/bundle';
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import config from "@/common/config/config";
import Image from "next/image";
import Arrow from '@/public/assets/images/arrowRight.png'
import { Trans } from 'react-i18next';

export default function CategoriesSliderMain({ categoryInfo }) {
    const [handleSwipe, setHandleSwipe] = useState(false)
    const [swiper, setSwiper] = useState(null);
    // setTimeout(() => {
    //     if (categoryInfo) {
    //         setHandleSwipe(true)
    //     }
    // }, 2000);

    return (
        <div className="container">
            <div className='categories-wrapper-slider categoriesSection'>
                <div className='SectionTitle'>
                    <h5><Trans i18nKey="categories.SubTitle"></Trans></h5>
                    <h2><Trans i18nKey="categories.MainTitle"></Trans></h2>
                </div>
                {/* {handleSwipe ?
                <> */}
                {/* for desktop screen slider */}
                <div className="d-none d-md-block">
                    <Swiper
                        className="categories-data-slider"
                        slidesPerView={4.5}
                        spaceBetween={30}
                        onSwiper={(swiper) => setSwiper(swiper)}
                        modules={[Navigation]}
                        navigation={{
                            prevEl: ".custom-navigation-prev", // Previous button selector
                            nextEl: ".custom-navigation-next", // Next button selector
                        }}
                        breakpoints={{
                            991: {
                                width: 991,
                                slidesPerView: 3.5,
                            },
                            768: {
                                slidesPerView: 2.5,
                            }
                        }}
                    >
                        {
                            categoryInfo ? categoryInfo.map(data => (
                                <SwiperSlide key={data.id}>
                                    <Link href={{
                                        pathname: "/tours",
                                        search: `?categories=${data.slug}`
                                    }}>
                                        <div className='sliderData' >
                                            <Image width={250} height={300} 
                                            // quality={40}
                                             alt="img"
                                             src={config.imageBaseURL + data.image} className='imgSlider' />
                                            <div className='overlay-sliders'></div>
                                            <div className='imgslidertitle'>
                                                <p>{data.title}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )) : <p>No data</p>
                        }
                    </Swiper>
                </div>

                {/* for small screen */}
                <div className="d-md-none">
                    <Swiper
                        slidesPerView={1.7}
                        spaceBetween={30}
                        navigation={false}
                    >
                        {
                            categoryInfo ? categoryInfo.map(data => (
                                <SwiperSlide>
                                    <Link href={{
                                        pathname: "/tours",
                                        search: `?categories=${data.slug}`
                                    }}>
                                        <div className='sliderData' >
                                            <Image width={250} height={300} 
                                            // quality={30}
                                             alt="img"
                                             src={config.imageBaseURL + data.image} className='imgSlider' />
                                            <div className='overlay-sliders'></div>
                                            <div className='imgslidertitle'>
                                                <p>{data.title}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )) : <p>No data</p>
                        }
                    </Swiper>
                </div>
                <div className="custom-navigation-button-wrapper">
                    <Image src={Arrow.src} alt="arrow-prev" width={42} height={22} className="custom-navigation-button custom-navigation-prev" onClick={() => swiper.slidePrev()} />
                    <Image src={Arrow.src} alt="arrow-next" width={42} height={22} className="custom-navigation-button custom-navigation-next" onClick={() => swiper.slideNext()} />
                </div>
                {/* </>
                : ''} */}
            </div>
        </div>
    );
}
