const express=require("express")


const router=express.Router()

const cartModel=require("../model/cartModel")


router.post("/add",(req,res)=>{
    let cartData=req.body
    cartData.quantity=1
    cartModel.create(cartData)
    .then((data)=>{
        res.send({success:true,message:"your cart item has created"})
    })
    .catch((err)=>{
        console.log(err)
        res.send({success:false,message:"please try again later"})
    })
})



router.get("/:id",(req,res)=>{
    let userID=req.params.id;
    cartModel.find({userid:userID}).populate("foodid")
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        console.log(err)
        res.send({success:false,message:"please try again later"})
    })
})

router.delete("/remove/:id",(req,res)=>{
    let cartID=req.params.id;
    
    cartModel.findByIdAndDelete(cartID)
    .then((data)=>{
        res.send({success:true,message:"item has removed"})
    })
    .catch((err)=>{
        console.log(err)
        res.send({success:false,message:"please try again later"})
    })
})





module.exports=router;