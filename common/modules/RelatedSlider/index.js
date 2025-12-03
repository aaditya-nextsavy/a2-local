import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


// import "./styles.css";

// import required modules
import { Navigation, Autoplay } from "swiper/modules";

import { Trans } from "react-i18next";
import SliderImgWrapper from "./SliderImgWrapper";

export default function SliderRelated({ TourId, tourRelatedData }) {

    return (
        <>
            {
                tourRelatedData.length > 0 ?
                    <div className="BackgroundClrPrimary">
                        < div className="related-tours" >
                            <div className="container">
                                <div className="SectionTitle">
                                    <h5><Trans i18nKey="common.tour"></Trans></h5>
                                    <h2><Trans i18nKey="common.relatedTours"></Trans></h2>
                                </div>
                                <div className="related-tour-blocks">
                                    <Swiper
                                        slidesPerView={4}
                                        spaceBetween={62}

                                        // centeredSlides={true}

                                        navigation={false}


                                        modules={[Navigation]}

                                        breakpoints={{
                                            991: {
                                                width: 991,
                                                slidesPerView: 3,
                                            },
                                            425: {
                                                width: 452,
                                                slidesPerView: 1.5,
                                            },
                                        }}
                                    >
                                        {
                                            tourRelatedData ? tourRelatedData.map(data => (
                                                <SwiperSlide>
                                                    <SliderImgWrapper
                                                        tourId={data.id}
                                                        tourSlug={data.slug}
                                                        name={data.title}
                                                        image={data.image} />
                                                </SwiperSlide>
                                            )) : ""
                                        }
                                    </Swiper>
                                </div>
                            </div>
                        </div >
                    </div >
                    : ''
            }
        </>
    );
}
