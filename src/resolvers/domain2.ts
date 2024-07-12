import { IResolvers } from '@graphql-tools/utils';

export const domain2 = {
  metadata: {
    siteName: 'domain2'
  },
  resolvers: {
    Query: {
      hello: (): string => 'world from domain2',
    },
  },
};
