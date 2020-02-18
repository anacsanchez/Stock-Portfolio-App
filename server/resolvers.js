module.exports = {
  Query: {
    me: async(_, __, { user }) => !user ? { user: null, loggedIn: false} : { user, loggedIn: true }
  },
  Mutation: {
    signup: async(_, { input: userInput }, { dataSources }) => {
      const newUser = await dataSources.UserAPI.signupUser(userInput);
      const { user, token } = newUser;
      return { user, token };
    },
    login: async(_, { input: userInput }, { dataSources }) => {
      const currentUser = await dataSources.UserAPI.loginUser(userInput);
      const { user, token } = currentUser;
      return { user, token };
    }
  }
};
