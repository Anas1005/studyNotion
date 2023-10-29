const { default: mongoose } = require('mongoose');
const Course=require('../models/courseModel');
const RatingAndReview=require('../models/ratingAndReviewModel');
const User=require('../models/userModel');

exports.createRatingAndReview=async(req,res)=>{
    try{
        const{courseID,rating,review}=req.body;
        console.log("Rate",courseID,rating,review)
        const userID=req.user.id;
        if(!courseID||!rating||!review){
            return res.status(400).json({
                success: false,
                message: "Please fill all the details carefully..."
            });
        }


       //Check if the Rater is Enrolled Student or not .......
        const isEnrolledStudent=await Course.findById(
            {_id:courseID,
            studentsEnrolled:{$elemMatch:{$eq:userID}}
            });

            console.log("Enrolled");

        if(!isEnrolledStudent){
            return res.status(200).json({
                success: false,
                message: "Only Enrolled Students are allowed to Rate and Review.."
         });
        }

        //Check if the Enrolled student has already rated the mention Course......
        const hasAlreadyRated=await RatingAndReview.findOne({user:userID,course:courseID});
        console.log("Rated hai JII",hasAlreadyRated)
        if(hasAlreadyRated){
            return res.status(200).json({
                success: false,
                message: "Sorry! You have already Rated and Reviewed.."
         })
        };
        
         //Create an Entry in The RNR Table...
        const newRating=await RatingAndReview.create({user:userID,course:courseID,rating,review});
        console.log("Entry Created",newRating);
        const updatedCourse=await Course.findByIdAndUpdate(
            {_id:courseID},
            {$push:{ratingsAndReviews:newRating._id}},
            {new:true} 
        );

        res.status(200).json(
            {
              success:true,
              message:'Rating and Review Created Successfully'
            }
        );
    }
    catch(e){
        console.log(e);
        res.status(500).
        json(
            {
                success:false,
                data:"Internal Server Errror",
                message:'Could Not Create the Rating and Review...'
              }
        );

    }
}

exports.getAverageRating=async(req,res)=>{
    try{
        const{courseID}=req.body;

        const result=await RatingAndReview.aggregate(
            {$match:{ course:new mongoose.Types.ObjectId(courseID)}},
            {$group:{ _id:null, averageRating:{$avg:"$rating"}}}
        )

        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }

        return res.status(200).json({
            success:true,
            message:"Average Rating is 0. No Ratings given till now...",
            averageRating:0
        })
    }

    catch(e){
        return res.status(400).json({
            success:false,
            message:"Could not fetch the Average Rating..."
        })

    }
}

exports.getAllRatingsAndReviews = async (req, res) => {
    try {
        // Find all ratings and reviews
        const ratingsAndReviews = await RatingAndReview.find({}).sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstName lastName image"
        })
        .populate({
            path:"course",
            select:"courseName"
        })
        .exec();

        return res.status(200).json({
            success: true,
            ratingsAndReviews,
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            success: false,
            message: "Could not fetch all Ratings and Reviews.",
        });
    }
}


