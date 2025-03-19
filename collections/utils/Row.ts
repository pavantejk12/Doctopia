import { CollectionConfig } from 'payload/types'

export const Row: CollectionConfig = {
  slug: 'row',
  fields: [
    {
      type: 'row', // required
      fields: [
        // required
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            width: '50%',
          },
        },

        {
            name: 'value',
            type: 'richText',
            required: true,
            admin: {
              width: '70%',
            },
        },

        {
            name: 'thirty',
            type: 'richText',
            required: true,
            admin: {
              width: '30%',
            },
        },

        {
            name: 'label2',
            type: 'text',
            required: true,
            admin: {
              width: '50%',
            },
          },
          {
            name: 'value2',
            type: 'text',
            required: true,
            admin: {
              width: '50%',
            },
          },
      ],
    },
  ],
}