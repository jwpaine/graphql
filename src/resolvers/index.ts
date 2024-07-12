import { domain1 } from './domain1';
import { domain2 } from './domain2';

interface DomainResolvers {
  metadata: { [key: string]: any };
  resolvers: { Query: { [key: string]: () => any } };
}

export const resolversData: { [key: string]: DomainResolvers } = {
  domain1: domain1,
  domain2: domain2,
};
