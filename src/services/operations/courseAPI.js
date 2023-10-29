import { apiConnector } from "../apiConnectors";
import { endpoints } from "../apis";
import { toast } from "react-hot-toast";
import { setCourse } from "../../slices/courseSlice"; // Import toast from react-hot-toast
import { setCompletedLectures, setEntireCourseData } from "../../slices/viewCourseSlice";

const {
  CREATE_COURSE_API,
  UPDATE_COURSE_API,
  GET_COURSE_DETAILS_API,
  GET_ALL_CATEGORIES_API,
  GET_CATEGORY_PAGE_DETAILS_API,
  PUBLISH_COURSE_API,
  DELETE_COURSE_API,
  DEREGISTER_COURSE_API,
  GET_COURSE_PROGRESS_API,
  UPDATE_COURSE_PROGRESS_API,
  ADD_RATING_AND_REVIEW_API
} = endpoints;

export const createCourse = async (receivedForm, token, dispatch) => {
  console.log("Crate Course pe hoon");
  try {
    const formData = new FormData();
    formData.append("courseName", receivedForm.courseName);
    formData.append("courseDescription", receivedForm.courseDescription);
    formData.append("price", receivedForm.price);
    formData.append("category", receivedForm.category);
    console.log("Yh Type hai :" + typeof receivedForm.category);
    // Append tags, requirements, and benefits as needed
    receivedForm.tags.forEach((tag) => formData.append("tags", tag));
    receivedForm.requirements.forEach((requirement) =>
      formData.append("requirements", requirement)
    );
    receivedForm.benefits.forEach((benefit) =>
      formData.append("benefits", benefit)
    );

    // Append the thumbnail file (inputName should match the name attribute of your file input)
    formData.append("thumbnail", receivedForm.thumbnail);

    // Make an API call to update the profile picture
    const headers = {
      Authorization: `Bearer ${token}`,
      // Include any other headers needed for your API request
    };
    // const toastID=toast.loading("Loading....")
    const result = await apiConnector(
      "POST",
      CREATE_COURSE_API,
      formData,
      headers,
      null,
      dispatch
    );
    console.log("Ho Gya Course Create", result?.data?.newCourse);

    // Check if registration was successful (you might need to define what a successful response looks like)
    if (result.data.success) {
      // Show a success toast for successful registration
      toast.success("Create Course API Call Sucessfull");
      dispatch(setCourse(result?.data?.newCourse));
    } else {
      // Show an error toast if registration was not successful
      toast.error("Error while Creating Course:");
    }
  } catch (error) {
    console.error("Error while le Creating Course::", error);
    // Show an error toast for any other errors
    toast.error(error.response.data.message);
    throw error;
  }
};

export const updateCourse = async (receivedForm, token, dispatch) => {
  console.log("Crate Course pe hoon");
  try {
    const formData = new FormData();
    formData.append("courseID", receivedForm.courseID);
    formData.append("courseName", receivedForm.courseName);
    formData.append("courseDescription", receivedForm.courseDescription);
    formData.append("price", receivedForm.price);
    formData.append("category", receivedForm.category);
    console.log("Yh Type hai :" + typeof receivedForm.category);
    // Append tags, requirements, and benefits as needed
    receivedForm.tags.forEach((tag) => formData.append("tags", tag));
    receivedForm.requirements.forEach((requirement) =>
      formData.append("requirements", requirement)
    );
    receivedForm.benefits.forEach((benefit) =>
      formData.append("benefits", benefit)
    );

    // Append the thumbnail file (inputName should match the name attribute of your file input)
    formData.append("thumbnail", receivedForm.thumbnail);

    // Make an API call to update the profile picture
    const headers = {
      Authorization: `Bearer ${token}`,
      // Include any other headers needed for your API request
    };
    const result = await apiConnector(
      "POST",
      UPDATE_COURSE_API,
      formData,
      headers,
      null,
      dispatch
    );
    console.log("Ho Gya Course Update", result?.data?.updatedCourse);

    // Check if registration was successful (you might need to define what a successful response looks like)
    if (result.data.success) {
      // Show a success toast for successful registration
      toast.success("Update Course API Call Sucessfull");
    } else {
      // Show an error toast if registration was not successful
      toast.error("Error while Updating Course:");
    }
  } catch (error) {
    console.error("Error while Updating Course::", error);
    // Show an error toast for any other errors
    toast.error(error.response.data.message);
    throw error;
  }
};

export const deleteCourse = async (formData, token, dispatch) => {
  console.log("Delet Course Details pe hoon");
  console.log("Deleet Details pe hoon:", formData.courseID);
  try {
    // Make an API call to submit OTP and register the user
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const toastID = toast.loading("Deleting....");
    const result = await apiConnector(
      "POST",
      DELETE_COURSE_API,
      formData,
      headers,
      null,
      dispatch
    );
    // console.log(
    //   "Ho Gya Course Details Fetched",
    //   result?.data?.course
    // );

    // Check if registration was successful (you might need to define what a successful response looks like)
    if (result.data.success) {
      // Show a success toast for successful registration
      toast.dismiss(toastID);
      toast.success("Course Deleted");
      // dispatch(setCourse(result?.data?.course));

      // return {userDetails:result?.data?.userDetails}
    } else {
      // Show an error toast if registration was not successful
      toast.error("Error while Deleeting the Course Details:");
    }
  } catch (error) {
    console.error("Error while Deleting Course Details:", error);
    // Show an error toast for any other errors
    toast.error(error.response.data.message);
    throw error;
  }
};

export const deRegisterCourse = async (formData, token, dispatch) => {
  console.log("DeRegister Course Details pe hoon");
  console.log("Deleet Details pe hoon:", formData.courseID);
  try {
    // Make an API call to submit OTP and register the user
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const toastID = toast.loading("De-Registering....");
    const result = await apiConnector(
      "POST",
      DEREGISTER_COURSE_API,
      formData,
      headers,
      null,
      dispatch
    );
    // console.log(
    //   "Ho Gya Course Details Fetched",
    //   result?.data?.course
    // );

    // Check if registration was successful (you might need to define what a successful response looks like)
    if (result.data.success) {
      // Show a success toast for successful registration
      toast.dismiss(toastID);
      toast.success("De-Registered Successfully....");
      // dispatch(setCourse(result?.data?.course));

      // return {userDetails:result?.data?.userDetails}
    } else {
      // Show an error toast if registration was not successful
      toast.error("Error while DeRegistering from the Course:");
    }
  } catch (error) {
    console.error("Error while DeRegistering from the Course:", error);
    // Show an error toast for any other errors
    toast.error(error.response.data.message);
    throw error;
  }
};




export const getCourseDetails = async (formData,dispatch) => {
  console.log("Get Course Details pe hoon");
  console.log("Get Course Details pe hoon:", formData.courseID);
  try {
    // Make an API call to submit OTP and register the user
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    const result = await apiConnector(
      "POST",
      GET_COURSE_DETAILS_API,
      formData,
      null,
      null,
      dispatch
    );
    console.log("Ho Gya Course Details Fetched", result?.data?.course);

    // Check if registration was successful (you might need to define what a successful response looks like)
    if (result.data.success) {
      // Show a success toast for successful registration
      toast.success("Course Details API Call Sucessfull");
      dispatch(setCourse(result?.data?.course));
      // dispatch(setEntireCourseData(result?.data?.course))
      // return {course:result?.data?.course}

      // return {userDetails:result?.data?.userDetails}
    } else {
      // Show an error toast if registration was not successful
      toast.error("Error while fetching the Course Details:");
    }
  } catch (error) {
    console.error("Error while fetching the Course Details:", error);
    // Show an error toast for any other errors
    toast.error(error.response.data.message);
    throw error;
  }
};

export const getAllCategories = async (dispatch) => {
  console.log("Get Categorye Pe hoon");
  try {
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    //   // Include any other headers needed for your API request
    // };
    // const toastID=toast.loading("Loading");
    const result = await apiConnector(
      "GET",
      GET_ALL_CATEGORIES_API,
      null,
      null,
      null,
      dispatch
    );
    // console.log("Ho Gya Course Create",result?.data?.newCourse);

    // Check if registration was successful (you might need to define what a successful response looks like)
    if (result.data.success) {
      // toast.dismiss(toastID)
      // Show a success toast for successful registration
      // toast.success("CGet All Ctaegories API Call Sucessfull");
      return { allCategories: result?.data?.allCategories };
      // return {thumbnailURL:result?.data?.thumbnailURL}
    } else {
      // Show an error toast if registration was not successful
      // toast.error("Error while Geetting All Ctaegories Course:");
    }
  } catch (error) {
    console.error("Error while le CGetting All Catrgories::", error);
    // Show an error toast for any other errors
    // toast.error(error.response.data.message);
    throw error;
  }
};


export const getCategoryPageDetails = async (formData,dispatch) => {
  console.log("Get Category Page Details pe hoon");
  console.log("Get Category Page Details pe hoonn:", formData.categoryID);
  try {
    // // Make an API call to submit OTP and register the user
    // const headers = {
    //   Authorization: `Bearer ${token}`,
    // };
    const result = await apiConnector(
      "POST",
      GET_CATEGORY_PAGE_DETAILS_API,
      formData,
      null,
      null,
      dispatch
    );
    console.log("Ho Gya CATEGORY pAGE Details Fetched", result?.data?.subLinks);

    // Check if registration was successful (you might need to define what a successful response looks like)
    if (result.data.success) {
      // Show a success toast for successful registration
      toast.success("CATEGORY Page Details API Sucessfull");
      return {subLinks: result?.data?.subLinks}
   

      // return {userDetails:result?.data?.userDetails}
    } else {
      // Show an error toast if registration was not successful
      toast.error("Error while fetching the Category Page Details:");
    }
  } catch (error) {
    console.error("Error while fetching the Category Page Details:", error);
    // Show an error toast for any other errors
    toast.error(error.response.data.message);
    throw error;
  }
};

export const publishCourse = async (formData, token, dispatch) => {
  console.log("Publish cOPURSE  pe hoon");
  console.log("Get Course Details pe hoon:", formData.courseID);
  try {
    // Make an API call to submit OTP and register the user
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await apiConnector(
      "POST",
      PUBLISH_COURSE_API,
      formData,
      headers,
      null,
      dispatch
    );
    console.log("Ho Gya Course", result?.data?.updatedCourse);

    // Check if registration was successful (you might need to define what a successful response looks like)
    if (result.data.success) {
      // Show a success toast for successful registration
      toast.success("Cpurse Publish API Call Sucessfull");
      // dispatch(setCourse(result?.data?.updatedCourse));

      // return {userDetails:result?.data?.userDetails}
    } else {
      // Show an error toast if registration was not successful
      toast.error("Error while Publising Course");
    }
  } catch (error) {
    console.error("Error while Publisihng Course:", error);
    // Show an error toast for any other errors
    toast.error(error.response.data.message);
    throw error;
  }
};

export const getCourseProgress = async (formData,token,dispatch) => {
  console.log("Get Course Progress pe hoon");

  try {
    // Make an API call to submit OTP and register the user
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await apiConnector(
      "POST",
      GET_COURSE_PROGRESS_API,
      formData,
      headers,
      null,
      dispatch
    );
    console.log("Ho Gya Course Progress Fetched", result?.data?.completedLectures);

    // Check if registration was successful (you might need to define what a successful response looks like)
    if (result.data.success) {
      // Show a success toast for successful registration
      toast.success("Course Progress API Call Sucessfull",result?.data?.completedLectures);
      return result?.data?.completedLectures;
      
     
      //  return {completedLectures:result?.data?.completedLectures}

      // return {userDetails:result?.data?.userDetails}
    } else {
      // Show an error toast if registration was not successful
      toast.error("Error while fetching the Course Progress Details:");
    }
  } catch (error) {
    console.error("Error while fetching the Course  Progress Details:", error);
    // Show an error toast for any other errors
    toast.error(error.response.data.message);
    throw error;
  }
};

export const updateCourseProgress = async (formData,token,dispatch) => {
  console.log("Get Course Progress pe hoon");

  try {
    // Make an API call to submit OTP and register the user
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const result = await apiConnector(
      "POST",
      UPDATE_COURSE_PROGRESS_API,
      formData,
      headers,
      null,
      dispatch
    );
    console.log("Ho Gya Course Progress Update", result?.data?.completedLectures);

    // Check if registration was successful (you might need to define what a successful response looks like)
    if (result.data.success) {
      // Show a success toast for successful registration
      toast.success("Update Course Progress API Call Sucessfull",result?.data?.completedLectures);
      return result?.data?.completedLectures;
      
      // dispatch(setCompletedLectures(result?.data?.completedLectures));
      //  return {completedLectures:result?.data?.completedLectures}

      // return {userDetails:result?.data?.userDetails}
    } else {
      // Show an error toast if registration was not successful
      toast.error("Error while Updating the Course Progress Details:");
    }
  } catch (error) {
    console.error("Error while fetching the Course  Progress Details:", error);
    // Show an error toast for any other errors
    toast.error(error.response.data.message);
    throw error;
  }
};

export const createRatingAndReview = async (formData, token, dispatch) => {
  console.log("Crate Rating pe hoon");
  try {
    
    // Make an API call to update the profile picture
    const headers = {
      Authorization: `Bearer ${token}`,
      // Include any other headers needed for your API request
    };
    const result = await apiConnector(
      "POST",
      ADD_RATING_AND_REVIEW_API,
      formData,
      headers,
      null,
      dispatch
    );
    console.log("Ho Gya Rating Create");

    // Check if registration was successful (you might need to define what a successful response looks like)
    if (result.data.success) {
    
      toast.success(result?.data?.message);
     
    } else {
      // Show an error toast if registration was not successful
      toast.error(result?.data?.message);
    }
  } catch (error) {
    console.error("Error while le Creating Review:", error);
    // Show an error toast for any other errors
    toast.error(error.response.data.message);
    throw error;
  }
};