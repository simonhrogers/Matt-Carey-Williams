import { DocumentIcon, ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  type: 'document',
  name: 'page',
  title: 'Page',
  icon: DocumentIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),
    // blockContent
    defineField({
      type: 'blockContent',
      name: 'body',
      title: 'Body',
      hidden: ({ parent }) => !['about', 'privacy-policy'].includes(parent?.slug?.current),
    }),
    // address
    defineField({
      type: 'blockContent',
      name: 'address',
      title: 'Address',
      hidden: ({ parent }) => parent?.slug?.current !== 'contact',
    }),
    // staffMembers
    defineField({
      type: 'array',
      name: 'staffMembers',
      title: 'Staff Members',
      of: [
        defineArrayMember(
          {  
            type: 'object',
            name: 'staffMember',
            title: 'Staff Member',
            fields: [
              defineField({
                type: 'string',
                name: 'name',
                title: 'Name',
                validation: (rule) => rule.required(),
              }),
              defineField({
                type: 'string',
                name: 'title',
                title: 'Title',
                validation: (rule) => rule.required(),
              }),
              defineField({
                type: 'image',
                name: 'image',
                title: 'Image',
                options: {
                  hotspot: true,
                },
                validation: (rule) => rule.required(),
              }),
              defineField({
                type: 'blockContent',
                name: 'body',
                title: 'Body',
                validation: (rule) => rule.required(),
              }),
            ],
            preview: {
              select: {
                title: 'name',
                subtitle: 'title',
                media: 'image',
              },
            },
          }
        )
      ],
      hidden: ({ parent }) => parent?.slug?.current !== 'contact',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Page',
        title,
      }
    },
  },
})