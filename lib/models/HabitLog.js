const pool = require('../utils/pool');
const Habit = require('./Habit');

module.exports = class HabitLog {
    id;
    habitImageURL;
    matchedLabel;
    habitId;

    constructor(row) {
        this.id = String(row.id);
        this.habitImageURL = row.habit_image_url;
        this.matchedLabel = row.matched_label;
        this.habitId = row.habit_id;
    }

    static async insert(log) {
        const { rows } = await pool.query(
            `INSERT INTO habit_logs (habit_image_url, matched_label, habit_id) 
            VALUES ($1, $2, $3) 
            JOIN habits 
                ON habits.id = habit_id.id
            RETURNING *`,
            [log.habitImageURL, log.matchedLabel, log.habitId]
        );
        return new HabitLog(rows[0]);
    }
}
