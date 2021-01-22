require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
const twilio = process.env.TWILIO_PHONE_NUMBER;

const sendSms = (phoneNumber, message) => {

  //const accountSid = process.env.TWILIO_ACCOUNT_SID;
  //const authToken = process.env.TWILIO_AUTH_TOKEN;

  //const client = require('twilio')(accountSid, authToken);

  return client.messages.create({
    to: phoneNumber,
    from: twilio,
    body: message
  })
    .then(() => {
      console.log('Messages sent!', message);
    })
    .catch(err => console.error(err));
};

module.exports = sendSms; 
