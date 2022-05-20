import { gql } from "@apollo/client";


export const GET_POSTS = gql`
query posts {
    posts {
        id
        title
        subtitle
        date
        post_img_url
        slug
        category
        post_created_by
        post_updated_by
        published_at
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