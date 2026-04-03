import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    {
      slug: 'users',
      auth: true,
      fields: [],
    },
    {
      slug: 'media',
      upload: {
        staticDir: path.resolve(dirname, '../public/media'),
        mimeTypes: ['image/*', 'video/*'],
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
    {
      slug: 'projects',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'category',
          type: 'text',
          admin: { description: 'e.g. DESIGN SYSTEM - WEB DEVELOPMENT' },
        },
        {
          type: 'row',
          fields: [
            { name: 'role', type: 'text', admin: { width: '33%' } },
            { name: 'date', type: 'text', admin: { width: '33%' } },
            { name: 'client', type: 'text', admin: { width: '33%' } },
          ],
        },
        {
          name: 'heading',
          type: 'textarea',
          admin: { description: 'Main prominent catchphrase.' },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: { description: 'Main project description paragraphs.' },
        },
        {
          name: 'techStack',
          type: 'group',
          fields: [
            { name: 'designTools', type: 'text', admin: { description: 'Comma separated' } },
            { name: 'development', type: 'text', admin: { description: 'Comma separated' } },
            { name: 'captureMedia', type: 'text', admin: { description: 'Comma separated' } },
            { name: 'quote', type: 'textarea' }
          ]
        },
        {
          name: 'coverMedia',
          label: 'Cover Image / Video',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Used for the home page thumbnail and top hero background.' }
        },
        {
          name: 'class',
          type: 'select',
          options: ['tall', 'wide', 'normal', 'large'],
          defaultValue: 'normal',
          admin: { description: 'Grid sizing on the home page.' }
        },
        {
          name: 'gallery',
          type: 'array',
          label: 'Impact Gallery',
          fields: [
            {
              name: 'media',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'videoUrl',
              type: 'text',
              admin: { description: 'Optional external video link (YouTube/Vimeo) if not uploading a file directly.' }
            },
            {
              name: 'size',
              type: 'select',
              options: ['normal', 'wide', 'tall', 'large'],
              defaultValue: 'normal',
            }
          ]
        }
      ],
    },
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  editor: lexicalEditor({}),
})
