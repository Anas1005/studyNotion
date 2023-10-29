import React from "react"; // Import the Share icon
import { Helmet } from "react-helmet";
import { FaClock, FaCertificate, FaMobile, FaTv } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5"; // Import other icons
import { useDispatch, useSelector } from "react-redux";
import { ConfirmationModal } from "../../common/ConfirmationModal";
import { addToCart, removeFromCart } from "../../../slices/cartSlice";
import { createOrder } from "../../../services/operations/studentFeaturesAPI";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../../services/operations/profileAPI";
import toast from "react-hot-toast";

export const CourseSummary = ({ course, setConfirmationModal }) => {
  const { token } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.profile);
  const { cart } = useSelector((state) => state.cart);

  const isEnrolled = currentUser?.courses?.includes(course?._id);
  const isAddedToCart = cart.some(
    (cartCourse) => cartCourse?._id === course?._id
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBuyCourse = async () => {
    const courseID = course?._id;
    if (token) {
      await createOrder(
        [courseID],
        currentUser,
        token,
        navigate,
        dispatch,
        cart
      );
      console.log("Created the Order...");
      return;
    } else {
      setConfirmationModal({
        text1: "You are not Logged In",
        text2: "Please Log In to Buy the Course",
        btn1Text: "Log In",
        btn2Text: "Cancel",
        btn1Handler: () => {
          navigate("/login");
        },
        btn2Handler: () => setConfirmationModal(null),
      });

      
    }
  };

  const shareCourse = async () => {
    try {
      await navigator.share({
        title: "Course Title",
        text: "Check out this course!",
        url: window.location.href,
      });
    } catch (error) {
      // Handle any errors
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="bg-richblack-800 rounded-sm w-[306px] flex flex-col gap-3 shadow-[0px_0px_11px_#3e3e3e;]">
      <Helmet>
        <title>{`Course Title - Your Website Name`}</title>
        <meta name="description" content="Description of the course." />
        <meta
          property="og:title"
          content={`Course Title - Your Website Name`}
        />
        <meta property="og:description" content="Description of the course." />
        <meta property="og:url" content="https://your-course-url.com" />
        <meta property="og:image" content="https://your-course-image-url.com" />
      </Helmet>

      <img
        src={course?.thumbnail}
        alt={course?.courseName}
        className="w-full h-[200px] rounded-md object-cover"
      />

      <div className="bg-richblack-800 rounded-lg flex flex-col gap-3 py-6 px-4">
        <p className="text-2xl font-semibold text-white">Rs. {course?.price}</p>

        <button
          className={`${
            isEnrolled ? "bg-green-500" : "bg-yellow-25"
          } text-richblack-900 text-sm font-semibold px-2 py-3 rounded-md w-full`}
          onClick={() => {
            if (isEnrolled) {
              navigate("/dashboard/enrolled-courses")
              console.log("Access Course");
            } else if (!token) {
              setConfirmationModal({
                text1: "You are not Logged In",
                text2: "Please Log In to Add/Remove from Cart",
                btn1Text: "Log In",
                btn2Text: "Cancel",
                btn1Handler: () => {
                  navigate("/login");
                },
                btn2Handler: () => setConfirmationModal(null),
              });
            } else {
              if (isAddedToCart) {
                dispatch(removeFromCart(course?._id));
                console.log("Remove from Cart");
              } else {
                dispatch(addToCart(course));
                console.log("Add to Cart");
              }
            }
          }}
          disabled={false}
        >
          {isEnrolled
            ? "Access Course"
            : isAddedToCart
            ? "Remove from Cart"
            : "Add to Cart"}
        </button>

        <button
          className={`${
            isEnrolled ? "bg-green-500" : "bg-richblack-900"
          } text-white text-sm font-semibold px-2 py-3 rounded-md w-full`}
          onClick={() => {
            if (isEnrolled) {
              // Handle navigation to the course since the user is already enrolled
              console.log("Access Course");
            } else {
              // Handle buying the course
              handleBuyCourse();
            }
          }}
          disabled={false}
        >
          {isEnrolled ? "Go to Course" : "Buy Now"}
        </button>

        <p className="text-richblack-200 text-sm text-center my-2">
          30 Day Money-Back Guarantee
        </p>

        <div className="flex flex-col gap-2 text-green-500 text-xs">
          <div className=" text-white text-[0.82rem] mb-1">
            This Course includes:
          </div>
          <div className="flex items-center gap-2">
            <FaClock size={15} /> {/* Clock icon */}
            <span>8 hours on demand video</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCertificate size={15} /> {/* Certificate icon */}
            <span>Full lifetime access</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMobile size={15} /> {/* Mobile icon */}
            <span>Access on Mobile and TV</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTv size={15} /> {/* TV icon */}
            <span>Certificate of completion</span>
          </div>
        </div>

        <button
          className=" flex justify-center items-center mt-2 text-white text-sm font-semibold p-2 rounded-md w-full"
          onClick={() => console.log("Share")}
          disabled={false}
        >
          <IoShareSocial size={20} onClick={shareCourse} />
        </button>
      </div>
    </div>
  );
};
