import { IResolvers } from '@graphql-tools/utils';

// resolvers metadata and 
export default {
  metadata: {
    vid: '123456789',
    siteName: 'domain2',
    title: 'Domain 2 store',
  },
  theme: {
    colors: {
      primary: '#FF5733',
      secondary: '#33FF57',
    },
  },
  pages: {
    home: {
      title: 'Welcome to Domain 2',
      hero: {
        image: 'https://ik.imagekit.io/geigercp/123456789/mountains.jpg',
      },
      Query: {
        ping: (): string => 'pong for domain2 home page',
      },
    },
    custom: {
      title: 'Custom Orders',
      foo: "bar",
    }
  }
};