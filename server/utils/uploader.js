const cloudinary=require('cloudinary').v2;

exports.uploadToCloudinary=async(file,folder,quality=100)=>{
    console.log("TempFilePATH:"+file.tempFilePath); 
    const options={folder,resource_type:"auto",quality,eager: [
        // Specify the eager transformation here
        { width: 640, height: 480, crop: "fill" },
        { format: "mp4", eager_async: true }, // This line adds an eager transformation for video format
      ],};
    const Ok= await cloudinary.uploader.upload(file.tempFilePath,options)
    console.log("Okkk"+Ok);
    return Ok;
}