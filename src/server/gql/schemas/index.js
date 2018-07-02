/*
 * This file produces a single graphql schema.
 * All imported schemas must be template literals or strings. 
 */

const { buildSchema } = require('graphql');

const auth = require('./authenticationSchema');
const notauth = require('./notauthSchema.js');

const schema = buildSchema(auth + notauth);

module.exports = schema;
