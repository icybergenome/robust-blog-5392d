import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
        query categories($where: JSON) {
            categories(where: $where) {
                category_name
                category_key
                category_color
            }
        }
    `;