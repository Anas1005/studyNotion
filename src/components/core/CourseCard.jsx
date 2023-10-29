import React from "react";
import ReactStars from "react-stars";
import { calculateAverageRating } from "../../utilities/averageRatings";
import { Link } from "react-router-dom";

export const CourseCard = ({ course }) => (
  <Link to={`/course/${course._id}`}>
  <div className="w-[500px] text-white cursor-pointer">
    <div className="flex flex-col ">
    <div className="flex text-yellow-25 mb-4 font-semibold text-l justify-center">{course?.category?.name}</div>
    <div className="flex justify-center">
      <img
        src={course?.thumbnail}
        alt={course?.courseName}
        className=" w-[440px] h-[280px] rounded-md object-cover"
        style={{ maxWidth: "none" }}
      />
      </div>

      <div className="ml-8">
      <h3 className="text-l font-semibold mt-2 text-blue-400">
        {course?.courseName}
      </h3>
      <div className="flex items-center gap-4 mt-2">
        <div className=" text-yellow-25 text-sm">{calculateAverageRating(course?.ratingsAndReviews)}</div>
        <ReactStars
          className="flex"
          count={5}
          size={12.5}
          edit={false}
          value={calculateAverageRating(course?.ratingsAndReviews)}
          color2={"#ffd700"}
        />
        <div className=" text-xs text-green-500">
          {`${course?.ratingsAndReviews?.length} Ratings` || "No Ratings Yet"}
        </div>
      </div>
      <div className="mt-2 text-s">
        {"Rs ."}
        {course.price}
      </div>

      <div className="text-xs mt-2 flex items-center text-richblack-200 font-bold">
        <img
          src={course?.instructor?.image}
          alt={`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}
          className=" w-8 h-8 rounded-full mr-2"
        />

        {`${course?.instructor?.firstName} ${course?.instructor?.lastName}`}

        
      </div>
      </div>
      
   
    </div>

    
  </div>
  </Link>
);
