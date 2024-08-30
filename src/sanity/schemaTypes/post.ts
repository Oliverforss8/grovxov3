import { defineField, defineType } from "sanity";

export const blogPostType = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "media",
      title: "Media",
      type: "object",
      fields: [
        defineField({
          name: "type",
          title: "Type",
          type: "string",
          options: {
            list: [
              { title: "Image", value: "image" },
              { title: "Video", value: "video" }
            ],
            layout: "radio"
          }
        }),
        defineField({
          name: "src",
          title: "Source",
          type: "file", // Use file type to allow video file uploads
          options: {
            accept: 'image/*,video/mp4' // Specifically allow image and MP4 video uploads
          }
        })
      ]
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string"
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text"
    })
  ]
});
