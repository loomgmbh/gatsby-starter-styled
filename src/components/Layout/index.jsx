import React from 'react'
import PropTypes from 'prop-types'
import { positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-oldschool-dark'
import GlobalStyles from '@style/GlobalStyles'
import { ThemeProvider, theme } from '@style'
import { ThemeContext } from '@config/ThemeContext'
import { CookieConsentProvider } from '@config/CookieConsent'

const Layout = ({ children }) => {
  const getClassName = themeName =>
    `${themeName}-theme-wrapper theme-wrapper transition-element`
  return (
    <ThemeContext.Consumer>
      {context => (
        <>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <div className={getClassName(context.theme)}>
              <CookieConsentProvider>
                <AlertProvider
                  template={AlertTemplate}
                  timeout={5000}
                  position={positions.BOTTOM_CENTER}
                >
                  {children}
                </AlertProvider>
              </CookieConsentProvider>
            </div>
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
