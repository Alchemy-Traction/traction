const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const rekognition = new AWS.Rekognition();

const compareFaces = async (url) => {
    const image = await handleURL(url);
    return new Promise((resolve, reject) => {
        rekognition.compareFaces({
            SourceImage: 
        })
    })
}