require('dotenv').config();

process.env.DB_NAME = process.env.TEST_DB_NAME;

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
  it('creates a user with a portfolio', async function() {
    const userInput = { email: "testingmuch@test.com", password:"should be a better password"}
    const { userInstance, wasCreated  } = await db.models.user.findOrCreate({
      where: {
        email: userInput.email
      },
      defaults: { ...userInput },
      include: [ db.models.portfolio ]
    })
    .spread((user,created) => ({ userInstance: user, wasCreated: created }));

    if(wasCreated) {
      await userInstance.createPortfolio({ balance: 5000.00 });
      await userInstance.reload({ include: [ db.models.portfolio ]});
    }
    return userInstance;

  });
});

after('after db test', async function() {
  try {
    await db.close();
    console.log(`Connection to database ${process.env.DB_NAME} closed successfully`);
  } catch(err) {
    throw new Error(err);
  }
});
