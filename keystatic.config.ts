import { config, fields, collection } from "@keystatic/core";
import { wrapper, block, mark } from "@keystatic/core/content-components";

const tipSchema = fields.object(
  {
    icon: fields.image({
      label: "Icon",
      description: "Icon for this tip",
      directory: 'public/images'
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

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "src/content/posts/*/",
      format: { contentField: "content" },
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
        content: fields.mdx({
          label: "Rich text",
          components: {
            Testimonial: block({
              label: "Testimonial",
              schema: {
                author: fields.text({ label: "Author" }),
                role: fields.text({ label: "Role" }),
              },
            }),
          },
        }),
      },
    }),
  },
});
