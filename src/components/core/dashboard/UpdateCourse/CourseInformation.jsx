import React, { useState } from "react";
import { MdOutlineOpenInBrowser } from "react-icons/md";
import { TbArrowsExchange } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";
import { createCourse, getCourseDetails } from "../../../../services/operations/courseAPI";
import { getAllCategories } from "../../../../services/operations/courseAPI";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCourseStep } from "../../../../slices/courseSlice";
import { updateCourse } from "../../../../services/operations/courseAPI";

export const CourseInformation = () => {
  const{currentCourse}=useSelector((state)=>state.course);
  const [formData, setFormData] = useState({
    courseName: currentCourse?.courseName,
    courseDescription: currentCourse?.courseDescription,
    price: currentCourse?.price,
    // category:currentCourse.category,
    tags: currentCourse?.tags,
    thumbnail: null,
    benefits: currentCourse?.benefits,
    requirements: currentCourse?.requirements
  });

  const [categories, setCategories] = useState([]);

  const{courseStep}=useSelector((state)=>state.course)

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const { allCategories } = await getAllCategories(dispatch);
      setCategories(allCategories);
      console.log("Ctaegoires are:" + allCategories[0]._id);
    } catch (e) {
      console.log(e);
      toast.error("Some error eoccure din eftgxung Categories");
    }
  };

  const [thumbnailPreview, setThumbnailpreview] = useState(currentCourse?.thumbnail);
  const handleTagKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setFormData({
        ...formData,
        tags: [...formData.tags, e.target.value.trim()],
      });
      e.target.value = "";
    }
  };

  const handleBenefitKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, e.target.value.trim()],
      });
      e.target.value = "";
    }
  };

  const handleRequirementKeyPress = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, e.target.value.trim()],
      });
      e.target.value = "";
    }
  };

  const thumbnailChangeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File is" + file);
      const reader = new FileReader();

      reader.onload = (e) => {
        // e.target.result contains the data URL of the selected image
        const imageDataUrl = e.target.result;
        setThumbnailpreview(imageDataUrl);

        // Update the formData with the selected image data URL
        setFormData({
          ...formData,
          thumbnail: file,
          // Add a new property for preview
        });
      };

      // Read the selected image file as a data URL
      reader.readAsDataURL(file);
    }
  };

  const handleNext = async () => {
   
    console.log("FormData:"+formData.courseName)
    try {
      await updateCourse({...formData,courseID:currentCourse?._id}, token, dispatch);
      await getCourseDetails({courseID:currentCourse?._id},dispatch);
      toast.success("Kr Diya Course Update");
      dispatch(setCourseStep(courseStep+1))
    } catch (e) {
      toast.error(e.response?.data?.message);
    }
  };

  return (
    <div className="mt-4">
      <div className="mx-[30%]">
        <h2 className="text-2xl font-semibold text-white mb-4 text-center ">
          Course Information
        </h2>
        <form className="grid grid-cols-1 gap-4 rounded-lg p-4 w-full">
          <div className="flex flex-col">
            <label htmlFor="courseTitle" className="text-white mb-1">
              Course Title
            </label>
            <input
              type="text"
              id="courseTitle"
              name="courseTitle"
              className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
              placeholder="Course Title"
              value={formData.courseName}
              onChange={(e) =>
                setFormData({ ...formData, courseName: e.target.value })
              }
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="courseShortDescription" className="text-white mb-1">
              Course Short Description
            </label>
            <textarea
              id="courseShortDescription"
              name="courseShortDescription"
              rows="4"
              className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
              placeholder="Course Short Description"
              value={formData.courseDescription}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  courseDescription: e.target.value,
                })
              }
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="coursePrice" className="text-white mb-1">
              Course Price
            </label>
            <input
              type="text"
              id="coursePrice"
              name="coursePrice"
              className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
              placeholder="Course Price"
              value={formData.price}
              onChange={(e) => {
                console.log(`Type:${typeof parseInt(e.target.value)}`);
                // if(typeof(+e.target.value)==="Number")
                setFormData({ ...formData, price: e.target.value });
              }}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="courseCategory" className="text-white mb-1">
              Course Category
            </label>
            {/* Handle this option Part Later */}
            <select
              id="courseCategory"
              name="courseCategory"
              className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
              value={""}
              // onChange={(e) => {
              //   const selectedIndex = e.target.selectedIndex;
              //   const selectedOption = e.target.options[selectedIndex];
              //   const categoryId = selectedOption.getAttribute("id");
              //   console.log(categoryId)
              //   setFormData({ ...formData, category: categoryId });
              // }}
            >
              <option value="">{currentCourse?.category?.name}</option>
              {/* {categories.map((category) => (
                <option
                  className="text-white bg-richblack-800"
                  id={category._id}
                  value={category.name}
                >
                  {category.name}
                </option>
              ))} */}
              {/* <option value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option> */}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="tags" className="text-white mb-1">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
              placeholder="Enter a Tag and press Enter"
              onKeyPress={handleTagKeyPress}
            />
            <div className="flex flex-wrap mt-2">
              {formData?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-yellow-900 text-yellow-25 rounded-full px-2 py-1 m-1 cursor-pointer"
                  onClick={() => {
                    const updatedTags = [...formData.tags];
                    updatedTags.splice(index, 1);
                    setFormData({ ...formData, tags: updatedTags });
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="courseThumbnail" className="text-white mb-1">
              Course Thumbnail
            </label>
            <label
              htmlFor="courseThumbnail"
              className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none cursor-pointer"
            >
              {thumbnailPreview ? (
                <div>
                  <img
                    src={thumbnailPreview}
                    alt="Course Thumbnail"
                    className="mt-2 w-full h-full rounded-lg"
                  />
                  <div className="text-white mt-2 cursor-pointer flex gap-4 items-center">
                    <TbArrowsExchange /> Change
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-3 p-6">
                  <MdOutlineOpenInBrowser className="text-3xl" />
                  <span>
                    Click to <span className="text-yellow-25">Browse</span> a
                    file
                  </span>
                </div>
              )}
              <input
                type="file"
                id="courseThumbnail"
                name="courseThumbnail"
                className="hidden"
                accept="image/*"
                onChange={thumbnailChangeHandler}
              />
            </label>
          </div>

          <div className="flex flex-col">
            <label htmlFor="benefits" className="text-white mb-1">
              Benefits
            </label>
            <input
              type="text"
              id="benefits"
              name="benefits"
              className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
              placeholder="Enter a Benefit and press Enter"
              onKeyPress={handleBenefitKeyPress}
            />
            <ul className="mt-2">
              {formData?.benefits?.map((benefit, index) => (
                <li
                  key={index}
                  className="text-white flex items-center gap-2 cursor-pointer rounded-full px-2 py-1 m-1 bg-richblack-700"
                  // Change the color here
                  onClick={() => {
                    console.log(formData.benefits);
                    const updatedBenefits = [...formData.benefits];
                    updatedBenefits.splice(index, 1);
                    setFormData({ ...formData, benefits: updatedBenefits });
                  }}
                >
                  <RxCross2 className=" text-red-600" />{" "}
                  <span className="  text-richblack-25">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <label htmlFor="requirements" className="text-white mb-1">
              Requirements
            </label>
            <input
              type="text"
              id="requirements"
              name="requirements"
              className="border border-white rounded-lg px-4 py-2 w-full bg-white bg-opacity-10 backdrop-blur-md text-white focus:outline-none focus:border-none"
              placeholder="Enter a Requirement and press Enter"
              onKeyPress={handleRequirementKeyPress}
            />
            <ul className="mt-2">
              {formData?.requirements?.map((requirement, index) => (
                <li
                  key={index}
                  className="text-white flex items-center gap-2 cursor-pointer rounded-full px-2 py-1 m-1 bg-richblack-700"
                  style={{ color: "blue" }} // Change the color here
                  onClick={() => {
                    const updatedRequirements = [...formData.requirements];
                    updatedRequirements.splice(index, 1);
                    setFormData({
                      ...formData,
                      requirements: updatedRequirements,
                    });
                  }}
                >
                  <RxCross2 className=" text-red-600" />{" "}
                  <span className="  text-richblack-25">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </form>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={handleNext}
            className="bg-yellow-25 border border-white rounded-lg px-4 py-2 text-black"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
