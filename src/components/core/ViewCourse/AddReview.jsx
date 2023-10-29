import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { createRatingAndReview } from "../../../services/operations/courseAPI";

export const AddReview = ({ onClose}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const {token}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();

  const { currentUser } = useSelector((state) => state.profile);
  const {currentCourse } = useSelector((state)=>state.course)

  const handleRatingChange = (newRating) => {
    console.log(newRating);
    setRating(newRating);
  };

  const handleReviewChange = (event) => {
    console.log(event.target.value);
    setReview(event.target.value);
  };

  const handlePublish = async() => {
    await createRatingAndReview({courseID:currentCourse?._id,rating,review},token,dispatch);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
      <div className="bg-opacity-80 backdrop-blur-lg p-4 rounded-lg border border-gray-300 border-opacity-30 w-[40vw]">
        <h1 className="text-xl text-white text-center font-bold mb-4">Add Review</h1>
        <hr className=" mb-4 opacity-30" />
        <div className="flex justify-center items-center mb-4">
          <img
            src={currentUser?.image}
            alt="User"
            className="w-16 h-16 rounded-full mr-4"
          />
          <span className="text-lg text-richblack-100 font-semibold">{`${currentUser?.firstName} ${currentUser?.lastName}`}</span>
        </div>
        <div className="mb-4">
          <ReactStars
          className=" flex justify-center"
            count={5}
            value={rating}
            onChange={handleRatingChange}
            size={24}
            isHalf={true}
            activeColor="#FFD700"
          />
        </div>
        <div className="mb-4">
          <textarea
            rows="4"
            placeholder="Add Your Experience"
            value={review}
            onChange={handleReviewChange}
            className="w-full p-2 rounded-lg border border-gray-300 bg-[#15131300] text-white text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500 mr-4 hover:text-gray-700">
            Cancel
          </button>
          <button onClick={handlePublish} className="text-blue-500 hover:text-blue-700">
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};
