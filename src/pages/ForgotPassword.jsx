import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { forgotPassword } from "../services/operations/authAPI"; // Import the forgotPassword API handler
import { useDispatch, useSelector } from "react-redux";
import { ToastLoading } from "../components/common/ToastLoading";

export const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const navigate = useNavigate();
  const { isLoading, name } = useSelector((state) => state.loader);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendVerificationLink = async (e) => {
    e.preventDefault();
    try {
      // Call the forgotPassword API handler to send a verification link
      const { expiryTime } = await forgotPassword(formData, dispatch);
      console.log("ExpiryTine:" + expiryTime);
      localStorage.setItem("expiryTime", expiryTime);
      navigate("/login"); // Redirect to the login page after sending the link
    } catch (error) {
      console.error(
        "Error while sending the verification link:",
        error.response.data.message
      );
    }
  };

  return (
    <div className="mt-4 mx-auto max-w-md">
      <div>
        <h2 className="text-2xl font-semibol text-richblack-50 mb-4 text-center">
          A verification link will be sent to your email. Please enter your
          email below.
        </h2>
        <form
          className="grid grid-cols-1 gap-4 mt-4"
          onSubmit={handleSendVerificationLink}
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white mb-1">
              Email
            </label>
            {isLoading && name === "forgotPassword" ? (
              <Skeleton height={40} /> // Use Skeleton for email input while loading
            ) : (
              <input
                type="email"
                id="email"
                name="email"
                className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            )}
          </div>
          <div className="flex justify-center mt-4">
            {isLoading && name === "forgotPassword" ? (
              <Skeleton width={180} height={40} /> // Use Skeleton for the "Send Verification Link" button while loading
            ) : (
              <button
                type="submit"
                className={`bg-yellow-25 border border-white rounded-lg px-4 py-2 w-full text-black ${
                  isLoading && name === "forgotPassword"
                    ? "pointer-events-none"
                    : "" // Disable button while loading
                }`}
              >
                Send Verification Link
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
