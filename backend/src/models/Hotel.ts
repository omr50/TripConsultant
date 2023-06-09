import { Types } from "mongoose";
import { Typegoose, prop } from "typegoose";

export class HotelSchema extends Typegoose {
  @prop({required: true})
  name!: string
  @prop()
  region!: [String]
  @prop()
  address!: String
  @prop()
  reviews!: [Types.ObjectId]
  @prop()
  images!: [String]
  @prop()
  price_range!: String
}

const Hotel = new HotelSchema().getModelForClass(HotelSchema, { schemaOptions: { collection: 'hotels' }});

export default Hotel;


