const Habit = require('../models/Habit2');

module.exports = class HabitService {


        return await Habit.updateTime(id, time);
    }

    static async addPrompt(id, prompt) {
        return await Habit.updatePrompt(id, prompt);
    }
}
