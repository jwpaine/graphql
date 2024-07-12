import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { resolversData } from './resolvers';

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
    domainMetadata: (_: unknown, { domain }: { domain: string }) => resolversData[domain]?.metadata || null,
  },
};

for (const domain in resolversData) {
  mergedResolvers.Query = {
    ...mergedResolvers.Query,
    ...resolversData[domain].resolvers.Query,
  };
}

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

(async () => {
  await server.start();

  app.use(
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, () => resolve()));
  console.log(`🚀 Server ready at http://localhost:4000`);
})();
