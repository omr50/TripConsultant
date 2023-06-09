import express, {Express, Request, Response } from 'express'
const loginRouter = express.Router();
import { login } from '../../services/loginService';

// Route handler for the login endpoint
loginRouter.post('/', async (req: Request, res: Response) => {
  try {
    const foundUser = await login(req.body);
    //console.log('found user', foundUser.token);
    return res.status(200).send(foundUser);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default loginRouter