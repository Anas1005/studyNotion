import React, { useState } from "react";
import { CourseSlider } from "../components/core/CourseSlider";
import { CourseCard } from "../components/core/CourseCard";
import { getCategoryPageDetails } from "../services/operations/courseAPI";
import { shuffleArray } from "../utilities/shuffleArray";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


export const Catalog = () => {
  console.log("---------->","HelloJIIIIIIIIII");
  const frequentlyBoughtCourses = [
    {
      id: 1,
      name: "Machine Learning Foundations",
      thumbnail:
        "https://blogct.creative-tim.com/blog/content/images/2022/01/which-development-job-is-right-for-you.jpg",
      rating: 4.8,
      totalRatings: 150,
      price: "Rs. 59.99",
    },
    {
      id: 2,
      name: "Data Analysis with Python",
      thumbnail:
        "https://blogct.creative-tim.com/blog/content/images/2022/01/which-development-job-is-right-for-you.jpg",
      rating: 4.5,
      totalRatings: 120,
      price: "Rs. 49.99",
    },
    {
      id: 3,
      name: "Web Development Bootcamp",
      thumbnail:
        "https://blogct.creative-tim.com/blog/content/images/2022/01/which-development-job-is-right-for-you.jpg",
      rating: 4.9,
      totalRatings: 180,
      price: "Rs. 69.99",
    },
    {
      id: 4,
      name: "Full-Stack JavaScript",
      thumbnail:
        "https://blogct.creative-tim.com/blog/content/images/2022/01/which-development-job-is-right-for-you.jpg",
      rating: 4.7,
      totalRatings: 140,
      price: "Rs. 79.99",
    },
    {
      id: 5,
      name: "React Native Advanced",
      thumbnail:
        "https://blogct.creative-tim.com/blog/content/images/2022/01/which-development-job-is-right-for-you.jpg",
      rating: 4.6,
      totalRatings: 160,
      price: "Rs. 89.99",
    },
    {
      id: 6,
      name: "Java Programming Masterclass",
      thumbnail:
        "https://blogct.creative-tim.com/blog/content/images/2022/01/which-development-job-is-right-for-you.jpg",
      rating: 4.4,
      totalRatings: 130,
      price: "Rs. 59.99",
    },
    // Add more frequently bought courses as needed
  ];

  const{categoryName,categoryID}=useParams();
  const [selectedCategory,setSelectedCategory]=useState(null);
  const [differentCategories,setDifferentCategories]=useState([]);
  const [topSellingCourses,setTopSellingCourses]=useState([]);
  const dispatch=useDispatch();
  console.log("Hhbu ..******",categoryName,categoryID)

  useEffect(() => {
    fetchCategoryPageDetails()
  }, [categoryID])

  const fetchCategoryPageDetails=async()=>{
    try{
     const{subLinks}= await getCategoryPageDetails({categoryID},dispatch);
     console.log("SubLinks :"+subLinks);
     setSelectedCategory(subLinks.selectedCategory);
     setDifferentCategories(subLinks.differentCategories);
     setTopSellingCourses(subLinks.topSellingCourses);

    }
    catch(e){
      console.log(e);

    }
  }
  

  const [activeTab, setActiveTab] = useState("mostPopular"); // Initially set to "mostPopular"

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="">
      {/* First div */}
      <div className="bg-richblack-800 text-white px-12 py-8">
        <div className=" space-y-3 p-4">
          <p className=" text-richblack-300 text-l">
            Home / Catalog /{" "}
            <span className="text-yellow-25">{selectedCategory?.name || "Loading...." }</span>
          </p>
          <h1 className="text-4xl">
            <span className="text-white">{selectedCategory?.name}</span>
          </h1>
          <p className="text-sm text-richblack-300">
            {selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Second div */}
      <div className=" text-white mx-[5%] py-8">
        <div className=" space-y-3">
          <h2 className="text-3xl">Courses to Get Started</h2>
          <div className="flex space-x-12 ml-3">
            <button
              className={`text-richblack-300 hover:text-yellow-25 text-sm ${
                activeTab === "mostPopular" && "text-yellow-25"
              }`}
              onClick={() => handleTabClick("mostPopular")}
            >
              Most Popular
            </button>
            <button
              className={`text-richblack-300 hover:text-yellow-25 ${
                activeTab === "new" && "text-yellow-25"
              }`}
              onClick={() => handleTabClick("new")}
            >
              New
            </button>
          </div>

          {/* Yellow underline indicator */}
          <div
            className="w-[12%] h-[0.1rem] flex justify-center bg-yellow-25"
            style={{
              transform:
                activeTab === "new" ? "translateX(100%)" : "translateX(0)",
              transition: "transform 0.3s",
            }}
          ></div>

          {/* Conditional rendering based on activeTab */}
          {activeTab === "mostPopular" && <p></p>}
          {activeTab === "new" && <p></p>}
        </div>
        <CourseSlider  courses={selectedCategory?.courses} type={"selectedCategory"} />
      </div>

      {/* Third Div */}
      <div className=" text-white mx-[5%] py-8 mt-6">
        <div className=" space-y-3 px-4 mb-4">
          <h2 className="text-3xl">{"Explore other Catgeories"} </h2>
        </div>
        <CourseSlider courses={shuffleArray(differentCategories)} type={"differentCategories"}  />
      </div>

      <div className="text-white mx-[11%] py-8">
      <div className="space-y-3">
      <h2 className="text-3xl text-white flex justify-center mt-4">Top Courses</h2>
        <div className="grid grid-cols-2 gap-4  gap-y-11 ">
          {topSellingCourses?.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

      </div>
       
      </div>

    </div>
  );
};
