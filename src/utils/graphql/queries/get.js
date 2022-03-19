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
// export const getPosts =() => {
//     // let posts = {}
//     const {data,error,loading} = useQuery(GET_POSTS);
//     return  data;
// }
    
export const getCategories = () => {
    let categories = {}
    const {data,error,loading} = useQuery(GET_CATEGORIES);
    return categories = data;
};

