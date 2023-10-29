import { setCurrentUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnectors";
import { endpoints } from "../apis";
import { toast } from "react-hot-toast"; // Import toast from react-hot-toast


const {
  GET_USER_DETAILS_API,
  GET_ENROLLED_COURSES_API,
  GET_MY_COURSES_API,
  UPDATE_PROFILE_API,
  UPDATE_PROFILE_PICTURE_API,
  INSTRUCTOR_DASHBOARD_API,
  UPDATE_PASWSORD_API
} = endpoints;

export const getUserDetails=async(token,dispatch)=>{

console.log("Get User Details pe hoon");
try {
  // Make an API call to submit OTP and register the user
  const headers= {
    Authorization: `Bearer ${token}`,
  }
  const result = await apiConnector("GET",GET_USER_DETAILS_API,null,headers,null,dispatch);
  console.log("Ho Gya User Details Fetched",result?.data?.userDetails?.additionalDetails);

  // Check if registration was successful (you might need to define what a successful response looks like)
  if (result.data.success) {
    // Show a success toast for successful registration
    toast.success('Profile API Call Sucessfull');
    console.log("ywh lo jiii",result?.data?.userDetails?.courses?.length)
    dispatch(setCurrentUser(result?.data?.userDetails))
    // return {userDetails:result?.data?.userDetails}
  } else {
    // Show an error toast if registration was not successful
    toast.error("Error while fetching the User Details:");
  }
} catch (error) {
  console.error("Error while fetching the User Details:", error);
  // Show an error toast for any other errors
  toast.error(error.response.data.message);
  throw error;
}
};


export const updateProfile=async(formData,token,dispatch)=>{
        console.log(formData)
          const date = new Date(formData.dateOfBirth);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          formData={...formData,dateOfBirth: `${day}/${month}/${year}`}
          console.log("Hua"+formData)

    

    console.log("Update Prfile pe hoon",formData)
    try {
      // Make an API call to submit OTP and register the user
      const headers= {
        Authorization: `Bearer ${token}`,
      }
      const result = await apiConnector("POST",UPDATE_PROFILE_API,formData,headers,null,dispatch);
      console.log("Ho Gya Update"+result?.data?.updatedProfile)
  
      // Check if registration was successful (you might need to define what a successful response looks like)
      if (result.data.success) {
        // Show a success toast for successful registration
         toast.success('Profile Updated Sucessfully');
      } else {
        // Show an error toast if registration was not successful
        toast.error("Error while Updating Profile:");
      }
    } catch (error) {
      console.error("Error while Updating the Profile:", error);
      // Show an error toast for any other errors
      toast.error(error.response.data.message);
      throw error;
    }
  };

  export const updateProfilePicture = async (profilePicture, token,dispatch) => {
    console.log("Upadate Profile Picture Me Hoon..")
    try {
      const formData = new FormData();
      formData.append('profilePicture', profilePicture);
      formData.append('a',1 );
      formData.append('b',"Hello" );
      formData.append('c',[1,2,3] );
      formData.append('d',{name:"Hello"} );
      console.log("FormData:"+formData)
  
      // Make an API call to update the profile picture
      const headers = {
        Authorization: `Bearer ${token}`,
        // Include any other headers needed for your API request
      };
  
      const result = await apiConnector('POST', UPDATE_PROFILE_PICTURE_API, formData, headers,null,dispatch);
      console.log("Yeh Raha"+result?.data?.updatedUser?.image)
  
      // Check if updating the profile picture was successful
      if (result.data.success) {
        // Show a success message if needed
        toast.success('Profile Picture Updated Successfully');
        return {updatedUser:result?.data?.updatedUser}
      } else {
        // Show an error message if updating failed
        toast.error('Error while Updating Profile Picture');
      }
    } catch (error) {
      console.error('Error while Updating Profile Picture:', error);
      // Show an error message for any other errors
      toast.error(error.response?.data?.message);
      throw error;
    }
  };
  

  export const getEnrolledCourses=async(token,dispatch)=>{

    console.log("Get Enrolled Courses pe hoon");
    try {
      // Make an API call to submit OTP and register the user
      const headers= {
        Authorization: `Bearer ${token}`,
      }
      const result = await apiConnector("GET",GET_ENROLLED_COURSES_API,null,headers,null,dispatch);
      console.log("Ho Gya Enrolled Courses Fetched");
    
      // Check if registration was successful (you might need to define what a successful response looks like)
      if (result.data.success) {
        // Show a success toast for successful registration
        toast.success('Enrolled Courses fetched Sucessfully');
        return {enrolledCourses:result?.data?.enrolledCourses}
      } else {
        // Show an error toast if registration was not successful
        toast.error("Error while fetching the Enrolled Courses:");
      }
    } catch (error) {
      console.error("Error while fetching the Enrolled Courses:", error);
      // Show an error toast for any other errors
      toast.error(error.response.data.message);
      throw error;
    }
    };
    
    
  export const getMyCourses=async(token,dispatch)=>{

    console.log("Get My Courses pe hoon");
    try {
      // Make an API call to submit OTP and register the user
      const headers= {
        Authorization: `Bearer ${token}`,
      }
      const result = await apiConnector("GET",GET_MY_COURSES_API,null,headers,null,dispatch);
      console.log("Ho Gya My Courses Fetched");
    
      // Check if registration was successful (you might need to define what a successful response looks like)
      if (result.data.success) {
        // Show a success toast for successful registration
        toast.success('Enrolled Courses fetched Sucessfully');
        return {myCourses:result?.data?.myCourses}
      } else {
        // Show an error toast if registration was not successful
        toast.error("Error while fetching the My Courses:");
      }
    } catch (error) {
      console.error("Error while fetching the My Courses:", error);
      // Show an error toast for any other errors
      toast.error(error.response.data.message);
      throw error;
    }
    };
    

    export const instructorDashboardDetails=async(token,dispatch)=>{

      console.log("Get In DAaash pe hoon");
      try {
        // Make an API call to submit OTP and register the user
        const headers= {
          Authorization: `Bearer ${token}`,
        }
        const result = await apiConnector("GET",INSTRUCTOR_DASHBOARD_API,null,headers,null,dispatch);
        console.log("Ho Gya My In Dash Fetched");
      
        // Check if registration was successful (you might need to define what a successful response looks like)
        if (result.data.success) {
          // Show a success toast for successful registration
          toast.success(result?.data?.message);
          return {courses:result?.data?.courses}
        } else {
          // Show an error toast if registration was not successful
          toast.error("Error while fetching the In Dash:");
        }
      } catch (error) {
        console.error("Error while fetching the In Dash:", error);
        // Show an error toast for any other errors
        toast.error(error.response.data.message);
        throw error;
      }
      };