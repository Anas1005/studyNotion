import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { sendOTP } from '../services/operations/authAPI';
import { ToastLoading } from '../components/common/ToastLoading';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export const SignUp = () => {
  const [accountType, setAccountType] = useState('Student');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
 // Initialize isLoading as false
 const navigate = useNavigate();
  const {isLoading,name}=useSelector((state)=>state.loader)
  const dispatch=useDispatch();
  console.log("SignUp pe Hoon:"+isLoading)

  const handleAccountTypeChange = (type) => {
    setAccountType(type);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name + ':' + value);
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // setIsLoading(true); // Start loading when sending OTP
      await sendOTP(formData,dispatch);
      navigate('/otp-verification', {
        state: { formData: { ...formData, accountType: accountType } },
      });
    } catch (error) {
      console.error('Error sending OTP:', error.response.data.message);
    } finally {
      // setIsLoading(false); // Stop loading, whether it was successful or not
    }
  };

  return (
    <div className="mt-4 md:mx-auto mx-[4%] max-w-md">
      <div className="flex justify-center">
        <button
          className={`mr-2 px-4 py-2 rounded-lg transition-all  duration-500 ${
            accountType === 'Student'
              ? ' bg-richblack-800 text-white font-bold'
              : 'bg-white bg-opacity-0 text-white'
          }`}
          onClick={() => handleAccountTypeChange('Student')}
        >
          Student
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            accountType === 'Instructor'
              ? ' bg-richblack-800 text-white font-bold'
              : 'bg-white bg-opacity-0 text-white'
          }`}
          onClick={() => handleAccountTypeChange('Instructor')}
        >
          Instructor
        </button>
      </div>
      <form className="grid grid-cols-2 gap-4 mt-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstName" className="text-white block mb-1">
            First Name
          </label>
          {isLoading && name === 'sendOTP' ? (
            <Skeleton width={200} height={20} />
          ) : (
            <input
              type="text"
              id="firstName"
              className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white"
              placeholder="Enter First Name"
              value={formData.firstName} // Add the value from formData
              onChange={handleInputChange} // Handle input changes
              name="firstName"
            />
          )}
        </div>
        
        {/* Last Name */}
        <div>
          <label htmlFor="lastName" className="text-white block mb-1">
            Last Name
          </label>
          {isLoading && name === 'sendOTP' ? (
            <Skeleton width={200} height={20} />
          ) : (
            <input
              type="text"
              id="lastName"
              className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white"
              placeholder="Enter Last Name"
              value={formData.lastName} // Add the value from formData
              onChange={handleInputChange} // Handle input changes
              name="lastName"
            />
          )}
        </div>
        
        {/* Email */}
        <div>
          <label htmlFor="email" className="text-white block mb-1">
            Email
          </label>
          {isLoading && name === 'sendOTP' ? (
            <Skeleton width={200} height={20} />
          ) : (
            <input
              type="email"
              id="email"
              className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white"
              placeholder="Enter Email"
              value={formData.email} // Add the value from formData
              onChange={handleInputChange} // Handle input changes
              name="email"
            />
          )}
        </div>
        
        {/* Password */}
        <div>
          <label htmlFor="password" className="text-white block mb-1">
            Password
          </label>
          {isLoading && name === 'sendOTP' ? (
            <Skeleton width={200} height={20} />
          ) : (
            <input
              type="password"
              id="password"
              className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white"
              placeholder="Enter Password"
              value={formData.password} // Add the value from formData
              onChange={handleInputChange} // Handle input changes
              name="password"
            />
          )}
        </div>
        
        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="text-white block mb-1">
            Confirm Password
          </label>
          {isLoading && name === 'sendOTP' ? (
            <Skeleton width={200} height={20} />
          ) : (
            <input
              type="password"
              id="confirmPassword"
              className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white"
              placeholder="Confirm Password"
              value={formData.confirmPassword} // Add the value from formData
              onChange={handleInputChange} // Handle input changes
              name="confirmPassword"
            />
          )}
        </div>
        
       
      </form>
      <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-yellow-50 hover:transition-all hover:bg-opacity-60 border-white rounded-lg px-4 py-2 w-[100%]  text-black font-semibold"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </div>
    </div>
  );
};