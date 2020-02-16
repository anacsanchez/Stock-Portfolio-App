require('dotenv');

const { DB_HOST, DB_PASS, DB_USER, DB_NAME } = process.env;

module.exports = {
  test: {
    url: `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}_test`,
    dialect: "mysql"
  }
};
