import { IResolvers } from '@graphql-tools/utils';

export const domain1 = {
  metadata: {
    siteName: 'domain1',
    foo: 'additional data for domain1'
  },
  resolvers: {
    Query: {
      hello: (): string => 'world from domain1',
    },
  },
};