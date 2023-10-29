import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  updateProfile,
  updateProfilePicture,
} from "../../../services/operations/profileAPI";
import { AiOutlineUpload } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import {RiDeleteBin6Line} from "react-icons/ri"
import { ConfirmationModal } from "../../common/ConfirmationModal";
import { ToastLoading } from "../../common/ToastLoading";

export const Settings = () => {
  const [profilePicture, setProfilePicture] = useState(null);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    console.log("File" + file);
    setProfilePicture(file);
  };
  const { currentUser } = useSelector((state) => state.profile);
  const dispatch=useDispatch();   
  const {isLoading,name}=useSelector((state)=>state.loader)

  const [profilePictureURL, setProfilePictureURL] = useState(
    currentUser?.image
  );
  const [profileInfo, setProfileInfo] = useState({
    // Initialize profileInfo state with your data
    firstName: `${currentUser?.firstName}`,
    lastName: `${currentUser?.lastName}`,
    dateOfBirth: null, // Use null as initial value for Date of Birth
    gender: `${currentUser?.additionalDetails?.gender}`,
    about: `${currentUser?.additionalDetails?.about}`,
    contactNumber: `${currentUser?.additionalDetails?.contactNumber}`,
  });
  const [confirmationModal, setConfirmationModal] = useState(null);
  // Function to handle changes in profile fields
  const handleProfileFieldChange = (field, value) => {
    console.log(field + ":" + value);
    setProfileInfo({ ...profileInfo, [field]: value });
  };

  const token = useSelector((state) => state.auth.token);
  console.log("Settings Token:"+token)

  // Function to update profile information
  const updateProfileHandler = async () => {
    try {
      await updateProfile(profileInfo,token,dispatch);
      //   console.log(result)
    } catch (error) {
      console.error("Error while Updating the Profile:", error);
      //   toast.error(error.response.data.message);
    }
  };

  // Function to update profile picture
  const updateProfilePictureHandler = async () => {
    try {
      const { updatedUser } = await updateProfilePicture(profilePicture, token,dispatch); // Call your API function to update profile picture
      setProfilePictureURL(updatedUser?.image);
    } catch (error) {
      console.error("Error while Updating Profile Picture:", error);
      //   toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="my-[3%] mx-[20%]">
      {/* 1. Profile Picture */}
      <div className="text-white text-[1.5rem] mb-4 font-bold">
        Edit Profile
      </div>
      <div className="bg-richblack-800 rounded-lg p-6 mb-4">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
          Change Profile Picture
        </h2>
        <div className="flex items-center mb-4">
          <div className="rounded-full bg-dark-black-800 w-20 h-20 flex items-center justify-center mr-4 shadow-[0px_0px_13px_0px]">
            {isLoading && name === "updateProfilePicture" ? (
              <Skeleton circle={true} height={100} width={100} />
            ) : (
              <img
                src={profilePictureURL}
                alt="Profile"
                className="rounded-full w-[5rem] h-[5rem] object-cover"
              />
            )}
          </div>
          <div className="flex gap-2">
            {isLoading && name === "updateProfilePicture" ? (
              <Skeleton height={50} width={100} />
            ) : (
              <label
                htmlFor="profilePicture"
                className="bg-richblack-600 px-4 py-2 rounded-lg hover:transition-all hover:scale-95 cursor-pointer font-bold text-white"
              >
                Select
              </label>
            )}
            {isLoading && name === "updateProfilePicture" ? (
              <Skeleton height={50} width={150} />
            ) : (
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
            )}
            {isLoading && name === "updateProfilePicture" ? (
              <Skeleton height={50} width={100} />
            ) : (
              <button
                className="bg-yellow-25 flex hover:transition-all hover:scale-95 items-center gap-2 px-4 py-2 rounded-lg font-bold cursor-pointer text-black"
                onClick={() => updateProfilePictureHandler(profileInfo)}
              >
                Upload
                <AiOutlineUpload />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-richblack-800 rounded-lg p-6 mb-4">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
          Profile Information
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <div className="flex flex-col">
            <label htmlFor="firstName" className="text-white mb-1">
              First Name
            </label>
            {isLoading && name === "updateProfile" ? (
              <Skeleton height={40} width={200} />
            ) : (
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
                placeholder="First Name"
                value={profileInfo.firstName}
                onChange={(e) =>
                  handleProfileFieldChange("firstName", e.target.value)
                }
              />
            )}
          </div>
          {/* Last Name */}
          <div className="flex flex-col">
            <label htmlFor="lastName" className="text-white mb-1">
              Last Name
            </label>
            {isLoading && name === "updateProfile" ? (
              <Skeleton height={40} width={200} />
            ) : (
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
                placeholder="Last Name"
                value={profileInfo.lastName}
                onChange={(e) =>
                  handleProfileFieldChange("lastName", e.target.value)
                }
              />
            )}
          </div>
          {/* Date of Birth */}
          <div className="flex flex-col">
            <label htmlFor="dob" className="text-white mb-1">
              Date of Birth
            </label>
            {isLoading && name === "updateProfile" ? (
              <Skeleton height={40} width={200} />
            ) : (
              <DatePicker
                id="dateOfBirth"
                name="dateOfBirth"
                selected={profileInfo.dateOfBirth}
                dateFormat="dd/MM/yyyy"
                onChange={(date) =>
                  handleProfileFieldChange("dateOfBirth", date)
                }
                className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
                placeholderText="Select Date of Birth"
              />
            )}
          </div>
          {/* Gender */}
          <div className="flex flex-col">
            <label htmlFor="gender" className="text-white mb-1">
              Gender
            </label>
            {isLoading && name === "updateProfile" ? (
              <Skeleton height={40} width={200} />
            ) : (
              <input
                type="text"
                id="gender"
                name="gender"
                className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
                placeholder="Gender"
                value={profileInfo.gender}
                onChange={(e) =>
                  handleProfileFieldChange("gender", e.target.value)
                }
              />
            )}
          </div>
          {/* About */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="about" className="text-white mb-1">
              About
            </label>
            {isLoading && name === "updateProfile" ? (
              <Skeleton height={80} width={400} />
            ) : (
              <textarea
                id="about"
                name="about"
                rows="3"
                className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
                placeholder="Write something about yourself"
                value={profileInfo.about}
                onChange={(e) =>
                  handleProfileFieldChange("about", e.target.value)
                }
              ></textarea>
            )}
          </div>
          {/* Contact Number */}
          <div className="flex flex-col col-span-2">
            <label htmlFor="contactNumber" className="text-white mb-1">
              Contact Number
            </label>
            {isLoading && name === "updateProfile" ? (
              <Skeleton height={40} width={200} />
            ) : (
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
                placeholder="Contact Number"
                value={profileInfo.contactNumber}
                onChange={(e) =>
                  handleProfileFieldChange("contactNumber", e.target.value)
                }
              />
            )}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          {isLoading && name === "updateProfile" ? (
            <Skeleton height={40} width={100} />
          ) : (
            <button
              type="button"
              className="bg-yellow-25 px-4 py-2 rounded-lg text-black font-bold"
              onClick={updateProfileHandler}
            >
              Save
            </button>
          )}
          {isLoading && name === "updateProfile" ? (
            <Skeleton height={40} width={100} />
          ) : (
            <button
              type="button"
              className="bg-richblack-600 px-4 py-2 rounded-lg text-white ml-2 font-bold"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* 4. Delete Account */}
      <div className="bg-[#94121282] flex gap-4 rounded-lg p-6">
        <div className="bg-[#8c131396] flex items-center justify-center w-[4.5rem] h-[3.5rem] rounded-full shadow-[0px_0px_5px_0px_darkred]">
          <RiDeleteBin6Line className="text-white text-xl" />
        </div>
        <div className="flex flex-col">
          <span className="text-white">Delete Account</span>
          <p className="text-white my-4 text-left">
            Would you like your account to be deleted? This account may include
            paid courses and the like.
          </p>
          <button
            type="button"
            className="text-red-500 text-left"
            onClick={() =>
              setConfirmationModal({
                text1: "Are you Sure?",
                text2: "You account will be permanently deleted!!!",
                btn1Text: "Delete Anyhow",
                btn2Text: "Cancel",
                btn1Handler: () => setConfirmationModal(null),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
          >
            <em className="italic">I wish to delete my Account</em>
          </button>
        </div>
      </div>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} isOpen={true} />
      )}
    </div>
  );
};