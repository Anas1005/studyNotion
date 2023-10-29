const BASE_URL="https://study-notion-be.onrender.com/api/v1/";
  // const BASE_URL="http://localhost:4000/api/v1/"
// const BASE_URL=process.env.REACT_APP_SERVER_URL;
// console.log("UR is:"+BASE_URL)

export const endpoints={
    CATEGORIES_API:BASE_URL+"course/getAllCategories",
    SENDOTP_API:BASE_URL+"auth/sendOTP",
    SIGNUP_API:BASE_URL+"auth/signUp",
    LOGIN_API:BASE_URL+"auth/logIn",
    CONTACT_US_API:BASE_URL+"auth/contactUs",
    FORGOTPASSWORD_API:BASE_URL+"auth/forgotPassword",
    RESETPASSWORD_API:BASE_URL+"auth/resetPassword",
    GET_USER_DETAILS_API:BASE_URL+"profile/getUserDetails",
    GET_ENROLLED_COURSES_API:BASE_URL+"profile/getEnrolledCourses",
    UPDATE_PROFILE_API:BASE_URL+"profile/updateProfile",
    UPDATE_PROFILE_PICTURE_API:BASE_URL+"profile/updateProfilePicture",
    INSTRUCTOR_DASHBOARD_API:BASE_URL+"profile/instructorDashboardDetails",
    UPDATE_PASSWORD_API:BASE_URL+"profile/updatePassword",
    CREATE_COURSE_API:BASE_URL+"course/createCourse",
    GET_COURSE_DETAILS_API:BASE_URL+"course/getCourseDetails",
    GET_ALL_CATEGORIES_API:BASE_URL+"course/getAllCategories",
    GET_CATEGORY_PAGE_DETAILS_API:BASE_URL+"course/getCategoryPageDetails",
    CREATE_SECTION_API:BASE_URL+"course/createSection",
    CREATE_SUBSECTION_API:BASE_URL+"course/createSubSection",
    PUBLISH_COURSE_API:BASE_URL+"course/publishCourse",
    GET_MY_COURSES_API:BASE_URL+"profile/getMyCourses",
    UPDATE_COURSE_API:BASE_URL+"course/updateCourse",
    DELETE_COURSE_API:BASE_URL+"course/deleteCourse",
    DEREGISTER_COURSE_API:BASE_URL+"course/deRegisterCourse",
    GET_COURSE_PROGRESS_API:BASE_URL+"course/getCourseProgress",
    UPDATE_COURSE_PROGRESS_API:BASE_URL+"course/updateCourseProgress",

    ADD_RATING_AND_REVIEW_API:BASE_URL+"course/createRatingAndReview",
    
    COURSE_PAYMENT_API:BASE_URL+"payment/capturePayment",
    PAYMENT_VERIFY_API:BASE_URL+"payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API:BASE_URL+"payment/sendPaymentSuccessEmail"


}