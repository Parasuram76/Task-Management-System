import { Router } from "express";
import { adminLogin, adminRegister, checkAuth, logout } from "../controllers/AuthControllers.js";
import { verifyToken } from "../middlewares/VerifyToken.js";

const authRouter = Router() ;

authRouter.post('/login' , adminLogin) ;
authRouter.post('/register' , adminRegister) ;
authRouter.post('/logout' , logout) ;
authRouter.get('/check-auth' , verifyToken , checkAuth) ;


export default authRouter ;
