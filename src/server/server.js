// Express
const express = require('express');
const app = express();

// JSON Web Tokens
const jwt = require('express-jwt');
const secrets = require('./secrets')

// Mongodb
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/markit';

// Graphql
const graphqlHTTP = require('express-graphql');
const root = require('./gql/resolvers/index.js');
const schema = require('./gql/schemas/index.js');

// Setup static file
app.use(express.static('dist'));

// Graphql Root resolver
app.use('/api', 
  jwt({secret: secrets.jwtsecret, credentialsRequired: false}), 
  graphqlHTTP(async (req) => ({
    schema: schema,
    rootValue: await root,
    context: {
      user: req.user
    },
    graphiql: true,
  }))
);

// Send template html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

// ====MONGOOSE CONNECT===//
mongoose.connect(url, function(err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', url);
  }
});

app.listen(8080, () => console.log('Listening on port 8080!'));
