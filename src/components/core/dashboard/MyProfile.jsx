import React, { useEffect ,useState} from "react";
import { FiEdit } from "react-icons/fi";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigate } from "react-router-dom";
import { IconBtn } from "../../common/IconBtn"; // Import the IconBtn component from the appropriate location
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../../services/operations/profileAPI";
import { getCategories } from "../../../slices/categorySlice";
import { setCurrentUser } from "../../../slices/profileSlice";
import { ToastLoading } from "../../common/ToastLoading";



export const  MyProfile = () => {
    const{token}=useSelector((state)=>state.auth);
    const {currentUser} = useSelector(
                (state) => state.profile
              );
            
            
    const navigate=useNavigate();
    const dispatch=useDispatch();   
    const {isLoading,name}=useSelector((state)=>state.loader)
    // console.log("Data:",data);
    // const {isLoading,name}=useSelector((state)=>state.loader)
    // const isLoading=data.isLoading;
    // const name=data.name;

    console.log("In My Profile Page:",isLoading,name)
    // console.log(data.isLoading);
    // console.log(name)
    

    useEffect(() => {
      console.log("Fetcgung User")
        handleGettingUserDetails(token)
        console.log("Fetcgun Ctaefgoues in Profile")
        // dispatch(getCategories({token,dispatch}))
        console.log("Vat Fetched in Profile")
    }, [])

    const handleGettingUserDetails=async()=>{
        try{
            await getUserDetails(token,dispatch);
            // console.log("In User Profile: "+userDetails?.additionalDetails)
            // dispatch(setCurrentUser(userDetails));
            //
        }
        catch(error){
            console.log("Error fetching User Details")
            navigate("/login")
        }
    }
    
    return (
      <div className="my-[3%] mx-[20%]">
        <div>
          <div className="text-white text-[1.5rem] mb-4 font-bold">
            My Profile
          </div>
          <div className="flex flex-row justify-between bg-richblack-800 rounded-lg p-6 mb-4">
            <div className="flex flex-row">
              <div className="rounded-full bg-dark-black-800 w-20 h-20 flex items-center justify-center mr-4 shadow-[0px_0px_13px_0px]">
                {isLoading && name==="getUserDetails" ? (
                  <Skeleton circle={true} width={80} height={80} />
                ) : (
                  <img
                    src={currentUser?.image}
                    alt="Profile"
                    className="rounded-full w-[5rem] h-[5rem] object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col">
                <div className="text-white text-[1.5rem] font-bold mb-2">
                  {isLoading  && name==="getUserDetails" ? (
                    <Skeleton width={100} />
                  ) : (
                    `${currentUser?.firstName} ${currentUser?.lastName}`
                  )}
                </div>
                <div className="text-white mb-2">
                  {isLoading  && name==="getUserDetails" ? (
                    <Skeleton width={200} />
                  ) : (
                    currentUser?.email
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <IconBtn
                text={"Edit"}
                onClickHandler={() => navigate("/dashboard/settings")}
              >
                <FiEdit />
              </IconBtn>
            </div>
          </div>
  
          {/* Second Div */}
          <div className="flex flex-row justify-between bg-richblack-800 rounded-lg p-6 mb-4">
            <div className="flex flex-col">
              <div className="font-bold text-white text-lg mb-4">About</div>
              {isLoading  && name==="getUserDetails"? (
                <Skeleton count={5} />
              ) : (
                <div className="text-white mb-2 max-w-[400px] overflow-y-auto">
                  {currentUser?.additionalDetails?.about}
                </div>
              )}
            </div>
  
            <div className="flex flex-col">
              <IconBtn
                text={"Edit"}
                onClickHandler={() => navigate("/dashboard/settings")}
              >
                <FiEdit />
              </IconBtn>
            </div>
          </div>
  
          {/* Third Div */}
          <div className="flex flex-row justify-between bg-richblack-800 rounded-lg p-6 mb-4">
            <div>
              <div className="font-bold text-white text-lg mb-4">
                Personal Details
              </div>
              <div className="grid grid-cols-2 gap-[7.25rem]">
                <div className="flex flex-col">
                  <div className="text-richblack-200">First Name</div>
                  {isLoading  && name==="getUserDetails"? (
                    <Skeleton width={100} />
                  ) : (
                    <div className="text-white mb-3">{currentUser?.firstName}</div>
                  )}
                  <div className="text-richblack-200">Email</div>
                  {isLoading  && name==="getUserDetails"? (
                    <Skeleton width={200} />
                  ) : (
                    <div className="text-white mb-3">{currentUser?.email}</div>
                  )}
                  <div className="text-richblack-200">Gender</div>
                  {isLoading  && name==="getUserDetails"? (
                    <Skeleton width={100} />
                  ) : (
                    <div className="text-white mb-3">{currentUser?.additionalDetails?.gender}</div>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="text-richblack-200">Last Name</div>
                  {isLoading  && name==="getUserDetails" ? (
                    <Skeleton width={100} />
                  ) : (
                    <div className="text-white mb-3">{currentUser?.lastName}</div>
                  )}
                  <div className="text-richblack-200">Contact Number</div>
                  {isLoading  && name==="getUserDetails" ? (
                    <Skeleton width={150} />
                  ) : (
                    <div className="text-white mb-3">{currentUser?.additionalDetails?.contactNumber}</div>
                  )}
                  <div className="text-richblack-200">Date Of Birth</div>
                  {isLoading  && name==="getUserDetails" ? (
                    <Skeleton width={100} />
                  ) : (
                    <div className="text-white mb-3">{currentUser?.additionalDetails?.dateOfBirth}</div>
                  )}
                </div>
              </div>
            </div>
  
            <div className="flex flex-col">
              <IconBtn
                text={"Edit"}
                onClickHandler={() => navigate("/dashboard/settings")}
              >
                <FiEdit />
              </IconBtn>
            </div>
          </div>
        </div>
      </div>
    );
  };