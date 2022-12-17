const express=require("express")


const router=express.Router()

const foodModel=require("../model/foodModel")


router.post("/create",(req,res)=>{
    let foodData=req.body
    foodModel.create(foodData)
    .then((data)=>{
        res.send({success:true,message:"your food item has created"})
    })
    .catch((err)=>{
        console.log(err)
        res.send({success:false,message:"please try again later"})
    })
})

// get all food 

router.get("/",(req,res)=>{
    foodModel.find()
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        console.log(err)
        res.send({success:false,message:"please try again later"})
    })
})


// get food by food id

router.get("/:id",(req,res)=>{
    let foodID=req.params.id;
    foodModel.findById({_id:foodID})
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        console.log(err)
        res.send({success:false,message:"please try again later"})
    })
})


// get food by restaurant name

router.get("/restaurant/:restaurant",(req,res)=>{
    let restaurantID=req.params.restaurant;
    foodModel.find({restaurant:restaurantID})
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        console.log(err)
        res.send({success:false,message:"please try again later"})
    })
})


// upadte food 

router.put("/:id",(req,res)=>{
    let foodID=req.params.id;
    let foodData=req.body
    console.log(foodData)
    foodModel.updateOne({_id:foodID},foodData)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        console.log(err)
        res.send({success:false,message:"please try again later"})
    })
})


// delete food by id

router.delete("/:id",(req,res)=>{
    let foodID=req.params.id;
    
    foodModel.deleteOne({_id:foodID})
    .then((data)=>{
        res.send({success:true,message:"item has deleted"})
    })
    .catch((err)=>{
        console.log(err)
        res.send({success:false,message:"please try again later"})
    })
})



module.exports=router;