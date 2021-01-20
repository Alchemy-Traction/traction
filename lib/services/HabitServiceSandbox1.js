// habit item photo
// label confirmation 
const Habit = require('../models/Habit');
const detectLabels = require('../utils/aws-utils/detectLabels');
const handleURL = require('../utils/aws-utils/handleUrl');
// const labels = require('../data/labels.json');
// const itemPhoto = require('../data/photoUrl.json');
const itemPhoto = 'https://cdn.shopify.com/s/files/1/0052/5467/6593/articles/Is-Juice-and-Juicing-Really-That-Good-For-You_1c3859e4-b2ea-499a-8943-b14d411b8386_700x.jpg';

// handleURL(itemPhoto, (err, data) => {
//   if(err) {
//     throw new Error(err);
//   }
// });

detectLabels(itemPhoto)
  .then(console.log)
  .catch(console.error);

// module.exports = class HabitService {
//     static async (itemPhoto) {
//         const labels = await detectLabels(itemPhoto);

//         console.log(labels);
//         return labels;
//     }

// }
