import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoute from './routes/user.route.js';
import review from './routes/review.route.js';
import order from './routes/order.route.js';
import gig from './routes/gig.route.js';
import message from './routes/message.controller.js';
import conversation from './routes/conversation.route.js';
import authRoute from './routes/auth.route.js'
import cookieParser from 'cookie-parser';

const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Coneected to DB")
    } catch (error) {
        console.log(error);
    }
}

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/users", userRoute); 
app.use("/api/reviews", review);
app.use("/api/orders", order);
app.use("/api/gigs", gig);
app.use("/api/messages", message);
app.use("/api/conversations", conversation);
app.use("/api/auth", authRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).send(errorMessage)
})
    
app.listen(8800, () => {
    connect();
    console.log('ma yahan hon bhai .... port 8800 pe')
})
