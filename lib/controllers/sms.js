require('dotenv').config();
const { Router } = require('express');
const UserService = require('../services/UserService');
const User = require('../models/User');
const HabitService = require('../services/HabitServices');
const LogService = require('../services/LogService');
const Habit = require('../models/Habit');
const timeFormatChecker = require('../utils/timeFormatChecker');
const sendSms = require('../utils/sendSms.js');

module.exports = Router()
  .post('/', async(req, res) => {
  
    const user = await User.findByPhoneNumber(req.body.From);
    const habits = await Habit.findHabitByUser(user.id);

    //if user does not exist this step goes UserService in order to create a user
    if(!user) {
      await UserService.create(req.body.From);

      //if user exists but does not have a photoURL
    } else if(user.userPhotoUrl === null) { 

      //instruct user to add selfie with corresponding sending and receiving requests
      await UserService.addSelfie(req.body.From, req.body.MediaUrl0);

      //verifies user response to create new habit
    } else if((req.body.Body.toLowerCase() === 'new habit') || habits === false) {

      //creates new habit with their userId
      await HabitService.create(req.body.From, req.body.MediaUrl0); //

      //if habit label does not exist if text they sent says one of the elements of label array that we received and munged from AWS 
    } else if(habits.label === null) {

      //update habit.label row via updateLabel
      await HabitService.addLabel(req.body.From, req.body.Body);

      //if time preference does not exist and message is in correct time format 
    } else if(!habits.reminderTime && timeFormatChecker(req.body.Body)) {
      await HabitService.addTime(req.body.From, req.body.Body);

      //if prompt does not exist
    } else if(!habits.prompt) {

      //update habit.prompt via updatePrompt
      await HabitService.addPrompt(req.body.From, req.body.Body);

    } else if(req.body.MediaUrl0) {

      //perform service that uploads photo into habit_logs
      await LogService.create(req.body.From, req.body.MediaUrl0);
    } else {
      // if everything they sent doesn't match any responses we've created send this(send SMS)
      sendSms(req.body.From, 'Please send a picture of your habit!');
    } 
    res.end();
  });
