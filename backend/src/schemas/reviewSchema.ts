import { Schema, model, connect, Types, connections } from "mongoose";

interface IReview {
  hotelId: Types.ObjectId,
  userId: Types.ObjectId,
  rating: String,
  title: String,
  text: String
}

const reviewSchema = new Schema<IReview>({
  hotelId: Types.ObjectId,
  userId: Types.ObjectId,
  rating: String,
  title: String,
  text: String
})

export default reviewSchema;