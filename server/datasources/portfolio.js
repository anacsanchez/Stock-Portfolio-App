const { RESTDataSource } = require('apollo-datasource-rest');

class PortfolioAPI extends RESTDataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getPortfolio() {
    await this.context.user.portfolio.reload({ include: [ { model: this.store.models.user_stock, as: 'userStocks'} ] });
    return this.context.user.portfolio;
  }

  async getPortfolioTransactions() {
    try {
      await this.context.user.portfolio.reload({ include: [this.store.models.transaction ] });
      return { transactions: this.context.user.portfolio.transactions, success: true, message: ''};
    }
    catch(err) {
      return { transactions: null, success: false, message: err };
    }
  }

  async buyStock(transaction) {
    const { symbol, quantity, price,companyName } = transaction;
    const { user: { portfolio } } = this.context;
    if(portfolio.balance < price) {
      return { stock: null, success: false, message: 'Balance is too low to proceed with transaction' };
    }
    await portfolio.reload({ include: [this.store.models.transaction, { model: this.store.models.user_stock, as: 'userStocks'} ]});
    const newTransaction = await portfolio.createTransaction({ symbol, quantity, price, companyName });

    portfolio.balance -= price;
    await portfolio.save();

    const existingStock = await portfolio.getUserStocks({ where: {
      symbol: symbol
    }});

    if(!existingStock.length) {
      const newUserStock = await portfolio.createUserStock({ symbol, shares: quantity, companyName });
      return { stock: newUserStock, success: true, message: '' };
    }
    else {
      existingStock[0].shares += quantity;
      await existingStock[0].save();
      return { stock: existingStock[0], success:true, message: ''};
    }
  }
}

module.exports = PortfolioAPI;
