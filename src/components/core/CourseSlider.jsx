import React, { useEffect, useRef } from "react";
import Swiper from "swiper";
// import {Autoplay,Pagination,Navigation} from "swiper";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import './scrollBar.css'; // If you have custom scrollbar styles
import { GiNinjaStar } from "react-icons/gi";
import { Course } from "./Course"; // Make sure to import your Course component



// export const CourseSlider = ({courses,type}) => {
 
//     return (
//   <div className="">
//     {/* <h2 className="text-3xl text-white">Featured Courses</h2> */}
//     <div className="flex space-x-4 custom-scrollbar ">
//       {courses?.map((course) => (
//         <Course key={course?.id} course={course} />
//       ))}
//     </div>
//   </div>
// );
//       }





  export const CourseSlider = ({courses,type}) => {
    const sliderRef = useRef(null);
    let mySwiper;
  
    useEffect(() => {
      mySwiper = new Swiper(sliderRef.current, {
        loop: true, // Enable infinite loop
        autoplay: {
          delay: 2000, // Auto-play delay in milliseconds
        },
        slidesPerView: 3,
        spaceBetween: 20, // Adjust the space between slides as needed
        pagination: {
          el: ".swiper-pagination", // Pagination container
          clickable: true, // Allow clicking on pagination bullets to navigate
        },
        // modules: [Autoplay, Pagination, Navigation]
      });
  
      return () => {
        if (mySwiper) {
          mySwiper.destroy(true, true); // Cleanup Swiper when component unmounts
        }
      };
    }, []);
  
    return (
      <div className="swiper-container  overflow-hidden" ref={sliderRef}>
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
  
