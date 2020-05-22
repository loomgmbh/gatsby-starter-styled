import React from 'react'
import PropTypes from 'prop-types'
import { positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-oldschool-dark'
import GlobalStyles from '@style/GlobalStyles'
import styled, { ThemeProvider, theme } from '@style'
import { ThemeContext } from '@config/ThemeContext'
import { CookieConsentProvider } from '@config/CookieConsent'
import { Box } from '@components/Grid'

const Wrapper = styled(Box)`
  transition: all 500 ease-out;
`
const Layout = props => {
  const { children } = props

  return (
    <ThemeContext.Consumer>
      {context => (
        <>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Wrapper
              className={`${context.theme}-theme theme-wrapper`}
              theme={context.theme}
              variant={context.viewport}
              color={theme.colorSchemes[context.theme].base ?? null}
              background={theme.colorSchemes[context.theme].background ?? null}
              css="transition: 200ms all"
            >
              <CookieConsentProvider>
                <AlertProvider
                  template={AlertTemplate}
                  timeout={5000}
                  position={positions.BOTTOM_CENTER}
                >
                  {children}
                </AlertProvider>
              </CookieConsentProvider>
            </Wrapper>
          </ThemeProvider>
        </>
      )}
    </ThemeContext.Consumer>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
