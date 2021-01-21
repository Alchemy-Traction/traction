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

    static async insert({ userId, habitImageUrl }) {
      const { rows } = await pool.query(
        `SELECT * FROM habits
        WHERE user_id = $1
        JOIN habit_logs
        ON habits.id = habit_logs.habit_id
        INSERT INTO habit_logs (habit_image_url) VALUES ($2) RETURNING *`,
        [userId, habitImageUrl]
      );
      return new Log(rows[0]);
    }
}
;
