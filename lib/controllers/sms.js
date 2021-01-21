const { Router } = require('express');
const UserService = require('../services/UserService');
const User = require('../models/User');
const HabitService = require('../services/HabitService');
const Habit = require('../models/Habit');
const timeFormatChecker = require('../utils/timeFormatChecker');
//change to sendSms
const sendSms = require('../utils/twilio.js');

//useful stretch items
//Change time reminder prompt
//Delete habit else if(req.body.Body.toLowerCase() ==='delete')
//Comment capability when user sends habit verification picture
//Typing in 'new habit' may or not be used

module.exports = Router()
  .post('/', async(req, res, next) => {
    //which habitService do we use? should be 7 total options...
    //Step locates user according to phone number in our Postgresql database
    const user = await User.findByPhoneNumber(req.body.From);
    //need to get userId to inject into findHabitById function
    const habit = await Habit.findHabitById(booger);
    
    //if user does not exist this step goes UserService in order to create a user
    if(!user) {
      await UserService.create(req.body.From);

      //if user exists but does not have a photoURL
    } else if(!user.userPhotoURL) {

      //instruct user to add selfie with corresponding sending and recieving requests
      await UserService.addSelfie(req.body.From, req.body.mediaURL0);

      //verifies user response to create new habit
    } else if((req.body.Body.toLowerCase() === 'new habit') || req.body.mediaURL0) {

      //creates new habit with their userId
      await HabitService.create(req.body.From, req.body.mediaURL0); //

      //need to get labels out of HabitService.create
      //if habit label does not exist if text they sent says one of the elements of label array that we recieved and munged from AWS 
    } else if(!habit.label && labelOptionArrayBooger.includes(req.body.Body)) {
      
      //update habit.label row via updateLabel
      await HabitService.addLabel(req.body.From, req.body.Body);

      //if time preference does not exist and message is in correct time format
    } else if(!habit.reminderTime && timeFormatChecker(req.body.Body)) {

      //update habit.reminderTime via updateTime
      await HabitService.addTime(req.body.From, req.body.Body);

      //if prompt does not exist
    } else if(!habit.prompt) {

      //update habit.prompt via updatePrompt
      await HabitService.addPrompt(req.body.From, req.body.Body);

      //wtf we do about photo responses when they verify habit
    } else if(req.body.mediaURL0) {

      //perform service that uploads photo into habit_logs
      await LogService.create(req.body.From, req.body.mediaURL0);
    } else {
      // if everything they sent doesn't match any responses we've created send this(send SMS)
      sendSms(req.body.From, 'wtf');
    } //service designed to respond to a user response we don't have an option for
    res.end();
  });

//should also be 7 total UserService and HabitService functions
