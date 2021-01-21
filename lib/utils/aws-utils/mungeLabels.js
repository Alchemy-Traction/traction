function mungeLabels(labels) {
  return labels.Labels.map(item => {
    return {
      body: item.Name
    };
  }).slice(0, 3);
}
<<<<<<< HEAD
module.exports = mungeLabels();
=======
module.exports = mungeLabels;
>>>>>>> 203e16fa137c4a1d91f307dd723024192721db85
