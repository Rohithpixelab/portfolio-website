import config from '../../payload.config'
import '@payloadcms/next/css'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'

import { importMap } from '../../importMap.js'

const serverFunction: any = async function (args: any) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: { children: React.ReactNode }) => (
  <RootLayout importMap={importMap} config={config} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)
export default Layout
