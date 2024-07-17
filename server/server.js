import app from "./app.js";
import { connectDB } from "./config/database.js";
import { Stats } from "./models/Stats.js";
import cloudinary from 'cloudinary';
import Razorpay from 'razorpay'
import nodeCron from 'node-cron'

//Connect Database
connectDB()

//file upload in cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
})

//razorpay instance
export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
  });

  nodeCron.schedule("0 0 0 1 * *", async()=>{
    try {
        await Stats.create({})
    } catch (error) {
        console.log(error)
    }
  })

// const temp = async()=>{
//     await Stats.create({})
// }
// temp()

app.listen(process.env.PORT, () => {
    console.log(`Server is working on port: ${process.env.PORT}`);
})