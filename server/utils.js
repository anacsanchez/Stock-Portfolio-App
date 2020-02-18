const db = require('./db');

const { models } = db;

const createStore = () => {
  return { db, models };
};

module.exports = {
  createStore
};
