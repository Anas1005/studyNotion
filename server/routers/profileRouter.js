const express = require("express");
const router = express.Router();
const {
  updateProfile,
  updateProfilePicture,
  deleteAccount,
  getUserDetails,
  getEnrolledCourses,
  getMyCourses,
  instructorDashboardDetails,
} = require("../controllers/profileController");

// Middleware to protect routes (you can customize this)
const { isValidToken, renewToken } = require("../middlewares/auth");

router.use(isValidToken); // Validates token for all routes
router.use(renewToken); // Renews token if close to expiration

// Route to update user profile
router.post("/updateProfile", updateProfile);

// Route to update user profile picture
router.post("/updateProfilePicture", updateProfilePicture);

// Route to delete user account
router.post("/deleteAccount", deleteAccount);

// Route to get user details
router.get("/getUserDetails", getUserDetails);

router.get("/getEnrolledCourses", getEnrolledCourses);

router.get("/getMyCourses", getMyCourses);

router.get("/instructorDashboardDetails", instructorDashboardDetails);

module.exports = router;
