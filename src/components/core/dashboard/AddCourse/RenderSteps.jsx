import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { CourseInformation } from "./CourseInformation"; // Import your step components
import { CourseBuilder } from "./CourseBuilder/index";
import { Publish } from "./Publish";
import "./stepper.css";
import { useSelector } from "react-redux";

export const RenderSteps = () => {
  const steps = ["Course Information", "Course Builder", "Publish"];
  const { courseStep } = useSelector((state) => state.course);
  const courseState = useSelector((state) => state.course);
  console.log("CourseStep:" + courseStep);
  console.log("CourseState:" + courseState.currentCourse);
  const currentStep = courseStep;
  const [complete, setComplete] = useState(false);

  return (
    <div className="flex flex-col relative">
      <div className="flex mx-auto absolute sticky top-0 z-30 bg-richblack-900">
        {steps?.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? (
                <TiTick size={24} className=" text-black" />
              ) : (
                <span
                  className={`${
                    currentStep === i + 1 ? "text-yellow-25" : "text-gray-400"
                  }
            } `}
                >
                  {i + 1}
                </span>
              )}
            </div>
            <p className="text-gray-500">{step}</p>
          </div>
        ))}
      </div>

      {/* Render the current step component based on the currentStep value */}
      {currentStep === 1 && <CourseInformation />}
      {currentStep === 2 && <CourseBuilder />}
      {currentStep === 3 && <Publish />}

      {/* Render the "Finish" message when all steps are complete */}
      {complete && (
        <p className="text-green-500">Course creation is complete!</p>
      )}
    </div>
  );
};
