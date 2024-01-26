/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
// import { PAGE_REFERENCES } from '../../sanity.config'
// import { LinkIcon } from '@sanity/icons'
import { defineType, defineField } from 'sanity'

export default defineType({
  title: 'Block Content',
  name: 'blockContentWriting',
  type: 'array',
  of: [
    defineField({
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        {title: 'Body', value: 'normal'},
        {title: 'Pullquote', value: 'pullquote'},
        {title: 'Title', value: 'h4'},
        {title: 'Subtitle', value: 'h5'},
        // {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
        // {
        //   title: 'Underline',
        //   value: 'underline',             
        // },
        {
          title: 'Emphasis', 
          value: 'em'
        }],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'External Link',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: Rule => Rule.uri({
                  scheme: ['http', 'https', 'mailto', 'tel']
                })
              }
            ]
          },
        //  {
        //    title: 'Internal Link',
        //    name: 'linkInternal',
        //    type: 'object',
        //    icon: LinkIcon,
        //    fields: [
        //      {
        //        title: 'Reference',
        //        name: 'reference',
        //        type: 'reference',
        //        weak: true,
        //        validation: Rule => Rule.required(),
        //        to: PAGE_REFERENCES
        //      }
        //    ]
        //  },
        ]
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    {
      type: 'image',
      // options: {hotspot: true}
      fields: [
        {
          name: 'caption',
          title: 'Caption',
          type: 'blockContentSimple',
        },
        {
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
        }
      ]
    },
    {
      title: 'Images Group',
      name: 'imagesGroup',
      type: 'object',
      fields: [
        {
          name: 'images',
          title: 'Images',
          type: 'array',
          of: [
            {
              type: 'image',
              fields: [
                {
                  name: 'caption',
                  title: 'Caption',
                  type: 'blockContentSimple',
                },
                {
                  name: 'alt',
                  title: 'Alternative text',
                  type: 'string',
                }
              ],
              preview: {
                select: {
                  title: 'caption',
                  subitle: 'alt',
                  media: 'asset'
                }
              }
            }
          ]
        }
      ],
      preview: {
        select: {
          images: 'images',
        },
        prepare(selection) {
          const {images} = selection
          return {
            title: 'Images Group',
            subtitle: `${images.length} image(s)`,
            media: images[0]
          }
        }
      }
    }
  ]
})
 