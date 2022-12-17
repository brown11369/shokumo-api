const express=require("express");
const mongoose=require("mongoose")
const cors=require("cors")
const stripe = require("stripe")("sk_test_51MF0AcSHgVbyLoUair4iosF2wfR6P9AKUHZl3TA5uXU8VqA6Cgs2osoVAKgVf9pm5BhIM9hAe0aMYXuQ9UDZOVW500nl2zBIgO");

const app=express();
app.use(cors())
app.use(express.json());
app.use(express.static('public')); 

mongoose.connect("mongodb://localhost:27017/shokumo")
.then((data)=>{
    console.log("database connected")
})
.catch((err)=>{
    console.log(err)
})


const orderModel=require("./model/orderModel")

const restaurant=require("./routes/restaurant")
const user=require("./routes/user")
const food=require("./routes/food")
const cart=require("./routes/cart")
const order=require("./routes/order")

app.use("/restaurant",restaurant)
app.use("/user",user)
app.use("/food",food)
app.use("/cart",cart)
app.use("/order",order)


app.post('/create-checkout-session', async (req, res) => {

    try{
        let orderdata = req.body;

        const lineitems = await Promise.all(
            
            orderdata?.map((list)=>{
              
               return{
                       price_data: {
                         currency: "inr",
                         product_data: {
                           name: list?.foodid.name,
                         },
                         unit_amount: Math.round(list?.foodid.price * 100),
                       },
                       quantity: list?.quantity
                     }
            })
        )

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            success_url: `http://127.0.0.1:5173/order?success=true`,
            cancel_url: `http://127.0.0.1:5173/order?canceled=true`,
            line_items: lineitems,
            shipping_address_collection: {allowed_countries: ['US', 'IN']},
            payment_method_types: ["card"],
            
        });

        // const orderUpdate = 


        await orderModel.create({userid:orderdata[0]?.userid,paymentInfo:session.id, status:3,order:orderdata})


        res.json({stripeSession: session})
    }catch(err){
        console.log(err)
    }

});





app.listen(3000,()=>{
    console.log("i am working perfectly fine")
})