export const typeDefs = 
` type User {
    id: ID
    name: String
    location: String
    email: String!
    password: String!
  }

  type Mutation {

  }

  type Query {
    user {
      name
      email
      location
    }
  }
`;
