import React from 'react'
import PropTypes from 'prop-types'

import GlobalStyles from '@style/GlobalStyles'
import { ThemeProvider, theme } from '@style'
import { ThemeContext } from '@config/Context'
import { CookieConsentProvider } from '@config/CookieConsent'

const Wrapper = props => {
  const { children } = props

  return (
    <ThemeContext.Consumer>
      {context => (
        <>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <div className={context.isDark ? 'darkTheme' : 'lightTheme'}>
              <CookieConsentProvider>{children}</CookieConsentProvider>
            </div>
          </ThemeProvider>
        </>
      )}
    </ThemeContext.Consumer>
  )
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Wrapper
