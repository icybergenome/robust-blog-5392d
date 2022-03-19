import React from 'react'
import { gql } from "@apollo/client";

export const CREATE_POST = gql`
    mutation createPost($input: createPostInput) {
      createPost(input: $input) {
        post {
            id
            title
            subtitle
            slug
            published_at
            date
            
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
  }
  `;
    // const cms = useCMS();
    // await getGraphQLClient().request(create, variables);
    
    // router.push('/');
    // const [createPost, { loading,data, error }] = useMutation(create);
    // createPost({variables});
//   cms.alerts.success('Post Added Successfully');
//   try{
//     await getGraphQLClient().request(create, variables);
//     cms.alerts.success('Post Added Successfully');
//     // router.push('/');
// }catch(e){
//   console.log(e);
// }

