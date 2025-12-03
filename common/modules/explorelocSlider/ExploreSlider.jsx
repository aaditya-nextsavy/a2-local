import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/navigation";
import "swiper/css/bundle";

// import required modules
//change
import { Grid, Navigation } from "swiper/modules";

import config from "@/common/config/config";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Arrow from '@/public/assets/images/arrowRight.png'
import { useTranslation, Trans } from 'react-i18next';

export default function ExploreSlider({ locationData }) {
    const [swiper, setSwiper] = useState(null);
 

    return (
        <div className="container">
            <div className='ExploreSection explore-locations-slider-wrapper '>
                <div className='SectionTitle'>
                    <h5><Trans i18nKey="Explore.SubTitle"></Trans></h5>
                    <h2><Trans i18nKey="Explore.MainTitle"></Trans></h2>
                </div>

                {/* for large screen slider */}
                <div className="d-none d-md-block">
                    <Swiper
                        slidesPerView={3}
                        grid={{
                            rows: 2,
                            fill: "row",
                        }}
                        spaceBetween={30}
                        onSwiper={(swiper) => setSwiper(swiper)}
                        navigation={{
                            prevEl: ".custom-navigation-prev", // Previous button selector
                            nextEl: ".custom-navigation-next", // Next button selector
                        }}
                        modules={[Grid, Navigation]}
                        className="GridSliderExplore"
                    >

                        {
                            locationData ? locationData.map(data => (
                                <SwiperSlide>
                                    <Link href={`/tours/?locations=${data.slug}`}>
                                        <div className='sliderData exploreslider' >
                                            <Image width={400} height={240} 
                                            // quality={40}
                                             src={config.imageBaseURL + data.image} alt={config.imageBaseURL + data.image} className='imgSlider' />
                                            <div className='overlay-sliders'></div>
                                            <div className='imgslidertitle'>
                                                <p>{data.location}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )) : <p>No data</p>
                        }
                    </Swiper>
                </div>

                {/* for small screen slider */}
                <div className="d-md-none">
                    <Swiper
                        slidesPerView={1.5}
                        spaceBetween={30}
                        navigation={false}
                        // modules={[Grid]}
                        className="GridSliderExplore MobileView"
                    >

                        {
                            locationData ? locationData.map(data => (
                                <SwiperSlide>
                                    <Link href={`/tours/?locations=${data.slug}`}>
                                        <div className='sliderData exploreslider' >
                                            <Image width={400} height={240} 
                                            // quality={50}
                                             src={config.imageBaseURL + data.image} alt={config.imageBaseURL + data.image} className='imgSlider' />
                                            <div className='overlay-sliders'></div>
                                            <div className='imgslidertitle'>
                                                <p>{data.location}</p>
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
            </div>
        </div>
    )
}