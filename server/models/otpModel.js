const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");


// Defining a Mongoose Schema.......
const otpSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true
        },
        otp:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            required:true,
            default:Date.now(),
            // expires:33333335*60
        }, 
    }
)

otpSchema.pre("save",async function(next){
    try{
        const htmlContent = `
<!DOCTYPE html>
<html>

<head>
  <!-- No external stylesheets, just inline styles -->
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #007BFF; color: #ffffff; text-align: center; padding: 10px; border-radius: 10px 10px 0 0;">
      <h1>OTP Verification</h1>
    </div>
    <div style="background-color: #ffffff; padding: 20px;">
      <p>Hello Sir!</p>
      <p>Your OTP code for verification is:</p>
      <h2 style="text-align: center; background-color: #007BFF; color: #ffffff; padding: 10px 0; border-radius: 5px;">${this.otp}</h2>
    </div>
  </div>
</body>

</html>
`;

        const mailResponse=await mailSender(this.email,"Verification Email from Study Notion",htmlContent);
        console.log("Mail Response:"+mailResponse);
    }
    catch(e){
        console.log("Error Occured while sending the Email...",e);
    }
    next();
})


//  Creating a Mongoose Model.....
module.exports=mongoose.model("OTP",otpSchema); 