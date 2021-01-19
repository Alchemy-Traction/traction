const pool = require('../utils/pool');

modeule.exports = class User {
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

    static async insert(user) {
        const { rows } = await pool.query(
            'INSERT INTO users (phone_number, pin, password, password_hash, user_photo_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [user.phoneNumber, user.pin, user.password, user.passwordHash, user.userPhotoURL]
        );
        return new User(rows[0]);
    }

    static async findByPhoneNmber(phoneNumber, pin) {
        const { rows } = await pool.query(
            'SELECT * FROM users WHERE phone_number=$1, pin=$2',
            [phoneNumber, pin]
        );
        // if (!rows[0])...add as new user?
        return new User(rows[0]);
    }

    static async update(id, { phoneNumber, pin, userPhotoURL }) {
        const { rows } = await pool.query(
            `UPDATE users
             SET phone_number=$1,
                pin=$2,
                user_photo_url=$3
             WHERE id=$1
             RETURNING *`,
            [phoneNumber, pin, userPhotoURL, id]
        );
    }

    static async delete(phoneNumber) {
        const { rows } = await pool.query(
            'DELETE FROM users WHERE phone_number=$1 RETURNING *',
            [phoneNumber]
        );
        if (!rows[0]) {
            throw new Error(`no users with phone number ${phoneNumber}.`)
        }
        return new User(rows[0]);
    }

    toJSON() {
        const json = { ...this };
        delete json.passwordHash;
        delete json.userPhotoURL;
        return json;
    }
