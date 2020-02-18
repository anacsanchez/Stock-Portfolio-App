const { RESTDataSource } = require('apollo-datasource-rest');
const { ForbiddenError } = require('apollo-server');

class PortfolioAPI extends RESTDataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
    if(this.context.user) {
      throw new ForbiddenError('User must be logged in');
    }
  }

  async getPortfolio() {
    return this.context.user.portfolio;
  }

}

module.exports = PortfolioAPI;
