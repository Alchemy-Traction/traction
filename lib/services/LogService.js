const Log = require('../models/Log');
const User = require('../models/User');
const detectLabels = require('../utils/aws-utils/detectLabels');
const sendSms = require('../utils/sendSms');

module.exports = class LogService {
  static async create({ phoneNumber, habitImageUrl }) {
    const user = await User
      .findByPhoneNumber(phoneNumber);

    const log = await Log.insert(user.id, habitImageUrl);
    const labels = await detectLabels(habitImageUrl);
    const matches = await matchLabels(labels, user.id);
    const isUser = await compareFaces(user.userPhotoUrl, habitImageUrl);
    if (isUser && matches) {
      const log = await Log.insert(user.id, habitImageUrl);
      sendSms(phoneNumber, 'Great job! You completed your habit for the day. See you tomorrow!')
    } else {
      sendSms(phoneNumber, 'That photo didn\'t match the labels or the face that we expected. Please try again.')
    }

  }
};
