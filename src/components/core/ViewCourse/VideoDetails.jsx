import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconBtn } from "../../common/IconBtn";

import { useNavigate, useParams } from "react-router-dom";
import { Player } from "video-react";

import "video-react/dist/video-react.css";
import { setCompletedLectures } from "../../../slices/viewCourseSlice";

import { AiFillPlayCircle } from "react-icons/ai";

import toast from "react-hot-toast";

import { updateCourseProgress } from "../../../services/operations/courseAPI";

// const Modal = ({ isVisible, onMarkAsComplete, onRewatch }) => {
//   const modalStyle = {
//     opacity: isVisible ? 1 : 0,
//     transition: "opacity 0.5s ease",
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: isVisible ? "translate(-50%, -50%)" : "translate(-50%, -50%) scale(0)",
//     zIndex: 1,
//     background: "white",
//     padding: "20px",
//     borderRadius: "8px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//   };

//   return (
//     <div style={modalStyle}>
//       <button onClick={onMarkAsComplete}>Mark as Complete</button>
//       <button onClick={onRewatch}>Rewatch</button>
//     </div>
//   );
// };

export const VideoDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { sectionID, subSectionID } = useParams();
  const navigate = useNavigate();
  const { currentCourse } = useSelector((state) => state.course);
  const playerRef = useRef();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [videoData, setVideoData] = useState(null);
  const { completedLectures } = useSelector((state) => state.viewCourse);
  const [currentLectureIndex, setCurrentLectureIndex] = useState(0);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const { isLoading, name } = useSelector((state) => state.loader);
  // const firstSection=currentCourse?.courseContent[c]
  // const lastLectureIndex=lastSection?.subSection?.[lastSection?.subSection?.length-1];
  const lastSection =
    currentCourse?.courseContent[currentCourse?.courseContent?.length - 1];
  const lastSectionIndex = currentCourse?.courseContent?.length - 1;
  const lastLectureIndex = lastSection?.subSection?.length - 1;
  console.log("LastSECTIONIndex", lastSectionIndex);
  console.log("LASTlectureIndex", lastLectureIndex);
  console.log("VideoURL:", videoData?.videoURL);

  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  console.log("JIJIJIJIJIJ", currentSectionIndex, currentLectureIndex);

  useEffect(() => {
    const currentSectionIndex = currentCourse?.courseContent?.findIndex(
      (section) => section._id === sectionID
    );
    setCurrentSectionIndex(currentSectionIndex);
    const currentLectureIndex = currentCourse?.courseContent?.[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data?._id === subSectionID);
    setCurrentLectureIndex(currentLectureIndex);

    setVideoData(
      currentCourse?.courseContent?.[currentSectionIndex]?.subSection?.[
        currentLectureIndex
      ]
    );
  }, [currentCourse, sectionID, subSectionID]);

  const handleNextVideo = () => {
    const nextLectureIndex = currentLectureIndex + 1;
    const presentSection = currentCourse?.courseContent?.[currentSectionIndex];

    if (nextLectureIndex === presentSection?.subSection?.length) {
      const nextSectionIndex = currentSectionIndex + 1;
      const nextSectionID =
        currentCourse?.courseContent?.[nextSectionIndex]?._id;
      const nextLectureID =
        currentCourse?.courseContent?.[nextSectionIndex]?.subSection?.[0]?._id;

      navigate(
        `/view-course/${currentCourse._id}/section/${nextSectionID}/subSection/${nextLectureID}`
      );
      return;
    }

    const presentSectionID = sectionID;
    const nextLectureID = presentSection?.subSection?.[nextLectureIndex]?._id;

    navigate(
      `/view-course/${currentCourse._id}/section/${presentSectionID}/subSection/${nextLectureID}`
    );
  };

  const handlePreviousVideo = () => {
    const prevLectureIndex = currentLectureIndex - 1;
    const presentSection = currentCourse?.courseContent?.[currentSectionIndex];

    if (prevLectureIndex === -1) {
      const prevSectionIndex = currentSectionIndex - 1;
      const prevSectionID =
        currentCourse?.courseContent?.[prevSectionIndex]?._id;
      const prevLectureID =
        currentCourse?.courseContent?.[prevSectionIndex]?.subSection?.[
          currentCourse?.courseContent?.[prevSectionIndex]?.subSection?.length -
            1
        ]?._id;

      navigate(
        `/view-course/${currentCourse._id}/section/${prevSectionID}/subSection/${prevLectureID}`
      );
      return;
    }

    const presentSectionID = sectionID;
    const prevLectureID = presentSection?.subSection?.[prevLectureIndex]?._id;
    navigate(
      `/view-course/${currentCourse._id}/section/${presentSectionID}/subSection/${prevLectureID}`
    );
  };

  const handleLectureCompletion = async () => {
    try {
      const completedLectures = await updateCourseProgress(
        { subSectionID, courseID: currentCourse?._id },
        token,
        dispatch
      );
      dispatch(setCompletedLectures(completedLectures));
      hideModal();
      // dispatch(setCompletedLectures());
      // await getCourseProgress({ courseID:currentCourse?._id }, token, dispatch);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="text-white">
      <div className="mx-5 my-12 shadow-blue-200">
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => {
            toast.success("Video Ended");
            showModal();
          }}
          src={videoData?.videoURL}
        />
        {/* 
        <PlayButton
          className="absolute inset-0 flex items-center justify-center"
          style={{ fontSize: "2rem" }}
        /> */}
      </div>

      <div className="flex justify-center items-center">
        {currentSectionIndex === 0 && currentLectureIndex === 0 ? (
          <></>
        ) : (
          <IconBtn
            text={"Prev"}
            onClick={() => handlePreviousVideo()}
            customClasses={"w-[12%] mx-3 justify-center"}
            disabled={false}
          />
        )}

        {currentSectionIndex === lastSectionIndex &&
        currentLectureIndex === lastLectureIndex ? (
          <></>
        ) : (
          <IconBtn
            text={"Next"}
            onClick={() => handleNextVideo()}
            customClasses={"w-[12%] mx-3 justify-center"}
            disabled={false}
          />
        )}
      </div>

      <div className=" text-white flex flex-col gap-4">
        <h1 className=" text-xl font-bold">{videoData?.title}</h1>
        <h1>{videoData?.description}</h1>
      </div>

      {isModalVisible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10 w-[]"
          // style={{
          //   background: "rgba(0, 0, 0, 0.6)",
          //   transition: "background 0.5s ease",
          //   opacity: 1,
          //   zIndex: 1,
          // }}
        >
          <div
            className=" bg-opacity-80 flex justify-center items-center rounded-lg backdrop-blur-lg p-4 w-[100%] h-[100%] shadow-md space-x-4"
            style={{
              transition: "transform 0.5s ease",
              // transform: "translate(20%, -50%)",
            }}
          >
            {!completedLectures.includes(subSectionID) && (
              <IconBtn
                text={!isLoading ? "Mark as Complete" : "Loading...."}
                onClick={() => handleLectureCompletion()}
                customClasses={"justify-center  "}
                disabled={isLoading}
              />
            )}
            <IconBtn
              text={"Re-Watch"}
              onClick={() => {
                if (playerRef.current) {
                  playerRef.current.seek(0);
                  setIsVideoEnded(false);
                }
                hideModal();
              }}
              customClasses={"justify-center "}
              disabled={isLoading}
            />
          </div>
        </div>
      )}

      <style>
        {`
          .video-react-big-play-button {
            // Customize the play button's position here
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(450%, 450%);
          }
        `}
      </style>
    </div>
  );
};
