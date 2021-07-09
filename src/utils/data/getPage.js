import { gql } from 'graphql-request';
import { getGraphQLClient } from '../../../graphqlClient';

export const getPage = async ({ id, fields }) => {
    const query = gql`
        query page($id: ID!) {
            page(id: $id) {
                id
                created_at
                updated_at
                title
                subtitle
                img_path {
                    url
                }
                layout
                model_name
                seo {
                    title
                    description
                    extra {
                        name
                        value
                        keyName
                        relativeUrl
                    }
                }
                content {${fields}}
                }
            
        }
    `;
    const variables = {
        id
    };

    const page = await getGraphQLClient().request(query, variables);
    return page;
};
