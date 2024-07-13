import base from './base';
import domain2 from './domain2';

interface DomainResolvers {
    metadata: { [key: string]: any };
    theme: { [key: string]: any };
    pages: { [key: string]: any };
    // resolvers: { Query: { [key: string]: () => any } }
  
}

export const resolversData: { [key: string]: DomainResolvers } = {
  base: base,
  domain2: domain2,
};