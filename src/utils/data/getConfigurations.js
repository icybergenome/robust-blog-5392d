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
                    alternativeText
                }
                background_img {
                    url
                    alternativeText
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

export const getCategories = async () => {
    const query = gql`
        query category {
            category {
                categories {
                    category_name
                    category_key
                    category_color
                }
            }
        }
    `;

    const categories = await getGraphQLClient().request(query);
    return categories;
};
