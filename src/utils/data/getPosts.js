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
                cover_img {
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
                category
                postDetail {
                    __typename
                    ... on ComponentBasicImage {
                        image {
                            url
                            alternativeText
                            caption
                        }
                    }
                    __typename
                    ... on ComponentBasicDescription {
                        description
                    }
                    __typename
                    ... on ComponentBasicVideo {
                        video {
                            url
                            caption
                            alternativeText
                        }
                    }
                    __typename
                    ... on ComponentBasicVideoWithUrl {
                        url
                    }
                }
            }
        }
    `;

    const posts = await getGraphQLClient().request(query);
    return posts;
};
