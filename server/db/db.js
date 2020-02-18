const { Sequelize } = require('sequelize');

const { DB_HOST, DB_PASS, DB_USER, DB_NAME } = process.env;

//initialize database
const db = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`);

//first test if connection is successful
db.authenticate()
.then(() => {
  console.log(`Connection to ${DB_NAME} authenticated successfully`);
})
.catch(err => console.error(err));

// db.sync({ force: true })
// .then(() => {
//   console.log('database synced')
// })
// .catch( err => console.error(err))

module.exports = db;
