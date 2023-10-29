const User = require("../models/userModel");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
// const VerificationEmail = require("../serverComponents/VerificationMail");
// const ReactDOMServer = require('react-dom/server');



exports.forgotPassword=async(req,res)=>{
try{
    
    const {email}=req.body;
    console.log("Backedn, pe h hoon",email)
    if(!email){
        return res.status(400).json({
            success: false,
            message: "Please fill your Email Correctly.."
        });
    }

    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success: false,
            message: "Your Email is not registered with us."
        });
    }

    const resetURL=`https://study-notion-frontend-i8ok.onrender.com/reset-password/${1000+Math.random()*10000000}/${user._id}`;
    const updatedUser=await User.findOneAndUpdate(
        {email},
        {
            resetPasswordLinkExpires:Date.now()+5*60*1000
        },
        {new:true});

        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <!-- No external stylesheets, just inline styles -->
        </head>
        <body>
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="background-color: #007BFF; color: #ffffff; text-align: center; padding: 10px;">
                        <h1>Your Verification Email</h1>
                    </div>
                    <div style="background-color: #ffffff; padding: 20px;">
                        <p>Hello, ${user.firstName}!</p>
                        <p>Click on the link below to verify your email:</p>
                        <a href="${resetURL}" style="text-decoration: none; background-color: #007BFF; color: #ffffff; padding: 10px 20px; border-radius: 5px;">Verify Email</a>
                    </div>
                </div>
            </div>
        </body>
        </html>
      `;
        

    await mailSender(email,`Reset Password Link | Study Notion`,htmlContent);

    return res.json({
        success:true,
        expiryTime:updatedUser.resetPasswordLinkExpires,
        message:'Reset Link Sent Sucessfully...',
    })


}
catch(e){
    console.log(e);
    return res.status(500).json({
        success: false,
        message: "Something went wrong while sending the Reset Link....."
    });
}



}

// function renderVerificationEmail(firstName, verificationLink) {
//     const jsx = <VerificationEmail firstName={firstName} verificationLink={verificationLink} />;
//     return ReactDOMServer.renderToString(jsx);
//   }


exports.resetPassword=async(req,res)=>{
   try{
    const{id,newPassword,confirmNewPassword}=req.body;
    if(!newPassword||!confirmNewPassword){
        return res.status(400).json({
            success: false,
            message: "Please fill the fields Correctly.."
        });
    }
    if(newPassword!==confirmNewPassword){
        return res.status(400).json({
            success: false,
            message: "Passwords do not match..."
        });
    }

    let newHashedPassword;
    try {
        newHashedPassword = await bcrypt.hash(newPassword,10);
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Error in Hashing"
        });
    }

    //Handle expiry later by creating separate route for Expiry...

    const user=await User.findByIdAndUpdate(
        {_id:id},
        {password:newHashedPassword},
        {new:true});

        return res.json({
            success:true,
            message:'Your Password has been successfully updated!!!!.',
        })

   }
   catch(e){
    console.log(e);
    return res.status(500).json({
        success: false,
        message: "Something went wrong while restting the Password!!!!..."
    });
   }
}



