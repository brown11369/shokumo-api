const express =require("express");


const router=express.Router()

const reg=require("../controllers/registration")
const login=require("../controllers/login")


router.post("/",reg)
router.post("/login",login)

module.exports = router;