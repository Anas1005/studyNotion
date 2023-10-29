import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourseDetails } from "../../../services/operations/courseAPI";
import { useState } from "react";
import { formatDateTime } from "../../../utilities/dateFormatter";
import { calculateAverageRating } from "../../../utilities/averageRatings";
import ReactStars from "react-stars";
import { CustomModal } from "./CustomModal";
import { ConfirmationModal } from "../../common/ConfirmationModal";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../../services/operations/profileAPI";
import { formatDuration, secondsToHMS } from "../../../utilities/timeDuration";
import { MdOndemandVideo } from "react-icons/md";
import { RatingsAndReviews } from "./RatingsAndReviews";
import { CourseSummary } from "./CourseSummary";
import { GoInfo } from "react-icons/go";
import { FcCheckmark } from "react-icons/fc";
import "./course.css";

const dummyRatingsAndReviews = [
  {
    user: {
      firstName: "John",
      lastName: "Doe",
      image: "https://source.unsplash.com/random/100x100?user1",
    },
    review:
      "Great course! I learned a lot and found it very useful. The content is well-structured and covers a wide range of topics.",
    rating: 4,
  },
  {
    user: {
      firstName: "Alice",
      lastName: "Smith",
      image: "https://source.unsplash.com/random/100x100?user2",
    },
    review:
      "This course is fantastic! I couldn't be happier with the quality of instruction and the content. Highly recommended!",
    rating: 5,
  },
  {
    user: {
      firstName: "Bob",
      lastName: "Johnson",
      image: "https://source.unsplash.com/random/100x100?user3",
    },
    review:
      "Good content, but could be more detailed. It's a decent course for beginners.",
    rating: 3,
  },
  {
    user: {
      firstName: "Emily",
      lastName: "Davis",
      image: "https://source.unsplash.com/random/100x100?user4",
    },
    review:
      "Enjoyed the course. It's worth it. The instructor explains concepts clearly, and the hands-on exercises are helpful.",
    rating: 4,
  },
  {
    user: {
      firstName: "Michael",
      lastName: "Wilson",
      image: "https://source.unsplash.com/random/100x100?user5",
    },
    review:
      "This course has been a game-changer for me. I've gained new skills that have directly benefited my career. Highly recommend it!",
    rating: 5,
  },
  {
    user: {
      firstName: "Sophia",
      lastName: "Brown",
      image: "https://source.unsplash.com/random/100x100?user6",
    },
    review:
      "Well-structured. I liked it. The video lectures are engaging, and the course materials are comprehensive.",
    rating: 4,
  },
  {
    user: {
      firstName: "William",
      lastName: "Lee",
      image: "https://source.unsplash.com/random/100x100?user7",
    },
    review:
      "Average content. Could be better. Some topics could use more in-depth coverage.",
    rating: 3,
  },
];

export const Course = () => {
  const { courseID } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { currentCourse } = useSelector((state) => state.course);
  const [sections, setSections] = useState([]);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [modalContent,setModalContent]=useState({
    user:null,
    rating:0,
    review:""
  } 
)

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [currentSectionID, setCurrentSectionID] = useState("");
 

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        await getCourseDetails({ courseID }, dispatch);
       
        console.log("Got the details..")
      } catch (e) {
        console.log(e);
      }
    };

    fetchCourseDetails();
    if(token){
    getUserDetails(token,dispatch)
    }
  }, [courseID]);

  useEffect(() => {
    if (currentCourse) {
      setSections(
        currentCourse?.courseContent?.map((section) => ({
          ...section,
          showList: false,
        }))
      );
    }
  }, [currentCourse]);

  return (
    <div className=" relative">
      <div className="bg-richblack-800 text-white">
        <div className="px-12">
          <div className="space-y-3 p-4">
            {/* <p className="text-richblack-300 text-l">
          Home / Catalog /{" "}
          <span className="text-yellow-25">
            {currentCourse?.category || "Loading...."}
          </span>
        </p> */}
            <h1 className="text-4xl">
              <span className="text-white">{currentCourse?.courseName}</span>
            </h1>
            <p className="text-sm text-richblack-300">
              {currentCourse?.courseDescription}
            </p>
          </div>
          <div className="flex flex-col gap-4 mt-4 p-4">
            <div className=" text-richblack-100 flex space-x-3">
              <div>
                {" "}
                {calculateAverageRating(currentCourse?.ratingsAndReviews)}{" "}
              </div>
              <ReactStars
                count={5}
                size={15}
                edit={false}
                value={calculateAverageRating(currentCourse?.ratingsAndReviews)}
                color2={"#ffd700"}
              />
              <div>
                {" "}
                {`(${currentCourse?.ratingsAndReviews?.length} Reviews)`}{" "}
              </div>

              <div className="text-yellow-25">
                {currentCourse?.studentsEnrolled?.length} Students Enrolled
              </div>
            </div>

            <div className="text-richblack-100">
              Created By {currentCourse?.instructor?.firstName}{" "}
              {currentCourse?.instructor?.lastName}
            </div>
            <div className="flex items-center space-x-3 text-richblack-100">
              <GoInfo />
              <span>Created at {formatDateTime(currentCourse?.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex">
        <div className=" w-[67%]">
          <div className=" border border-[#ffffff17] p-4 ml-12 mt-4">
            <div className="space-y-3 p-4">
              <h2 className="text-3xl text-white font-semibold">
                What you'll learn
              </h2>
              <div className="flex flex-col gap-2">
                {currentCourse?.benefits?.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <FcCheckmark />
                    <span className=" text-richblack-200 text-[0.87rem]">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="CourseContent ml-12 mt-16 ">
            <h2 className="text-3xl text-white font-semibold">
              Course Content
            </h2>
            <div className=" text-richblack-200 text-[0.8rem] mt-2">
              {sections?.length} sections •{" "}
              {sections?.reduce((accumulator, section) => {
                return accumulator + section.subSection.length;
              }, 0)}{" "}
              lectures • {formatDuration(currentCourse?.timeDuration)}
              {" total length"}
            </div>
            <div className="pt-[1.2rem] pb-[0.5rem] w-full bg-white bg-opacity-10 backdrop-blur-md text-white my-4 rounded-sm">
              {sections?.map((section, index) => {
                if (section?.subSection?.length !== 0) {
                  return (
                    <div key={index} id={section._id}>
                      <details className="">
                        <summary
                          className="flex items-center justify-between px-8 pt-[0.8rem] pb-[1.25rem] cursor-pointer"
                          onClick={() => {
                            // console.log(e.currentTarget.parentElement.parentElement.id)
                            // const selectedSection=e.currentTarget.parentElement.parentElement;
                            setSections((prev) => {
                              return prev.map((prevSection) => {
                                if (prevSection._id === section._id)
                                  return {
                                    ...prevSection,
                                    showList: !prevSection.showList,
                                  };

                                return { ...prevSection };
                              });
                            });

                            // setShowSubsectionForm(!showSubsectionForm);
                          }}
                        >
                          {/* <div></div> */}
                          <div className="flex items-center gap-4">
                            {" "}
                            <span className=" text-xs">
                              {section.showList ? "▼" : "►"}
                            </span>
                            <h3 className="text-[0.82rem] font-semibold text-richblack-100">
                              {section.sectionName}
                            </h3>
                          </div>

                          <span className=" text-yellow-25 text-[0.82rem]">
                            {section?.subSection?.length} Lectures{" "}
                            <span className="text-richblack-100 ml-4">
                              {formatDuration(section?.timeDuration)}
                            </span>
                          </span>
                        </summary>

                        <div className=" bg-richblack-900 px-8 space-y-4 py-4 text-richblack-100 mx-[0.2%] rounded-sm">
                          {section.subSection.map((subsection, subIndex) => (
                            <div
                              key={subIndex}
                              className=" hover:transition hover:scale-[99.2%] cursor-pointer"
                            >
                              <h4 className="text-sm font-semibold flex items-center justify-between">
                                <div className="flex space-x-4">
                                  <MdOndemandVideo className="text-xl" />
                                  <span className=" text-[0.8rem]">
                                    {subsection.title}
                                  </span>
                                </div>
                                <span className=" text-[0.8rem]">
                                  {secondsToHMS(subsection?.timeDuration)}
                                </span>
                              </h4>
                            </div>
                          ))}
                        </div>
                      </details>
                      {/* <hr className=" text-white"></hr> */}
                    </div>
                  );
                } else {
                  return <div></div>;
                }
                
              })}
            </div>
            
          </div>

          <div className="Author ml-12">
            <h2 className="text-3xl text-white font-semibold mt-8 mb-4">
              {" "}
              Author
            </h2>

            <div className="flex items-center space-x-4 mb-4">
              <img
                src={currentCourse?.instructor?.image}
                alt={`${currentCourse?.instructor?.firstName} ${currentCourse?.instructor?.lastName}`}
                className=" w-16 h-16 rounded-full mr-2"
              />

              <span className=" text-richblack-100">
                {" "}
                {`${currentCourse?.instructor?.firstName} ${currentCourse?.instructor?.lastName}`}
              </span>
            </div>
            <div className=" text-richblack-300 text-[0.85rem]">
              Helllooooooooooooooooooooo
              kbdsBachooooooooooooooooooooooooooo!!!!Kya haall
              chaaallllllldkbslnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnllll
            </div>
          </div>

          <div className="RatingsAndReviews ml-12">
            <h2 className="text-3xl text-white font-semibold mt-44 mb-8 ml-[48%]  text-center">
              Reviews from other Learners
            </h2>

            <RatingsAndReviews reviews={dummyRatingsAndReviews} setModalContent={setModalContent} toggleModal={toggleModal} />

            {showModal && (
              <CustomModal
                modalContent={modalContent}
                toggleModal={toggleModal}
              />
            )}


          </div>
          
        </div>

        <div className=" absolute right-[8%] top-[3%] ">
          <CourseSummary course={currentCourse} setConfirmationModal={setConfirmationModal} />
        </div>
      </div>
    
      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} isOpen={true} />
      )}
    </div>
  );
};
