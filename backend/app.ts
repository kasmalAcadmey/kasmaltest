require('dotenv').config()
import express, { NextFunction, Request, Response } from 'express'
export const app = express()
import cors from 'cors'
import cookieParser from 'cookie-parser'


app.use(express.json({limit: '50mb'}))

/// cookie parser 

app.use(cookieParser())

/// we need to use cors cors orgin sharign 

app.use(cors({
    origin: process.env.ORGIN
}))


app.get('/test/' , (req:Request, res: Response, next: NextFunction)=> {
res.status(200).json({
    success: true,
    message: 'woking test api'

})
})


app.all('*', (req:Request, res:Response, next:NextFunction)=> {
   const err =new Error(`not found this ${req.originalUrl} url`) as any;
   err.statusCode = 404,
   next(err)
})