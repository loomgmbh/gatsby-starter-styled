import React from 'react'
import PropTypes from 'prop-types'
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
          {console.log(theme.colorSchemes[context.theme].background)}
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Wrapper
              // className={context.isDark ? 'darkTheme' : 'lightTheme'}
              className="theme-wrapper"
              theme={context.theme}
              variant={context.viewport}
              color={theme.colorSchemes[context.theme].base}
              background={theme.colorSchemes[context.theme].background}
              css="transition: 200ms all"
            >
              <CookieConsentProvider>{children}</CookieConsentProvider>
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
