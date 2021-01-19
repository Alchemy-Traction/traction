const pool = require('../utils/pool');

modeule.exports = class User {
    id;
    phoneNumber;
    // phoneNumberHash;
    password;
    passwordHash;
    userPhotoURL;

    constructor(row) {
        this.id = String(row.id);
        this.phoneNumber = row.phone_number;
        // this.phoneNumberHash = row.phone_number_hash;
        this.password = row.password;
        this.passwordHash = row.password_hash;
        this.userPhotoURL = row.user_photo_url;
    }

    static async insert(user) {
        const { rows } = await pool.query(
            'INSERT INTO users (phone_number, password, password_hash, user_photo_url) VALUES ($1, $2, $3, $4) RETURNING *',
            [user.phoneNumber, user.password, user.passwordHash, user.userPhotoURL]
        );
        return new User(rows[0]);
    }

    static async findByPhoneNmber(phoneNumber) {
        const { rows } = await pool.query(
            'SELECT * FROM users WHERE phone_number=$1',
            [phoneNumber]
        );
        // if (!rows[0])...add as new user?
        return new User(rows[0]);
    }

    toJSON() {
        const json = { ...this };
        delete json.passwordHash;
        delete json.userPhotoURL;
        return json;
    }
}
