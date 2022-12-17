const mongoose=require("mongoose")


const orderSchema=mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    },
    paymentInfo:{
        type:String,
    },
    status:{
        type:Number,
        default:0
    },
    order:[{
        foodid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"foods"},
        // name:{
        //     type:String,  
        // },
        // price:{
        //     type:Number
        // },
        quantity:{
            type:Number
        }
    }]
},{timestamps:true})

const orderModel=mongoose.model("orders",orderSchema)

module.exports=orderModel;