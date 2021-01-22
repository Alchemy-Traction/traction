function timeFormatChecker(time) {

  if(time.substr(2, 1) === ':') {
    if(!time.match(/^\d\d:\d\d/)) {
      return false;
    }
    else if(parseInt(time.substr(0, 2)) >= 24 || parseInt(time.substr(3, 2)) >= 60) {
      return false;
    }
    else {
      return true;
    }
  }
  else {
    return false;
  }
}

module.exports = timeFormatChecker;
