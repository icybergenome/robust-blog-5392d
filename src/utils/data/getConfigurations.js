import { gql } from 'graphql-request';
import { getGraphQLClient } from '../../../graphqlClient';

export const getHeader = async () => {
    const query = gql`
        query header {
            header {
                id
                created_at
                updated_at
                title
                tagline
                logo_img {
                    url
                }
                logo_img_alt
                background_img {
                    url
                }
                has_nav
                nav_links {
                    ... on ComponentSharedNavLinks {
                        label
                        url
                        style
                    }
                }
                has_social
                social_links {
                    ... on ComponentSharedSocialLinks {
                        label
                        url
                        style
                        icon_class
                        new_window
                    }
                }
            }
        }
    `;

    const header = await getGraphQLClient().request(query);
    return header;
};
