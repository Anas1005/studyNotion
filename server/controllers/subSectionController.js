// const Section=require('../models/sectionModel');
// const SubSection=require('../models/subSectionModel');
// const {uploadToCloudinary}=require("../utils/uploader")

// exports.createSubSection=async(req,res)=>{
//     console.log("Aya SubSECTION CREATE KRNE..")
//     try{
//         const{sectionID,title,description}=req.body;
//         if(!sectionID||!title||!description){
//             return res.status(400).json({
//                 success: false,
//                 message: "Please fill the All the Details carefully..."
//          });
//         }
//         const video=req.files.videoFile;
//         console.log("VideoJiii"+video)
//         const cloudinaryResponse=await uploadToCloudinary(video,process.env.FOLDER_NAME);
//         console.log("VideoJiii"+cloudinaryResponse)
//         const newSubSection=await SubSection.create({title,description,videoURL:cloudinaryResponse.secure_url});
//         const updatedSection=await Section.findByIdAndUpdate(
//             {_id:sectionID},
//             {$push:{subSection:newSubSection._id}},
//             {new:true}
//         );

//         res.status(200).json(
//             {
//               success:true,
//               message:'SubSection Created Successfully',
//               updatedSection
//             }
//         );
//     }
//     catch(e){
//         console.log(e);
//         res.status(500).
//         json(
//             {
//                 success:false,
//                 data:"Internal Server Errror",
//                 message:'Could Not Create the SubSection...'
//               }
//         );

//     }
// }

const { getVideoDurationInSeconds } = require("get-video-duration");
const Course = require("../models/courseModel");
const Section = require("../models/sectionModel");
const SubSection = require("../models/subSectionModel");
const { uploadToCloudinary } = require("../utils/uploader");

exports.createSubSection = async (req, res) => {
  console.log("Aya SubSECTION CREATE KRNE..");
  try {
    const { sectionID, title, description, courseID } = req.body;

    if (!sectionID || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all the details carefully...",
      });
    }

    const video = req.files.videoFile;
    console.log("VideoJiii" + video);

    // Upload video to Cloudinary and get the secure URL
    const cloudinaryResponse = await uploadToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    // Get the video duration using the Cloudinary secure URL
    getVideoDurationInSeconds(cloudinaryResponse.secure_url)
      .then(async (duration) => {
        console.log("Video Duration:", duration);
        // Format the duration as needed (e.g., X hr Y mins) and save it in your DB

        // Create a new SubSection with the video URL and duration
        const newSubSection = await SubSection.create({
          title,
          description,
          videoURL: cloudinaryResponse.secure_url,
          timeDuration: duration, // Format the duration here
        });

        // Add the new SubSection to the Section
        const updatedSection = await Section.findByIdAndUpdate(
          { _id: sectionID },
          {
            $push: { subSection: newSubSection._id },
            $inc: { timeDuration: duration }, // Increment the timeDuration by the 'duration'
          },
          { new: true }
        );

        await Course.findByIdAndUpdate(
          { _id: courseID },
          { $inc: { timeDuration: duration } },
          { new: true }
        );

        res.status(200).json({
          success: true,
          message: "SubSection Created Successfully",
          updatedSection,
          //   updatedCourse
        });
      })
      .catch((err) => {
        console.error("Error getting video duration:", err);
        res.status(500).json({
          success: false,
          message: "Could Not Create the SubSection...",
        });
      });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.deleteMOVVideos = async (req, res) => {
  try {
    // Delete all subsections
    await SubSection.deleteMany({});
    await Section.deleteMany({});

    // Remove references to subsections from all sections
    // await Section.updateMany({}, { $set: { subSection: [] } });
    await Course.updateMany({}, { $set: { courseContent: [] } });

    return res.status(200).json({ message: 'All subsections and references removed from sections.' });
  } catch (error) {
    console.error('Error deleting subsections and references:', error);
    return res.status(500).json({ error: 'An error occurred while deleting subsections and references.' });
  }
}

// Function to format the video duration as X hr Y mins (customize this as needed)
// function formatDuration(durationInSeconds) {
//   const hours = Math.floor(durationInSeconds / 3600);
//   const minutes = Math.floor((durationInSeconds % 3600) / 60);
//   return `${hours} hr ${minutes} mins`;
// }
