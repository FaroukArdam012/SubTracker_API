import {Router} from "express";
import { authorize } from "../middlewares/authMiddleware.js";
import { createSub, deleteSub, getUserSub } from "../controller/subController.js";
const subRouter=Router();

subRouter.get('/',(req,res)=>{
    res.send({
        title: "GETS all subs"
    })
})
subRouter.get('/:id',(req,res)=>{
    res.send({
        title: "GETS a sub"
    })
})
subRouter.post('/sub',authorize, createSub)
subRouter.patch('/sub/:id',(req,res)=>{
    res.send({
        title: "UPDATES a sub"
    })
})
subRouter.delete('/sub/:id',authorize, deleteSub)
subRouter.get('/user/:id',authorize, getUserSub)
subRouter.put('/:id/cancel',(req,res)=>{
    res.send({
        title: "CANCEL all subcriptions"
    })
})
subRouter.get('/upcoming-renewals',(req,res)=>{
    res.send({
        title:"GETS all upcoming renewals"
    })
})

export default subRouter;