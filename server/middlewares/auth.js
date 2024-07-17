import jwt from 'jsonwebtoken'
import { catachAsyncErrors } from './catchAsyncError.js'
import {User} from "../models/User.js"
import ErrorHandler from '../utils/ErrorHandler.js';

export const isAuthenticated = catachAsyncErrors(async(req,res,next)=>{

    const {token} = req.cookies;

    if(!token) return next(new ErrorHandler("Please login to access this resource",401))

    const decode = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decode._id)

    next();

})

export const authorizeSubscribe = (req,res,next)=>{
    if(req.user.subscription.status !== "active" && req.user.role!=="admin"){
        return next(
        new ErrorHandler(`only subscriber can access this resource`,403)
        )
    }
    next();
}

export const authorizeAdmin = (req,res,next)=>{
    if(req.user.role !== "admin"){
        return next(
        new ErrorHandler(`${req.user.role} is not allowed to access this resource`,403)
        )
    }
    next();
}
