import React, { useState, useEffect } from "react";
import { NavbarLinks } from "../../data/navbar_links";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { setToken, removeToken } from "../../slices/authSlice";
import { setCurrentUser, removeCurrentUser } from "../../slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../services/operations/courseAPI";
import { useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ProfileImage } from "../core/Auth/ProfileImage";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { apiConnector } from "../../services/apiConnectors";
import { endpoints } from "../../services/apis";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import toast from "react-hot-toast";

export const NavBar = ({ isSideNavOpen, setIsSideNavOpen }) => {
  console.log("InNavBar");
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.profile);
  console.log("Token" + token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("CurrentUser" + currentUser?.accountType);
  const { cart } = useSelector((state) => state.cart);
  console.log("IsSideNavopen",isSideNavOpen)
  const totalItems = cart.length;
  const [subLinks, setSubLinks] = useState([]);
  // const  subLinks =[
  //   {title:"Python",link:"/catalog/pyhton"},
  //   {title:"Web Dev",link:"/catalog/web-development"},

  // ];

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const fetchSubLinks = async () => {
    try {
      const { allCategories } = await getAllCategories(dispatch);
      console.log("Printing Subslinks" + allCategories[0].name);
      const neww = allCategories.map((category) => {
        return {
          title: category.name,
          link: `catalog/${category.name.replaceAll(" ", "-").toLowerCase()}/${
            category._id
          }`,
        };
      });

      setSubLinks(neww);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={`flex flex-col md:flex-row h-[100vh] md:h-14 w-[71vw] inset-0  bg-richblack-900 md:bg-richblack-800 md:w-[100vw] bg-opacity-60 md:bg-opacity-200 transition-transform duration-100  ease-linear z-[71] md:translate-x-0 fixed items-center justify-center border-b-[1px] border border-black border-b-richblack-700
    ${isSideNavOpen ? ' translate-x-0 ':' translate-x-[-71vw] '}
    
    `}>
      <div className="flex flex-col h-[100%] w-[100%] md:w-11/12 md:flex-row gap-[22vh] p-[2rem] max-w-maxContent md:items-center justify-between  bg-opacity-80 md:bg-opacity-100  backdrop-blur-[32px] md:backdrop-blur-0">
        <div className="flex justify-between  items-center">
          <Link to="/">
            <img
              src="https://nexrock.uk/wp-content/uploads/2022/04/Logo-Notion-White-al-vivo.png"
              width={100}
              height={68}
              loading="lazy"
              alt="Notion Logo"
            />
          </Link>

          {/* {isSideNavOpen && ( */}
            <RxCross1
              className={`text-white text-[2rem] cursor-pointer flex md:hidden transition-all duration-700 rotate-0   ${isSideNavOpen ? ' rotate-[180deg]':'rotate-[-180deg]'}`}
              onClick={()=>setIsSideNavOpen(false)}
            />
          {/* )} */}
        </div>

        <nav>
          <ul className="flex flex-col md:flex-row gap-[60px]  md:gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index} className=" cursor-pointer">
                {link.title === "Catalog" ? (
                  <div className="relative flex items-center gap-2 group">
                    <p
                      className={
                        location.pathname.contains === link.path
                          ? "text-yellow-25 hover:transition-all hover:text-yellow-25"
                          : "text-richblack-25  hover:transition-all hover:text-yellow-25"
                      }
                      onClick={()=>setIsSideNavOpen(false)}
                    >
                      {link.title}
                    </p>
                    <IoIosArrowDropdownCircle />
                    <div className="invisible z-30 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[80%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5 "></div>
                      {subLinks.length ? (
                        subLinks.map((subLink, index) => (
                          <Link
                            to={`${subLink.link}`}
                            key={index}
                            className="rounded-lg bg-transparent hover:bg-richblack-50" 
                           
                          >
                            {subLink.title}
                          </Link>
                        ))
                      ) : (
                        <div>ss</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link.path} className="">
                    <p
                      className={
                        location.pathname === link.path
                          ? "text-yellow-25 hover:transition-all hover:text-yellow-25"
                          : "text-richblack-25  hover:transition-all hover:text-yellow-25"
                      }
                      onClick={()=>setIsSideNavOpen(false)}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* LogIn/SignUp/DashBoard */}
        <div className="flex gap-x-4 items-center">
          {token === null && (
            <Link to="/signup">
              <button className="border-richblack-200 bg-richblack-700 px-[12px] py-[8px] text-richblack-100 font-bold rounded-md">
                Sign Up
              </button>
            </Link>
          )}
          {token === null && (
            <Link
              to="/login"
              className="border-richblack-700 bg-richblack-700 px-[12px] py-[8px] text-richblack-100 font-bold rounded-md"
            >
              <button>Log In</button>
            </Link>
          )}
          {currentUser && currentUser?.accountType === "Student" && (
            <Link
              to="/dashboard/cart"
              className="relative flex items-center gap-4 mr-4"
            >
              <AiOutlineShoppingCart className="text-white" />
              {totalItems > 0 && (
                <span className="absolute left-[11px] top-[7px] text-center rounded-[7px] w-[18px] h-[18px] bg-richblack-900 border-[1px] border-[#fff] font-normal text-[#f0f0f0] leading-[16px] text-[12px] ">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token !== null && <ProfileImage userImage={currentUser?.image} />}
        </div>
      </div>
    </div>
  );
};

{
  /* {token!==null&&<div className="text-white" onClick={()=>{
                                                                     dispatch(setToken(null)) 
                                                                     dispatch(removeToken()) 
                                                                     dispatch(setCurrentUser(null))
                                                                     dispatch(removeCurrentUser())
                                                                     toast.success("Logged Out Successfully!!!!")
                                                                     navigate("/login")}}>
                                                                     Log Out</div>} */
}
