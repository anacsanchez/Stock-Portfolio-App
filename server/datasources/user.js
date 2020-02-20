const { RESTDataSource } = require('apollo-datasource-rest');
const { AuthenticationError } = require('apollo-server');
const { generateToken, verifyPassword } = require('../utils');

class UserAPI extends RESTDataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async loginUser(userInput) {
    if(!this.context.user) {
      try {
        const { models } = this.store;
        const foundUser = await models.user.findOne({
          where: { email: userInput.email }, include: [ models.portfolio ]
        });
        if(!foundUser) {
          throw new AuthenticationError('User not found with provided email address');
        }
        const isVerified = await verifyPassword(userInput.password, foundUser.password);
        if(!isVerified) {
          throw new AuthenticationError('Password input does not match user password');
        }
        const token = await generateToken(foundUser.email, foundUser.id);
        return { user: foundUser, token, success: true, message: '' };
      } catch(err) {
        console.log('Error', err);
        return { user: null, token: '', success: false, message: err} ;
      }
    }
    else {
      return { user: this.context.user, token: this.context.auth, success: true, message: '' };
    }
  }

  async signupUser(userInput) {
    const { models } = this.store;
    try {
      const userExists = await models.user.findOne({
        where: { email: userInput.email }, include: [ models.portfolio ]
      });
      if(userExists && userExists.email) {
        throw new AuthenticationError('User already exists with input email address');
      }
      const newUser = await models.user.create({
        ...userInput,
        portfolio: {
          balance: 5000.00
        }
      }, {  include: [ models.portfolio ]});
      const token = await generateToken(newUser.email, newUser.id);
      return { user: newUser, token };
    } catch(err) {
      console.log('Error', err);
      return { user: null, token: ''}
    }
  }
}

module.exports = UserAPI;
