import express from 'express';
import {PORT} from './config/env.js';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRoutes.js';
import subRouter from './routes/suscriptionRoutes.js';
import connecToDB from './Database/mongodb.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjetMiddleware.js';
import wfRouter from './routes/workflowRoutes.js';


const app = express();
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth',arcjetMiddleware,authRouter);
app.use('/api/v1/user',arcjetMiddleware,userRouter);
app.use('/api/v1/subscription',arcjetMiddleware,subRouter);
app.use('/api/v1/workflow',wfRouter);
app.use(errorMiddleware)
app.get("/", (req,res)=>{
    res.send("Welcome to Subscription API");
})
app.listen(PORT,async()=>{
    console.log(`SUBSCRIPTION TRACKER API is running on port ${PORT}`);
    await connecToDB()
})
