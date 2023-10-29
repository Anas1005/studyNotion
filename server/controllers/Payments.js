const { default: mongoose } = require("mongoose");
const Razorpay = require("razorpay");
const { instance } = require("../config/razorpay");
const Course = require("../models/courseModel");
const crypto = require("crypto");
const User = require("../models/userModel");
const mailSender = require("../utils/mailSender");
require("dotenv").config();


exports.capturePayment = async (req, res) => {
  console.log("Aya Capture Payment Krn........");
  const { courses } = req.body;
  const userID = req.user.id;
  console.log("Aya Capture Payment Krn........", courses.length);
  if (courses.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Pleasae Provide the Courses",
    });
  }
  console.log("Aya Capture Payment Krn........", userID);
  let totalAmount = 0;
  for (const course_ID of courses) {
    let course;
    try {
      course = await Course.findById({ _id: course_ID });
      if (!course) {
        return res.status(200).json({
          success: false,
          message: "Could find the Course",
        });
      }
     


      console.log(typeof(course.price));
      console.log(Number(course.price)+Number(course.price));
      totalAmount += Number(course.price);
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        success: false,
        message: e.message,
      });
    }
  }
    console.log("Sab Changa.......", totalAmount);



    var instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    try {
      const paymentResponse = await instance.orders.create({
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
      });

      console.log("Sab Changa .......");

      console.log("Hello Jiiii");
      return res.status(200).json({
        success: true,
        message: paymentResponse,
      });
    } catch (e) {
      console.log(e);
      console.log("Hninisn");
      return res.status(400).json({
        success: false,
        message: e.message,
      });
    }
  
};


exports.verifyPayment = async (req, res) => {
  console.log("Aya Verfy Payment Krn........");
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    courses,
  } = req.body;
  const userID = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !userID
  ) {
    return res.status(200).json({
      success: false,
      message: " Payment Failed...",
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    console.log("Payment is Authorised...");
    try {
      await enrollStudent(courses, userID);
      res.status(200).json({
        success: true,
        message: "Payment Verified Enrollmenmt Succsessfull..",
      });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        success: false,
        message: "Could not verify the Payment...",
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Signatures do not match...",
    });
  }
};

const enrollStudent = async (courses, userID) => {
  console.log("Aya Enroll  Krn........");
  if (!courses || !userID) {
    return res.status(200).json({
      success: false,
      message: " PLS PROVIDE data...",
    });
  }

  for (const courseID of courses) {
    try {
      const purchasedCourse = await Course.findByIdAndUpdate(
        { _id: courseID },
        { $push: { studentsEnrolled: userID } },
        { new: true }
      );

      console.log("Student is added to Course...");

      const enrolledStudent = await User.findByIdAndUpdate(
        { _id: userID },
        { $push: { courses: courseID } },
        { new: true }
      );
      console.log("Course is added to Student ...");

      await mailSender(
        enrolledStudent.email,
        "Study Notion | Course Sucessfully Purchased",
        `Congratulations ${enrolledStudent.firstName}!!! You have sucessfully purchased the course: ${purchasedCourse.courseName}`
      );
      console.log("Email Sent sucessfully..");
    } catch (e) {
      console.log(e);
    }
  }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
  console.log("Aya Sucess Email  Krn........");
  const { orderID, paymentID, amount } = req.body;
  const userID = req.user.id;
  console.log(
    "HelloSucess",
    orderID + ":" + paymentID + ":" + amount + ":" + userID
  );

  if (!orderID || !paymentID || !amount || !userID) {
    return res.status(400).json({
      success: false,
      message: "Pls provide all the fields",
    });
  }

  try {
    const enrolledStudent = await User.findOne({ _id: userID });
    console.log("Idhar Bhi Delh Le", enrolledStudent, enrolledStudent.email);
    await mailSender(
      enrolledStudent.email,
      "Payment Received",
      `Hello ${enrolledStudent.firstName} ! Your Payment of Rs. ${
        amount / 100
      } has been sucessfull for Order ID:${orderID} and Payment ID:${paymentID} `
    );
    res.status(200).json({
      success: true,
      message: "Payment Sucess Email Sent Succsessfull..",
    });
  } catch (e) {
    console.log("Email me error hai,,");
    return res.status(500).json({
      success: false,
      message: e.message,
    });
  }
};
