const mongoose=require("mongoose")


const cartSchema=mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    foodid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foods",
    },
    quantity:{
        type:Number
    }
},{timestamps:true})

const cartModel=mongoose.model("carts",cartSchema)

module.exports=cartModel;