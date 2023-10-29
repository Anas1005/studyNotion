// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setCourseStep } from "../../../../slices/courseSlice";

// export const Publish = () => {
//   const dispatch = useDispatch();
//   const { courseStep } = useSelector((state) => state.course);

//   const handlePublishCourse = () => {
//     // Implement the logic to publish the course
//     // This could include making API calls, updating the course status, etc.

//     // Once the course is published, you can navigate to the next step
//     dispatch(setCourseStep(courseStep + 1));
//   };



//   return (
//     <div className="mt-4 mx-[30%]">
//     <div className=" rounded-lg px-4 py-4 w-full bg-white bg-opacity-10 backdrop-blur-md text-white my-4">
//       <div>
//         <h2 className="text-xl font-semibold text-white mb-4">
//           Publish Settings
//         </h2>
//         {/* Add your publish settings UI here (e.g., course visibility, pricing, etc.) */}
//       </div>

//       <div className="flex justify-end space-x-4 mt-4 text-sm">
//         <button
//           type="button"
//           onClick={()=> dispatch(setCourseStep(courseStep-1))}
//           className="bg-gray-500 rounded-lg px-4 py-2 text-white font-bold"
//         >
//           Back
//         </button>
//         <button
//           type="button"
//           onClick={handlePublishCourse}
//           className="bg-yellow-25  rounded-lg font-bold rounde-lg px-4 py-2 text-black"
//         >
//           Save Changes
//         </button>
//       </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCourseStep } from "../../../../slices/courseSlice";
import { resetCourseState } from "../../../../slices/courseSlice";
import { ToastLoading } from "../../../common/ToastLoading";
import { publishCourse } from "../../../../services/operations/courseAPI";
import toast from "react-hot-toast";

export const Publish = () => {
  const dispatch = useDispatch();
  const { courseStep } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const { currentCourse } = useSelector((state) => state.course);
  const {isLoading,name}=useSelector((state)=>state.loader)

  const [isPublic, setIsPublic] = useState(false);
  const navigate=useNavigate();

  const handlePublishCourse = async() => {
    if(isPublic){
      try{
        await publishCourse({courseID:currentCourse._id,isPublic},token, dispatch);
        console.log("Ho Gya Publsih")
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses")
      }
      catch(e){
        console.log(e)
      }
    }
    else{
      await publishCourse({courseID:currentCourse._id,isPublic},token, dispatch);
      toast.success("Saved as Draft")
      dispatch(resetCourseState());
      navigate("/dashboard/my-courses")
    }
   
   

  };

  return (
    <div className="mt-4 mx-[30%]">
      <div className="rounded-lg px-4 py-4 w-full bg-white bg-opacity-10 backdrop-blur-md text-white my-4">
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Publish Settings</h2>
          {/* Add your publish settings UI here (e.g., course visibility, pricing, etc.) */}
        </div>

        {/* "Make this course as Public" checkbox */}
        <div className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            id="makePublic"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
            className="rounded text-yellow-25"
          />
          <label htmlFor="makePublic" className=" text-richblack-400">
            Make this course as Public
          </label>
        </div>

        <div className="flex justify-end space-x-4 mt-4 text-sm">
          <button
            type="button"
            onClick={() => dispatch(setCourseStep(courseStep - 1))}
            className="bg-gray-500 rounded-lg px-4 py-2 text-black font-bold"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handlePublishCourse}
            className="bg-yellow-25 rounded-lg font-bold rounde-lg px-4 py-2 text-black"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};



