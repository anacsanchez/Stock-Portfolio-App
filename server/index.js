require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const { UserAPI } = require('./datasources');
const resolvers = require('./resolvers');

const store = createStore();

const dataSources = () => ({
  UserAPI: new UserAPI({ store })
});

const server = new ApolloServer({
  typeDefs,
  dataSources,
  resolvers
});



server.listen().then(({ url }) => {
  console.log('server ready at', url)
});
