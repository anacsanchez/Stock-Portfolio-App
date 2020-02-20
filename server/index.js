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
  console.log(req)
  if(!req.headers || !req.headers.authorization || !req.headers.authorization.length || req.headers.authorization == 'null' || req.headers.authorization == 'undefined') {
    return { user: null };
  }

  const auth = req.headers.authorization;

  try {
    const { id } = await decodeToken(auth);
    const { models } = store;
    const user = await models.user.findByPk(id, {
      include: [ models.portfolio ],
      attributes: { exclude: ['password']}
    });
    return user ? { user, token: auth } : { user: null };

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


