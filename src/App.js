import "./App.css";
import {Home} from "./pages/Home";
import { Routes, useNavigate } from "react-router-dom";
import { Route } from "react-router-dom";
import { SignUp } from "./pages/SignUp";
import { LogIn } from "./pages/LogIn";
import {About} from "./pages/About";
import { OTPVerification } from "./pages/OTPVerification";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { NavBar } from "./components/common/NavBar";
import { ContactUs } from "./pages/ContactUs";
import { Main } from "./pages/Main";
import { VideoDetails } from "./components/core/ViewCourse/VideoDetails";
import { DashBoard } from "./pages/DashBoard";
import {RxHamburgerMenu} from "react-icons/rx"
import { ProtectorRoute } from "./pages/ProtectorRoute";
import { Instructor } from "./components/core/dashboard/InstructorDashboard/Instructor";
import { ViewCourse } from "./pages/ViewCourse";
import { MyProfile } from "./components/core/dashboard/MyProfile";
import { EnrolledCourses } from "./components/core/dashboard/EnrolledCourses/EnrolledCourses";
import { Cart } from "./components/core/dashboard/Cart/index";
import { Catalog } from "./pages/Catalog";
import { AddCourse } from "./components/core/dashboard/AddCourse/index";
import { CourseDetails } from "./pages/CourseDetails";
import { MyCourses } from "./components/core/dashboard/MyCourses/MyCourses";
import { UpdateCourse } from "./components/core/dashboard/UpdateCourse/index";
import { Settings } from "./components/core/dashboard/Settings";
import { useDispatch, useSelector } from "react-redux";
import { SkeletonTheme } from "react-loading-skeleton";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function App() {
  const { token } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.profile);
  const [isSideNavOpen,setIsSideNavOpen]=useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Wrap navigate inside a function to avoid calling it unconditionally
  useEffect(() => {
    if (token) {
      console.log("Navigating To Main...");

      // Redirect to login if user is not logged in
      navigate("/dashboard/my-profile");
    }
  }, [token]);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <NavBar />
        {/* {
          <RxHamburgerMenu className=" text-white text-[1.5rem] m-[1rem] cursor-pointer flex md:flex" onClick={()=>setIsSideNavOpen(true)}/>
        } */}
        <Routes>
          <Route
            path="/reset-password/:randomNumber/:userID"
            element={<ResetPassword />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/catalog/:categoryName/:categoryID"
            element={<Catalog />}
          />
          <Route path="/course/:courseID" element={<CourseDetails />} />
          <Route path="/main" element={<Main />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            element={
              <ProtectorRoute>
                <DashBoard />
              </ProtectorRoute>
            }
          >
            <Route path="/dashboard/my-profile" element={<MyProfile />} />
            <Route path="/dashboard/settings" element={<Settings />} />
            {currentUser?.accountType === "Student" && (
              <>
                <Route
                  path="/dashboard/enrolled-courses"
                  element={<EnrolledCourses />}
                />
                <Route path="/dashboard/cart" element={<Cart />} />
              </>
            )}
            {currentUser?.accountType === "Instructor" && (
              <>
                <Route path="/dashboard/instructor" element={<Instructor />} />
                <Route path="/dashboard/my-courses" element={<MyCourses />} />
                <Route path="/dashboard/add-course" element={<AddCourse />} />
                <Route path="/update-course" element={<UpdateCourse />} />
              </>
            )}
          </Route>

          <Route
            element={
              <ProtectorRoute>
                <ViewCourse />
              </ProtectorRoute>
            }
          >
            {currentUser?.accountType === "Student" && (
              <>
                <Route
                  path="/view-course/:courseID/section/:sectionID/subSection/:subSectionID"
                  element={<VideoDetails />}
                />
              </>
            )}
          </Route>

        </Routes>
      </SkeletonTheme>
    </div>
  );
}

export default App;
