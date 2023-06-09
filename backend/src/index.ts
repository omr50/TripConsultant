import express, {Express, Request, Response, Router } from 'express'
import connectDB from './config/dbConnection';
import User from './models/User';
import { Types } from "mongoose";
import { remove } from 'cheerio/lib/api/manipulation';
import Hotel from './models/Hotel';
import Review from './models/Review';
import 'reflect-metadata'
import userRouter from './routes/auth/signup';
connectDB()


const dotenv = require('dotenv');

dotenv.config();

const app:Express = express();
const port = process.env.PORT;


app.use(express.json())
app.use('/signup', userRouter)


app.get('/', async (req: Request, res: Response) => {

  // const user = await User.findOne({ name: "jimmybobby123"})
  res.send("Up and Running!");
})

app.listen(port, ()=> {
  console.log(`server is running at port ${port}`)
})