import { BillIcon, ImageIcon } from '@sanity/icons'
import { WritingIcon } from '@/sanity/lib/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'writing',
  title: 'Writing',
  type: 'document',
  icon: WritingIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'download',
      title: 'Download',
      type: 'file',
      options: {
        storeOriginalFilename: true,
      },
      description: 'If there is a download, the writing will be displayed as a download button not a page. A page with a download button MUST NOT BE referenced in the writing field of an episode or scene.',
    }),
    defineField({
      name: 'reference',
      title: 'Reference to Episode or Scene',
      type: 'reference',
      to: [{ type: 'episode' }, { type: 'scene' }],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'blockContentSimple',
      validation: (rule) => rule.max(155).required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContentWriting',
      validation: (rule) => rule.max(155).required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
        media: BillIcon,
      }
    }
  },
})
