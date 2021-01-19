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
}
