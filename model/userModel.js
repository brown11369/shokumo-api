const mongoose=require("mongoose")


const userSchema=mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    contact:{
        type:Number,
    },
    address:{
        type:String,
    },
    shipaddress:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
},{timestamps:true})

const userModel=mongoose.model("users",userSchema)

module.exports =userModel;