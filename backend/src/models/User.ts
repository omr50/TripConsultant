import { Types } from "mongoose";
import { Typegoose, prop } from "typegoose";
import { pre } from "typegoose/lib/hooks";
import bcrypt from 'bcrypt'

@pre<UserSchema>('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  return next();
})
export class UserSchema extends Typegoose {
  @prop({required: true, unique: true})
  name!: string
  @prop({required: true, unique: true})
  password!: String
  @prop({required: true, unique: true})
  alias!: String
  @prop()
  location!: String
  @prop()
  reviews!: [Types.ObjectId]
}

const User = new UserSchema().getModelForClass(UserSchema, { schemaOptions: { collection: 'users' }});
export default User;
