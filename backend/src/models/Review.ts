import { Types } from "mongoose";
import { Typegoose, prop } from "typegoose";

export class ReviewSchema extends Typegoose {
  @prop({required: true})
  hotelId!: Types.ObjectId
  @prop({required: true})
  userId!: Types.ObjectId
  @prop({required: true})
  rating!: String
  @prop()
  title!: String
  @prop()
  text!: String
}

const Review = new ReviewSchema().getModelForClass(ReviewSchema, { schemaOptions: { collection: 'reviews' }});
export default Review;
