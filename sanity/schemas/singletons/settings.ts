import { CogIcon } from '@sanity/icons'
import { SettingsIcon } from '@/sanity/lib/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: SettingsIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'menuItems',
      title: 'Menu Item list',
      description: 'Links displayed on the header of your site.',
      type: 'array',
      readOnly: true,
      of: [
        {
          title: 'Reference',
          type: 'reference',
          to: [
            {
              type: 'home',
            },
            {
              type: 'page',
            },
            // {
            //   type: 'project',
            // },
          ],
        },
      ],
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of locations MCW is currently exhibiting at.',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      options: {
        list: [
          { title: 'Elm', value: '#1C7464' },
          { title: 'Orange', value: '#B4522E' },
          { title: 'Blue', value: '#114593' },
          { title: 'Wasabi', value: '#73711C' },
          { title: 'Purple', value: '#5E5590' },
          { title: 'Tawny Port', value: '#73272B' },
        ],
      },
    }),
    defineField({
      name: 'seo',
      title: 'SEO Fallbacks',
      description: 'Here you can define a global title, social image and description. Should for any reason you fail to set these on other pages or there is not the content available for me to automate, the content here will still exist as a fallback.',
      type: 'object',
      options: {
        collapsed: false,
        collapsible: true
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          // validation: Rule => Rule.required(),
          description: 'Used for both search engine results and social cards.'
        })
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Menu Items',
      }
    },
  },
})
