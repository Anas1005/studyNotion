import React, { useState, useEffect } from "react";
import { getEnrolledCourses } from "../../../../services/operations/profileAPI";
import { EnrolledCourse } from "./EnrolledCourse";
import { useDispatch, useSelector } from "react-redux";
// import { BookLoader } from "react-awesome-loaders";
import { ToastLoading } from "../../../common/ToastLoading";

export const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { token } = useSelector((state) => state.auth);


  useEffect(() => {
    // Define an async function to fetch enrolled courses
    // Call the async function to fetch courses when the component mounts
    fetchEnrolledCourses();
  }, []);

    const dispatch=useDispatch();   
    const {isLoading,name}=useSelector((state)=>state.loader)

  const fetchEnrolledCourses = async () => {
    try {
      // Call your API function to get enrolled courses
      const { enrolledCourses } = await getEnrolledCourses(token,dispatch);
      console.log("Yeh Raha Enrolled Courses : " + enrolledCourses?.length);
      setEnrolledCourses(enrolledCourses);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
    }
  };

  return (
    <div className="bg-opacity-50 backdrop-blur-lg p-4 md:p-8">
 
        <div>
        <h1 className="text-xl font-semibold text-center mb-4 bg-opacity-80 bg-gray-300 p-2 rounded-lg">
        Enrolled Courses
      </h1>
      <div className="flex flex-col">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row bg-richblack-800 text-white p-4 rounded-lg">
          <div className="w-full md:w-3/5">
            <p className="font-semibold text-center md:text-left">Course Name</p>
          </div>
          <div className="w-full md:w-1/5">
            <p className="font-semibold text-center md:text-left">Duration</p>
          </div>
          <div className="w-full md:w-1/5">
            <p className="font-semibold text-center md:text-left">Progress</p>
          </div>
        </div>

        {/* Display a message if there are no enrolled courses */}
        {enrolledCourses.length === 0 ? (
          <p className="text-white text-center mt-4">No enrolled courses found.</p>
        ) : (
          // Enrolled Courses
          enrolledCourses.map((course, index) => (
            <EnrolledCourse key={index} course={course} isLoading={isLoading} name={name} fetchEnrolledCourses={fetchEnrolledCourses} />
          ))
        )}
      </div>
        </div>
  
    
    </div>
  );
};
