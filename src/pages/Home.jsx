import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Button } from "../components/core/HomePage/Button";
import { CodeBlocks } from "../components/core/HomePage/CodeBlocks";


const Home = () => {
  return (
    <div>
      <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">
        <Link to={"/signup"}>
          <div className="group mx-auto mt-16 p-1 rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit ">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p className=" text-yellow-5">Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className=" text-4xl text-center font-semibold mt-7">
          Empower Your Future with
          <span className="font-bold text-blue-400"> Coding Skills</span>
        </div>

        <div className=" mt-4 w-[90%] text-center text-lg font-bold text-richblue-300">
        With our online coding courses, you can learn at your own pace from anywhere in the world and get access to a wealth of resources including hands-on projects, quizzes and personalized feedback from Instructors
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <Button active={true} linkTo={"/signup"}>
            Learn More
          </Button>
          <Button active={false} linkTo={"/login"}>
            Book a Demo
          </Button>
        </div>

        <div className=" mx-5 my-12 shadow-blue-200">
        <video muted loop autoPlay>
        <source src={process.env.PUBLIC_URL + '/assets/Banner.mp4'} type="video/mp4" />

        </video>

        </div>

        <div>
          <CodeBlocks
          position={"lg:flex-row"}
          heading={
            <div className="text-4xl font-semibold">
              Unlock Your <span className="text-blue-400">{" "} True Potential {" "}</span>
              with our Online Courses
            </div>
          }
          subHeading={"Our Courses are designed and taiught buindustry experts who have years of experience in coding and modern Techgnologies"}
          btn1={
            {
              btnText:"Try It Yourself",
              linkTo:"/signup",
              active:true
            }
          }
          btn2={
            {
              btnText:"Learn",
              linkTo:"/login",
              active:false
            }
          }
          codeBlock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Your Website Title</title>\n</head>\n<body>\n  <div class="hero-section">\n    <h1>Welcome to Our Website</h1>\n</html>`}

codeColour={"text-yellow-25"}

   
          
          />
        </div>

        <div>
          <CodeBlocks
          position={"lg:flex-row-reverse"}
          heading={
            <div className="text-4xl font-semibold">
               Start Coding<span className="text-blue-400">{" "} In Seconds {" "}</span>
              with our Online Courses
            </div>
          }
          subHeading={"Our Courses are designed and taiught buindustry experts who have years of experience in coding and modern Techgnologies"}
          btn1={
            {
              btnText:"Try It Yourself",
              linkTo:"/signup",
              active:true
            }
          }
          btn2={
            {
              btnText:"Learn",
              linkTo:"/login",
              active:false
            }
          }
          codeBlock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Your Website Title</title>\n</head>\n<body>\n  <div class="hero-section">\n    <h1>Welcome to Our Website</h1>\n</html>`}

codeColour={"text-yellow-25"}

   
          
          />
        </div>




        {/* Section 2 */}

        {/* Section 3*/}

        {/* Section 4 */}
      </div>
    </div>
  );
};

export default Home;
