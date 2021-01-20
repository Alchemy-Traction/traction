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

  static async insert(habit) {
    const { rows } = await pool.query(
      'INSERT INTO habits (id, prompt, label, reminder_type, reminder_time, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [habit.prompt, habit.label, habit.reminderType, habit.reminderTime, habit.userId]
    );
    return new Habit(rows[0]);
  }

  static async findHabitById(id) {
    const { rows } = await pool.query(
      `SELECT 
        users.*,
        habits.*
      FROM habits
      JOIN users
      ON users.id=habits.user_id
      WHERE id=$1`,
      [id]
    );
    return new Habit(rows[0]);
  }

  static async findHabitByReminderTime(reminderTime) {
    const { rows } = await pool.query(
      `SELECT  
        habits.*,
        users.*
      FROM habits
      JOIN users
      ON users.id=habits.user_id 
      JOIN notifications
      ON notifications.id=habits.user_id
      WHERE reminder_time > NOW()-5
      AND reminder_time < NOW() + 5`,
      [reminderTime]
    );
    return new Habit(rows[0]);
  }

  static async updateLabel(userId, label) {
    const { rows } = await pool.query(
      `UPDATE habits 
        SET label=$1 
        WHERE user_id=$2 
        RETURNING *`,
      [label, userId]
    );
    return new Habit(rows[0]);
  }

  static async findLabelsbyUserId(userId, label) {
    const { rows } = await pool.query(
      `SELECT * 
        FROM habits 
        WHERE user_id = $1
        AND label IN $2
        LIMIT 1
        `
      [userId, label]
    )
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
};
