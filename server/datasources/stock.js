const { RESTDataSource } = require('apollo-datasource-rest');

class StockAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://sandbox.iexapis.com/stable';
  }

  willSendRequest(request) {
    request.params.set('token', process.env.PRICING_API_TOKEN);
  }

  stockReducer(stock) {
    return {
      company: {
        name: stock.companyName,
        symbol: stock.symbol
      },
      price: stock.latestPrice ? stock.latestPrice : stock.previousClose
    };
  }

  async getStock(symbol) {
    const response = await this.get(`stock/${symbol}/quote`);
    console.log(response);
    // return this.stockReducer(stock);
  }
}

module.exports = StockAPI;
