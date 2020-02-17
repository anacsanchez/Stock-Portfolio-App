const db = require('./db');

const createStore = () => {
  return { db };
};

module.exports = createStore;
