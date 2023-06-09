import express, {Express, Request, Response } from 'express'
import User from '../../models/User';
const userRouter = express.Router();

// so the signup route gets user credentials and it will
// create a new user with those credentials. This is
// if the user does not exist already of course.
userRouter.post('/', async (req: Request, res: Response) => {
  // we don't really need to check if it exists first
  // we can just try to save it, if there is an error
  // from the db since it has type checking then we
  // respond with error.
  if (!req.body)
   return res.status(400).send(`Enter a valid user`)
  
   const data = req.body;

  const newUser = new User({
    name: data.name,
    password: data.password,
    alias: data.alias,
    location: data.location,
    reviews: [],
  })

  try {
    await newUser.save();
    return res.status(200).send(`Successfully created User: ${newUser}`)
  } catch (error) {
    return res.status(409).send(`Encountered Error: ${error}`)

  }
});

export default userRouter