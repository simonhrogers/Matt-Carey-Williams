import { ImagesIcon, ImageIcon } from '@sanity/icons'
import { EpisodeIcon } from '@/sanity/lib/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'episode',
  title: 'Episode',
  type: 'document',
  icon: EpisodeIcon,
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
      name: 'number',
      description: 'This field is the number of your episode.',
      title: 'Number',
      type: 'number',
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
      name: 'pressRelease',
      title: 'Press Release',
      type: 'file',
      options: {
        storeOriginalFilename: true,
      },
    }),
    defineField({
      name: 'cv',
      title: 'Artist’s CV',
      type: 'file',
      options: {
        storeOriginalFilename: true,
      },
    }),
    defineField({
      name: 'portfolio',
      title: 'Artist’s Portfolio',
      type: 'file',
      options: {
        storeOriginalFilename: true,
      },
    }),
    defineField({
      name: 'readMore',
      title: 'Read More',
      type: 'reference',
      to: [{ type: 'writing' }],
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
              imageUrl: 'asset.url',
              title: 'caption',
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

    // defineField({
    //   name: 'overview',
    //   description:
    //     'Used both for the <meta> description tag for SEO, and episode subheader.',
    //   title: 'Overview',
    //   type: 'blockContentSimple',
    //   validation: (rule) => rule.max(155).required(),
    // }),


  ],
  preview: {
    select: {
      title: 'title',
      names: 'names',
      firstArtist: 'names.0',
      artistsLength: 'names.length',
      media: 'coverImage',
    },
    prepare({ title, names, firstArtist, artistsLength, media }) {

      // console.log('names', names);
      // console.log('firstArtist', firstArtist);

      let subtitle = firstArtist
      if (artistsLength > 1) {
        subtitle = `With ${firstArtist} and ${artistsLength - 1} other(s)`
      }

      return {
        title,
        subtitle,
        media
      }
    },
  }
})
