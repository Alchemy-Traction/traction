const pool = require('../utils/pool');

module.exports = class User {
  id;
  phoneNumber;
  pin;
  password;
  passwordHash;
  userPhotoURL;

  constructor(row) {
    this.id = String(row.id);
    this.phoneNumber = row.phone_number;
    this.pin = row.pin;
    this.password = row.password;
    this.passwordHash = row.password_hash;
    this.userPhotoURL = row.user_photo_url;
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
    if (!rows[0]) {
      return false;
    }
    return new User(rows[0]);
  }

  static async updateSelfie(id, userPhotoURL) {
    const { rows } = await pool.query(
      `UPDATE users
             SET user_photo_url=$1
             WHERE id=$2
             RETURNING *`,
      [userPhotoURL, id]
    );
    console.log(rows[0]);
    return new User(rows[0]);
  }

  static async getSelfieByUserId(id) {
    const { rows } = await pool.query(
      `SELECT user_photo_url
      FROM users
      WHERE id=$1`,
      [id]
    );
    return new User(rows[0]);
  }

  static async delete({ phoneNumber }) {
    const { rows } = await pool.query(
      'DELETE FROM users WHERE phone_number=$1 RETURNING *',
      [phoneNumber]
    );
    if (!rows[0]) {
      throw new Error(`no users with phone number ${phoneNumber}.`);
    }
    return new User(rows[0]);
  }

  toJSON() {
    const json = { ...this };
    delete json.passwordHash;
    delete json.userPhotoURL;
    return json;
  }
};
