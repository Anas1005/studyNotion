import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { signUp } from '../services/operations/authAPI';
import Skeleton from 'react-loading-skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { ToastLoading } from '../components/common/ToastLoading';

export const OTPVerification = () => {
  const [otp, setOTP] = useState(['', '', '', '', '', '']); // Initialize OTP as an array of 6 empty strings
  const inputRefs = useRef([]);
  const maxDigitLength = 6;
  const navigate = useNavigate();
  const {isLoading,name}=useSelector((state)=>state.loader)
  const dispatch=useDispatch();

  const location = useLocation();
  const formData = location.state?.formData;


  const handleOTPChange = (event, index) => {
  
    const { value } = event.target;
    console.log(value);

    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Move focus to the next input
      if (value.length === 1 && index < maxDigitLength - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (event, index) => {
    if (event.key === 'Backspace' && index > 0) {
      const newOTP = [...otp];
      newOTP[index - 1] = '';
      setOTP(newOTP);
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const enteredOTP = otp.join('');
    console.log("EnteredOTP"+enteredOTP)
    if (enteredOTP.length === maxDigitLength) {
        try {
            await signUp({ ...formData,otp: enteredOTP},dispatch);
            // Redirect to a success page or dashboard
            navigate('/login')
          } catch (error) {
            // Handle signup error, display a toast, etc.
            console.error('Signup failed:', error);
            // You can display a toast message here to inform the user that signup failed.
          }
        } else {
            toast.error("The OTP must be 6 digits long.");
          // You can display a toast message here to inform the user that the OTP should be 6 digits long.
        }
      }
    

      return (
        <div className="mt-4 mx-auto max-w-md">
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">OTP Verification</h2>
            <p className="text-white text-opacity-50 text-center mb-4">
              An OTP has been sent to your email. Please check and enter the 6-digit OTP.
            </p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mt-4">
              <div className="grid grid-cols-6 gap-2">
                {otp.map((digit, index) => (
                  <div key={index} className="flex flex-col">
                    {isLoading && name === 'signUp' ? (
                      <Skeleton width={30} height={40} /> // Use Skeleton while loading
                    ) : (
                      <input
                        type="text"
                        className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white text-center focus:outline-none focus:border-none"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOTPChange(e, index)}
                        onKeyDown={(e) => handleBackspace(e, index)}
                        ref={(el) => (inputRefs.current[index] = el)}
                      />
                    )}
                  </div>
                ))}
              </div>
              {isLoading && name === 'signUp' ? (
                <Skeleton height={40} /> // Use Skeleton for the "Verify and Register" button
              ) : (
                <button
                  type="submit"
                  className="mt-4 bg-yellow-25 border border-white rounded-lg px-4 py-2 w-full text-black"
                >
                  Verify and Register
                </button>
              )}
            </form>
          </div>
        </div>
      );
    };