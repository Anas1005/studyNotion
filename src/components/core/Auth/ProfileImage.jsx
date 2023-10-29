import React, { useEffect, useRef, useState } from "react";
import { FaUser, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeToken } from "../../../slices/authSlice";
import { removeCurrentUser } from "../../../slices/profileSlice";
import { useNavigate } from "react-router-dom";

export const ProfileImage = ({ userImage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const containerRef = useRef(null);

  useEffect(() => {
    // Add a click event listener to the document to handle clicks outside the container
    document.addEventListener("click", handleDocumentClick);
    return () => {
      // Remove the event listener when the component unmounts
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDocumentClick = (e) => {
    // Check if the click occurred outside the container
    console.log(containerRef.current)
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  const handleLogout = () => {
    // Dispatch logout action and clear user data
    dispatch(removeToken());
    dispatch(removeCurrentUser());
    navigate("/login");
    // Redirect to the login page or perform any other required actions
  };

  return (
    <div className="relative" ref={containerRef}>
      <img
        src={userImage}
        alt="User Profile"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 bg-richblack-800 rounded-md shadow-md bg-[#ffc30047] text-richblack-200 z-40" >
          <ul className="p-2">
            <li className="flex items-center p-2 hover:bg-richblack-900 rounded-md cursor-pointer" onClick={() => navigate("/dashboard/settings")}>
              <FaTachometerAlt
                className="mr-2 cursor-pointer"
               
              />
              Dashboard
            </li>
            <li
              className="flex items-center p-2 hover:bg-richblack-900 rounded-md cursor-pointer"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
