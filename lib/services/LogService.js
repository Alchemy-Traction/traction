const Log = require('../models/Log');
const User = require('../models/User');
const detectLabels = require('../utils/aws-utils/detectLabels');
const sendSms = require('../utils/sendSms');

module.exports = class LogService {
  static async create({ phoneNumber, habitImageUrl }) {
    const user = await User 
      .findByPhoneNumber(phoneNumber);

    return Log
      .insert(user.id, habitImageUrl)
      .then(() => detectLabels(habitImageUrl))
      .then(labels => matchLabels(labels))
      .then(compareFaces(user.userPhotoUrl, habitImageUrl))
      .then(if (matchLabels && compareFaces) => {
        sendSms(phoneNumber, 'Great job! You completed your habit for the day. See you tomorrow!')
      } else {
          sendSms(phoneNumber, 'That photo didn\'t match the labels or the face that we expected. Please try again.')
      });
  }
};
