import express, {Express, Request, Response } from 'express'
import Hotel from '../../models/Hotel';
const searchRouter = express.Router();

// Get 8 random hotels with a good rating. 
searchRouter.post('/', async (req: Request, res: Response) => {
  const userInput = req.body.query;
  console.log(userInput)
  
  try {
    const hotelNameRegex = new RegExp(userInput, 'i');
    const regionRegex = new RegExp(userInput, 'i');
    const regions = []
    const matchingHotels = await Hotel.find({ name: hotelNameRegex }).limit(3);
    const matchingRegions = await Hotel.find({ region: { $elemMatch: { $regex: regionRegex } } }).limit(1);
    let uniqueRegion: String = ''
    if (matchingRegions.length > 0) {
      for (let j = 0; j < matchingRegions[0].region.length; j++){
        if (matchingRegions[0].region[j].toLowerCase().includes(userInput.toLowerCase())){
          uniqueRegion = matchingRegions[0].region[j]
          break;
        }
      }
    console.log(uniqueRegion)
  }

    
    if (matchingHotels && matchingRegions)
      res.json({ matchingHotels, uniqueRegion });
    else if (matchingHotels)
      res.json({matchingHotels})
    else if (matchingRegions)
      res.json({uniqueRegion})
  } catch (error) {
    console.error('Error searching hotels:', error);
    res.status(500).json({ error: 'An error occurred while searching hotels.' });
  }

})

export default searchRouter