import express, {Express, Request, Response } from 'express'
import connectDB from './config/dbConnection';
import User from './models/User';
import { Types } from "mongoose";
import { remove } from 'cheerio/lib/api/manipulation';
import Hotel from './models/Hotel';
import Review from './models/Review';


connectDB()


const dotenv = require('dotenv');

dotenv.config();

const app:Express = express();
const port = process.env.PORT;

app.get('/', async (req: Request, res: Response) => {
  // res.send('Express + TypeScript Server on port 8k');
  res.send("ass");
})

app.listen(port, ()=> {
  console.log(`server is running at port ${port}`)
})


