import { Schema, model, connect, Types, connections, ConnectOptions } from "mongoose";
import User from "../models/User";
const dotenv = require('dotenv');

dotenv.config();

async function connectDB() {
  try {
    const connectionString = process.env.CONNECTION_STRING || '';
    console.log(connectionString)
    await connect(connectionString, {
      dbName: 'tripDB',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database");
  } catch (error) {
    console.error("Database connection error:", error);
    // Handle error here or throw it to be caught elsewhere
  }
}


export default connectDB;