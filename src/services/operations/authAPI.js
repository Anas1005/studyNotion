import { apiConnector } from "../apiConnectors";
import { endpoints } from "../apis";
import { toast } from "react-hot-toast"; // Import toast from react-hot-toast
import { setToken } from "../../slices/authSlice";
import { setCurrentUser } from "../../slices/profileSlice";


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  CONTACT_US_API,
  FORGOTPASSWORD_API,
  RESETPASSWORD_API,
} = endpoints;

export const sendOTP = async (formData,dispatch) => {
  try {
    console.log("Aya OTP Send Krne..")
    // Make the API request to send OTP
    const result = await apiConnector("POST", SENDOTP_API, formData,null,null,dispatch);
    console.log("fetched")
    console.log(result);
    console.log(result.data);

    // Check if the OTP was sent successfully
    if (result.data.success) {
        console.log("Kr Diya OTP Send")
      // Show a success toast notification
      toast.success("OTP sent successfully to your email. Please check your inbox.");
    } else {
        console.log("Nahi Ho Paya::"+result.data.message)
      // Handle the case where OTP sending failed (e.g., invalid email)
      toast.error(result.data.message);
    }

    // You can also handle other actions based on the API response, such as setting tokens or user data.

  } catch (error) {
    // Handle errors here (e.g., network error, server error)
    console.error("Error sending OTP:", error);
    toast.error(error.response.data.message);
    throw error;
  }
};

export const signUp = async (formData,dispatch) => {
    console.log("SignUp pe hoon",formData)
    try {
      // Make an API call to submit OTP and register the user
      const result = await apiConnector("POST", SIGNUP_API, formData,null,null,dispatch);
  
      // Check if registration was successful (you might need to define what a successful response looks like)
      if (result.data.success) {
        // Show a success toast for successful registration
        toast.success("Registration successful. You can now log in!");
  
        // Redirect to the login page
      } else {
        // Show an error toast if registration was not successful
        toast.error("Registration failed. Please check your OTP and try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Show an error toast for any other errors
      toast.error(error.response?.data?.message);
      throw error;
    }
  };

  export const logIn = async (formData,dispatch) => {
    console.log("LogIn pe hoon",formData)
    try {
      // Make an API call to submit OTP and register the user
      const result = await apiConnector("POST", LOGIN_API, formData,null,null,dispatch);
  
      // Check if registration was successful (you might need to define what a successful response looks like)
      if (result.data.success) {
        // Show a success toast for successful registration
        toast.success(`Log In Successfull.. Welcome ${result?.data?.responseUser?.firstName}!`);
        dispatch(setToken(result?.data?.token));
        dispatch(setCurrentUser(result?.data?.responseUser));
        // return {token:result?.data?.token,currentUser:result?.data?.responseUser}
  
        // Redirect to the login page
      } else {
        // Show an error toast if registration was not successful
        toast.error("Log In failed");
      }
    } catch (error) {
      console.error("Error while Logging In:", error);
      // Show an error toast for any other errors
      toast.error(error.response?.data?.message);
      throw error;
    }
  };

  export const forgotPassword=async(formData,dispatch)=>{
    console.log("Forgot Passord pe hoon",formData)
    try {
      // Make an API call to submit OTP and register the user
      const result = await apiConnector("POST",FORGOTPASSWORD_API,formData,null,null,dispatch);
  
      // Check if registration was successful (you might need to define what a successful response looks like)
      if (result.data.success) {
        // Show a success toast for successful registration
        toast.success('A verification link has been sent to your email. Please check your inbox.');
        console.log("Expireyyyyy:"+result?.data?.expiryTime);
            // Redi)
        return {expiryTime:result?.data?.expiryTime}
        // Redirect to the login page
      } else {
        // Show an error toast if registration was not successful
        toast.error("Error while sending Reset Link:");
      }
    } catch (error) {
      console.error("Error while sending Reset Link:", error);
      // Show an error toast for any other errors
      toast.error(error.response?.data?.message);
      throw error;
    }
  };

  export const resetPassword=async(formData,dispatch)=>{
    console.log("Reset Passord pe hoon",formData)
    try {
      // Make an API call to submit OTP and register the user
      const result = await apiConnector("POST", RESETPASSWORD_API,formData,null,null,dispatch);
  
      // Check if registration was successful (you might need to define what a successful response looks like)
      if (result.data.success) {
        // Show a success toast for successful registration
        toast.success('Password reset successful. You can now log in with your new password.');
        // Redirect to the login page
      } else {
        // Show an error toast if registration was not successful
        toast.error("Error while restting the Password");
      }
    } catch (error) {
      console.error("Error while restting the Password", error);
      // Show an error toast for any other errors
      toast.error(error.response?.data?.message);
      throw error;
    }
  };

  export const contactUs = async (formData,dispatch) => {   
    console.log("Contact Us pe hoon",formData)
    try {
      // Make an API call to submit OTP and register the user
      const result = await apiConnector("POST",CONTACT_US_API,formData,null,null,dispatch);
  
      // Check if registration was successful (you might need to define what a successful response looks like)
      if (result.data.success) {
        // Show a success toast for successful registration
        toast.success(`Your query has been successfully submitted. Check your email for confirmation!!`);
    
      } else {
        // Show an error toast if registration was not successful
        toast.error("Contact Us failed");
      }
    } catch (error) {
      console.error("Error while Contacting:", error);
      // Show an error toast for any other errors
      toast.error(error.response?.data?.message);
      throw error;
    }
  };

  // export const logOut=async()=>{
  //   console.log("LogOut Krne Aaya Hoon",formData)
  //   con
  //   navi

  
  // }

