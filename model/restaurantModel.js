const mongoose=require("mongoose")


const restaurantSchema= mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        required:true,
        type:String,
        unique:true,
    },
    mobile:{
        type:String,
    },
    address:{
        type:String,
    },
    pin:{
        type:Number,
    },
    open:{
        type:Number,
    },
    close:{
        type:Number,
    },
    image:{
        type:String,
    },
    password:{
        required:true,
        type:String,
    },
},{timestamps:true})




const ownerModel= mongoose.model("restaurants",restaurantSchema)

module.exports = ownerModel;