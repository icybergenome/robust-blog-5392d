import { gql } from "@apollo/client";

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
