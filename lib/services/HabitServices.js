const Habit = require('../models/Habit');
const User = require('../models/User');
const detectLabels = require('../utils/aws-utils/detectLabels');
const mungeLabels = require('../utils/aws-utils/mungeLabels');
const sendSms = require('../utils/sendSms');


module.exports = class HabitService {

  static async create(phoneNumber, itemImageUrl) {
    const user = await User
      .findByPhoneNumber(phoneNumber);
      
    console.log(user);

    return Habit
      .insertHabit(user.id)
      .then(() => detectLabels(itemImageUrl))
      .then(labels => mungeLabels(labels))
      .then(labels => sendSms(phoneNumber, `We detected the following labels. Please choose one that most accurately represents your photo: ${String(labels)}`));
  }

  static async addLabel(phoneNumber, label) {
    const user = await User
      .findByPhoneNumber(phoneNumber);

    return Habit
      .updateLabel(user.id, label)
      .then(() => sendSms(phoneNumber, `Great, thank you! You chose ${label} as your traktion tracker item. What time would you like to be notified every day to complete your habit?`));
    // error handling?
  }

  static async addTime(phoneNumber, reminderTime) {
    const user = await User
      .findByPhoneNumber(phoneNumber);

    return Habit
      .updateTime(user.id, reminderTime)
      .then(() => sendSms(phoneNumber, 'Sounds amazing. What prompt would you like to see when notified? Some examples: `Time for a run!` or `Drop down and give me 20 pushups!`'));
  }

  static async addPrompt(phoneNumber, prompt) {
    const user = await User
      .findByPhoneNumber(phoneNumber);

    return Habit
      .updatePrompt(user.id, prompt)
      .then(() => sendSms(phoneNumber, 'And just like that, you\'re all set up! See you when it\'s time. You got this!'));
  }
};
