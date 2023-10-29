


import React, { useEffect, useState } from "react";
import { SubSection } from "./SubSection";
import { createSection } from "../../../../../services/operations/sectionAPI"; // Import the Subsection component
import { useDispatch, useSelector } from "react-redux";
import { setCourseStep } from "../../../../../slices/courseSlice";

export const CourseBuilder = () => {
  const { courseStep, currentCourse } = useSelector((state) => state.course);
  console.log(currentCourse.courseContent.length)
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [sections, setSections] = useState([]);
  console.log("In Course Builder:" + currentCourse);
  
  useEffect(() => {
    if (currentCourse) {
      setSections(
        currentCourse?.courseContent?.map((section) => ({
          ...section,
          showList: true,
        }))
      );
    }
  }, [currentCourse]);
  


  console.log("Sections Yeh Hai:" + sections.length);

  const [currentSection, setCurrentSection] = useState("");
  const [currentSectionID, setCurrentSectionID] = useState("");
  const [showSubsectionModal, setShowSubsectionModal] = useState(false); // Control Subsection modal visibility

  const handleCreateSection = async () => {
    console.log("Kyyya be....");
    try {
      await createSection(
        { sectionName: currentSection, courseID: currentCourse._id },
        token,
        dispatch
      );
     
      console.log("Ho Gy aSection Create");
    } catch (e) {
      console.log(e);
    }

  };

 
  const toggleSubSectionModal = () => {
    setShowSubsectionModal(!showSubsectionModal);

  };

  return (
    <div className="mt-4 mx-[30%]">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4 text-center">
          Course Builder
        </h2>
        <div className="flex flex-col">
          <label htmlFor="sectionName" className="text-white font-bold text-lg mb-1">
            Section Name
          </label>
          <input
            type="text"
            id="sectionName"
            name="sectionName"
            className="rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
            placeholder="Section Name"
            value={currentSection}
            onChange={(e) => setCurrentSection(e.target.value)}
          />
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleCreateSection}
            className="border border-yellow-25 font-bold rounded-lg px-4 py-2 text-yellow-25"
          >
            Create Section
          </button>
        </div>

        {sections?.length !== 0 && (
          <div className=" rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white my-4">
            {sections.map((section, index) => (
              <div key={index} className="mt-4" id={section._id}>
                <div className="flex items-center gap-2">
                  <button
                    className="text-white text-[0.5rem] focus:outline-none"
                    id={index}
                    onClick={() => {
                      // console.log(e.currentTarget.parentElement.parentElement.id)
                      // const selectedSection=e.currentTarget.parentElement.parentElement;
                      setSections((prev) => {
                        return prev.map((prevSection) => {
                           if(prevSection._id===section._id)
                          return { ...prevSection, showList: !prevSection.showList };

                           return { ...prevSection};
                        });
                      });

                      // setShowSubsectionForm(!showSubsectionForm);
                    }}
                  >
                    {section.showList ? "▼" : "►"}
                  </button>
                  <h3 className="text-lg font-semibold text-white">
                    {section.sectionName}
                  </h3>
                </div>
                

                <div className="ml-4">
                  {/* Display subsections */}
                  {section.showList &&
                    section.subSection.map((subsection, subIndex) => (
                      <div key={subIndex} className="mt-2">
                        {/* Display subsection details here */}
                        <h4 className="text-sm font-semibold">
                          {subIndex + 1}
                          {". "}
                          {subsection.title}
                        </h4>
                        {/* <p className="text-sm">{subsection.description}</p> */}
                      </div>
                    ))}

                  {section.showList && (
                    <button
                      onClick={() => {
                        setCurrentSectionID(section._id);
                        toggleSubSectionModal();
                      }}
                      className="text-yellow-25 mt-2"
                    >
                      <span className=" font-extrabold text-xl hover:transition-all hover:scale-50">
                        +
                      </span>{" "}
                      <span className="text-sm">Add Subsection</span>
                    </button>
                  )}
                </div>
              <div className=" opacity-60 mt-2">  <hr className=""/></div>
              </div>
            ))}
            
          </div>
        )}

        {/* Display sections and subsections */}

        {/* Subsection Modal */}
        {showSubsectionModal && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50">
            <SubSection
              sectionID={currentSectionID}
              setSections={setSections}
              toggleSubSectionModal={toggleSubSectionModal}
              // mode
              // editSubSectionDetails
              
            />
          </div>
        )}

       
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={()=> dispatch(setCourseStep(courseStep+1))}
            className="bg-yellow-25 font-bold rounded-lg px-4 py-2 text-black"
          >
            Next
          </button>
          </div>
      </div>
    </div>
  );
};
