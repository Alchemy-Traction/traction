const pool = require('../utils/pool');

module.exports = class User {
  id;
  phoneNumber;
  pin;
  password;
  passwordHash;
  userPhotoUrl;

  constructor(row) {
    this.id = String(row.id);
    this.phoneNumber = row.phone_number;
    this.pin = row.pin;
    this.password = row.password;
    this.passwordHash = row.password_hash;
    this.userPhotoUrl = row.user_photo_url;
  }

  static async insert(phoneNumber) {
    const { rows } = await pool.query(
      'INSERT INTO users (phone_number) VALUES ($1) RETURNING *',
      [phoneNumber]
    );
    return new User(rows[0]);
  }

  static async findByPhoneNumber(phoneNumber) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE phone_number=$1',
      [phoneNumber]
    );
    if(!rows[0]) {
      return false;
    }
    return new User(rows[0]);
  }

  static async updateSelfie(id, userPhotoUrl) {
    const { rows } = await pool.query(
      `UPDATE users
             SET user_photo_url=$1
             WHERE id=$2
             RETURNING *`,
      [userPhotoUrl, id]
    );
    return new User(rows[0]);
  }

  static async delete({ phoneNumber }) {
    const { rows } = await pool.query(
      'DELETE FROM users WHERE phone_number=$1 RETURNING *',
      [phoneNumber]
    );
    if(!rows[0]) {
      throw new Error(`no users with phone number ${phoneNumber}.`);
    }
    return new User(rows[0]);
  }

  toJSON() {
    const json = { ...this };
    delete json.passwordHash;
    delete json.userPhotoUrl;
    return json;
  }
};
