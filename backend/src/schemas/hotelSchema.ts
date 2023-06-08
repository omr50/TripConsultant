import { Schema, model, connect, Types, connections } from "mongoose";

interface IHotel {
  name: String,
  region: [String],
  address: String,
  reviews: [Types.ObjectId],
  images: [String],
  price_range: String
}

const hotelSchema = new Schema<IHotel>({
  name: String,
  region: [String],
  address: String,
  reviews: [Types.ObjectId],
  images: [String],
  price_range: String
})


export default hotelSchema;
