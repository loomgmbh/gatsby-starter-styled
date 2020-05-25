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
import ProductPage from '@templates/catalog'
import { ThemeContext } from '@config/ThemeContext'

const IndexPage = props => {
  const cookieConsentState = useCookieConsentState()
  const cookieConsentDispatch = useCookieConsentDispatch()
  return (
    <ThemeContext.Consumer>
      {context => (
        <>
          <SEO />
          <Layout menu>
            <ProductPage />
          </Layout>
        </>
      )}
    </ThemeContext.Consumer>
  )
}

export default IndexPage
