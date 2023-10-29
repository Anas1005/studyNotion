const mongoose = require("mongoose");

// Defining a Mongoose Schema
const courseSchema = new mongoose.Schema({
    courseName:{
        type:String
    },
  
    courseDescription:{
        type:String
    },
    instructor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true

    },
    // whatYouWillLearn:{
    //     type:String
    // },
    courseContent:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
    }],
    ratingsAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        },
    ],
    price:{
        type:String
    },
    thumbnail:{
        type:String
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",

    },
    tags:{
        type:[String],
        required:true
    },
    requirements:{
        type:[String],
        required:true
    },
    benefits:{
        type:[String],
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now()
    },
    status:{
        type:String,
        enum:["Draft","Published"],
        default:"Draft",
        required:true

    },
    studentsEnrolled:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",

    }],
    timeDuration:{
        type:Number,
        required:true,
        default:0
    },
});

// Creating a Mongoose Model
module.exports = mongoose.model("Course", courseSchema);
