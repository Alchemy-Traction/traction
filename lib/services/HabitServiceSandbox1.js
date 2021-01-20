const Habit = require('../models/Habit');
const User = require('../models/User');
const detectLabels = require('../utils/aws-utils/detectLabels');
const mungeLabels = require('../utils/aws-utils/mungeLabels');


module.exports = class HabitService {

  static async create({ phoneNumber, habitImageURL }) {
    const user = await User
      .findByPhoneNumber(phoneNumber);

    return Habit
      .insert(user.id)
      .then(() => detectLabels(habitImageURL))
      .then(labels => mungeLabels(labels))
      .then(labels => sendSMS(phoneNumber, `We detected the following labels. Please choose one that most accurately represents your photo: ${labels}`));
  }

  static async updateLabel({ phoneNumber, label }) {
    const user = await User
      .findByPhoneNumber(phoneNumber);

    return Habit
      .updateLabel(user.id, label)
      .then(() => sendSMS(phoneNumber, 'Great, thank you! What time would you like to be notified every day to complete your habit?'));
    // error handling?
  }   

  static async updateTime({ phoneNumber, reminderTime }) {
    const user = await User
      .findByPhoneNumber(phoneNumber);

    return Habit
      .updateTime(user.id, reminderTime)
      .then(() => sendSMS(phoneNumber, 'Sounds amazing. What prompt would you like to see when notified? Some examples: `Time for a run!` or `Drop down and give me 20 pushups!`'));
  }

  static async updatePrompt({ phoneNumber, prompt }) {
    const user = await User
      .findByPhoneNumber(phoneNumber);

    return Habit
      .updatePrompt(user.id, prompt)
      .then(() => sendSMS(phoneNumber, 'And just like that, you\'re all set up! See you tomorrow. You got this!'));
  }
};
