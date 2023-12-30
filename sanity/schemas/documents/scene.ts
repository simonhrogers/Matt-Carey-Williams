import { ImageIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'scene',
  title: 'Scene',
  type: 'document',
  icon: ImageIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your episode.',
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
      name: 'coverImage',
      title: 'Cover Image',
      description:
        'This image will be used as the cover image for the episode. If you choose to add it to the show case episodes, this is the image displayed in the list within the homepage.',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'duration',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    // Names (array) of people involved (string)
    defineField({
      name: 'names',
      title: 'Names',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    // Images (array) of artwork images (image) with caption (block content), credit (block content) and alt text (string)
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineField({
          type: 'image',
          icon: ImageIcon,
          name: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
          initialValue: {
            layout: 'default',
          },
          preview: {
            select: {
              media: 'asset',
              title: 'caption',
              subtitle: 'layout',
            },
          },
          fields: [
            // layout option
            defineField({
              name: 'layout',
              title: 'Layout',
              type: 'string',
              options: {
                list: [
                  { title: 'Default', value: 'default' },
                  { title: 'Full Bleed', value: 'fullBleed' },
                ],
              },
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'blockContentSimple',
            }),
            defineField({
              name: 'credit',
              title: 'Credit',
              type: 'blockContentSimple',
            }),
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alt text',
              description:
                'Alternative text for screenreaders. Falls back on caption if not set',
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: 'body',
      title: 'Exhibition Text',
      type: 'blockContent',
      validation: (rule) => rule.max(155).required(),
    }),
  ],
})
