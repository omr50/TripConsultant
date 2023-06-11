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
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
const cors = require('cors');
connectDB()


const dotenv = require('dotenv');

dotenv.config();

const app:Express = express();
const port = process.env.PORT;


app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use('/signup', signupRouter)
app.use('/login', loginRouter)


app.get('/', async (req: Request, res: Response) => {
  // const user = await User.findOne({ name: "jimmybobby122"})
  await User.updateMany({}, { authProvider: 'username_password' });
  const user = await User.findOne({ name: "jimmybobby123"})
  res.send(user);
})

app.get('/protected', auth, (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];

    const token = authHeader!.substring(7);

  const decoded_payload = jwt.decode(token, {complete: true})
  res.send(decoded_payload)
})

app.listen(port, ()=> {
  console.log(`server is running at port ${port}`)
})