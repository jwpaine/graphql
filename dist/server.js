"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const resolvers_1 = require("./resolvers");
// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
    foo: String
    domainMetadata(domain: String!): Metadata
  }

  type Metadata {
    siteName: String
    foo: String
  }
`;
// Merging all domain resolvers into a single set of resolvers
const mergedResolvers = {
    Query: {
        domainMetadata: (_, { domain }) => resolvers_1.resolversData[domain]?.metadata || null,
    },
};
for (const domain in resolvers_1.resolversData) {
    mergedResolvers.Query = {
        ...mergedResolvers.Query,
        ...resolvers_1.resolversData[domain].resolvers.Query,
    };
}
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
// Set up Apollo Server
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers: mergedResolvers,
    plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
});
(async () => {
    await server.start();
    app.use((0, cors_1.default)(), body_parser_1.default.json(), (0, express4_1.expressMiddleware)(server));
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, () => resolve()));
    console.log(`🚀 Server ready at http://localhost:4000`);
})();
