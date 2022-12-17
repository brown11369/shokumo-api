const bcryptjs = require("bcryptjs")
const jwt=require("jsonwebtoken")

const restaurant = require("../model/restaurantModel")
const user = require("../model/userModel")


function login(req, res) {
    let data = req.body
    let dataPassword=data.password
    let dataEmail=data.email
    let url = req.baseUrl

    function setmodel() {
        if (url === "/restaurant") {
            return restaurant
        }
        else {
            return user
        }
    }


    setmodel().findOne({email:dataEmail})
    .then((userData)=>{
        if(userData !== null){
            bcryptjs.compare(dataPassword,userData.password)
            .then((data)=>{
                if(data===true){
                    jwt.sign(dataEmail,"secretkey",(err,token)=>{
                        if(!err){
                            res.send({success:true,token:token,id:userData._id,name:userData.name,email:userData.email,contact:userData.contact,shipaddress:userData.shipaddress,address:userData.address,pin:userData.pin,open:userData.open,close:userData.close,image:userData.image})
                        }
                        else{
                            console.log(err)
                            res.send({success:false,message:"please try again later"})
                        }
                    })
                }
                else{
                    res.send({success:false,message:"you entered wrong password"})
                }   
            })
            .catch((err)=>{
                console.log(err)
                res.send({success:false,message:"please try again later"})
            })
            
        }
        else{
            res.send({success:false,message:"you are not register here"})
        }
        
    })
    .catch((err)=>{
        console.log(err)
        res.send({success:false,message:"please try again later"})
    })

    


}

module.exports = login;