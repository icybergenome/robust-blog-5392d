import { GraphQLClient } from "graphql-request";
import getConfig from "next/config";
// const { publicRuntimeConfig } = getConfig();

export const getGraphQLClient = (context) => {
    
//   const domain =
//     typeof window === "undefined"
//       ? publicRuntimeConfig.HOST_URL ?? "http://127.0.0.1:1337"
//       : window.location.origin;
  return new GraphQLClient('http://localhost:1337/graphql', {
    headers: {
        authorization: `Bearer ${process.env.AUTH_TOKEN_C}`
    },
  })
};
