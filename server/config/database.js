const mongoose=require('mongoose');
require("dotenv").config();

const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>console.log("DB Connection Done......"))
    .catch((e)=>{
        console.log("Error AA Gya in DB Connection");
    process.exit(1);
    });
}

module.exports=dbConnect;