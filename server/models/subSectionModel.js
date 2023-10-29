const mongoose=require("mongoose");


// Defining a Mongoose Schema.......
const subSectionSchema=new mongoose.Schema(
    {
        title:{
            type:String
        },
        timeDuration:{
            type:Number,
            default:0
        },
        description:{
            type:String
        },
        videoURL:{
            type:String
        },

    }
)

//  Creating a Mongoose Model.....
module.exports=mongoose.model("SubSection",subSectionSchema); 