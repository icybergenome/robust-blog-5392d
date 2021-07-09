import { gql } from 'graphql-request';
import { getGraphQLClient } from '../../../graphqlClient';

export const getPosts = async () => {
    const query = gql`
        query posts {
            posts {
                id
                created_at
                updated_at
                title
                subtitle
                date
                thumb_img_path {
                    url
                    alternativeText
                    caption
                }
                hide_header
                seo {
                    id
                    title
                    description
                    extra {
                        id
                        name
                        value
                        keyName
                        relativeUrl
                    }
                }
                layout
                slug
                published_at
                post_detail {
                    ... on ComponentSectionsPostDetail {
                        image {
                            url
                            alternativeText
                            caption
                        }
                        description
                    }
                }
            }
        }
    `;

    const posts = await getGraphQLClient().request(query);
    return posts;
};
