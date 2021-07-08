import { GraphQLClient } from "graphql-request";


export const getGraphQLClient = () => {
  const domain ="http://127.0.0.1:1337"
  return new GraphQLClient(`${domain}/graphql`, {
    headers: {
      authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjI1NzIxMTU1LCJleHAiOjE2MjgzMTMxNTV9._5ha7YDBHVvFz7P8sZAHOrKb8xi4stQx3ORioFFLwSk",
    },
  });
};
