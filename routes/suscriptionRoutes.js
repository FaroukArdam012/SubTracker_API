import {Router} from "express";
const subRouter=Router();

subRouter.get('/subs',(req,res)=>{
    res.send({
        title: "GETS all subs"
    })
})
subRouter.get('/sub/:id',(req,res)=>{
    res.send({
        title: "GETS a sub"
    })
})
subRouter.post('/sub',(req,res)=>{
    res.send({
        title: "CREATES a sub"
    })
})
subRouter.patch('/sub/:id',(req,res)=>{
    res.send({
        title: "UPDATES a sub"
    })
})
subRouter.delete('/sub/:id',(req,res)=>{
    res.send({
        title: "DELETES a sub"
    })
})
subRouter.get('/user/:id',(req,res)=>{
    res.send({
        title: "GET all user subscriptions"
    })
})
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