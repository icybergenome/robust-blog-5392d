export const data = [
    {
        id:"1",
        name:"/",
        fields:`... on ComponentSectionsHome{
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
    }
];
