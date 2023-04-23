import type { ReactElement } from 'react'
import { Grid,GridItem } from '@chakra-ui/react'
import NavBar from '@/components/Navbar/Navbar'
import SideNav from '@/components/SideNav/SideNav'
export function getLayout(page: ReactElement) {
    return (
        <>
        <Grid
    templateAreas={`"header header header header"
                    "nav panel_left main panel_right"
                    "footer footer footer footer"`}
    // gridTemplateRows={'50px 1fr 30px'}
    // gridTemplateColumns={'150px 1fr'}
    h='100dvh'
    // gap='1'
    color='blackAlpha.700'
    fontWeight='bold'
  >
    <GridItem bg='orange.300' area={'header'}>
      <NavBar />
    </GridItem>
    <GridItem bg='pink.300' area={'nav'}>
      <SideNav />
    </GridItem>
    <GridItem bg='pink.300' area={'panel_left'}>
      panel_left
    </GridItem>
    <GridItem bg='green.300' area={'main'}>
      {page}
    </GridItem>
    <GridItem bg='blue.300' area={'panel_right'}>
      panel_right
    </GridItem>
    <GridItem bg='blue.300' area={'footer'}>
      Footer
    </GridItem>
  </Grid>
  </>
    )
  }