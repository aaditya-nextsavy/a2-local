
// Swiper
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import { Trans, useTranslation } from 'react-i18next';

import Link from "next/link";
import config from "@/common/config/config";
import Image from "next/image";

// import Image from "next/image";

export default function PopulerTourSlider(props) {
  // Currently active slide
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiper, setSwiper] = useState(null);

  const slideTo = (index) => {
    if (swiper) {
      swiper.slideTo(index);
    }
  };

  // console.log(props.list)

  return (
    <section className='popularTour-section' id='popularTour-section-id' >
      <div className="container">
        <div className='SectionTitle'>
          <h5><Trans i18nKey="Popular.SubTitle"></Trans></h5>
          <h2><Trans i18nKey="Popular.MainTitle"></Trans></h2>
        </div>
      </div>
      <div className="container">
        <div className='PopularToursSliderWrapper'>
          <div className="py-4">
            {/* Swiper for large screens */}
            <div className="d-none d-md-block">
              <Swiper
                allowTouchMove={false}
                slidesPerView={2.5}
                breakpoints={{
                  1200: {
                    slidesPerView: 4,
                  },
                }}
                speed={500}
                preventInteractionOnTransition={false}
                onSlideChange={(swiper) => {
                  setActiveIndex(swiper.activeIndex);
                }}
                onSwiper={setSwiper}
              >
                {props.list.map((tour, index) => (
                  <SwiperSlide
                    className={
                      "PopularTours-swiper-slide addBorderBottom " +
                      (activeIndex === index
                        ? "PopularTours-swiper-slide-active"
                        : "PopularTours-swiper-slide-inactive")
                    }
                    key={index}
                  >
                    <div
                      className="relative h-100 d-flex flex-column justify-content-end overflow-y-hidden rounded"
                    // onClick={() => slideTo(index)}
                    >
                      <div className="position-relative w-100 rounded-top overflow-hidden">
                        <Link href={`/tours/${tour.id}/${tour.slug}`}>
                          <Image
                            width={425}
                            height={480}
                            alt="img"
                            quality={60}
                            className="position-absolute h-100 w-100 object-fit-cover"
                            src={config.imageBaseURL + tour.image}
                          />
                          <div
                            className={
                              "position-absolute h-100 max-h z-3 w-100 d-flex align-items-end p-4 pb-3 populerTours-tourinfo-title-sm " +
                              (activeIndex === index ? "opacity-0" : "opacity-100")
                            }
                          >
                            {tour.title}
                          </div>
                        </Link>
                      </div>
                      <div className="bottom-border min-h-auto bg-accent rounded-bottom"></div>

                    </div>

                    <div
                      className={
                        "PopularTours-tour-info PopularTours-tour-onactive-info top-0 end-0 position-absolute d-flex flex-column align-items-start " +
                        (activeIndex === index ? "opacity-100" : "opacity-0")
                      }
                    >
                      <h3 className="min-h-auto">{tour.title}</h3>
                      <p className="min-h-auto flex-grow mb-4">{tour.description}</p>
                      {/* <Link to={`/tours/${tour.id}/?&categories-id=${tour.id}&categories-title=${tour.title}`} className="nounderline w-100"> */}
                      <Link href={`/tours/${tour.id}/${tour.slug}`} className="nounderline w-100">
                        <button
                          className="min-h-auto bg-accent py-2 px-4 text-center SecondaryButton"
                        // onClick={() => console.log("Clicked")}
                        >
                          <Trans i18nKey="common.viewTourButton"></Trans>
                        </button>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
                {/* Extra three blank slides to adjust alignment */}
                <SwiperSlide />
                <SwiperSlide />
                <SwiperSlide />
                <Controls list={props.list} activeIndex={activeIndex} />
              </Swiper>
            </div>
            {/* Simple tray for small screens */}
            <div className="d-md-none mobilePopularTourWrapper">
              <Swiper
                slidesPerView={1.7}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                className="addBorderBottom mobilePopularTourSlider"
              >
                {props.list.map((tour, index) => (
                  <SwiperSlide key={index}>
                    <div className="position-relative rounded overflow-hidden">
                      <Image
                        width={100}
                        height={100}
                        // quality={50}
                        alt="img"
                        className="w-100 object-fit-cover z-2"
                        src={config.imageBaseURL + tour.image}
                      />
                      <div className="bottom-border min-h-auto bg-accent rounded-bottom position-absolute w-100 bottom-0 z-3"></div>
                    </div>
                    <Link href={`/tours/${tour.id}/${tour.slug}`} className="nounderline w-100">
                      <h6 className="h-auto mobilePopularTourTitle">{tour.title}</h6>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}

//
// Custom controls
//
function Controls(props) {
  const swiper = useSwiper();
  const selectedLanguageCode = props.selectedLanguageCode;

  return (
    <div className="d-flex justify-content-center popularTour-info-count-arrow">
      <span
        onClick={() =>
          selectedLanguageCode === "ar"
            ? swiper.slideNext()
            : swiper.slidePrev()
        }
        className={
          (selectedLanguageCode !== "ar" && props.activeIndex === 0) ||
            (selectedLanguageCode === "ar" &&
              props.activeIndex === props.list.length - 1)
            ? "opacity-50"
            : "opacity-100"
        }
      >
        <img className="popularTour-left-arrow popularTour-arrow-pointer" src="/assets/images/arrowRight.png" />
      </span>
      <span className="mx-4 popularTour-info-count">
        {props.activeIndex + 1 > 9 ? "" : 0}
        {props.activeIndex + 1}{" "}
        <span className="diff-color">
          {" "}
          / {props.list.length > 9 ? "" : 0}
          {props.list.length}{" "}
        </span>
      </span>
      <span
        onClick={() => {
          if (
            selectedLanguageCode === "ar" ||
            props.activeIndex < props.list.length - 1
          ) {
            selectedLanguageCode === "ar"
              ? swiper.slidePrev()
              : swiper.slideNext();
          }
        }}
        className={
          (selectedLanguageCode !== "ar" &&
            props.activeIndex === props.list.length - 1) ||
            (selectedLanguageCode === "ar" && props.activeIndex === 0)
            ? "opacity-50"
            : "opacity-100"
        }
      >

        <img className="popularTour-right-arrow popularTour-arrow-pointer" src="/assets/images/arrowRight.png" />
      </span>
    </div>
  );
}
