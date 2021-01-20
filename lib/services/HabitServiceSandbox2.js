const Habit = require('../models/Habit2');

module.exports = class HabitService {

    static async addTime(id, time) {

        // if (time.substr(2, 1) === ':') {
        //     if (!time.match(/^\d\d:\d\d/)) {
        //         return "Invalid Format";
        //     }
        //     else if (parseInt(time.substr(0, 2)) >= 24 || parseInt(time.substr(3, 2)) >= 60) {
        //         return "Invalid Format";
        //     }
        //     else {
        //         return false;
        //     }

        // }
        // else {
        //     return "Invalid Format";
        // }

        return await Habit.updateTime(id, time);
    }

    static async addPrompt(id, prompt) {
        return await Habit.updatePrompt(id, prompt);
    }
}
