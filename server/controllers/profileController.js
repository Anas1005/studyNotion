const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Profile = require("../models/profileModel");
const RatingAndReview = require("../models/ratingAndReviewModel");
const { uploadToCloudinary } = require("../utils/uploader");

exports.updateProfile = async (req, res) => {
  try {
    const { gender, dateOfBirth, about, contactNumber } = req.body;
    const userID = req.user.id;
    if (!gender || !dateOfBirth || !about || !contactNumber) {
      return res.status(400).json({
        success: false,
        message: "Please fill the Details carefully...",
      });
    }

    const user = await User.findById({ _id: userID });
    console.log("User ius:" + user.firstName);
    const profileID = user.additionalDetails;
    console.log("PID ius:" + profileID);

    const updatedProfile = await Profile.findByIdAndUpdate(
      { _id: profileID },
      {gender, dateOfBirth, about, contactNumber },
      { new: true }
    );

    console.log("UpadtePrpofil is" + updatedProfile);

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      updatedProfile,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      data: "Internal Server Errror",
      message: "Could Not Update the Profile...",
    });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const userID = req.user.id;
    const { profilePicture } = req.files; // Assuming picture is the field name for the uploaded file
    const { a, b, c, d } = req.body;
    console.log(a, b, c, d);
    console.log(req.files.profilePicture);

    // Validate that a picture was uploaded
    if (!profilePicture) {
      return res.status(400).json({
        success: false,
        message: "Please provide a profile picture.",
      });
    }

    // Upload the picture to Cloudinary
    const cloudinaryResponse = await uploadToCloudinary(
      profilePicture,
      process.env.FOLDER_NAME
    );

    // Extract the Cloudinary URL from the response
    const profilePictureURL = cloudinaryResponse.secure_url;

    // Update the user's image field with the Cloudinary URL
    const updatedUser = await User.findByIdAndUpdate(
      userID,
      { image: profilePictureURL },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile Picture Updated Successfully",
      updatedUser,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error updating profile picture.",
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  console.log("Aya All Enrolled Courses fetch krne....");
  const id = req.user.id;
  try {
    const user = await User.findById({ _id: id }).populate({
      path: "courses",
      populate: {
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      },
    });

    console.log("Ho gyaaaaaaaaaaaaaaaaaaaaaaa.");
    res.status(200).json({
      success: true,
      enrolledCourses: user.courses,
      message: "Enrolled Courses Fetched Successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      data: "Internal Server Errror",
      message: `Soory!!!!!! Could Not Fetch the Enrolled Courses Successfully`,
    });
  }
};

exports.getMyCourses = async (req, res) => {
  console.log("Aya All My Courses fetch krne....");
  const id = req.user.id;
  try {
    const user = await User.findById({ _id: id }).populate("courses").exec();

    console.log("Ho gyaaaaaaaaaaaaaaaaaaaaaaa.");
    res.status(200).json({
      success: true,
      myCourses: user.courses,
      message: "My Courses Fetched Successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      data: "Internal Server Errror",
      message: `Soory!!!!!! Could Not Fetch the My Courses Successfully`,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userID = req.user.id;

    // Find the user's profile
    const user = await User.findById(userID);
    const profileID = user.additionalDetails;

    if (user.accountType === "Instructor") {
      // If the user is an instructor, update the Course table to remove their instructor ID
      await Course.updateMany(
        { instructor: userID },
        { $set: { instructor: null } }
      );
    }

    if (user.accountType === "Student") {
      // If the user is a student, update the ratings and reviews model to remove their ID
      await RatingAndReview.updateMany(
        { user: userID },
        { $set: { user: null } }
      );

      // Update the studentsEnrolled array field in the Course Model to remove the student's ID
      await Course.updateMany(
        { studentsEnrolled: userID },
        { $pull: { studentsEnrolled: userID } }
      );
    }

    // Delete the user's profile
    await Profile.findByIdAndDelete({ _id: profileID });

    // Delete the user's account
    await User.findByIdAndDelete({ _id: userID });

    res.status(200).json({
      success: true,
      message: "User and Profile deleted Successfully",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Error deleting the account.",
    });
  }
};

exports.getUserDetails = async (req, res) => {
  console.log("Aya Usr Detailsfetcehd krne in Backend");
  try {
    const userID = req.user.id;
    const userDetails = await User.findById({ _id: userID }).populate(
      "additionalDetails"
    );
    console.log("UserDetails:" + userDetails);
    res.status(200).json({
      success: true,
      message: "User Details fetched Successfully",
      userDetails,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      data: "Internal Server Errror",
      message: "Could Not fetch the User Details...",
    });
  }
};

exports.instructorDashboardDetails = async (req, res) => {
  console.log("Aya All In Dashboard....");
  const id = req.user.id;
  try {
    const courses = await Course.find({ instructor: id });

    const courseData = courses.map((course) => {
      return {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail:course.thumbnail,
        price:course.price,
        totalStudentsEnrolled: course.studentsEnrolled.length,
        totalRevenueGenerated: course.studentsEnrolled.length * course.price,
      };
    });

    console.log("Ho gyaaaaaaaaaaaaaaaaaaaaaaa In Dashboard.");
    res.status(200).json({
      success: true,
      courses:courseData,
      message: "In Dashboard Fetched Successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      data: "Internal Server Errror",
      message: `Soory!!!!!! Could Not Fetch the In DashBoard Successfully`,
    });
  }
};
