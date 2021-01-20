const User = require('../models/User');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

module.exports = class UserService {
  static async create({ phoneNumber }) {
    const numberHash = await bcrypt.hash(phoneNumber, Number(process.env.SALT_ROUNDS));
    const user = await User.insert({ numberHash })
    //.then(sendSms(phoneNumber, 'Thanks for signing up to Tracktion! You are on your way to building healthy habits! Let's start with a picture, send me a selfie!'))
    return user;
  }

  static async addSelfie(id, { userPhotoURL }) {
    return await User.update(id, { userPhotoURL });
  }

  static async handleSelfie({ phoneNumber, userPhotoURL }) {
    User.findByPhoneNumber(phoneNumber)
      .update(phoneNumber, userPhotoURL)
    //.then(sendSms(phoneNumber, 'Looking good! Now send a pic of an object you want to associate with your habit...like sneakers for running.'))
  }

  //   static async authorize({ phone_number }) {
  //     try {
  //       const user = await User.findByPhoneNumber(phone_number);

  //       const numbersMatch = await bcrypt.compare(phone_number, user.numberHash);
  //       if(!numbersMatch) throw new Error('Would you like to sign up?');

  //       return user;
  //     } catch(err) {
  //       err.status = 401;
  //       throw err;
  //     }
  //   }
};
