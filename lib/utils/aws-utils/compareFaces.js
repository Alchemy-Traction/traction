require('dotenv').config();
const AWS = require('aws-sdk');
const handleURL = require('./handleUrl');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const rekognition = new AWS.Rekognition();

const compareFaces = async(sourceImageUrl, targetImageUrl) => {
  const sourceImage = await handleURL(sourceImageUrl);
  const targetImage = await handleURL(targetImageUrl);

  const params = {
    SourceImage: {
      Bytes: sourceImage
    },
    TargetImage: {
      Bytes: targetImage
    },
    SimilarityThreshold: 90
  };

  return new Promise((resolve) => {
    rekognition.compareFaces(params, (err, data) => {
      if(err) {
        resolve(false); 
      }   
      else { 
        resolve(data.FaceMatches.length > 0);
      }
    });
  });
};

module.exports = compareFaces;
