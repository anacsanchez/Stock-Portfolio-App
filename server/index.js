require('../config/config.js');

const path = require('path');
const express = require('express');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const { UserAPI, StockAPI, PortfolioAPI } = require('./datasources');
const resolvers = require('./resolvers');
const { decodeToken } = require('./utils');
const PORT = process.env.PORT || 7000;

const store = createStore();

const { SERVICE_URI } = process.env;

const dataSources = () => ({
  UserAPI: new UserAPI({ store }),
  StockAPI: new StockAPI(),
  PortfolioAPI: new PortfolioAPI({ store })
});

const context = async({ req }) => {
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

const app = express();

server.applyMiddleware({
  app,
  path: SERVICE_URI ? `${SERVICE_URI}/graphql` : '/graphql'
});

if(SERVICE_URI) {
  app.use(SERVICE_URI, express.static(path.join(__dirname, '..', 'client','public')));
}
else {
  app.use(express.static(path.join(__dirname, '..', 'client','public')));
}

app.use(
  SERVICE_URI ? SERVICE_URI : '*',
  (req, res) => {
  const options = {
    root: path.join(__dirname, '..','client','public')
  };
  res.sendFile('index.html', options);
});

if(process.env.NODE_ENV == 'test') {
  module.exports = server;
}
else {
  app.listen(PORT, () => {
    console.log('server ready at', PORT);
  });
}


