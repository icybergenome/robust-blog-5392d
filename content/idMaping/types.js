export const data = [
    {
        id: '1',
        name: '/',
        fields: `... on ComponentSectionsHome{
            more_link_text,
            has_more_link
        }`
    },
    {
        id: 2,
        name: 'contact',
        fields: ` ... on ComponentSectionsContact {
            form_id
            form_action
            form_fields {
                input_type
                name
                label
                default_value
                is_required
            }
            submit_label
            markdown_content
        }`
    },
    {
        id: 3,
        name: 'about',
        fields: `... on ComponentSectionsAbout{
            marked_content
        }`
    },
    {
        id: 4,
        name: 'style-guide',
        fields: `... on ComponentSectionsStyleGuide{
            marked_content
        }`
    },
    {
        id: 5,
        name: 'success',
        fields: `... on ComponentSectionsSuccess{
            marked_content
        }`
    }
];
