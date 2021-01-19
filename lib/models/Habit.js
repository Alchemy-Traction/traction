const pool = require('../utils/pool');
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

    static async update( id, {prompt, label, reminderTime, reminderType}) {
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
        )
        if(!rows[0]) {
            throw new Error(`no habit with that that id exist`)
        }
        return new Habit(row[0]);
    }
}