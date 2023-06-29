import express, {Express, Request, Response } from 'express'
import Hotel from '../../models/Hotel';
const hotelRouter = express.Router();

// Get 8 random hotels with a good rating. 
hotelRouter.get('/suggestions', async (req: Request, res: Response) => {
  console.log('apple')
  try {
    Hotel.aggregate([
      { $sample: { size: 8 } }
    ])
    .exec((err, hotels) => {
      console.log(hotels)
      if (err) {
        // Handle error
        console.error(err);
        return;
      }
      return res.status(200).send(hotels);
    });
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default hotelRouter