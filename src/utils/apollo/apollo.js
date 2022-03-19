import {
    ApolloClient,
    InMemoryCache,
    useQuery,
    gql
  } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    cache: new InMemoryCache(),
    headers: {
        Authorization: `Bearer ${process.env.AUTH_TOKEN_C}`,
    },
  });