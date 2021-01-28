require('dotenv').config();

const path = require('path');
const express = require('express');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const { UserAPI, StockAPI, PortfolioAPI } = require('./datasources');
const resolvers = require('./resolvers');
const { decodeToken } = require('./utils');
const PORT = process.env.PORT || 8080;

const store = createStore();

const dataSources = () => ({
    UserAPI: new UserAPI({ store }),
    StockAPI: new StockAPI(),
    PortfolioAPI: new PortfolioAPI({ store })
});

const context = async({ req }) => {
    if (!req.headers || !req.headers.authorization || !req.headers.authorization.length
         || req.headers.authorization === 'null' || req.headers.authorization === 'undefined') {
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

if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackConfig = require(path.resolve(__dirname, '..', 'client', 'webpack.dev.js'));
    const compiler = webpack(webpackConfig);
    const publicPath = process.env.DOCKER ? `http://${process.env.HOST}/` : webpackConfig.output.publicPath;
    app.use(require("webpack-dev-middleware")(compiler, { publicPath }));
    app.use(require('webpack-hot-middleware')(compiler));
}


server.applyMiddleware({ app });

app.use(express.static(path.join(__dirname, '..', 'client','public')));

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
});

if (process.env.NODE_ENV === 'test') {
    module.exports = server;
}
else {
    app.listen(PORT, () => {
        console.log('server ready at', PORT);
    });
}


