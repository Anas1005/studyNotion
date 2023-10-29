const cloudinary=require('cloudinary').v2;
const dotenv = require('dotenv');
dotenv.config(); 

const cloudinaryConnect=()=>{
    try{
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET

        })
    }
    catch{
        console.log("Error in Connnecting to Cloudinary..")
    }
} 

module.exports=cloudinaryConnect;