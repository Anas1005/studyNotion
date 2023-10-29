import React, { useState } from "react";
import { CustomModal } from "./CustomModal";
import ReactStars from "react-stars";

export const RatingAndReview = ({
  user,
  review,
  rating,
  setModalContent,
  toggleModal,
   // Add this prop for maximum review length
}) => {
   const  maxReviewLength=92;
  return (
    <div className="bg-richblack-800 text-white p-4 rounded-lg space-y-4 h-[200px] ">
      <div className="flex items-center space-x-2">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img
            src={user.image} // Replace with the actual user image URL
            alt={`${user.firstName} ${user.lastName}`}
            className="w-full h-full object-cover"
          />
        </div>
        <span>
          {user.firstName} {user.lastName}
        </span>
      </div>
      <div className=" text-[0.82rem]">{review.length > maxReviewLength ? review.substring(0, maxReviewLength) + "..." : review}</div>
      <div className="flex items-center space-x-2">
        <span className=" text-xs text-yellow-25 mr-2">{rating}</span>
        <ReactStars
          count={5}
          size={15}
          edit={false}
          value={rating}
          color2={"#ffd700"}
        />
      </div>
      {review.length > maxReviewLength && ( // Show "See Full Review" only if the review is longer than maxReviewLength
        <button
          onClick={() => {
            setModalContent((prev) => {
              return { ...prev, user, rating, review };
            });
            toggleModal();
          }}
          className="text-blue-300 text-xs"
        >
          See Full Review
        </button>
      )}
    </div>
  );
};
