export default ({ name = "wordings" }) => ({
    name,
    component: "group-list",
    label: "Static Wordings",
    description: "Store all the static wordings for this page",
    itemProps: ({ id: key, key: label }) => ({
      key,
      label,
    }),
    defaultItem: () => ({
      id: Math.random().toString(36).substr(2, 9),
    }),
    fields: [
      {
        name: "key",
        label: "Key",
        component: "text",
      },
      {
        name: "value",
        label: "Value",
        component: "text",
      },
    ],
  });
  