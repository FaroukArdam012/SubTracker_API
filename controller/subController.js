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
            url: `${SERVER_URL}/api/v1/workflow/subscription/reminder`,
            body: {
                subscriptionId: sub.id
        }
})

       console.log("Workflow triggered:", workflowRunId);
        res.status(201).json({
            success: true,
            data: sub,
            workflowRunId
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
            error.statusCode=401;
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
    try {
        const subscription= await Subscription.findById(req.params.id)
        if(!subscription){
            const error= new Error("Subscription doesn't exist");
            error.statusCode= 404;
            throw error;

        }

        if(subscription.user.toString()!== req.user._id.toString()){
            const error = new Error('You are not the owner of the subscription')
            error.statusCode= 403;
            throw error
        }
        await subscription.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Deleted Sucessfully"
        })
    } catch (error) {
       next(error)
    }
  
}