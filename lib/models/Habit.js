const pool = require('../utils/pool');
<<<<<<< HEAD
const { insert } = require('./User');

module.exports = class Habit {
    id;
    prompt;
    label;
    reminder_type;
    reminder_time;
    user_id;


    constructor(row) {
      this.id = row.id;
      this.prompt = row.prompt;
      this.label = row.label;
      this.reminder_type = row.reminderType;
      this.reminder_time = row.reminderTime;
      this.user_id = row.userId;
    }

    static async insert(habit) {
      const { rows } = await pool.query(
        'INSERT INTO habits (prompt, label, reminder_type, reminder_time, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [habit.prompt, habit.label, habit.reminderType, habit.reminderTime, habit.userId]
      );
      return new Habit(rows[0]);
    }

    static async findHabitById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM habits WHERE id=$1',
        [id]
      );
      return new Habit(rows[0]);
    }

    static async update(id, { prompt, label, reminderTime, reminderType }) {
      const { rows } = await pool.query(
        `UPDATE habits
                SET prompt=$1
                    label=$2
                    reminder_time=$3
                    reminder_type=$4
                WHERE id=$5
                RETURNING *`,
      );
      return new Habit(rows[0]);
    }
    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM habits WHERE id=$1 RETURNING *',
        [id]
      );
      if(!rows[0]) {
        throw new Error('no habit with that that id exist');
      }
      return new Habit(row[0]);
    }
}
;
=======

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

  static async insert({ userId }) {
    const { rows } = await pool.query(
      'INSERT INTO habits (user_id) VALUES ($1) RETURNING *',
      [userId]
    );
    return new Habit(rows[0]);
  }

  static async updateLabel(userId, reminderLabel) {
    const { rows } = await pool.query(
      'UPDATE habits SET reminder_label=$1 WHERE user_id=$2 RETURNING *',
      [reminderLabel, userId]
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
};
>>>>>>> 203e16fa137c4a1d91f307dd723024192721db85
