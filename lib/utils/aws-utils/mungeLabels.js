function mungeLabels(array) {

  const outputArray = [];
  array.Labels.map(item => {
    outputArray.push(item.Name);
  }).slice(0, 10);

  return outputArray;
}

module.exports = mungeLabels;
