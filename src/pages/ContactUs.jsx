import React, { useState } from 'react';
import { contactUs } from '../services/operations/authAPI'; // Import the API function for submitting the contact form
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ToastLoading } from '../components/common/ToastLoading';
import { useDispatch, useSelector } from 'react-redux';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: '',
    issueDescription: '',
  });
  const navigate = useNavigate();
  const {isLoading,name}=useSelector((state)=>state.loader)
  const dispatch=useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await contactUs(formData,dispatch); // Replace with your API function to submit the contact form
      navigate('/'); // Redirect to the home page or a thank you page
    //   toast.success('Your message has been submitted successfully!');
    } catch (error) {
      console.error('Error submitting contact form:', error);
    //   toast.error('Failed to submit the contact form. Please try again later.');
    }
  };

  return (
    <div className="mt-4 mx-auto max-w-md">
    {
      (isLoading && name==="contactUs")? (
        <ToastLoading/>
      ):(
        <form className="grid grid-cols-1 gap-4 mt-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="text-white block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleInputChange}
            // required
          />
        </div>
        <div>
          <label htmlFor="issueDescription" className="text-white block mb-1">
            Issue Description
          </label>
          <textarea
            id="issueDescription"
            name="issueDescription"
            rows="4"
            className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white"
            placeholder="Describe your issue..."
            value={formData.issueDescription}
            onChange={handleInputChange}
            // required
          />
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-yellow-25 border border-white rounded-lg px-4 py-2 w-full text-black"
          >
            Submit
          </button>
        </div>
      </form>

      )
    }
    
    </div>
  );
};
