import axios from "axios"
import { PLANS } from "../config/plans.js"
import razorPay from "../config/razorpay.js"
import Payment from "../models/payment.model.js"
import crypto from "crypto"

export const createOrder = async (req, res) => {
    try {
        console.log("createOrder hits");
        
        const {plan} = req.body
        const userId = req.headers["x-user-id"]
        const selectedPlan = PLANS[plan]

        if(!selectedPlan){
            return res.status(404).json({message: "plan not found"})
        }

        const order = await razorPay.orders.create({
            amount:selectedPlan.amount * 100,
            currency:"INR",
            receipt:`receipt-${Date.now}`
        })

        console.log("order prepared");

        await Payment.create({
            userId,
            orderId:order.id,
            amount:selectedPlan.amount,
            credits:selectedPlan.credits,
            plan:selectedPlan.id,
            currency:order.currency,
            status:"created"
        })

        console.log("SERVER ORDER ID:", order.id);

        console.log("payment prepared")

        return res.status(200).json({order, plan:selectedPlan})
    } catch (error) {
        console.error("CREATE ORDER ERROR:", error);
        return res.status(500).json({message:`create order error - ${error}`})
    }
}


export const verifyPayment = async (req, res) => {
    try {
        console.log("verify payemt hits");
        
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body

        console.log("CALLBACK ORDER ID:", razorpay_order_id);

        console.log("KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log("SECRET LENGTH:", process.env.RAZORPAY_KEY_SECRET?.length);
console.log(
  "SIGN STRING:",
  `${razorpay_order_id}|${razorpay_payment_id}`
);
  
        const generateSignature = crypto
                                    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
                                    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
                                    .digest("hex")

        console.log("crypto generates");

        console.log("ORDER ID:", razorpay_order_id);
        console.log("PAYMENT ID:", razorpay_payment_id);
        console.log("RECEIVED SIGNATURE:", razorpay_signature);
        console.log("GENERATED SIGNATURE:", generateSignature);                           

        if(generateSignature !== razorpay_signature){
            return res.status(400).json({message:"Payment verification Failed"})
        }    
        
        const payment = await Payment.findOne({orderId:razorpay_order_id})

        console.log("searching payment");

        if(!payment){
            return res.status(404).json({message:"Payment not Found"})
        }

        payment.status = "paid"
        payment.paymentId = razorpay_payment_id
        await payment.save()

        console.log("payment saved");

        await axios.post(`${process.env.AUTH_SERVICE}/update-plan`, {userId: payment.userId, plan: payment.plan, credits: payment.credits})

        return res.status(200).json({message:"payment verified"})
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({message:`verification problem:- ${error}`})
        
    }
}