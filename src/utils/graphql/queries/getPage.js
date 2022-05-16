import { gql } from "@apollo/client";

export const GET_PAGE = gql`
query page($id: ID!) {
    page(id: $id) {
        id
        created_at
        updated_at
        title
        subtitle
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