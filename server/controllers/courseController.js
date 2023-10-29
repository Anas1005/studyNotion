const Course = require("../models/courseModel");
const CourseProgress = require("../models/courseProgressModel");
const Section=require('../models/sectionModel');
const SubSection = require("../models/subSectionModel");
const Category = require("../models/categoryModel");
const User = require("../models/userModel");
const { uploadToCloudinary } = require("../utils/uploader");

exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      price,
      category,
      tags,
      requirements,
      benefits,
    } = req.body;
    console.log(req.body);
    console.log("Yeh Le Course Craete pe aa Gya..");
    console.log(
      courseName +
        " " +
        courseDescription +
        " " +
        price +
        " " +
        category +
        " " +
        requirements +
        " " +
        tags
    );

    const { thumbnail } = req.files;
    console.log("YH LE THUMB", thumbnail);
    const instructorID = req.user.id;

    // console.log(courseName+" "+courseDescription+" "+whatYouWillLearn+" "+price+" "+Category);
    if (
      !courseName ||
      !courseDescription ||
      !price ||
      !tags ||
      !requirements ||
      !benefits ||
      !category ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully...",
      });
    }

    const cloudinaryResponse = await uploadToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await Course.create({
      courseName,
      createdAt: Date.now(),
      courseDescription,
      price,
      tags,
      requirements,
      benefits,
      instructor: instructorID,
      category,
      thumbnail: cloudinaryResponse.secure_url,
    });
    const updatedInstructor = await User.findByIdAndUpdate(
      { _id: instructorID },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: category },
      { $push: { courses: newCourse._id } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      newCourse,
      message: "Course Created Successfully",
    });
  } catch (e) {
    console.log("Kuchh Error HAI...........");
    console.log(e);
    res.status(500).json({
      success: false,
      data: "Internal Server Errror",
      message: "Could Not Create the Course",
    });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    console.log("Yeh Raha:" + req.body);
    const {
      courseID,
      courseName,
      courseDescription,
      price,
      tags,
      requirements,
      benefits,
    } = req.body;
    console.log(req.body);
    console.log("Yeh Le Course Update pe aa Gya..");
    console.log(
      courseName +
        " " +
        courseDescription +
        " " +
        price +
        " " +
        requirements +
        " " +
        tags
    );

    const thumbnail = req.files?.thumbnail;
    console.log("YH LE THUMB", thumbnail);
    const instructorID = req.user.id;

    // Check if required fields are missing
    if (
      !courseName ||
      !courseDescription ||
      !price ||
      !tags ||
      !requirements ||
      !benefits
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully...",
      });
    }

    let updatedThumbnail = null; // Initialize to null

    // Check if a new thumbnail is provided
    if (thumbnail) {
      const cloudinaryResponse = await uploadToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      updatedThumbnail = cloudinaryResponse.secure_url;
    }

    // Find the existing course to retrieve the previous thumbnail
    const existingCourse = await Course.findById(courseID);

    // Update the course
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseID },
      {
        courseName,
        courseDescription,
        price,
        tags,
        requirements,
        benefits,
        instructor: instructorID,
        thumbnail: updatedThumbnail || existingCourse.thumbnail,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedCourse,
      message: "Course Updated Successfully",
    });
  } catch (e) {
    console.log("Kuchh Error HAI Updated Me...........");
    console.log(e);
    res.status(500).json({
      success: false,
      data: "Internal Server Errror",
      message: "Could Not Update the Course",
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseID } = req.body;
    console.log(req.body);
    console.log("Yeh Le Delete Craete pe aa Gya..");
    const instructorID = req.user.id;

    // console.log(courseName+" "+courseDescription+" "+whatYouWillLearn+" "+price+" "+Category);
    if (!courseID) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully...",
      });
    }

    const course = await Course.findOne({ _id: courseID });
    const categoryID = course.category;
    const updatedInstructor = await User.findByIdAndUpdate(
      { _id: instructorID },
      { $pull: { courses: courseID } },
      { new: true }
    );

    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: categoryID },
      { $pull: { courses: courseID } },
      { new: true }
    );
    const deletedCourse = await Course.findByIdAndDelete({ _id: courseID });

    res.status(200).json({
      success: true,
      deletedCourse,
      message: "Course Deleted Successfully",
    });
  } catch (e) {
    console.log("Kuchh Error HAI...........");
    console.log(e);
    res.status(500).json({
      success: false,
      data: "Internal Server Errror",
      message: "Could Not Delete the Course",
    });
  }
};

exports.deRegisterCourse = async (req, res) => {
  try {
    const { courseID } = req.body;
    console.log(req.body);
    console.log("Yeh Le Delete Craete pe aa Gya..");
    const studentID = req.user.id;

    // console.log(courseName+" "+courseDescription+" "+whatYouWillLearn+" "+price+" "+Category);
    if (!courseID) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully...",
      });
    }

    const course = await Course.findOne({ _id: courseID });
    const categoryID = course.category;
    const updatedStudent = await User.findByIdAndUpdate(
      { _id: studentID },
      { $pull: { courses: courseID } },
      { new: true }
    );
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: courseID },
      { $pull: { studentsEnrolled: studentID } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      updatedStudent,
      message: "De-Registered Successfully",
    });
  } catch (e) {
    console.log("Kuchh Error HAI...........");
    console.log(e);
    res.status(500).json({
      success: false,
      data: "Internal Server Errror",
      message: "Could Not De-Reguster from the Course",
    });
  }
};

exports.getThumbnailURL = async (req, res) => {
  try {
    const { thumbnail } = req.files;
    console.log("YH LE THUMB", thumbnail);
    const instructorID = req.user.id;
    if (!thumbnail) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully...",
      });
    }
    const cloudinaryResponse = await uploadToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    res.status(200).json({
      success: true,
      message: "Thumbnai URL made Successfully",
      thumbnailURL: cloudinaryResponse.secure_url,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      data: "Internal Server Errror",
      message: "Could Not Create the URL",
    });
  }
};

exports.getAllCourses = async (req, res) => {
  console.log("Aya All Courses fetch krne....");
  try {
    const courses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        category: true,
        thumbnail: true,
        ratingsAndReviews: true,
        studentsEnrolled: true,
      }
    )
      .populate("instructor")
      .exec();

    console.log("Ho gy afetvh..");
    res.status(200).json({
      success: true,
      courses,
      message: "All Courses Fetched Successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      data: "Internal Server Errror",
      message: "Entry Could Not Fetch the Courses Successfully",
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  console.log("Aya Course fetch krne....");
  console.log(req.body);
  try {
    const { courseID } = req.body;
    const course = await Course.findOne({ _id: courseID })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate({
        path: "ratingsAndReviews",
        populate: {
          path: "user course",
          select: "firstName lastName image courseName",
        },
      })
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate("category")
      .exec();

    console.log("Ho gy afetvh..");

    res.status(200).json({
      success: true,
      course,
      message: "Course Details Fetched Successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      data: "Internal Server Errror",
      message: "Entry Could Not Fetch the Course Details Successfully",
    });
  }
};

exports.publishCourse = async (req, res) => {
  try {
    const { courseID, isPublic } = req.body;
    console.log(req.body);
    console.log("Yeh Le Course Publish pe aa Gya..");

    if (!courseID) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully...",
      });
    }

    if (isPublic) {
      await Course.findByIdAndUpdate(
        { _id: courseID },
        { status: "Published" },
        { new: true }
      );
    } else {
      await Course.findByIdAndUpdate(
        { _id: courseID },
        { status: "Draft" },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      //   updatedCourse,
      message: "Course Published/Drafted Successfully",
    });
  } catch (e) {
    console.log("Kuchh Error HAI Piblishing me...........");
    console.log(e);
    res.status(500).json({
      success: false,
      data: "Internal Server Errror",
      message: "Could Not Publish the Course",
    });
  }
};

// exports.createCourseProgress = async (req, res) => {
//   try {
//     const { courseID } = req.body;
//     console.log(req.body);

//     const studentID = req.user.id;

//     // console.log(courseName+" "+courseDescription+" "+whatYouWillLearn+" "+price+" "+Category);
//     if (!courseID || !studentID) {
//       return res.status(400).json({
//         success: false,
//         message: "Please fill all the details carefully...",
//       });
//     }


//     res.status(200).json({
//       success: true,
//       newCourseProgress,
//       message: "Course Progress Created Successfully",
//     });
//   } catch (e) {
//     console.log("Kuchh Error HAI...........");
//     console.log(e);
//     res.status(500).json({
//       success: false,
//       data: "Internal Server Errror",
//       message: "Could Not Create the CourseProgress",
//     });
//   }
// };

exports.getCourseProgress = async (req, res) => {
  console.log("Aya Course Progress Fetch krne....");
  console.log(req.body);
  const { courseID } = req.body;
  const userID = req.user.id;
  try {
    const courseProgress = await CourseProgress.findOne({
      courseID: courseID,
      userID: userID,
    });

    console.log("CompledLect", courseProgress);

    if (!courseProgress) {
      const newCourseProgress = await CourseProgress.create({
        userID: userID,
        courseID: courseID,
      });
      res.status(200).json({
        success: true,
        completedLectures: newCourseProgress?.completedVideos,
        message: "Course Progess Created Successfully",
      });
    }

    res.status(200).json({
      success: true,
      completedLectures: courseProgress?.completedVideos,
      message: "Course Progess Fetched Successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      data: "Internal Server Errror",
      message: "Entry Could Not Fetch the Course Progress Successfully",
    });
  }
};

exports.updateCourseProgress = async (req, res) => {
  console.log("Aya Course Progress Update krne....");
  console.log(req.body);
  const { courseID, subSectionID } = req.body;
  const userID = req.user.id;
  try {
    const updatedCourseProgress = await CourseProgress.findOneAndUpdate(
      { courseID, userID },
      { $push: { completedVideos: subSectionID } },
      { new: true }
    );

    console.log("CompledLect", updatedCourseProgress.completedVideos);
    res.status(200).json({
      success: true,
      completedLectures: updatedCourseProgress.completedVideos,
      message: "Course Progess Updated Successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      data: "Internal Server Errror",
      message: "Entry Could Not Update the Course Progress Successfully",
    });
  }
};











exports.updatee=async (req, res) => {
  try {
    const courseID = req.body.courseID;

    // Find the course by its ID and populate the 'sections' field
    const course = await Course.findById(courseID).populate("courseContent");

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Calculate the total timeDuration by summing up all sections' timeDuration
    const totalCourseDuration = course.courseContent.reduce((acc, section) => acc + section.timeDuration, 0);

    // Update the course's timeDuration
    course.timeDuration = totalCourseDuration;
    await course.save();

    res.status(200).json({ message: "TimeDurations updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

