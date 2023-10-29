import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { VideoDetailsSideBar } from "../components/core/ViewCourse/VideoDetailsSideBar";
import { Outlet, useParams } from "react-router-dom";
import {
  getCourseDetails,
  getCourseProgress,
} from "../services/operations/courseAPI";
import { AddReview } from "../components/core/ViewCourse/AddReview";
import {
  setCompletedLectures,
  setCourseSectionData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useState } from "react";

export const ViewCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const { currentCourse } = useSelector((state) => state.course);
  const {isLoading,name}= useSelector((state) => state.loader);
  const { courseID } = useParams();
  const dispatch = useDispatch();
  const [isAddReviewVisible, setAddReviewVisible] = useState(false);

  const toggleAddReview = () => {
    console.log("Toggled...........")
    setAddReviewVisible(!isAddReviewVisible);
  };

    console.log("In ViewCourse..")

  useEffect(() => {
    // console.log("In ViewCourse..")
    ;(async() => {
      await getCourseDetails({ courseID }, dispatch);
        console.log("In ViewCourse.UseFfect CourseDeatisl fetched...")

      dispatch(setCourseSectionData(currentCourse?.courseContent));
      //
      const completedLectures=await getCourseProgress({ courseID }, token,dispatch);
      dispatch(setCompletedLectures(completedLectures));

      dispatch(
        setTotalNoOfLectures(
          currentCourse?.courseContent?.reduce((accumulator, section) => {
            return accumulator + section?.subSection?.length;
          }, 0)
        )
      );
    })();
  }, [courseID]);

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] w-[100vw]">
     {/* { */}
      {/* isLoading && name==="getCourseDetails" ? (<div>Loading....</div>):( */}
        <VideoDetailsSideBar onAddReviewClick={toggleAddReview} />

    
      <div className="h-[calc(100vh-3.5rem)] overflow-auto w-[100%]">
        <Outlet />
      </div>


      {isAddReviewVisible && <AddReview onClose={toggleAddReview} />}
    </div>
  );
};
