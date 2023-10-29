import { apiConnector } from "../apiConnectors";
import { endpoints } from "../apis";
import { setCourse } from "../../slices/courseSlice";
import { toast } from "react-hot-toast"; // Import toast from react-hot-toast

const { CREATE_SUBSECTION_API } = endpoints;

// export const createSubSection = async (receivedForm, token, dispatch) => {
//     console.log("Crate SubSection pe hoon");
//     try {
//     const formData = new FormData();
//     formData.append("sectionID", receivedForm.sectionID);
//     formData.append("title", receivedForm.title);
//     formData.append("description", receivedForm.description);
//     formData.append("videoFile", receivedForm.videoFile);
//     formData.append("courseID", receivedForm.courseID);
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         // Include any other headers needed for your API request
//       };
//       const result = await apiConnector(
//         "POST",
//         CREATE_SUBSECTION_API,
//         formData,
//         headers,
//         null,
//         dispatch
//       );
//       console.log("Ho Gya SubSection Create", result?.data?.updatedSection);

//       // Check if registration was successful (you might need to define what a successful response looks like)
//       if (result.data.success) {
//         // Show a success toast for successful registration
//         toast.success("Create SubSection API Call Sucessfull");
//         // console.log("Kya Be"+result?.data?.updatedCourse?.courseContent)
//         //  dispatch(setCourse(result?.data?.updatedCourse))
//         // // return { thumbnailURL: result?.data?.thumbnailURL };
//       } else {
//         // Show an error toast if registration was not successful
//         toast.error("Error while Creating SubSection:");
//       }
//     } catch (error) {
//       console.error("Error while le Creating SubSection::", error);
//       // Show an error toast for any other errors
//       toast.error(error.response.data.message);
//       throw error;
//     }
//   };

export const createSubSection = async (receivedForm, token, dispatch) => {
  const formData = new FormData();
  formData.append('sectionID', receivedForm.sectionID);
  formData.append('title', receivedForm.title);
  formData.append('description', receivedForm.description);
  formData.append('videoFile', receivedForm.videoFile);
  formData.append('courseID', receivedForm.courseID);

  const headers = {
    Authorization: `Bearer ${token}`,
    // Include any other headers needed for your API request
  };

  // Create a toast with loading status
  // const toastId = toast.loading('Uploading 0%');

  // Define the onUploadProgress function
  // const onUploadProgress = (progressEvent) => {
  //   if (progressEvent.lengthComputable) {
  //     const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total) * 100);
  //     console.log("Mai Kya Pehchanya????")
  //     setUploadProgress(percentCompleted);
  
  //     if (percentCompleted === 100) {
  //       // If the progress reaches 100%, close the custom toaster
  //       setShowToaster(false);
  //     } else {
  //       // Show the custom toaster with the current progress
  //       setShowToaster(true);
  //     }
  //   }
  // };
  

  try {
    const result = await apiConnector(
      'POST',
      CREATE_SUBSECTION_API,
      formData,
      headers,
      null,
      dispatch,
      // onUploadProgress
    );

    if (result.data.success) {
      // toast.dismiss(toastId);
      toast.success('Create SubSection API Call Successful');
    } else {
      toast.error('Error while Creating SubSection');
    }
  } catch (error) {
    console.error('Error while Creating SubSection:', error);
    toast.error(error.response.data.message);
    throw error;
  }
};