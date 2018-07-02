const User = require('../../mongoosemodels/user.js');
const helpers = require('../../helpers.js');

const verifyUser = () => {
  console.log('verifyUser', user)
  try {
    if (!user) {
      throw new Error('You are not authenticated!')
    }
  } catch(error) {
    console.log(error)
  }

  return new Promise((resolve) => { 
    resolve(User.findById(user.id))
  })
}

const createUser = ({input}) => {
  const userData = {
    email: input.email,
    name: input.name,
    password: input.password
  }
  return new Promise((resolve) => {
    User.create(userData, (error, user) => {
      if (error) {
        console.log(error);
        if (error.code === 11000) {
          console.log('DUPLICATE SIGNUP');
        }  
        return error;
      } else {
        console.log('SIGNUP')
        const token = helpers.generateToken(user)
        resolve({...userData, id: user._id, name: user.name, token: token})
      }
    });
  })
  // return input;
}

const loginUser = ({input}) => {
  const userData = {
    email: input.email,
    password: input.password
  }
  
  return new Promise((resolve) => {
    User.authenticate(userData, (error, user) => {
      if (error || !user) {
        resolve({ name: error});
        console.log('NO USER')
      } else {
        console.log('LOGIN')
        const token = helpers.generateToken(user)
        resolve({...userData, id: user._id, name: user.name, token: token})
      }
    });
  }) 
}

module.exports = {verifyUser, createUser, loginUser}