import {Router} from 'express';
import { getAllUsers, getUserById } from '../controller/userController.js';
import { authorize } from '../middlewares/authMiddleware.js';
const userRouter = Router();

userRouter.get('/',getAllUsers)
userRouter.get('/:id',authorize,getUserById)
userRouter.post('/user', (req, res)=>{
    res.send({title: 'CREATE new user'})
})
userRouter.patch('/update/:id',(req,res)=>{
    res.send({
        title: "UPDATE user info."
    })
})
userRouter.delete('/delete/:id', (req,res)=>{
    res.send({
        title: "DELETE user"
    })
})

export default userRouter;