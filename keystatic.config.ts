import { config, fields, collection } from "@keystatic/core";
import { wrapper, block, mark } from "@keystatic/core/content-components";

const tipSchema = fields.object(
  {
    icon: fields.image({
      label: "Icon",
      description: "Icon for this tip",
      directory: "public/images",
    }),
    heading: fields.text({
      label: "Heading",
    }),
    description: fields.text({
      label: "Description",
    }),
  },
  {
    label: "Tip",
    description: "Tip how to learn this course",
  },
);

const courseSchema = fields.object({
  label: fields.text({ label: "Label" }),
  group: fields.relationship({
    label: "Group",
    description: "Group of common courses",
    collection: "groups",
  }),
});

const sectionsCollectionSchema = collection({
  label: "Sections",
  slugField: "title",
  path: "src/content/sections/*",
  columns: ["title", "color"],
  schema: {
    title: fields.slug({
      name: { label: "Title", description: "Title of the page" },
    }),
    color: fields.text({
      label: "Main color of the page",
      validation: { isRequired: true, length: { min: 4, max: 7 } },
    }),
    tips: fields.array(tipSchema, {
      label: "Tips",
      itemLabel: (props) => {
        console.log(props);
        return props.fields.heading.value;
      },
      description: "Tips how to learn this course",
    }),
    courses: fields.array(courseSchema, {
      label: "Courses",
      itemLabel: (item) => item.fields.label.value,
    }),
  },
});

const groupsCollectionSchema = collection({
  label: "Group",
  slugField: "title",
  path: "src/content/groups/*",
  schema: {
    title: fields.slug({
      name: { label: "Title", description: "Title of the group" },
    }),
    icon: fields.image({ label: "Icon", directory: "public/iamges" }),
  },
});

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    sections: sectionsCollectionSchema,
    groups: groupsCollectionSchema,
  },
});
