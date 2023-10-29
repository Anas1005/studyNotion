import React, { useState } from "react";
import { MdOutlineOpenInBrowser } from "react-icons/md";
import { TbArrowsExchange } from "react-icons/tb";
import { createSubSection } from "../../../../../services/operations/subSectionAPI";
import "./scrollBar.css";
import { useDispatch, useSelector } from "react-redux";
import { getCourseDetails } from "../../../../../services/operations/courseAPI";
import { CustomToaster } from "../CustomToaster";
import courseSlice from "../../../../../slices/courseSlice";

export const SubSection = ({
  sectionID,
  setSections,
  toggleSubSectionModal,
}) => {
  // console.log("SectionID:" + sectionID);
  const { token } = useSelector((state) => state.auth);
  const { currentCourse } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [showToaster, setShowToaster] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  console.log("Mai Kya Pehchanya????"+showToaster)

  const [subsectionData, setSubsectionData] = useState({
    title: "",
    description: "",
    videoFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubsectionData({
      ...subsectionData,
      [name]: value,
    });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubsectionData({
        ...subsectionData,
        videoFile: file,
      });
    }
  };

  const handleSave = async () => {
    try {
      await createSubSection(
        { ...subsectionData, sectionID, courseID: currentCourse._id },
        token,
        dispatch,
        // setUploadProgress,
        // setShowToaster
      );
      await getCourseDetails({ courseID: currentCourse._id },dispatch);
      toggleSubSectionModal();
      setSubsectionData({
        title: "",
        description: "",
        videoFile: null,
      });
      console.log("SubSection Created Successfully.");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="rounded-lg p-4 w-full mx-[25%]">
      {/* {showToaster ? (
        <CustomToaster message={`Uploading ${uploadProgress}%`} />
      ) : (
        <> */}
          <h2 className="text-xl font-semibold text-white mb-4 text-center">
            Create Subsection
          </h2>
          <div className="custom-scrollbar max-h-80">
            <div className="flex flex-col">
              <label htmlFor="subsectionTitle" className="text-white mb-1">
                Lecture Title
              </label>
              <input
                type="text"
                id="subsectionTitle"
                name="title"
                className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
                placeholder="Lecture Title"
                value={subsectionData.title}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col mt-2">
              <label
                htmlFor="subsectionDescription"
                className="text-white mb-1"
              >
                Lecture Description
              </label>
              <textarea
                id="subsectionDescription"
                name="description"
                rows="4"
                className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
                placeholder="Lecture Description"
                value={subsectionData.description}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col mt-2">
              <label htmlFor="videoFile" className="text-white mb-1">
                Lecture Video
              </label>
              <label
                htmlFor="videoFile"
                className="border border-white rounded-lg p-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none cursor-pointer"
              >
                {subsectionData.videoFile ? (
                  <div>
                    <video
                      src={URL.createObjectURL(subsectionData.videoFile)}
                      controls
                      className="mt-2 w-full rounded-lg"
                    />
                    <div className="text-white mt-2 cursor-pointer flex gap-4 items-center">
                      <TbArrowsExchange /> Change
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3">
                    <MdOutlineOpenInBrowser className="text-3xl" />
                    <span>
                      Click to <span className="text-yellow-25">Browse</span> a
                      file
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  id="videoFile"
                  name="videoFile"
                  className="hidden"
                  accept="video/*"
                  onChange={handleVideoUpload}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleSave}
              className="bg-yellow-25 border border-white rounded-lg px-4 py-2 text-black mr-2"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => toggleSubSectionModal()}
              className="bg-red-600 border border-white rounded-lg px-4 py-2 text-white"
            >
              Cancel
            </button>
          </div>
        {/* </> */}
      {/* )} */}
    </div>
  );
};
