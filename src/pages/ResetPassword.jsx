
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { resetPassword } from '../services/operations/authAPI'; // Import the resetPassword API handler
import { useDispatch, useSelector } from 'react-redux';
import { ToastLoading } from '../components/common/ToastLoading';

export const ResetPassword = () => {
  const expiryTimeString = localStorage.getItem('expiryTime');
  const expiryTime = expiryTimeString ? new Date(expiryTimeString).getTime() : Infinity;
  const isExpired = Date.now() > expiryTime;
  const {isLoading,name}=useSelector((state)=>state.loader)
  const dispatch=useDispatch();
  
  console.log(Date.now()-expiryTime,Date.now()+":::::"+expiryTime);

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmNewPassword: '',
  });
  const location = useLocation();
  const navigate = useNavigate();
  let userID=location.pathname.split("/").at(-1).replaceAll("-"," ");
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      // Call the resetPassword API handler with userID and formData
      await resetPassword({ ...formData, id: userID },dispatch);
      navigate('/login');
      // toast.success('Password reset successful. You can now log in with your new password.');
      // Redirect to the login page or any other appropriate page
    } catch (error) {
      console.error('Error resetting password:', error);
      // toast.error('Failed to reset password. Please try again later.');
    }
  };

  return (
    <div className="mt-4 mx-auto max-w-md">
      {isExpired === true ? (
        <div className="mt-4 mx-auto max-w-md">
          <h2 className="text-2xl font-semibold text-red-500 mb-4 text-center">
            Your Reset password link has expired.
          </h2>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">Reset Password</h2>
          <p className="text-white text-opacity-50 text-center mb-4">
            Please enter your new password below and confirm it.
          </p>
          <form className="grid grid-cols-1 gap-4 mt-4" onSubmit={handleResetPassword}>
            <div className="flex flex-col">
              <label htmlFor="newPassword" className="text-white mb-1">
                New Password
              </label>
              {isLoading && name === 'resetPassword' ? (
                <Skeleton height={40} /> // Use the skeleton component here
              ) : (
                <input
                  type="password"
                  id="newPassword"
                  className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white"
                  placeholder="New Password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                />
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="confirmNewPassword" className="text-white mb-1">
                Confirm New Password
              </label>
              {isLoading && name === 'resetPassword' ? (
                <Skeleton height={40} /> // Use the skeleton component here
              ) : (
                <input
                  type="password"
                  id="confirmNewPassword"
                  className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white"
                  placeholder="Confirm New Password"
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleInputChange}
                />
              )}
            </div>

            <div className="flex justify-center mt-4">
            {isLoading && name === "resetPassword" ? (
              <Skeleton width={180} height={40} /> // Use Skeleton for the "Send Verification Link" button while loading
            ) : (
              <button
                type="submit"
                className={`bg-yellow-25 border border-white rounded-lg px-4 py-2 w-full text-black ${
                  isLoading && name === "resetPassword"
                    ? "pointer-events-none"
                    : "" // Disable button while loading
                }`}
              >
                Reset Password
              </button>
            )}
          </div>
          </form>
        </div>
      )}
    </div>
  );
};

