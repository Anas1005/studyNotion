import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/swiper-bundle.css";
import { RatingAndReview } from "./RatingAndReview";

export const RatingsAndReviews = ({ reviews,setModalContent,toggleModal }) => {
  const sliderRef = useRef(null);
  let mySwiper;

  useEffect(() => {
    mySwiper = new Swiper(sliderRef.current, {
      loop: true,
      slidesPerView: 2,
      spaceBetween: 20,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

    return () => {
      if (mySwiper) {
        mySwiper.destroy(true, true);
      }
    };
  }, []);

  return (
    <div className="swiper-container mb-4" ref={sliderRef}>
      <div className="swiper-wrapper">
        {reviews?.map((review, index) => (
          <div key={index} className="swiper-slide">
            <RatingAndReview user={review?.user} review={review?.review} rating={review?.rating} setModalContent={setModalContent} toggleModal={toggleModal}/>
          </div>
        ))}
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};
