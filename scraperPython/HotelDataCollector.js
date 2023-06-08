const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const os = require('os')
const cluster = require('cluster')
const bcrypt = require('bcrypt')
const mongoose = require("mongoose")
const url = 'mongodb://localhost:27017/tripDB'

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  alias: String,
  location: String,
  reviews: [mongoose.Types.ObjectId]
})

const hotelSchema = new mongoose.Schema({
  name: String,
  region: [String],
  address: String,
  reviews: [mongoose.Types.ObjectId],
  images: [String],
  price_range: String
})

const reviewSchema = new mongoose.Schema({
  hotelId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  rating: String,
  title: String,
  text: String
})

const fileSchema = new mongoose.Schema({
  fileName: String
})

const User = mongoose.model("User", userSchema, "users")

const Hotel = mongoose.model("Hotel", hotelSchema, "hotels")

const Review = mongoose.model("Review", reviewSchema, "reviews")

const File = mongoose.model("File", fileSchema, "files")

async function connect() {
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB")
  } catch (error) {
    console.log(error)
  }
}




const folderPath = "D:\Hotels";
const fileExtension = '.html';



// making the finding process asynchronous
// so that i 
function findElementsAsync($, selector) {
  return new Promise((resolve) => {
    const elements = $(selector);
    resolve(elements);
  });
}

function findElementsAsyncInner($, selector) {
  return new Promise((resolve) => {
    const elements = $.find(selector);
    resolve(elements);
  });
}




async function getDataFromHTML(htmlFile){
  const data = await fs.promises.readFile(htmlFile, 'utf8');
  const $ = cheerio.load(data);
        
  const hotelID = new mongoose.Types.ObjectId();
  const searchTasks = [
    findElementsAsync($,'h1#HEADING'),
    findElementsAsync($, 'li.breadcrumb'),
    findElementsAsync($,'span.biGQs')
  ];
  // tasks done async to save time
  const results = await Promise.all(searchTasks);
  // console.log(results)
  const [hotelNameObj, hotelRegionDataPre, hotelAddressObj] = results;

  const hotelName = hotelNameObj.text()
  const hotelRegionData = hotelRegionDataPre.map((_, location) => $(location).text()).get()
  const hotelAddress = hotelAddressObj.text()
  
  // console.log(hotelName, hotelRegionData, hotelAddress)
  // const hotelName = $('h1#HEADING').text();
  // const hotelRegionData = $('li.breadcrumb').map((_, location) => $(location).text()).get();
  // const hotelAddress = $('span.biGQs').text

  const reviews = $('div.YibKl')
  
  let hotelReviews = []
  for (review of reviews) {
    const reviewID = new mongoose.Types.ObjectId();
    hotelReviews.push(reviewID)

    const userATag = $(review).find('a.uyyBf')
    const username = userATag.attr('href').slice(9);
    const user = await User.findOne({ username: username });
    let userID;
    let userAlias;
    let userPassword;
    let locationTag;
    let userLocation;
    let userReviews;
    // if the user is in the database already, then just add 
    // a new review id for them.
    if (user){
      userID = user._id;
      user.reviews.push(reviewID)
      userAlias = user.alias
      userPassword = user.password
      userLocation = user.location
      userReviews = user.reviews
      await user.save();
    }
    // otherwise we will have toe create the user object.
    else {
      userID = new mongoose.Types.ObjectId();
      userAlias = userATag.text()
      userPassword = await bcrypt.hash('password', 8);
      locationTag = $(review).find('span.LXUOn')

      if (locationTag)
        userLocation = locationTag.text()
      else
        userLocation = '' 
      
      userReviews = [reviewID]


      const newUser = new User({
        _id: userID,
        name: username,
        password: userPassword,
        alias: userAlias,
        location: userLocation,
        reviews: userReviews
      })

      await newUser.save();
    }

    // console.log(userID, username, userPassword, userAlias, userLocation, userReviews)

    const searchTasks2 = [
      findElementsAsyncInner($(review), 'span.ui_bubble_rating'),
      findElementsAsyncInner($(review), 'a.Qwuub'),
      findElementsAsyncInner($(review), 'span.QewHA')
    ];
  
    // $(review).find('span.ui_bubble_rating').attr('class').slice(-2),
    // $(review).find('a.Qwuub').find('span').text(),
    // $(review).find('span.QewHA').text()

    // tasks done async to save time
    const results = await Promise.all(searchTasks2);
    const [reviewRatingObj, reviewTitleDoubleObj, reviewTextObj] = results;

    const reviewRating = reviewRatingObj.attr('class').slice(-2)
    const reviewTitleDouble = reviewTitleDoubleObj.find('span').text()
    const reviewText = reviewTextObj.text()

    const reviewTitle = reviewTitleDouble.slice(0,Math.floor(reviewTitleDouble.length/2))

    // const reviewRating = $(review).find('span.ui_bubble_rating').attr('class').slice(-2)
    // const reviewTitleDouble = $(review).find('a.Qwuub').find('span').text()
    // const reviewText = $(review).find('span.QewHA').text()
    
    const newReview = new Review({
      _id: reviewID,
      hotelId: hotelID,
      userId: userID,
      rating: reviewRating,
      title: reviewTitle,
      text: reviewText
    })

    await newReview.save();

    // console.log(reviewID, hotelID, userID, reviewRating, reviewTitle, reviewText)
  }

  const photoListElements = $('li.CEZFh')
  let hotelImages = []
  for (photo of photoListElements){
    let sourceTag = $(photo).find("source")
    if (sourceTag.attr('srcset'))
      hotelImages.push(sourceTag.attr('srcset').split(' ')[0])
  }

  const hotelPriceRange = $('div.IhqAp').text()

  const newHotel = new Hotel({
    _id: hotelID,
    name: hotelName,
    region: hotelRegionData,
    address: hotelAddress,
    reviews: hotelReviews,
    images: hotelImages,
    price_range: hotelPriceRange
  })

  await newHotel.save();
}


// getting all of the file string names (23000 files almost)
function getFilePaths(folderPath, fileExtension) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      const filePaths = files
        .filter((filename) => filename.endsWith(fileExtension))
        .map((filename) => path.join(folderPath, filename));

      resolve(filePaths);
    });
  });
}

async function getAllFiles() {
  const allFiles = [];

  try {
    const filePaths = await getFilePaths(folderPath, fileExtension);
    for (const file of filePaths) {
      allFiles.push(file);
  }
  console.log(allFiles.length)
    let batches = [];
    for (var i = 0; i < allFiles.length; i += 50) {
      var batch = allFiles.slice(i, i + 50);
      batches.push(batch);
    }
    let counter = 0;
    let fileContents;
    for (batch of batches){
      let newBatch = []
      for (item of batch){
        const foundFile = await File.findOne({ fileName: item });
        if (!foundFile){
          newBatch.push(item)
          const newFile = new File({
            fileName: item
        })
        
        await newFile.save()
  
      }

      }
      const filePromises = newBatch.map(async (fileName) => {

        try {
          const data = await fs.promises.readFile(fileName, 'utf8');
              return data;
            } catch (error) {
              console.error(`Error reading file ${fileName}: ${error}`);
          }

      });


      fileContents = await Promise.all(filePromises);
      // now we have 50 html files in the array
      // should speed it up and takes up less
      // memory then before. Its more like a 
      // stream of 50 at a time,

      // Now we need to get all of the data we need
      // from the html files and create models and save
      // to the database.

      // const promises = fileContents.map(htmlFile => getDataFromHTML(htmlFile));
      // await Promise.all(promises)

      for (htmlFile of fileContents){

        getDataFromHTML(htmlFile);

      }

  }
    // console.log(allFiles);

    // now we have a bunch of batches which we can then run one at
    // a time and have async behavior without having too many files
    // opened in memory at the same time, which could possibly cause
    // the program to be very heavy or run out of memory.


  } catch (err) {
    console.error(err);
  }
}

// Call the async function to get all files

// getAllFiles()
// .then(()=>{
//   console.log("success")
// })
// .catch((error) => {
//   console.log("error occurred:",error)
// })

function getFilePaths(folderPath, fileExtension) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
        return;
      }

      const filePaths = files
        .filter((filename) => filename.endsWith(fileExtension))
        .map((filename) => path.join(folderPath, filename));

      resolve(filePaths);
    });
  });
}
async function getAllData(){
  
  const numCPUs = os.cpus().length;
  const files = await getFilePaths(folderPath, fileExtension);
  const workerIndex = cluster.worker.id - 1;
  const batchSize = Math.ceil(files.length / numCPUs);
  const start = workerIndex * batchSize;
  const end = start + batchSize;

  for (let i = start; i < end && i < files.length; i++) {
    await getDataFromHTML(files[i]);
  }

}

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;

  connect()
    .then(() => {
      console.log("Connected to MongoDB");

      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
    })
    .catch((error) => {
      console.log("Error occurred:", error);
    });
} else {
  connect()
    .then(() => {
  getAllData();
    })
  .catch ((error) => {
    console.log("error occurred:", error)
  })
}

// IMPORTANT --------------------------------
// gather all the tasks from the reviews loop
// and then process them all after. ASYNC


// stuff you should do

// 1. put the file names in the db at the end of the parsing
//    so that they are only put after they are looked through.


