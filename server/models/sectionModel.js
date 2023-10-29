const mongoose=require("mongoose");


// Defining a Mongoose Schema.......
const sectionSchema=new mongoose.Schema(
    {
        sectionName:{
            type:String
        },
        subSection:[{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SubSection"
        }],
        timeDuration:{
            type:Number,
            required:true,
            default:0
        },

    

    }
)

//  Creating a Mongoose Model.....
module.exports=mongoose.model("Section",sectionSchema); 