const express = require("express");

const router = express.Router()

const restaurant = require("../model/restaurantModel")

const orderModel = require("../model/orderModel")

const reg = require("../controllers/registration")
const login = require("../controllers/login")


router.post("/", reg)
router.post("/login", login)



// let sosdata=[]

router.get("/orders/:id", (req, res) => {
    let ord = [];

    let neword = []
    let restID = req?.params?.id;
    orderModel.find().populate({ path: 'order', populate: { path: 'foodid' } })
        .then((data) => {
            data.forEach((list, index) => {
                ord.push(...list.order)
            })
            ord.forEach((food, index) => {
                neword.push(food)
            })
            res.send(neword?.filter((element, index) => {

                if (element?.foodid?.restaurant == restID) {
                    return element
                }
            }))
        })
        .catch((err) => {
            console.log(err)
            res.send({ success: false, message: "please try again later" })
        })
})





router.get("/", (req, res) => {
    restaurant.find()
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            console.log(err)
            res.send({ success: false, message: "please try again later" })
        })
})

router.get("/:id", (req, res) => {
    let restaurantID = req.params.id;
    foodModel.findById({ _id: restaurantID })
        .then((data) => {
            res.send(data)
        })
        .catch((err) => {
            console.log(err)
            res.send({ success: false, message: "please try again later" })
        })
})

module.exports = router;