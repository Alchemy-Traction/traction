require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

const sendSms = (phoneNumber, message) => {

  //const accountSid = process.env.TWILIO_ACCOUNT_SID;
  //const authToken = process.env.TWILIO_AUTH_TOKEN;

  //const client = require('twilio')(accountSid, authToken);

  return client.messages.create({
    to: phoneNumber,
    from: '+19712333809',
    body: message
  })
    .then(() => {
      console.log('Messages sent!', message);
    })
    .catch(err => console.error(err));
};

module.exports = sendSms; 
