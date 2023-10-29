const mongoose=require("mongoose");


// Defining a Mongoose Schema.......
const userSchema=new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        accountType:{
            type:String,
            enum:["Admin","Student","Instructor"],
            required:true

        },
        additionalDetails:{
             type:mongoose.Schema.Types.ObjectId,
             ref:"Profile"
        },
        courses:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }],
        image:{
            type:String
        }, 
        courseProgress:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress"
        }],
        resetPasswordLinkExpires:{
            type:Date
        }

    }
)

//  Creating a Mongoose Model.....
module.exports=mongoose.model("User",userSchema);