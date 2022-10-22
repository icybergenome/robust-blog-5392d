import { gql } from '@apollo/client';

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

// DATABASE

// - name: coconut
//   kind: postgres
//   configuration:
//     connection_info:
//       use_prepared_statements: false
//       database_url:
//         from_env: PG_DATABASE_URL
//       isolation_level: read-committed
//   tables: '!include coconut/tables/tables.yaml'

// PUBLIC.USER

// table:
//   schema: public
//   name: user
// select_permissions:
//   - role: user
//     permission:
//       columns:
//         - id
//         - first_name
//         - last_name
//         - email
//         - auth_type
//         - avatar_url
//         - phone_number
//         - username
//         - created_at
//         - updated_at
//       filter:
//         id:
//           _eq: X-Hasura-User-Id
// update_permissions:
//   - role: user
//     permission:
//       columns:
//         - auth_type
//         - avatar_url
//         - email
//         - first_name
//         - last_name
//         - phone_number
//         - updated_at
//       filter:
//         id:
//           _eq: X-Hasura-User-Id
//       check: null
