import React, { useEffect, useRef, useState } from "react";
import { FaEllipsisV, FaCheck, FaTrash } from "react-icons/fa";
import { formatDuration } from "../../../../utilities/timeDuration";
import { ConfirmationModal } from "../../../common/ConfirmationModal";
import { deRegisterCourse } from "../../../../services/operations/courseAPI";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCourseProgress } from "../../../../services/operations/courseAPI";
import toast from "react-hot-toast";

export const EnrolledCourse = ({
  course,
  isLoading,
  name,
  fetchEnrolledCourses,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();
  const [completedLectures, setCompletedLectures] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(1);
  console.log("Comp", course?.courseName, completedLectures);
  console.log("Tot", course?.courseName, totalNoOfLectures);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Close the popup when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    (async () => {
      if (course) {
        const completedLectures = await getCourseProgress(
          { courseID: course?._id },
          token,
          dispatch
        );
        setCompletedLectures(completedLectures?.length);
        const totalNoOfLectures =
          course?.courseContent?.reduce((accumulator, section) => {
            return accumulator + section?.subSection?.length;
          }, 0) || 0;
        setTotalNoOfLectures(totalNoOfLectures);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 rounded-md border-b border-richblack-600 cursor-pointer relative">
      <div
        className="md:flex items-center w-full md:w-3/5"
        onClick={() =>{
         if (totalNoOfLectures===0){
          toast.error("No Lecture Uploaded for this Course Yet!!")
         }
         else{
          navigate(
            `/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/subSection/${course?.courseContent?.[0]?.subSection?.[0]?._id}`
          )
         }
        }}
      >
        <div className="bg-gray-200 w-12 h-12 rounded-md mr-4">
          {isLoading && name === "getEnrolledCourses" ? (
            <Skeleton width={64} height={64} />
          ) : (
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="w-full h-full object-cover rounded-md"
            />
          )}
        </div>
        <div className="flex flex-col">
          {isLoading && name === "getEnrolledCourses" ? (
            <>
              <Skeleton width={120} height={20} />
              <Skeleton width={180} height={16} />
            </>
          ) : (
            <>
              <p className="font-semibold text-white">{course?.courseName}</p>
              <p className="text-richblack-200 text-xs">
                {course?.courseDescription}
              </p>
            </>
          )}
        </div>
      </div>
      <div className="md:w-1/5 mt-2 md:mt-0">
        {isLoading && name === "getEnrolledCourses" ? (
          <Skeleton width={40} height={12} />
        ) : (
          <p className="text-white ">{formatDuration(course?.timeDuration)}</p>
        )}
      </div>
      <div className="w-full md:w-1/5 relative">
        <div className="flex items-center">
          <div className="bg-blue-200 h-[0.75rem] rounded-lg w-full md:w-[75%]">
            {isLoading && name === "getEnrolledCourses" ? (
              <Skeleton width={60} height={12} />
            ) : (
              <>
                <div
                  className="bg-blue-500 h-full rounded-lg transition-all duration-700"
                  style={
                    totalNoOfLectures !== 0
                      ? {
                          width: `${
                            (100 * completedLectures) / totalNoOfLectures
                          }%`,
                        }
                      : {
                          width: 0,
                        }
                  }
                ></div>
                <span className=" text-white">
                  {totalNoOfLectures !== 0
                    ? Math.round((100 * completedLectures) / totalNoOfLectures)
                    : 0}{" "}
                  %
                </span>
              </>
            )}
          </div>
          <div
            className="mt-2 md:mt-0 md:mr-2 cursor-pointer flex items-center"
            onClick={togglePopup}
          >
            {isLoading && name === "getEnrolledCourses" ? (
              <Skeleton width={24} height={24} />
            ) : (
              <FaEllipsisV size={18} className="text-white mb-[30%] ml-[65%]" />
            )}
          </div>
        </div>
        {/* Popup */}
        {isPopupOpen && (
          <div
            className="absolute top-full right-0 mt-2 md:mr-2 bg-white rounded-lg shadow-md py-2 z-40"
            ref={popupRef}
          >
            <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
              <FaCheck size={18} className="mr-2" />
              Mark as Complete
            </div>
            <div
              className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you Sure You want to De-Register?",
                  text2: "You will be removed from the Course!!",
                  btn1Text: "Yes",
                  btn2Text: "Cancel",
                  btn1Handler: async () => {
                    try {
                      await deRegisterCourse(
                        { courseID: course?._id },
                        token,
                        dispatch
                      );
                      fetchEnrolledCourses();
                      setConfirmationModal(null);

                      // fetchMyCourses();
                    } catch (e) {
                      console.log("Error while De-Regsitering from the Course");
                    }
                  }, // Handle the log out action here
                  btn2Handler: () => setConfirmationModal(null), // Close the modal on cancel
                })
              }
            >
              <FaTrash size={18} className="mr-2" />
              De-Register
            </div>
          </div>
        )}
      </div>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} isOpen={true} />
      )}
    </div>
  );
};
