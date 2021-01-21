require('dotenv').config();
const Habit = require('../models/Habit');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
const twilio = process.env.TWILIO_PHONE_NUMBER;

Habit.findHabitByReminderTime()
  .then(userHabits => {
    return Promise.all(
      userHabits.map(userHabit => {
        return client.messages.create({
          to: userHabit.phone_number,
          from: twilio,
          body: `Just a friendly reminder from your friends at Traktion. 
          Send us a picture so we can Trak your actions for the day! ${userHabit.prompt}!`
        });
      })
    );
  })

  .then(() => {
    console.log('Reminder message was sent!');
  })
  .catch(err => console.error(err));
