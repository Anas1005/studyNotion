const express=require('express');
const userRouter=require('./routers/userRouter');
const courseRouter=require('./routers/courseRouter');
const paymentRouter=require('./routers/paymentRouter');
const profileRouter=require('./routers/profileRouter');
const server=express();
const cookieParser=require('cookie-parser');
const dbConnect=require('./config/database');
const cloudinaryConnect = require('./config/cloudinary');
const fileupload=require('express-fileupload');
var cors=require("cors");
require("dotenv").config();


  const FRONTEND_URL="https://studynotionfrontend.onrender.com"

    // const FRONTEND_URL="http://localhost:3000"

const PORT=process.env.PORT||4000;
server.use(cors({
    origin:FRONTEND_URL,
    credentials:true
}));

server.use(express.json());
server.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp'
}));



 // Import your SubSectionModel

// Define a route to update section timeDuration




server.use("/api/v1/auth",userRouter);
server.use("/api/v1/course",courseRouter);
server.use("/api/v1/payment",paymentRouter);
server.use("/api/v1/profile",profileRouter);
server.use(cookieParser());
server.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your Server is Up and Running......"
    })
});


// Connect to the DB...

dbConnect();
cloudinaryConnect();


// Start the Server.....
server.listen(PORT,()=>{
    console.log("Server Started Successfully");
})

