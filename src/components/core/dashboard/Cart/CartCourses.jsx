import React, { useState, useEffect } from "react";
import ReactStars from "react-stars";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../../../slices/cartSlice";
import { calculateAverageRating } from "../../../../utilities/averageRatings";
import Skeleton from "react-loading-skeleton";

export const CartCourses = ({ cart }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); // Dummy isLoading state initially set to true

  useEffect(() => {
    // Simulate loading for a few seconds before setting isLoading to false
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Adjust the time as needed

    return () => clearTimeout(timeout); // Clear the timeout when unmounting
  }, []);

  return (
    <div className="">
      {cart?.map((course, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-6 border-b rounded-lg  border-richblack-600"
        >
          {/* <div className="flex items-center"> */}
            {/* Add skeleton loading for the course image */}
            <div className="flex items-center space-x-4">

            {isLoading ? (
              <Skeleton width={80} height={80} />
            ) : (
              <img
                src={course?.thumbnail}
                alt={course.courseName}
                className="w-20 h-20 rounded-md object-cover"
              />
            )}

            <div className="flex flex-col gap-2">
              {/* Add skeleton loading for course name */}
              {isLoading ? (
                <Skeleton width={100} height={20} />
              ) : (
                <p className="font-semibold text-white">{course?.courseName}</p>
              )}

              {/* Add skeleton loading for category name */}
              {isLoading ? (
                <Skeleton width={80} height={15} />
              ) : (
                <p className="text-richblack-200 text-xs">
                  {course?.category?.name}
                </p>
              )}

              <div className="flex items-center space-x-2 text-richblack-200 text-sm">
                {/* Add skeleton loading for rating */}
                {isLoading ? (
                  <>
                    <Skeleton width={40} height={12} />
                    <Skeleton width={60} height={12} />
                    <Skeleton width={80} height={12} />
                  </>
                ) : (
                  <>
                    <span className="text-yellow-25 text-xs">
                      {calculateAverageRating(course?.ratingsAndReviews)}
                    </span>
                    <ReactStars
                      count={5}
                      size={12.5}
                      edit={false}
                      value={calculateAverageRating(course?.ratingsAndReviews)}
                      activeColor={"#ffd700"}
                      emptyIcon={<GiNinjaStar />}
                      fullIcon={<GiNinjaStar />}
                    />
                    <span className="text-blue-500 text-xs">
                      {course?.ratingsAndReviews?.length} Ratings
                    </span>
                  </>
                )}
              </div>
            </div>

            </div>
          {/* </div> */}

          <div className="flex flex-col gap-3 items-end">
            <button className="flex items-center space-x-2 text-red-500">
              <RiDeleteBin6Line
                className="text-xl"
                onClick={() => dispatch(removeFromCart(course._id))}
              />
              <span className="text-sm">Remove</span>
            </button>

            {/* Add skeleton loading for course price */}
            {isLoading ? (
              <Skeleton width={40} height={12} />
            ) : (
              <p className="text-yellow-25 text-xl font-bold">
              ₹ {course?.price}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
