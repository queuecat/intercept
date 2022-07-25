const requestMap = {};

const hasKey = (key) => {
  return requestMap[key]
}

const setMap = (key, value) => {
  requestMap[key] = value
};
const clearMap = (key) => {
  if (requestMap[key]) {
    delete requestMap[key]
  }
};

module.exports = {
  setMap,
  clearMap,
  hasKey
};
