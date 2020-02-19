require('dotenv').config();
const request = require('supertest');
const app = require('../server/index');

process.env.DB_NAME = process.env.TEST_DB_NAME;

const db  = require('../server/db');

before('before server test', async function() {
  try {
    await db.sync({ force: true });
    console.log(`Database ${process.env.DB_NAME} synced successfully`);
  } catch (err) {
    throw new Error(err);
  }
});

xdescribe('functionality', function() {
  it("receives the active server", function() {
    request(app)
    .get('/')
    .send(`query getStock($symbol:String!) {
      getStock(symbol: $symbol) {
        stock {
          price
        }
        success
        message
      }
    }`)
    .expect(res => console.log(res))
  });
});

after('after server test', async function() {
  try {
    await db.close();
    console.log(`Connection to database ${process.env.DB_NAME} closed successfully`);
  } catch(err) {
    throw new Error(err);
  }
});
