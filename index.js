// External Dependencies
const fs = require("fs");
const { ApolloServer, gql } = require("apollo-server");

// Internal Dependencies
const typeDefs = gql(fs.readFileSync("./users.graphql", 'utf8'));
const users = require("./data/users.js");

// Variable Definitions
const port = process.env.PORT || 4003
// inserting comment for test deploy.

const resolvers = {
    User: {
        __resolveReference(object) {
            return users.find((user) => user.id === parseInt(object.id, 10));
        },
    },
    Query: {
        user(_, { id }) {
            return users.find((user) => user.id === parseInt(id, 10));
        },
        users() {
            return users
        }
    }
};

// Apollo Server Setup
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
  
server.listen().then(() => {
    console.log(`
        🚀  Server is running!
        🔉  Listening on port 4000
        📭  Query at https://studio.apollographql.com/dev
    `);
});