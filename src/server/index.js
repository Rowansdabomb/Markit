const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');

const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/markit';
const User = require('./models/user.js');

const app = express();

// const schema = require('./schemas/index.js');

app.use(express.static('dist'));

//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
// store: new MongoStore({   mongooseConnection: db })
}));

var SIGNUP = ({email, password, name}) => {
  console.log('SIGNUP')
  var userData = {
    email: email,
    username: name,
    password: password
  }
  User.create(userData, function(error, user) {
    if (error) {
      console.log(error);
    } else {
      req.session.userId = user._id;
      return user
    }
  });
}

var schema = buildSchema(`
  input UserData {
    email: String
    password: String
    name: String
  }

  type User {
    email: String
    password: String
    name: String
  }

  type Query {
    hello: String
  }

  type Mutation {
    createUser(input: UserData): User
    loginUser(input: UserData): User
  }
`);

var root = {
  hello: () => {
    return 'hello'
  },
  createUser: ({input}) => {
    console.log(input)
    
    const userData = {
      email: input.email,
      name: input.name,
      password: input.password
    }
    User.create(userData, (error, user) => {
      if (error) {
        console.log(error);
        if (error.code === 11000) {
          console.log('duplicate');
          return res.send('duplicate');

        } else {
          return res.send(error);
        }
      }
    });
    return input;
  },
  loginUser: ({input}) => {
    console.log(input)
    
    const userData = {
      email: input.email,
      password: input.password
    }
    User.authenticate(userData, (error, user) => {
      console.log('auth')
      if (error || !user) {
        console.log('error: ' + user);
        return
      } else {
        console.log(user, 'login success')
        // req.session.userId = user._id;
        return 
      }
    });

    return input;
  },
};


app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

//==========================// ====MONGOOSE CONNECT===//
mongoose.connect(url, function(err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
  }
});

// app.post('/api/auth', (req, res) => res.send({ username: os.userInfo().username }));
app.listen(8080, () => console.log('Listening on port 8080!'));
