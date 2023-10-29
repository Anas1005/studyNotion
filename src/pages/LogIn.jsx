import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { logIn } from '../services/operations/authAPI';
import { setToken } from "../slices/authSlice";
import { setCurrentUser } from "../slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastLoading } from '../components/common/ToastLoading';
;

export const LogIn = () => {
  const [accountType, setAccountType] = useState('Student'); // Initialize accountType state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {isLoading,name}=useSelector((state)=>state.loader)
  console.log("In LOgIN Page:",isLoading,name)
  // console.log(isLoading);
  


  const handleAccountTypeChange = (type) => {
    setAccountType(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name+":"+value);
    setFormData({ ...formData, [name]: value });
  };

  const handleLogIn = async (e) => {
     console.log("AaayJiii..LOgIn Krne.")
    console.log(formData)
    e.preventDefault();
    try {
      // Send form data to the server to initiate OTP sending
      await logIn({...formData,accountType},dispatch);
      // console.log("Token"+token);
      // console.log("CurrentUser"+currentUser);
     
      navigate("/dashboard/my-profile")
    }

     catch (error) {
      console.error('Error Logging In:', error.response.data.message);
      // Handle the error, e.g., show an error message to the user
    }
  };


  return (
    <div className="mt-4 mx-auto max-w-md">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">Welcome Back!</h2>
        <div className="flex justify-center">
          <button
            className={`mr-2 px-4 py-2 rounded-lg transition-all  duration-500 ${
              accountType === 'Student'
                ? 'bg-richblack-800 text-white font-bold'
                : 'bg-white bg-opacity-0 text-white'
            }`}
            onClick={() => handleAccountTypeChange('Student')}
          >
            Student
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              accountType === 'Instructor'
                ? 'bg-richblack-800 text-white font-bold'
                : 'bg-white bg-opacity-0 text-white'
            }`}
            onClick={() => handleAccountTypeChange('Instructor')}
          >
            Instructor
          </button>
        </div>
        <form className="grid grid-cols-1 gap-4 mt-4" onSubmit={handleLogIn}>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-white mb-1">
              Email
            </label>
            {isLoading && name === 'logIn' ? (
              <Skeleton height={40} /> // Use Skeleton for email input
            ) : (
              <input
                type="email"
                id="email"
                name="email"
                className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-white mb-1">
              Password
            </label>
            {isLoading && name === 'logIn' ? (
              <Skeleton height={40} /> // Use Skeleton for password input
            ) : (
              <input
                type="password"
                id="password"
                name="password"
                className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            )}
          </div>
          <div className="text-right">
            <div
              className="text-white text-opacity-50 hover:underline cursor-pointer"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </div>
          </div>
          <div className="flex justify-center mt-4">
          
          
              {isLoading && name === 'logIn' ? (

                <Skeleton width={100} height={40} /> // Use Skeleton for the "Log In" button
              ) : 
              (
                <button
              type="submit"
              className="bg-yellow-25 hover:transition-all hover:bg-opacity-60 font-semibold border-white rounded-lg px-4 py-2 w-full text-black"
            >Log In  </button>
              )}
           
          </div>
        </form>
      </div>
    </div>
  );
};