import {Router} from 'express';
const authRouter = Router();
import {signUp, signIn, signOut} from '../controller/authController.js';
//path: /api/v1/auth/signup 
authRouter.post('/sign-up',signUp)
authRouter.post('/sign-in',signIn)
authRouter.post('/sign-out', signOut)
export default authRouter;