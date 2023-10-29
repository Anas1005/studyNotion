const jwt=require("jsonwebtoken");
const OTP = require("../models/otpModel");
require("dotenv").config();


//A Middleware to verify the OTP...
exports.verifyOTP=async(req,res,next)=>{
  try{
  const{email,otp}=req.body;
  console.log("In Verify OTP"+otp)
  const recentOTP=await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
  console.log("Most recent OTP"+recentOTP);
   console.log("Most recent OTP is"+recentOTP.otp);
  if(!otp){
    return res.status(400).json({
      success: false,
      message: 'OTp Not Found'
    });
  }
  console.log(typeof(otp));
  console.log(typeof(recentOTP.otp));
  if(otp!==recentOTP.otp){
    return res.status(400).json({
      success: false,
      message: 'OTP do not match..'
    });
  }
  console.log("OTPs matched..")
  next();
  }
  catch(e){
    console.log(e);
    console.log("OTP hai he nhi DB me...")
    return res.status(500).json({
      success: false,
      message:e.message
    });
    
  }

}
// Example isValidToken middleware in tokenMiddleware.js
exports.isValidToken = async (req, res, next) => {
  try {
    // Check if Token is present in the request header or body or cookies
    console.log("Hello jii In  inValidToken");
    console.log(req.header('Authorization')?.replace('Bearer ', ''));
    console.log("Lojiii");
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("Token in isValid-->"+token);

    if (!token) {
      console.log("Token Missing...")
      return res.status(401).json({
        success: false,
        message: 'Token Missing'
      });
    }

    // Verify the Token if Present
    try {
      console.log("Got the Token and Verifying...")
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = payload; // Attach the payload to the request object
      console.log(payload);
      console.log("Token Validated...")
      next();
    } catch (e) {
      console.log(e);
      return res.status(401).json({
        success: false,
        message: 'Token is Invalid'
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: 'Could not Validate Token...'
    });
  }
};

// Example renewToken middleware in tokenMiddleware.js
exports.renewToken = async (req, res, next) => {
  console.log("Hello jii In  inRenewToken")
  // Check if the token is close to expiration
  const expirationThreshold = 600; // 10 minutes in seconds (adjust as needed)
  const currentTime = Math.floor(Date.now() / 1000);
  const payload = req.user; // Extracted from isValidToken middleware

  if (payload.exp - currentTime < expirationThreshold) {
    console.log("Renewing the token....")
    // Renew the token and attach the new token to the response
    const renewPayload = {
      email: payload.email,
      id: payload.id,
      role:payload.role
    };

    let newToken = jwt.sign(renewPayload, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.setHeader('X-Token-Renewed', 'true');
    res.cookie('token', newToken, { httpOnly: true, expires: new Date(Date.now() + 8 * 60 * 60 * 1000) });
  }
  console.log("No Renewal Required...")

  next();
};
 

exports.isAdmin=(req,res,next)=>{
  try{
      if(req.user.role!=="Admin"){
          return res.status(401).json({
              success:false,
              message:'Sorry! This is a protected route for Admin Only...'
          });
      }    
      next();
  }
  catch(e){
      return res.status(500).json({
          success:false,
          message:'Admin Role cannot be verified...'
      });

  }
}

exports.isInstructor=(req,res,next)=>{
  try{
      if(req.user.role!=="Instructor"){
          return res.status(401).json({
              success:false,
              message:'Sorry! This is a protected route for Instructors Only...'
          });
      }    
      next();
  }
  catch(e){
      return res.status(500).json({
          success:false,
          message:'Admin Role cannot be verified...'
      });

  }
}

exports.isStudent=(req,res,next)=>{
  try{
      if(req.user.role!=="Student"){
          return res.status(401).json({
              success:false,
              message:'Sorry! This is a protected route for Students..'
          });
      }
      next();
  }
  catch(e){
      return res.status(500).json({
          success:false,
          message:'User Role cannot be verified...'
      });

  }
}
