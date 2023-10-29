import React from "react";
import Skeleton from "react-loading-skeleton";
import { Course } from "./Course";
import { FaPlus } from "react-icons/fa"; // Import the plus icon
import { ToastLoading } from "../../../common/ToastLoading";
import { useDispatch, useSelector } from "react-redux";
import { getMyCourses } from "../../../../services/operations/profileAPI";
import { useEffect } from "react";
import { useState } from "react";

export const MyCourses = () => {
  const [myCourses, setMyCourses] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Define an async function to fetch enrolled courses
    // Call the async function to fetch courses when the component mounts
    fetchMyCourses();
  }, []);

  const dispatch = useDispatch();
  const { isLoading, name } = useSelector((state) => state.loader);

  const fetchMyCourses = async () => {
    try {
      // Call your API function to get enrolled courses
      console.log("Aya Dleete k abaad efetch rkne...")
      const { myCourses } = await getMyCourses(token, dispatch);
      console.log("Yeh Raha My Courses : " + myCourses?.length);
      setMyCourses(myCourses);
    } catch (error) {
      console.error("Error fetching My courses:", error);
    }
  };

  return (
    <div className="mx-[4%] my-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-white">My Courses</h2>
        <button className="flex items-center space-x-2 bg-yellow-25 text-richblack-800 rounded-md px-4 py-3">
          <FaPlus className="h-5 w-5" /> {/* Plus icon */}
          <span className="t">New</span>
        </button>
      </div>

      {/* Labels for Course, Duration, Price, and Actions */}
      <div className="mt-4 text-richblack-200">
        <div className="font-semibold flex mb-3 mx-4">
          <div className="w-[60%]">Course</div>
          <div className="flex w-2/5 gap-20 ">
            <div>Duration</div>
            <div>Price</div>
            <div>Actions</div>
          </div>
        </div>
        {isLoading && name === "getMyCourses" ? (
          <div>
            <div className="flex items-center p-6 border-b rounded-l">
              <div className="flex items-center space-x-4 w-[60%]">
                {/* <img
                src={course.thumbnail}
                alt={course.CourseName}
                className="w-[6rem] h-[6rem] rounded-md object-cover"
              /> */}
                <Skeleton width={64} height={64} />

                <div className="flex flex-col">
                  <Skeleton width={120} height={20} />
                  <Skeleton width={180} height={16} />
                  <div className="flex items-center space-x-2 text-richblack-200 text-sm mt-2">
                    <Skeleton width={200} height={12} />
                  </div>
                  <Skeleton width={40} height={14} />
                </div>
              </div>

              <div className="flex items-center gap-16 text-richblack-200 p-4 rounded-md w-2/5 text-sm">
                <Skeleton width={40} height={16} />
                <Skeleton width={40} height={16} />
                <div className="flex gap-2">
                  <Skeleton width={20} height={10} />
                  <Skeleton width={20} height={10} />
                </div>
              </div>
            </div>
            <div className="flex items-center p-6 border-b rounded-l">
              <div className="flex items-center space-x-4 w-[60%]">
                {/* <img
                src={course.thumbnail}
                alt={course.CourseName}
                className="w-[6rem] h-[6rem] rounded-md object-cover"
              /> */}
                <Skeleton width={64} height={64} />

                <div className="flex flex-col">
                  <Skeleton width={120} height={20} />
                  <Skeleton width={180} height={16} />
                  <div className="flex items-center space-x-2 text-richblack-200 text-sm mt-2">
                    <Skeleton width={200} height={12} />
                  </div>
                  <Skeleton width={40} height={14} />
                </div>
              </div>

              <div className="flex items-center gap-16 text-richblack-200 p-4 rounded-md w-2/5 text-sm">
                <Skeleton width={40} height={16} />
                <Skeleton width={40} height={16} />
                <div className="flex gap-2">
                  <Skeleton width={20} height={10} />
                  <Skeleton width={20} height={10} />
                </div>
              </div>
            </div>
            <div className="flex items-center p-6 border-b rounded-l">
              <div className="flex items-center space-x-4 w-[60%]">
                {/* <img
                src={course.thumbnail}
                alt={course.CourseName}
                className="w-[6rem] h-[6rem] rounded-md object-cover"
              /> */}
                <Skeleton width={64} height={64} />

                <div className="flex flex-col">
                  <Skeleton width={120} height={20} />
                  <Skeleton width={180} height={16} />
                  <div className="flex items-center space-x-2 text-richblack-200 text-sm mt-2">
                    <Skeleton width={200} height={12} />
                  </div>
                  <Skeleton width={40} height={14} />
                </div>
              </div>

              <div className="flex items-center gap-16 text-richblack-200 p-4 rounded-md w-2/5 text-sm">
                <Skeleton width={40} height={16} />
                <Skeleton width={40} height={16} />
                <div className="flex gap-2">
                  <Skeleton width={20} height={10} />
                  <Skeleton width={20} height={10} />
                </div>
              </div>
            </div>
          </div>
          
        ) : (
          myCourses.map((course) => (
            <Course
              key={course._id}
              course={course}
              isLoading={isLoading}
              name={name}
              fetchMyCourses={fetchMyCourses}
            />
          ))
        )}
      </div>
    </div>
  );
};
