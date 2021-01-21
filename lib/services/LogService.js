const Log = require('../models/Log');
const User = require('../models/User');
const Habit = require('../models/Habit');
const compareFaces = require('../utils/aws-utils/compareFaces');
const detectLabels = require('../utils/aws-utils/detectLabels');
const sendSms = require('../utils/sendSms');

module.exports = class LogService {
  static async create({ phoneNumber, habitImageUrl }) {
    const user = await User
      .findByPhoneNumber(phoneNumber);

    const labels = await detectLabels(habitImageUrl);
    const labelsMatch = await Habit.confirmLabelsbyUserId(labels, user.id);
    const facesMatch = await compareFaces(user.userPhotoUrl, habitImageUrl);
    if(facesMatch && labelsMatch) {
      await Log.insert(user.id, habitImageUrl);
      sendSms(phoneNumber, 'Great job! You completed your habit for the day. See you tomorrow!');
    } else {
      sendSms(phoneNumber, 'That photo didn\'t match the labels or the face that we expected. Please try again.');
    }

  }
};
