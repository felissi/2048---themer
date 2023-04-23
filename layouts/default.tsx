import Navbar from "@/components/Navbar/Navbar"
import type { ReactElement } from 'react'
import { Flex } from '@chakra-ui/react'
type PropsWithChildren = { children: React.ReactNode }
export function Layout(page: ReactElement) {
  return (
    <>
      <Flex minHeight='100dvh' alignItems='center' flexDirection='column'>

        <Navbar />
        <Flex width='100%' flexGrow='1' flexDirection='column'>
          <main>{page}</main>
        </Flex>
        {/* <Footer /> */}
      </Flex>
    </>
  )
}