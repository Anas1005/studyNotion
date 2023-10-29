const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const Profile = require("../models/profileModel");
const OTP = require("../models/otpModel");
const otpGenerator=require("otp-generator");
require("dotenv").config();


//OTP Sending...

exports.sendOTP=async(req,res)=>{  
    console.log("HellloJiii...")
    console.log("Req Body:"+req.body)
    try{
        const { firstName,lastName,email, password,confirmPassword} = req.body;
        console.log("Idhar Dekho "+firstName+":"+lastName+":"+email+":"+password+":"+confirmPassword);


        if(!firstName||!lastName||!password||!confirmPassword){
            console.log("Missing Hia Kuchh..")
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully..."
            });
        }
        console.log("All Details are filled..")

        if(password!==confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match.."
            });
        }

        console.log("Passwords matched..")

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this Email"
            });
        }

        console.log("Fine!!!! User does not exist..")

        // var otp=otpGenerator.generate(6,{
        //     upperCaseAlphabets:false,
        //     lowerCaseAlphabets:false,
        //     specialChars:false,
        // });
        var otp=Math.floor(100000 + Math.random() * 900000);
    

        console.log("OTP Generated:"+otp);
        const existingOTP = await OTP.findOne({otp});
        while(existingOTP){
            // otp=otpGenerator.generate(6,{
            //     upperCaseAlphabets:false,
            //     lowerCaseAlphabets:false,
            //     specialChars:false,
            // });
            otp=Math.floor(100000 + Math.random() * 900000);
            existingOTP = await OTP.findOne({otp});
        }
        console.log("Ok Unique OTP")

        const createdOtp=await OTP.create({email,otp});
        console.log("OTP Created"+createdOtp);

        return res.status(200).json({
            success: true,
            message: "OTP Sent Successfully"
        });

    }

    catch(e){
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: e.message
        });
    }


}
// SignUp Route Controller...
exports.signUp = async (req, res) => {
    console.log("In SignUp")
    try {
        const {firstName,lastName,email, password,accountType} = req.body;

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                success: false,
                message: "Error in Hashing"
            });
        }

        const profileDetails=await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null
        })
        
         const newUser = await User.create({firstName,lastName, email, password: hashedPassword,accountType,additionalDetails:profileDetails._id,
         image:`https://api.dicebear.com/7.x/initials/svg?seed= ${firstName} ${lastName}`});

         console.log("User Craeted")


        return res.status(200).json({
            success: true,
            message: "User is Registered Successfully",
            newUser
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Error in Creating User"
        });
    }
};

// LogIn Route Controller...

exports.logIn=async(req,res)=>{
    try {
        const {email,password,accountType} = req.body;

        if(!email||!password){
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully..."
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "First Go and Sign Up , then LogIn"
            });
        }

        if(accountType!==user.accountType){
            return res.status(401).json({
                success: false,
                message: `Mr. ${user.firstName}, You are not a ${accountType}. This is a ${accountType} login only..`
            });

        }
   

        if(await bcrypt.compare(password,user.password)){
             const payload={
                email:user.email,
                id:user._id,
                role:user.accountType
            };
        

            let token=jwt.sign(payload,process.env.JWT_SECRET,{ expiresIn: '8h' });
       
            const responseUser = { ...user.toObject(), token: token, password: undefined };
       

            const options={
                expires:new Date(Date.now() + 8*60*60*1000),
                httpOnly:true
            }
       

            return res.cookie("token",token,options).status(200).json({
                success:true,
                responseUser,
                token,
                message:"Logged In Sucsessfully",

            })
        }
        else{
            return res.status(403).json({
                success: false,
                message: "Incorrect Password"
            });
        }

}
catch (e) {
    console.log(e);
    return res.status(500).json({
        success: false,
        message: "Error in Log In"
    });
}
};

// kkt 

