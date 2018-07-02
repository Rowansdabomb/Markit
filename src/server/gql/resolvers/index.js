const {verifyUser, createUser, loginUser} = require('./authenticationResolvers.js');

const root = {
  verifyUser: verifyUser,
  createUser: createUser,
  loginUser: loginUser
};

module.exports = root;