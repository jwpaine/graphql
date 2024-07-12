# GraphQL API Documentation

This documentation provides an overview of the GraphQL API for querying domain-specific metadata, theme configurations, and page content. Below is an example query and its expected response.

## Example Query

This query fetches metadata, theme colors, page content for the home page, and a ping response for a specific domain.

**Query:**

```graphql
{
  metadata(domain: "domain2") {
    vid
    siteName
    title
  }
  theme(domain: "domain2") {
    colors {
      primary
      secondary
    }
  }
  pageContent(domain: "domain2", page: "home") {
    title
    hero {
      image
    }
  }
  ping(domain: "domain2")
}

**Response:**

```
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
  },
},

```