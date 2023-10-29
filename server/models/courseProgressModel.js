const mongoose=require("mongoose");


// Defining a Mongoose Schema.......
const courseProgressSchema=new mongoose.Schema(
    {
    courseID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    completedVideos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"SubSection"
    }
    ]
    }
)

//  Creating a Mongoose Model.....
module.exports=mongoose.model("CourseProgress",courseProgressSchema); 