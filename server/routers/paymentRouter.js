const express=require('express');
const router=express.Router();

const{capturePayment,sendPaymentSuccessEmail,verifyPayment}=require('../controllers/Payments');
const {isValidToken,renewToken,isAdmin,isInstructor,isStudent}= require('../middlewares/auth')

router.post("/capturePayment",isValidToken,renewToken,isStudent,capturePayment);
router.post("/verifyPayment",isValidToken,renewToken,isStudent,verifyPayment);
router.post("/sendPaymentSuccessEmail",isValidToken,renewToken,isStudent,sendPaymentSuccessEmail);

module.exports=router;