import express, {Express, Request, Response, Router } from 'express'
import connectDB from './config/dbConnection';
import User from './models/User';
import { Types } from "mongoose";
import { remove } from 'cheerio/lib/api/manipulation';
import Hotel from './models/Hotel';
import Review from './models/Review';
import 'reflect-metadata'
import { auth } from './middleware/auth';
import signupRouter from './routes/auth/signup';
import loginRouter from './routes/auth/login';
connectDB()


const dotenv = require('dotenv');

dotenv.config();

const app:Express = express();
const port = process.env.PORT;


app.use(express.json())
app.use('/signup', signupRouter)
app.use('/login', loginRouter)


app.get('/', async (req: Request, res: Response) => {
  // const user = await User.findOne({ name: "jimmybobby122"})
  // const user = await User.findOne({ name: "jimmybobby123"})
  const users = await User.find({name: 'jimmybobby123'})
  res.send(users);
})

app.get('/protected', auth, (req: Request, res: Response) => {
  res.send("We made it")
})

app.listen(port, ()=> {
  console.log(`server is running at port ${port}`)
})