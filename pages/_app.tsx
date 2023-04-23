import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'

import { ChakraBaseProvider, extendBaseTheme, ChakraProvider } from '@chakra-ui/react'
// `@chakra-ui/theme` is a part of the base install with `@chakra-ui/react`
import chakraTheme from '@chakra-ui/theme'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// const theme = extendBaseTheme({
//   components: {
//     Button,
//   },
// })
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <ChakraProvider >
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  )
}
