import Subscription from "../models/subModel.js"
import { workflowClient } from "../config/upstash.js"
import {SERVER_URL} from "../config/env.js"

export const createSub= async(req,res,next)=>{
    try {
        const sub = await Subscription.create({
            ...req.body,
            user: req.user._id,
        })
        const { workflowRunId } = await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/subscription/reminder`,
            body: {
                subscriptionId: sub.id
        }
})

       console.log("Workflow triggered:", workflowRunId);
        res.status(201).json({
            success: true,
            data: sub,workflowRunId
        })
    } catch (error) {
        next(error)
    }
}

export const getUserSub= async(req,res,next)=>{
    try {
        // check if the user is the same as the one in the token
        if(req.user.id!=req.params.id){
            const error = new Error("You are not the owner")
            error.status=401;
            throw error
        }
        const subscriptions= await Subscription.find({
            user: req.params.id
        });
        res.status(200).json({
            success: true,
            data: subscriptions
        })

        
    } catch (error) {
        next(error);
    }
}



export const deleteSub= async (req,res) => {
  
}