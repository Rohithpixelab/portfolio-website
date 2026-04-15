import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
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
      access: {
        read: () => true,
      },
      upload: {
        disableLocalStorage: true,
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
      admin: {
        useAsTitle: 'title',
      },
      access: {
        read: () => true,
      },
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
          name: 'externalLink',
          type: 'text',
          admin: { description: 'Optional link to a live project or external platform.' },
        },
        {
          name: 'externalLinkLabel',
          type: 'text',
          admin: { description: 'Label for the external link button (e.g., "View Live Platform" or "View on Dribbble"). Default is "View Live Project" if left blank.' },
        },
        {
          name: 'showOnHomeCounter',
          type: 'ui',
          admin: {
            components: {
              Field: '@/components/HomepageCounter#default',
            }
          }
        },
        {
          name: 'showOnHome',
          type: 'checkbox',
          label: 'Show on Homepage',
          defaultValue: false,
          admin: {
            description: 'Limit: Max 4 projects on homepage.',
          },
          validate: async (val, args) => {
            const { payload, id } = args as any;
            // Only run validation on the server; client-side can't query the DB
            if (!payload || typeof payload.find !== 'function') return true;

            if (val === true) {
              const { totalDocs } = await payload.find({
                collection: 'projects',
                where: {
                  showOnHome: { equals: true },
                },
              });
              // To handle edits, we check if the current doc is already one of the 'true' ones
              if (totalDocs >= 4) {
                // If it's a new doc or this one wasn't previously 'true', block it
                const currentDoc = id ? await payload.findByID({ collection: 'projects', id }) : null;
                if (!currentDoc || !currentDoc.showOnHome) {
                  return 'Home page limit (4/4) reached. Deselect another project first.';
                }
              }
            }
            return true;
          },
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
          admin: { 
            hidden: true, // Hide from UI as requested
            description: 'Grid sizing on the home page.' 
          }
        },
        {
          name: 'projectImages',
          type: 'upload',
          relationTo: 'media',
          hasMany: true,
          label: 'Project Gallery',
          admin: { 
            description: 'Select or upload multiple images/videos at once.',
          },
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
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET_NAME as string,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
        },
        region: process.env.S3_REGION as string,
        endpoint: process.env.S3_ENDPOINT as string,
        forcePathStyle: true,
      },
    }),
  ],
})
