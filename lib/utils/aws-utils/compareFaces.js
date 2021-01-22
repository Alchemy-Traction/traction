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

// compareFaces('https://s3-external-1.amazonaws.com/media.twiliocdn.com/AC091ee107a424a6072d9cf823458420f3/7b77255f4789a91e0510dcb45d112002', 'https://s3-external-1.amazonaws.com/media.twiliocdn.com/AC091ee107a424a6072d9cf823458420f3/c9acf53ff5621634902b417231a3e239')
//   .then(console.log);

module.exports = compareFaces;
