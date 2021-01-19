// habit item photo
// label confirmation 
const Habit = require('../models/Habit');
const detectLabels = require('../utils/aws-utils/detectLabels');
// const labels = require('../data/labels.json');
const itemPhoto = require('../data/photoUrl.json');

const labels = detectLabels(itemPhoto)
    console.log(labels);

// module.exports = class HabitService {
//     static async (itemPhoto) {
//         const labels = await detectLabels(itemPhoto);

//         console.log(labels);
//         return labels;
//     }

// }
