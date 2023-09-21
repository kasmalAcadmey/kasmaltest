import { NextFunction ,Request, Response} from "express";
import ErrorHanlder from "../utils/ErrorHandler";

const errMidleware = (err: any, req: Request, res:Response, next:NextFunction)=> {
err.statusCode = err.statusCode || 500;
err.message = err.message || "internal Error"


/// wrong mongodb  id error

if(err.name === "CastError"){
    const message =   `Resouce Error not dound invlid ${err.path}`;
    err = new ErrorHanlder(message, 400)

}

/// Deplicate key Error 
if(err.code === 1100){
const message = ` Deuplicate ${Object.keys(err.keyValue)} extened`
err = new ErrorHanlder(message, 401)
}

/// wrong jwt erro 

if(err.name === 'jsonWebTokenError'){
    const message = `json webToken is invalid please try again`;
    err  = new ErrorHanlder(message, 404)
}

/// if jwt expired do this

if(err.name === 'TokenExpiredError'){
    const message = `json web tokne is expired plase tray agian `
    err = new ErrorHanlder(message, 404)
}

res.status(err.statusCode).json({
    succcess: false,
    message: err.message
})

}