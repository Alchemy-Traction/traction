const pool = require('../utils/pool');

module.exports = class Habit {
  id;
  prompt;
  label;
  reminderType;
  reminderTime;
  userId;

  constructor(row) {
    this.id = String(row.id);
    this.prompt = row.prompt;
    this.label = row.label;
    this.reminderType = row.reminder_type;
    this.reminderTime = row.reminder_time;
    this.userId = row.user_id;
  }

  static async insertHabit(userId) {
    const { rows } = await pool.query(
      'INSERT INTO habits (user_id) VALUES ($1) RETURNING *',
      [userId]
    );
    return new Habit(rows[0]);
  }

  static async findLatestHabit() {
    const { rows } = await pool.query(
      'SELECT * FROM habits',
    );
    return new Habit(rows[0]);
  }

  static async findHabitByUser(userId) {
    const { rows } = await pool.query(
      `SELECT 
        users.*,
        habits.*
      FROM habits
      JOIN users
      ON users.id=habits.user_id
      WHERE user_id=$1`,
      [userId]
    );
    if(!rows[0]) {
      return false;
    } return new Habit(rows[0]);
  }

  static async findHabitByReminderTime() {
    const { rows } = await pool.query(
      `SELECT  
        habits.*,
        users.*
      FROM habits
      JOIN users
      ON users.id=habits.user_id 
      WHERE reminder_time > LOCALTIME -INTERVAL '5 MINUTES'
      AND reminder_time < LOCALTIME +INTERVAL '5 MINUTES';`,
    );
    return rows;
  }

  static async updateLabel(userId, label) {
    const { rows } = await pool.query(
      'UPDATE habits SET label=$1 WHERE user_id=$2 RETURNING *',
      [label, userId]
    );
    return new Habit(rows[0]);
  }

  static async confirmLabelsbyUserId(userId, label) {
    const { rows } = await pool.query(
      `SELECT * 
        FROM habits 
        WHERE user_id = $1
        AND label IN $2
        LIMIT 1`,
      [userId, label]
    );
    return new Habit(rows[0]);
  }

  static async updateTime(userId, reminderTime) {
    const { rows } = await pool.query(
      'UPDATE habits SET reminder_time=$1 WHERE user_id=$2 RETURNING *',
      [reminderTime, userId]
    );
    return new Habit(rows[0]);
  }

  static async updatePrompt(userId, prompt) {
    const { rows } = await pool.query(
      'UPDATE habits SET prompt=$1 WHERE user_id=$2 RETURNING *',
      [prompt, userId]
    );
    return new Habit(rows[0]);
  }
}
