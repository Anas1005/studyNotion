const express=require('express');
const router=express.Router();

const {sendOTP,signUp,logIn} = require('../controllers/Auth');
const{forgotPassword,resetPassword} = require('../controllers/ForgotPassword');
const {verifyOTP,isValidToken,renewToken,isStudent}= require('../middlewares/auth');
const{sendFeedback}= require('../controllers/contactUs');


router.post("/sendOTP",sendOTP);
router.post("/signUp",verifyOTP,signUp);
router.post("/logIn",logIn);
router.post("/forgotPassword",forgotPassword);
router.post("/resetPassword",resetPassword);
router.post("/contactUs",sendFeedback);

module.exports = router;

