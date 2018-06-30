const { buildSchema } = require('graphql');

const authSchema = buildSchema(`
  type Query {
    hello: String
  },

  type Mutation {
    SIGNUP(email: String!, password: String!, name: String!): User
  },

  type User {
    id: Int
    email: String
    password: String
    name: String
  }
`);