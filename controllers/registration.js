const bcryptjs = require("bcryptjs")

const restaurant = require("../model/restaurantModel")
const user = require("../model/userModel")

function registration(req, res) {
    let data = req.body
    let url = req.baseUrl

    function setmodel() {
        if (url === "/restaurant") {
            return restaurant
        }
        else {
            return user
        }
    }

    bcryptjs.genSalt(10, (err, salt) => {
        if (!err) {
            bcryptjs.hash(data.password, salt, (err, hash) => {
                if (!err) {
                    data.password = hash
                    setmodel().create(data)
                        .then((data) => {
                            res.send({ success: true, message: "your account has been created" })
                        })
                        .catch((err) => {
                            console.log(err)
                            res.send({ success: false, message: "please try again later"})
                        })
                }
                else {
                    console.log(err)
                    res.send({ success: false, message: "please try again later" })
                }
            })
        }
        else {
            console.log(err)
            res.send({ msg: "failed" })
        }
    })

}

module.exports = registration;