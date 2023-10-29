import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from "react-icons/md";
import { getCourseDetails,deleteCourse } from "../../../../services/operations/courseAPI";
import { ConfirmationModal } from "../../../common/ConfirmationModal";
import { current } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Course = ({ course, isLoading, name ,fetchMyCourses}) => {
  const { token } = useSelector((state) => state.auth);
  const { currentCourse } = useSelector((state) => state.course);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleUpdateCourse() {
    console.log("Hello Jii Handel Update..");
    try {
      await getCourseDetails({ courseID: course._id }, dispatch);
      // toggleSubSectionModal();
      navigate("/update-course");

      // console.log("SubSection Created Successfully.");
    } catch (e) {
      console.log(e);
    }
  }

  // async function handleUpdateCourse() {
  //   console.log("Hello Jii Handel Update..");
  //   try {
  //     await getCourseDetails({ courseID: course._id }, token, dispatch);
  //     // toggleSubSectionModal();
  //     navigate("/update-course");

  //     // console.log("SubSection Created Successfully.");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
  
    // Format the date
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    // Format the time
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12) || 12; // Convert 0 to 12 for AM
    const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  
    // Combine the formatted date and time
    const formattedDateTime = `${formattedDate} | ${formattedTime}`;
  
    return formattedDateTime;
  }

  function formatDuration(durationInSeconds) {
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    return `${hours} hr ${minutes} mins`;
  }

  return (
    <div className="flex items-center p-6 border-b rounded-lg  border-richblack-600">
      <div className="flex items-center space-x-4 w-[60%]">
        <img
          src={course.thumbnail}
          alt={course.CourseName}
          className="w-[6rem] h-[6rem] rounded-md object-cover"
        />
        <div className="flex flex-col">
          <p className="text-white font-semibold">{course.courseName}</p>
          <p className="text-richblack-200 text-sm">
            {course.courseDescription}
          </p>
          <div className="flex items-center space-x-2 text-richblack-200 text-sm mt-2">
            <span className="text-richblack-50 text-xs">
              Created At: {formatDateTime(course.createdAt)}
            </span>
          </div>
          <button
            className={`${
              course.status === "Draft"
                ? " bg-richblack-800 text-pink-25"
                : " bg-richblack-800 text-yellow-25"
            } px-2 py-1 flex gap-2 items-center rounded-md text-sm w-[50%] mt-3`}
          >
            {course.status === "Draft" ? (
              <MdOutlineUnpublished />
            ) : (
              <MdOutlinePublishedWithChanges />
            )}

            {course.status}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-16 text-richblack-200 p-4 rounded-md w-2/5 text-sm">
        <span>{formatDuration(course.timeDuration)}</span>
        <span>{course.price}</span>
        <div className="flex gap-2">
          <button>
            <BiEditAlt
              className="text-lg cursor-pointer"
              onClick={handleUpdateCourse}
            />{" "}
            {/* Edit icon */}
          </button>
          <button>
            <RiDeleteBin5Line
              className="text-lg cursor-pointer"
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you Sure?",
                  text2: "This Course will be deleted",
                  btn1Text: "Delete",
                  btn2Text: "Cancel",
                  btn1Handler: async() => {
                    try{
                       await deleteCourse({courseID:course._id},token,dispatch)
                       fetchMyCourses();
                    }
                    catch(e){
                      console.log("Error while Deleting teh Course")
                    }
                    
                  }, // Handle the log out action here
                  btn2Handler: () => setConfirmationModal(null), // Close the modal on cancel
                })
              }
            />{" "}
            {/* Trash icon */}
          </button>
        </div>
      </div>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} isOpen={true} />
      )}
    </div>
  );
};
