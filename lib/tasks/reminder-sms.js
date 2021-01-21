require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
const twilio = process.env.TWILIO_PHONE_NUMBER;


const numbers = [
  process.env.JENA_PHONE_NUMBER, 
  process.env.JON_PHONE_NUMBER, 
  process.env.ANDREW_PHONE_NUMBER, 
  process.env.KATIE_PHONE_NUMBER, 
  process.env.PERRY_PHONE_NUMBER, 
  process.env.ROSALIE_PHONE_NUMBER
];

Promise.all(
  numbers.map(UserPhoneNumber => {
    return client.messages.create({
      to: UserPhoneNumber,
      from: twilio,
      body: `Just a friendly reminder from your friends at Traktion. 
      Send us a picture so we can Trak your actions for the day! ${prompt}!`
    });
  })
)
  .then(() => {
    console.log('Reminder message was sent!');
  })
  .catch(err => console.error(err));
