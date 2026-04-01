import config from '../../../../payload.config'
import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../../../../importMap.js'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const generateMetadata = ({ params, searchParams }: Args) => ({
  title: 'Not Found',
})

const NotFound = ({ params, searchParams }: Args) => (
  <NotFoundPage importMap={importMap} config={config} params={params} searchParams={searchParams} />
)

export default NotFound
