require('dotenv').config();

const { ApolloServer, AuthenticationError } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const { UserAPI, StockAPI, PortfolioAPI } = require('./datasources');
const resolvers = require('./resolvers');
const { decodeToken } = require('./utils');

const store = createStore();

const dataSources = () => ({
  UserAPI: new UserAPI({ store }),
  StockAPI: new StockAPI(),
  PortfolioAPI: new PortfolioAPI({ store })
});

const context = async({ req }) => {
  const auth = (req.headers && req.headers.authorization) || '';

  if(!auth) return { user: null };

  try {
    const { id } = await decodeToken(auth);
    const { models } = store;
    const user = await models.user.findByPk(id, {
      include: [ models.portfolio ],
      attributes: { exclude: ['password']}
    });
    return user ? { user } : { user: null };

  } catch(err) {
    throw new AuthenticationError(err);
  }
};

const server = new ApolloServer({
  typeDefs,
  dataSources,
  resolvers,
  context
});

if(process.env.NODE_ENV == 'test') {
  module.exports = server;
}
else {
  server.listen().then(({ url }) => {
    console.log('server ready at', url);
  });
}


