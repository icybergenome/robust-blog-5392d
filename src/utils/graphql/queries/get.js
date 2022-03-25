import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";




export const GET_CATEGORIES = gql`
        query categories($where: JSON) {
            categories(where: $where) {
                category_name
                category_key
                category_color
            }
        }
    `;

export const GET_POSTS = gql`
query posts {
    posts {
        id
        title
        subtitle
        date
        
        slug
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

export const GET_HEADER = gql`
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


export const GET_PAGE = gql`
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
            
            }
        
    }
    `;

    
// export const getCategories = () => {
//     let categories = {}
//     const {data,error,loading} = useQuery(GET_CATEGORIES);
//     return categories = data;
// };

