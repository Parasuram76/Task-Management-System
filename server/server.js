import http from 'http' ;
import express from 'express' ;
import cors from 'cors' ;
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import authRouter from './routes/AuthRoutes.js';




dotenv.config()
const PORT = 5000 ;
const app = express() ;
app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())
const server = http.createServer(app) ;


app.use('/auth' , authRouter) ;



server.listen(PORT , () => {
    console.log(`Server at ${PORT}`)
})


mongoose.connect("mongodb://127.0.0.1:27017/CodingClub")
.then(() => console.log("Connected to DB"))
.catch((err) => console.log("Failed to connect with DB :" + err))