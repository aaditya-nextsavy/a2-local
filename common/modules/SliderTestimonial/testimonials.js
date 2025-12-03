import { useEffect, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import config from "@/common/config/config";
import { useRouter } from "next/router";
import theMap from "./geoMap.json"
import Image from "next/image";


// Map file
// https://www.react-simple-maps.io/docs/map-files/
// const geoUrl =
//   "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";

const geoUrl = theMap;

export default function Testimonials({ testimonialsInfo }) {
  // List of testimonials
  const [testimonials, setTestimonials] = useState([]);

  // Currently active slide
  const [activeIndex, setActiveIndex] = useState(0);

  // Current map center
  const [currentCenter, setCurrentCenter] = useState([0, 0]);
  // Set the initial coordinates to the first testimonial's coordinates
  useEffect(() => {
    if (testimonialsInfo.length > 0) {
      const firstTestimonial = testimonialsInfo[0];
      setCurrentCenter([+firstTestimonial.longitude, +firstTestimonial.latitude]);
    }
  }, [testimonialsInfo]);
  //
  // On slide change
  //
  const onSlideChange = (swiper) => {
    // Update active index for pagination
    setActiveIndex(swiper.activeIndex);
    // Get data of the current slide
    const currentTestimonial = testimonialsInfo[swiper.activeIndex];
    // console.log(currentTestimonial);
    // Pan map
    setCurrentCenter([
      +currentTestimonial.longitude,
      +currentTestimonial.latitude,
    ]);
  };

  return (
    <div className="Testimonials-section position-relative overflow-hidden pb-0">
      <div className="container-md px-0 z-2 position-relative"></div>
      <div className="Testimonials-map-container position-relative">
        <ComposableMap projection="geoMercator">
          <ZoomableGroup
            center={currentCenter}
            zoom={2.4}
            maxZoom={3}
            minZoom={3}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography key={geo.rsmKey} geography={geo} fill="#b3b3b3" />
                ))
              }
            </Geographies>
            <Marker coordinates={currentCenter}>
              <path
                d="M10 13.0378C8.16667 13.0378 6.66667 11.5711 6.66667 9.77836C6.66667 7.98566 8.16667 6.5189 10 6.5189C11.8333 6.5189 13.3333 7.98566 13.3333 9.77836C13.3333 11.5711 11.8333 13.0378 10 13.0378ZM20 10.1043C20 4.1884 15.5833 0 10 0C4.41667 0 0 4.1884 0 10.1043C0 13.9179 3.25 18.97 10 25C16.75 18.97 20 13.9179 20 10.1043Z"
                fill="#5C0F87"
                transform="translate(-10, -25)"
                className="d-inline d-md-none"
              />
              <path
                d="M4 5.21512C3.26667 5.21512 2.66667 4.62842 2.66667 3.91134C2.66667 3.19426 3.26667 2.60756 4 2.60756C4.73333 2.60756 5.33333 3.19426 5.33333 3.91134C5.33333 4.62842 4.73333 5.21512 4 5.21512ZM8 4.04172C8 1.67536 6.23333 0 4 0C1.76667 0 0 1.67536 0 4.04172C0 5.56714 1.3 7.588 4 10C6.7 7.588 8 5.56714 8 4.04172Z"
                fill="#5C0F87"
                transform="translate(-4, -10)"
                className="d-none d-md-inline"
              />
            </Marker>
          </ZoomableGroup>
        </ComposableMap>
        <div className="position-absolute w-100 h-100 top-0">
          <div className="container h-100 position-relative mobile-margin-top">
            <Swiper
              className="bg-light Testimonials-swiper position-absolute start-50 shadow rounded "
              speed={500}
              onSlideChange={(swiper) => {
                onSlideChange(swiper);
              }}
            >
              {testimonialsInfo.map((testimonial, index) => (
                <SwiperSlide key={"testimonial-" + index}>
                  <div className="p-4 d-flex flex-column align-items-center  text-center">
                    <p className="mb-4 testimonials-content-wrapper">{testimonial.content}</p>
                    <Image
                      className="object-fit-cover rounded-full"
                      src={config.imageBaseURL + testimonial.user_image}
                      alt={testimonial.user_image}
                      width={100}
                      height={100}
                      // quality={20}
                    />
                    <div className="mt-2 Testimonial-user-name">
                      {testimonial.user_name}
                    </div>
                    <div className="fw-bold">{testimonial.user_location}</div>
                  </div>
                </SwiperSlide>
              ))}
              <Controls list={testimonialsInfo} activeIndex={activeIndex} />
              <div className="Testimonials-swiper-border-lt position-absolute top-0"></div>
              <div className="Testimonials-swiper-border-rb position-absolute bottom-0 end-0"></div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

//
// Custom controls
//
function Controls(props) {
  const swiper = useSwiper();
  const router = useRouter(); // Use the useRouter hook

  // Extract the selected language code from the query parameters
  const selectedLanguageCode = router.query.lang || 'en';

  return (
    <div className="d-flex align-items-center justify-content-center px-4 pb-4">
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
            ? "opacity-25"
            : "opacity-100"
        }
      >
        <img
          className="testimonySliderArrow Arrow-Left"
          src="/assets/images/grayArrowLeft.png"
        />
      </span>
      <span className="mx-4 testimony-info-count">
        {props.activeIndex + 1 > 9 ? "" : 0}
        {props.activeIndex + 1}{" "}
        <span className="testimony-info-count-dif-clr">
          / {props.list.length > 9 ? "" : 0}
          {props.list.length}
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
            ? "opacity-25"
            : "opacity-100"
        }
      >
        <img
          className="testimonySliderArrow Arrow-Right"
          src="/assets/images/grayArrowRight.png"
        />
      </span>
    </div>
  );
}