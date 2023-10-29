import React from "react";
import { instructorDashboardDetails } from "../../../../services/operations/profileAPI";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InstructorChart } from "./InstructorChart";
import { Link } from "react-router-dom";

export const Instructor = () => {
  const { token } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const totalRevenueGenerated = courses.reduce(
    (acc, curr) => acc + curr.totalRevenueGenerated,
    0
  );
  const totalStudentsEnrolled = courses.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  useEffect(() => {
    (async () => {
      const { courses } = await instructorDashboardDetails(token, dispatch);
      if (courses.length) {
        setCourses(courses);
      }
    })();
  }, [token, dispatch]);

  return (
    <div className="text-white mx-[10%] space-y-4 py-6">
      <div className="flex flex-col mt-8">
        <h1 className="text-3xl font-bold mb-2">
          Hey, {currentUser?.firstName} 👋
        </h1>
        <p className="text-lg">Let's start something new!</p>
      </div>

      {courses?.length > 0 ? (
        <div className="flex flex-col mt-4">
          <div className=" flex">
            {totalStudentsEnrolled > 0 && <InstructorChart courses={courses} />}

            <div className="flex flex-col ml-8 bg-richblack-800 w-[40%] p-4 rounded-lg">
              <p className="text-xl font-semibold mb-2">Statistics</p>

              <div className="flex flex-col mb-4">
                <p className="text-lg text-richblack-200">Total Courses</p>
                <p className="text-2xl font-bold">{courses?.length}</p>
              </div>

              <div className="flex flex-col mb-4">
                <p className="text-lg text-richblack-200">Total Students</p>
                <p className="text-2xl font-bold">{totalStudentsEnrolled}</p>
              </div>

              <div className="flex flex-col">
                <p className="text-lg text-richblack-200">Total Income</p>
                <p className="text-2xl font-bold">Rs. {totalRevenueGenerated}</p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mt-6">
              <p className="text-2xl font-semibold">Your Courses</p>
              <Link
                to="/dashboard/my-courses"
                className="text-yellow-500 text-lg"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
              {courses?.slice(0, 3)?.map((course) => (
                <div
                  key={course._id}
                  className="text-white rounded-md bg-gray-900"
                >
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="w-full h-40 object-cover "
                  />
                  <div className="p-4">
                  <p className="font-semibold ">{course?.courseName}</p>
                  <p className="text-xs text-richblack-200">
                    {`${course?.totalStudentsEnrolled} Students | Rs. ${course?.price}`}
                  </p>
                </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white text-center mt-8">
          <p className="text-2xl font-semibold mb-2">
            You have not created any courses yet!
          </p>
          <Link to="/dashboard/add-course" className="text-yellow-500 text-xl">
            Create a Course
          </Link>
        </div>
      )}
    </div>
  );
};
