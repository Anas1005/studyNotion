import React from "react";
import ReactStars from "react-stars";

export const CustomModal = ({modalContent, toggleModal }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-opacity-75 backdrop-blur-lg bg-richblack-800 z-40">
      <div className=" p-6 rounded-lg shadow-lg">
        <div className="absolute top-2 right-2 cursor-pointer text-white text-4xl" onClick={toggleModal}>
          &times;
        </div>
        <div className="bg-richblack-800 text-white p-4 rounded-lg space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={modalContent?.user?.image} // Replace with the actual user image URL
                alt={`${modalContent?.user?.firstName} ${modalContent?.user?.lastName}`}
                className="w-full h-full object-cover"
              />
            </div>
            <span>
              {modalContent?.user?.firstName} {modalContent?.user?.lastName}
            </span>
          </div>
          <div>{modalContent?.review}</div>
          <div className="flex items-center space-x-2">
            <span>{modalContent?.rating}</span>
            <ReactStars
              count={5}
              size={20}
              edit={false}
              value={modalContent?.rating}
              color2={"#ffd700"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
