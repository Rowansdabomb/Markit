const schema = `
  input UserData {
    email: String
    password: String
    name: String
  }

  type User {
    id: ID
    email: String
    password: String
    name: String
    token: String
  }

  type Query {
    verifyUser: User
  }

  type Mutation {
    createUser(input: UserData): User
    loginUser(input: UserData): User
  }
`;

module.exports = schema;