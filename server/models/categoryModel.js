const mongoose=require("mongoose");


// Defining a Mongoose Schema.......
const categorySchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
        },
        courses:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }]
    }
)

//  Creating a Mongoose Model.....
module.exports=mongoose.model("Category",categorySchema); 