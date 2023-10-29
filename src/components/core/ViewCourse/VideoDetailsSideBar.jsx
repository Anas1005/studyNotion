import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdOndemandVideo } from "react-icons/md";
import { formatDuration } from "../../../utilities/timeDuration";
import { secondsToHMS } from "../../../utilities/timeDuration";
import { IconBtn } from "../../common/IconBtn";
import toast from "react-hot-toast";
import "./scrollBar.css";
import { FaLessThanEqual } from "react-icons/fa";

export const VideoDetailsSideBar = ({ onAddReviewClick }) => {
  const [currentActiveSectionID, setCurrentActiveSectionID] = useState("");
  const [currentActiveLectureID, setCurrentActiveLectureID] = useState("");
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const { currentCourse } = useSelector((state) => state.course);
  const { courseID, sectionID, subSectionID } = useParams();

  const location = useLocation();
  //   const {}
  //   const isLectureWatched=;
  const {
    entireCourseData,
    courseSectionData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);
  console.log("InVideoSideBar", totalNoOfLectures);

  //   toast.success("SectionJIII",sections.length)

  //   function isLectureWatched(lecture,completedLectures){
  //     return completedLectures.includes(lecture._id);
  //   }

  useEffect(() => {
    (async () => {
      if (currentCourse) {
        console.log("HaiJIIIIIIIIIIIIIIIIIIIIIIII");
        setSections(
          currentCourse?.courseContent?.map((section) => ({
            ...section,
            showList: true,
          }))
        );
      }
      setCurrentActiveSectionID(sectionID);
      setCurrentActiveLectureID(subSectionID);
    })();
    console.log("In VideoSoideBAR Use Effect.");
  }, [courseID, sectionID, subSectionID, location.pathname, currentCourse]);

  return (
    <div className="flex min-w-[250px] flex-col border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10">
      <div className=" flex items-center space-x-4 ml-3 mb-4">
        <span className=" text-white">{currentCourse?.courseName}</span>
        <span className=" text-green-500">{`${completedLectures?.length}/${totalNoOfLectures}`}</span>
      </div>
      <IconBtn
        text={"Add Review"}
        onClick={() => {
          onAddReviewClick();
          // toast.success("Add the Review")
          // onAddReviewClick();
        }}
        customClasses={" w-3/5 mx-3 justify-center"}
        disabled={false} // Disable the button while loading
      />

      <div className=" w-full bg-white bg-opacity-10 backdrop-blur-md text-white my-4 rounded-sm custom-scrollbar">
        {sections?.map((section, index) => {
          if (section?.subSection?.length !== 0) {
            return (
              <div key={index} id={section?._id}>
                <details className="">
                  <summary
                    className="flex items-center justify-between px-4 pt-[0.8rem] pb-[0.8rem] cursor-pointer"
                    onClick={() => {
                      // console.log(e.currentTarget.parentElement.parentElement.id)
                      // const selectedSection=e.currentTarget.parentElement.parentElement;
                      setSections((prev) => {
                        return prev.map((prevSection) => {
                          if (prevSection?._id === section?._id)
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
                      <span className=" text-[0.6rem]">
                        {section.showList ? "►" : "▼"}
                      </span>
                      <h3 className="text-[0.82rem] font-semibold text-richblack-100">
                        {section.sectionName}
                      </h3>
                    </div>

                    <span className=" text-yellow-25 text-[0.82rem]">
                      {/* {section?.subSection?.length} Lectures{" "} */}
                      <span className="text-richblack-100 ml-4">
                        {formatDuration(section?.timeDuration)}
                      </span>
                    </span>
                  </summary>

                  <div
                    className={`   text-richblack-100 rounded-sm    inset-0  bg-black bg-opacity-60                 `}
                  >
                    {section?.subSection?.map((subsection, subIndex) => (
                      <div
                        key={subIndex}
                        className={`hover:transition hover:scale-[99.2%] bg-opacity-80 backdrop-blur-lg px-4 py-[0.68rem] cursor-pointer ${
                          currentActiveLectureID === subsection?._id
                            ? " bg-[#f4ac32]"
                            : ""
                        }`}
                        onClick={() =>
                          navigate(
                            `/view-course/${currentCourse?._id}/section/${section?._id}/subSection/${subsection?._id}`
                          )
                        }
                      >
                        <h4 className="text-sm font-semibold flex items-center justify-between">
                          <div className="flex space-x-4 hover:text-white">
                            {/* <MdOndemandVideo className="text-xl" /> */}
                            <input
                              type="checkbox"
                              id="makePublic"
                              checked={completedLectures?.includes(
                                subsection?._id
                              )}
                              onChange={() =>
                                console.log("HellloJIIIIIIIIIIIII")
                              }
                              className="rounded"
                            />
                            <label htmlFor="makePublic">
                              {/* {subsection.title} */}
                            </label>
                            <span
                              className={`text-[0.8rem]  ${
                                currentActiveLectureID === subsection?._id
                                  ? " text-black"
                                  : " text-richblack-100"
                              }`}
                            >
                            {subsection.title}
                            </span>
                          </div>
                          <span
                            className={`text-[0.8rem] ${
                              currentActiveLectureID === subsection?._id
                                ? " text-black"
                                : ""
                            }`}
                          >
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
  );
};
