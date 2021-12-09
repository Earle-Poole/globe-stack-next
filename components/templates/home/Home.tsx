import useUIStore from '@/organisms/ui-overlay/uiStore'
import { useSignInStore } from '@/components/organisms/signInStore'
import Head from 'next/head'
import { useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import { getCookie } from '@/utils/fn'
import Overlay from '@/atoms/overlay/Overlay'
import SignIn from '@/molecules/signIn'
import Map from '@/organisms/map'
import UIOverlay from '@/organisms/ui-overlay'
import { callClientSide } from '@/utils/tacklebox'
import styled from 'styled-components'

interface ThemeObj {
  fontColor: string
  invertedFontColor: string
  insetBoxShadow: string
  primaryColor: string
  secondaryColor: string
  primaryBackgroundColor: string
  secondaryBackgroundColor: string
}

export const theme: { light: ThemeObj; dark: ThemeObj } = {
  light: {
    fontColor: '#000000',
    invertedFontColor: '#ffffff',
    insetBoxShadow: 'inset 0 0 7px 2px #00000077',
    primaryColor: '#048989',
    secondaryColor: '#036d6f',
    primaryBackgroundColor: '#ffffffcc',
    secondaryBackgroundColor: '#cccccccc',
  },
  dark: {
    fontColor: '#eeeeee',
    invertedFontColor: '#000000',
    insetBoxShadow: 'inset 0 0 7px 2px #ffffff77',
    primaryColor: '#bb302d',
    secondaryColor: '#972d1d',
    primaryBackgroundColor: '#000000cc',
    secondaryBackgroundColor: '#333333cc',
  },
}

const Home = () => {
  const selectedTheme = useUIStore((state) => state.theme)
  const setTheme = useUIStore((state) => state.setTheme)
  const isLoggedIn = useSignInStore((state) => state.isLoggedIn)
  const setIsLoggedIn = useSignInStore((state) => state.setIsLoggedIn)

  // This useEffect will set the theme based on the localStorage
  useEffect(() => {
    callClientSide(() => {
      if (localStorage.getItem('theme') === 'light') {
        setTheme('light')
      }
    })
  }, [setTheme])

  // This useEffect will set the isLoggedIn based on the cookie
  useEffect(() => {
    atob(getCookie(btoa('isLoggedIn'))) !== 'true' && setIsLoggedIn(false)
  }, [setIsLoggedIn])

  return (
    <ThemeProvider theme={theme[selectedTheme]}>
      <HomeContainer>
        <Head>
          <title>Globe Stack</title>
        </Head>
        <Map />
        <UIOverlay />
        {isLoggedIn ? null : (
          <Overlay>
            <SignIn />
          </Overlay>
        )}
      </HomeContainer>
    </ThemeProvider>
  )
}

const HomeContainer = styled.div`
  padding: 0;
  margin: 0;
`

export default Home
