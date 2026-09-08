import Razorpay from "razorpay"
import dotenv from "dotenv"

dotenv.config()

const razorPay = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

console.log("RAZORPAY KEY ID:", process.env.RAZORPAY_KEY_ID);
console.log(
  "SECRET LOADED:",
  Boolean(process.env.RAZORPAY_KEY_SECRET)
);
console.log(
  "SECRET LENGTH:",
  process.env.RAZORPAY_KEY_SECRET?.length
);

export default razorPay