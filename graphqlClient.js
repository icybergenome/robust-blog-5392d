import { GraphQLClient } from 'graphql-request';

export const getGraphQLClient = () => {
    const domain = process.env.HOST_URL;
    return new GraphQLClient(`${domain}/graphql`, {
        headers: {
            authorization: `Bearer ${process.env.AUTH_TOKEN}`
        }
    });
};
