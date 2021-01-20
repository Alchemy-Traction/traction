function mungeLabels(labels) {
  return labels.Labels.map(item => {
    return {
      body: item.Name
    };
  }).slice(0, 3);
}
module.exports = mungeLabels();
