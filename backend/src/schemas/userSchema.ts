import { Schema, model, connect, Types, connections } from "mongoose";

interface IUser {
  name: String,
  password: String,
  alias: String,
  location: String,
  reviews: [Types.ObjectId]
}


const userSchema = new Schema<IUser>({
  name: { type: String },
  password: { type: String },
  alias: { type: String },
  location: { type: String },
  reviews: [{ type: Types.ObjectId }]
});

export default userSchema;