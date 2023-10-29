const mongoose = require("mongoose");

// Defining a Mongoose Schema
const profileSchema = new mongoose.Schema(
    {
        gender:{
            type:String
        },
        dateOfBirth:{
            type:String
        },
        about:{
            type:String,
            trim:true
        },
        contactNumber:{
            type:String,
            trim:true
        },

})

//  Creating a Mongoose Model.....
module.exports=mongoose.model("Profile",profileSchema);