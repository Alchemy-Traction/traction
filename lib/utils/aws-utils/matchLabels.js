const matchLabels = async (habitLabel, detectedLabels) => {
    const passes = (element) => element === habitLabel;
    return detectedLabels.some(passes);
}

module.export = matchLabels;
