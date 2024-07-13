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
    metadata(domain: String!): Metadata
    theme(domain: String!): Theme
    pageContent(domain: String!, page: String!): PageContent
    ping(domain: String!): String
  }

  type Metadata {
    vid: String
    siteName: String
    title: String
  }

  type Theme {
    colors: Colors
  }

  type Colors {
    primary: String
    secondary: String
  }

  type PageContent {
    title: String
    hero: Hero
    foo: String
  }

  type Hero {
    image: String
  }
`;

// Merging all domain resolvers into a single set of resolvers
const mergedResolvers = {
  Query: {
    metadata: (_: unknown, { domain }: { domain: string }) => resolversData[domain]?.metadata || null,
    theme: (_: unknown, { domain }: { domain: string }) => resolversData[domain]?.theme || null,
    pageContent: (_: unknown, { domain, page }: { domain: string, page: string }) => resolversData[domain]?.pages[page] || null,
    ping: (_: unknown, { domain }: { domain: string }) => resolversData[domain]?.pages.home.Query.ping() || null,
  },
};
/*
  dynamically merge page-specific queries (each page can have its own set of query resolvers defined under pageResolvers[page].Query). 
  These need to be incorporated into the main mergedResolvers.Query object.
*/
for (const domain in resolversData) {
  const pageResolvers = resolversData[domain].pages;
  for (const page in pageResolvers) {
    if (pageResolvers[page].Query) {
      mergedResolvers.Query = {
        ...mergedResolvers.Query,
        ...pageResolvers[page].Query,
      };
    }
  }
}

const app = express();
const httpServer = http.createServer(app);

// Apply body-parser middleware before the custom logging middleware
app.use(bodyParser.json());

// Custom middleware to log incoming GraphQL queries
// app.use((req, res, next) => {
//   console.log('Request received:', req.method, req.url); // Log request method and URL to verify middleware is hit
//   if (req.body && req.body.query) {
//     console.log('Incoming GraphQL Query:', req.body.query);
//   } else {
//     console.log('No GraphQL query found in the request body');
//   }
//   next();
// });

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
    expressMiddleware(server),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, () => resolve()));
  console.log(`🚀 Server ready at http://localhost:4000`);
})();
