import axios from "axios";
import { setLoading } from "../slices/loadingSlice";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({});

export const apiConnector = async (method, url, bodyData = null, headers = null, params = null, dispatch) => {
    const apiName = url.split("/").at(-1).replaceAll("-", " ");
    console.log("ApiName:" + apiName);
    console.log("AA gya Sach me API Connector..");
    console.log(method + ":" + url + ":" + bodyData + ":" + headers + ":" + params);
    
   // ... (other code)

try {
  dispatch(setLoading({ isLoading: true, name: apiName }));
  var toastID=toast.loading("Loading....")
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Introduce a 1-second delay

  const response = await axiosInstance({
      method: method,
      url: url,
      data: bodyData,
      headers: headers,
      params: params,
      // onUploadProgress:onUploadProgress
  });

  // Check if the response status is in the 2xx range (indicating success)
  if (response.status >= 200 && response.status < 300) {
     toast.dismiss(toastID);
    
      return response; // Return the full response object
  } else {
    toast.dismiss(toastID);
      throw new Error(`Request failed with status ${response.status}`);
  }
} catch (error) {
  toast.dismiss(toastID);
  // Handle errors here (e.g., network error, server error)
  throw error; // Throw the error for the caller to handle
} finally {
  
  dispatch(setLoading({ isLoading: false, name: apiName })); // Set loader value to false immediately
}
}


