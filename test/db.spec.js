require('dotenv').config();

const db  = require('../server/db');

before('before db test', async function() {
  try {
    await db.sync({ force: true });
    console.log(`Database ${process.env.DB_NAME} synced successfully`);
  } catch (err) {
    throw new Error(err);
  }
});

describe('db', function() {
  it('connects and syncs to test database successfully', function() {});
});

after('after db test', async function() {
  try {
    await db.close();
    console.log(`Connection to database ${process.env.DB_NAME} closed successfully`);
  } catch(err) {
    throw new Error(err);
  }
});
