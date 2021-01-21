require('dotenv').config();
const AWS = require('aws-sdk');
const handleURL = require('./handleUrl');

//our AWS access details
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const rekognition = new AWS.Rekognition();

const compareFaces = async(sourceImageUrl, targetImageUrl) => {
  const sourceImage = await handleURL(sourceImageUrl);
  const targetImage = await handleURL(targetImageUrl);

  //   return new Promise((resolve, reject) => {
  const params = {
    SourceImage: {
      Bytes: sourceImage
    },
    TargetImage: {
      Bytes: targetImage
    },
    SimilarityThreshold: 90
  };

  rekognition.compareFaces(params, (err) => {
    if(err) {
      console.log(err, err.stack);
    } else {
      return true;
    } 
  });
};

// console.log(compareFaces('https://www.placecage.com/200/300', 'https://www.placecage.com/c/200/300'));

module.exports = compareFaces;
