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
      symbol: stock.symbol,
      companyName: stock.companyName,
      price: stock.latestPrice ? stock.latestPrice : stock.previousClose
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

  async getStocks(symbols) {
    try {
      const response = await this.get(`stock/market/batch`, { symbols: symbols.join(), types: "quote" });
      const stocks = Object.keys(response).map((symbol) => this.stockReducer(response[symbol].quote));
      return { stocks, success: true, message: ''};
    } catch(err) {
      console.log("Error", err);
      const { body } = err.extensions.response;
      return { stocks: null, success: false, message: body };
    }
  }

  async mapCurrentPricesToStocks(stocks) {
    try {
      const stocksBySymbolsObj = stocks.reduce((stocksObj, currStock) => ({ [currStock.symbol]: currStock, ...stocksObj }), {});
      const symbolsArr = Object.keys(stocksBySymbolsObj);
      const response = await this.get(`stock/market/batch`, { symbols: symbolsArr.join(), types: "quote" });
      const stocksWithCurrentPrices = symbolsArr.map(symbol => {
        const stockFromAPI = this.stockReducer(response[symbol.toUpperCase()].quote);
        stocksBySymbolsObj[symbol].setDataValue('currentUnitPrice', stockFromAPI.price);
        return stocksBySymbolsObj[symbol].get();
      });
      return { stocks: stocksWithCurrentPrices, success: true, message: ''};
    } catch(err) {
      console.log("Error", err);
      const { body } = err.extensions.response;
      return { stocks: null, success: false, message: body };
    }
  }
}

module.exports = StockAPI;
