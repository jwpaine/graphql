import { IResolvers } from '@graphql-tools/utils';

export default {
  metadata: {
    vid: '123456788',
    siteName: 'domain1',
    title: 'Domain 1 store',
  },
  theme: {
    colors: {
      primary: '#FF5733',
      secondary: '#33FF57',
    },
  },
  pages: {
    home: {
      title: 'Welcome to Domain 1',
      hero: {
        image: 'https://ik.imagekit.io/geigercp/123456789/mountains.jpg',
      },
      Query: {
        ping: (): string => 'pong for domain1 home page',
      },
    }
  }
};