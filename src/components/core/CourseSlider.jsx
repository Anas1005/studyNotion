import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import './scrollBar.css';
import { Course } from "./Course";

export const CourseSlider = ({ courses, type }) => {
  const sliderRef = useRef(null);
  let mySwiper;

  useEffect(() => {
    const breakpoints = {
      450: {
        slidesPerView: 1, // Set slidesPerView to 1 for screens narrower than 600px
      },
      768: {
        slidesPerView: 2, // Set slidesPerView to 2 for screens between 600px and 900px wide
      },
      1200: {
        slidesPerView: 3, // Set slidesPerView to 3 for screens wider than 900px
      },
    };

    mySwiper = new Swiper(sliderRef.current, {
      loop: true,
      autoplay: {
        delay: 2000,
      },
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: breakpoints, // Use custom breakpoints here
    });

    return () => {
      if (mySwiper) {
        mySwiper.destroy(true, true);
      }
    };
  }, []);

  return (
    <div className="swiper-container overflow-hidden " ref={sliderRef}>
      <div className="swiper-wrapper">
        {courses?.map((course) => (
          <div key={course?.id} className="swiper-slide">
            <Course course={course} type={type} />
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};
