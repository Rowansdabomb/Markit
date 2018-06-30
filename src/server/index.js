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


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text({ type: 'application/json' }));
// app.use(bodyParser.json());


//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
// store: new MongoStore({   mongooseConnection: db })
}));

// // Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   },

//   type Mutation {
//     signup(email: String!, password: String!, name: String!): User
//   },

//   type User {
//     id: Int
//     email: String
//     password: String
//     name: String
//   }
// `);


// var SIGNUP = ({email, password, name}) => {
//   console.log('SIGNUP')
//   var userData = {
//     email: email,
//     username: name,
//     password: password
//   }
//   User.create(userData, function(error, user) {
//     if (error) {
//       console.log(error);
//     } else {
//       req.session.userId = user._id;
//       return user
//     }
//   });
// }

// // The root provides a resolver function for each API endpoint
// var root = (request) => ({
//   hello: () => {
//     return request.data;
//   },
//   signup: () => {
//     // SIGNUP
//     return 'name';
//   },
// });

// app.use('/api', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
// }));


// Construct a schema, using GraphQL schema language
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
  }
`);

// Maps username to content
var fakeDatabase = {};

var root = {
  hello: () => {
    return 'hello'
  },
  createUser: function ({input}) {
    // Create a random id for our "database".
    console.log(input.name)
    console.log(input)
    
    
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
