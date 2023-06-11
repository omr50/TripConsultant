import { UserSchema } from "../models/User";
import User from "../models/User";
import bcrypt from 'bcrypt'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
const dotenv = require('dotenv');
dotenv.config();
const SECRET_KEY = process.env.secretkey;


export async function login(user: UserSchema) {
  try {
    console.log(user.username, user.password)
    const foundUser = await User.findOne({ name: user.username });
 
    if (!foundUser) {
      throw new Error('Name of user is not correct');
    }
 
    const isMatch = bcrypt.compareSync(user.password.toString(), foundUser.password.toString());
    
    if (isMatch) {
      const payload = {username: foundUser.username}
      const token = jwt.sign(payload, SECRET_KEY!, { expiresIn: '2d' });
 
      return { user, token: token };
    } else {
      throw new Error('Password is not correct');
    }

 } catch (error) {
  console.log(error)
 }
}