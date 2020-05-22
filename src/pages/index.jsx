import React from 'react'
import { Link, OutboundLink } from '@components/Link'
import Image from '@components/Image'
import { SEO } from '@components/SEO'
import { Text } from '@components/Text'
import { Box, Br } from '@components/Grid'
import Layout from '@components/Layout/default'
import {
  useCookieConsentState,
  useCookieConsentDispatch,
} from '@src/config/CookieConsent'
import styled from '@style'
import { ThemeContext } from '../config/ThemeContext'

const IndexPage = props => {
  const cookieConsentState = useCookieConsentState()
  const cookieConsentDispatch = useCookieConsentDispatch()
  return (
    <ThemeContext.Consumer>
      {context => (
        <>
          <SEO />
          <Layout menu>
            <button onClick={() => context.changeTheme('dark')} type="button">
              {context.theme}
            </button>
            <Text as="h2" mb={3}>
              Guten Tag : )
            </Text>
            <Text mb={4}>
              Built with: <Br />
              <OutboundLink to="https://styled-components.com/" from="main">
                Styled Components
              </OutboundLink>{' '}
              /{' '}
              <OutboundLink to="https://styled-system.com/api/" from="main">
                Styled-System
              </OutboundLink>{' '}
            </Text>
            <Box maxWidth="300px" mb={4}>
              <Image />
            </Box>
            <Link to="/page-2/">Go to page 2</Link>
          </Layout>
        </>
      )}
    </ThemeContext.Consumer>
  )
}

export default IndexPage
