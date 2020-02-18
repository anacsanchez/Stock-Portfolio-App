const { RESTDataSource } = require('apollo-datasource-rest');

class UserAPI extends RESTDataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  // initialize(config) {
  //   this.context = config.context;
  // }

  async signupUser(userInput) {
    const { models } = this.store;
    try {
      const { userInstance, wasCreated  } = await models.user.findOrCreate({
        where: { email: userInput.email },
        defaults: { ...userInput },
        include: [ models.portfolio ]
      })
      .spread((user,created) => ({ userInstance: user, wasCreated: created }));

      if(wasCreated) {
        await userInstance.createPortfolio({ balance: 5000.00 });
        await userInstance.reload({ include: [ models.portfolio ]});
      }
      return userInstance;
    } catch(err) {
      throw new Error(err);
    }
  }
}

module.exports = UserAPI;
