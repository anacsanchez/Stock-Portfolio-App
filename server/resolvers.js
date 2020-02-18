module.exports = {
  Mutation: {
    signup: async(_, { input: userInput }, { dataSources }) => {
      const newUser = await dataSources.UserAPI.signupUser(userInput);
      return newUser;
    }
  }
}
