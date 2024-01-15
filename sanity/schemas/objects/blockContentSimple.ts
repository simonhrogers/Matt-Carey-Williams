import { defineType, defineArrayMember } from "sanity";

export default defineType({
  title: 'Block Content',
  name: 'blockContentSimple',
  type: 'array',
  of: [
    defineArrayMember({
      title: 'Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
      ],
      lists: [],
      marks: {
        decorators: [
          { title: 'Italic', value: 'em' }
        ],
        annotations: []
        // annotations: [
        //   {
        //     title: 'External Link',
        //     name: 'link',
        //     type: 'object',
        //     fields: [
        //       {
        //         title: 'URL',
        //         name: 'href',
        //         type: 'url',
        //         validation: Rule => Rule.uri({
        //           scheme: ['http', 'https', 'mailto', 'tel']
        //         })
        //       }
        //     ]
        //   },
        // ]
      }
    })
  ]
})
