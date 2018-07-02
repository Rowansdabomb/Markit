const jwt = require('jsonwebtoken');
const secrets = require('./secrets')

let helpers = {}

helpers.generateToken = (user) => {
  const u = {
   name: user.name,
   email: user.email,
   _id: user._id.toString(),
  };

  return token = jwt.sign(u, secrets.jwtsecret, {
     expiresIn: 60 * 60 * 24 // expires in 24 hours
  });
}

helpers.errorObj = obj => {
  return new Error(JSON.stringify(obj));
}


module.exports = helpers;