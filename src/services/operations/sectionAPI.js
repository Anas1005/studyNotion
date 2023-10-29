import { apiConnector } from "../apiConnectors";
import { endpoints } from "../apis";
import { setCourse } from "../../slices/courseSlice";
import { toast } from "react-hot-toast"; // Import toast from react-hot-toast

const { CREATE_SECTION_API} = endpoints;

export const createSection = async (formData, token, dispatch) => {
    console.log("Crate Section pe hoon");
    try {
      
      // Make an API call to update the profile picture
      const headers = {
        Authorization: `Bearer ${token}`,
        // Include any other headers needed for your API request
      };
      const result = await apiConnector(
        "POST",
        CREATE_SECTION_API,
        formData,
        headers,
        null,
        dispatch
      );
      console.log("Ho Gya Section Create", result?.data?.newCourse);
  
      // Check if registration was successful (you might need to define what a successful response looks like)
      if (result.data.success) {
        // Show a success toast for successful registration
        toast.success("Create Section API Call Sucessfull");
        // console.log("Kya Be"+result?.data?.updatedCourse?.courseContent)
        dispatch(setCourse(result?.data?.updatedCourse))
      
        // return { thumbnailURL: result?.data?.thumbnailURL };
      } else {
        // Show an error toast if registration was not successful
        toast.error("Error while Creating Section:");
      }
    } catch (error) {
      console.error("Error while le Creating Section::", error);
      // Show an error toast for any other errors
      toast.error(error.response.data.message);
      throw error;
    }
  };
  