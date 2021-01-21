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

const detectLabels = async(url) => {
  const image = await handleURL(url);
  return new Promise((resolve, reject) => {
    rekognition.detectLabels({
      Image: {
        Bytes: image
      },
      MaxLabels: 20,
      MinConfidence: 70
    },
    (err, labels) => {
      if(err) reject(err);
      else resolve(labels);
    });
  });
<<<<<<< HEAD
=======

  //const compareFaces = (srcFace, targetFace) => {

>>>>>>> 203e16fa137c4a1d91f307dd723024192721db85

};

module.exports = detectLabels;
