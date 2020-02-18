const { RESTDataSource } = require('apollo-datasource-rest');
const { UserInputError } = require('apollo-server');

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
      price: stock.latestPrice ? stock.latestPrice : stock.previousClose,
    };
  }

  //TODO: Switch to class Error methods, such as didReceiveError
  async getStock(symbol) {
    try {
      const response = await this.get(`stock/${symbol}/quote`);
      const stock = this.stockReducer(response);
      return { stock, success: true, message: ''};
    } catch(err) {
      console.log("Error", err);
      const { body } = err.extensions.response;
      return { stock: null, success: false, message: body };
    }
  }
}

module.exports = StockAPI;
