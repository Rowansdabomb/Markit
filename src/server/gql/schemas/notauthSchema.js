const schema = `
  input notUserData {
    email: String
    password: String
    name: String
  }

  type notUser {
    email: String
    password: String
    name: String
  }

  type notQuery {
    hello: String
  }

  type notMutation {
    createUser(input: UserData): User
    loginUser(input: UserData): User
  }
`;

module.exports = schema;