// External Dependencies
const fs = require("fs");
const { ApolloServer, gql } = require("apollo-server");
const { buildSubgraphSchema } = require("@apollo/federation")

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
    mocks
    // schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});
  
server.listen({ port }).then(({ url }) => {
    console.log(`Users service ready at ${url}`);
});
