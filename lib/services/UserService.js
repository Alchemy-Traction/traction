const User = require('../models/User');
const bcrypt = require('bcryptjs');
const sendSms = require('../utils/sendSms');

module.exports = class UserService {

  static async create({ phoneNumber }) {
    const numberHash = await bcrypt.hash(phoneNumber, Number(process.env.SALT_ROUNDS));

    const user = await User
      .insert({ numberHash })
      .then(() => sendSms(phoneNumber, 'Thanks for signing up to Tracktion! You are on your way to building healthy habits! Let\'s start with a picture, send me a selfie!'));

    return user;
  }

  static async addSelfie({ phoneNumber, userPhotoUrl }) {
    const user = await User
      .findByPhoneNumber(phoneNumber)
      .then(() => User.updateSelfie(user.id, userPhotoUrl))
      .then(() => sendSms(phoneNumber, 'Looking good! Send us a photo of an item associated with your habit! For example, running shoes or your vitamins.'));

    return user;
  }
};
