const pool = require('../utils/pool');

module.exports = class Log {
    id;
    reminderSent;
    response;
    responseSent;
    habitImageUrl;
    matchedLabel;
    responseMessage;
    habitId;
    
    constructor(row) {
      this.id = String(row.id);
      this.reminderSent = row.reminder_sent;
      this.response = row.response;
      this.responseSent = row.response_sent;
      this.habitImageUrl = row.habit_image_url;
      this.matchedLabel = row.matched_label;
      this.responseMessage = row.response_message;
      this.habitId = row.habit_id;
    }

    static async insert(userId, habitId, habitImageUrl) {
      const { rows } = await pool.query(
        `INSERT INTO habit_logs (habit_image_url, user_id, habit_id) VALUES ($1, $2, $3) 
        RETURNING *`,
        [habitImageUrl, userId, habitId]
      );
      return new Log(rows[0]);
    }
};
