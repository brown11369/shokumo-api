const mongoose=require("mongoose")


const foodSchema=mongoose.Schema({
    restaurant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"restaurants",
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    price:{
        type:Number,
    },
    image:{
        type:String,
    }
},{timestamps:true})

const foodModel=mongoose.model("foods",foodSchema)

module.exports=foodModel;