const Course=require('../models/courseModel');
const Section=require('../models/sectionModel');

exports.createSection=async(req,res)=>{
    try{
        console.log("Aya Create Section Knre..")
        const{sectionName,courseID}=req.body;
        if(!sectionName){
            return res.status(400).json({
                success: false,
                message: "Please fill the Section Name carefully..."
         });
        }
        const newSection=await Section.create({sectionName});
        console.log("Kr Diya Create Section..")
        const updatedCourse=await Course.findByIdAndUpdate(
            {_id:courseID},
            {$push:{courseContent:newSection._id}},
            {new:true} 
        ).populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            }
      }).exec();

      console.log("Upfdatd hnn sahbsja:"+updatedCourse)

        res.status(200).json(
            {
              success:true,
              message:'Section Created Successfully',
              updatedCourse
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
                message:'Could Not Create the Section...'
              }
        );

    }
}
    

exports.updateSection=async(req,res)=>{
    try{
        const{sectionID,newSectionName}=req.body;
        if(!newSectionName){
            return res.status(400).json({
                success: false,
                message: "Please fill the newSection Name carefully..."
         });
        }
        const updatedSection=await Section.findByIdAndUpdate({_id:sectionID},{sectionName:newSectionName},{new:true});
          
        res.status(200).json(
            {
              success:true,
              message:'Section Updated Successfully',
              updatedSection
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
                message:'Could Not Update the Section...'
              }
        );

    }
}
    


exports.deleteSection=async(req,res)=>{
    try{
        const{sectionID}=req.body;
        const deletedSection=await Section.findByIdAndDelete({_id:sectionID});
        const updatedCourse=await Course.findByIdAndUpdate(
            {_id:courseID},
            {$pull:{courseContent:deletedSection._id}},
            {new:true} 
        )
          
        res.status(200).json(
            {
              success:true,
              message:'Section Deleted Successfully',
              deletedSection
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
                message:'Could Not Delete the Section...'
              }
        );

    }
}
    