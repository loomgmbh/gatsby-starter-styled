import React from 'react'
import PropTypes from 'prop-types'

import GlobalStyles from '@style/GlobalStyles'
import { ThemeProvider, theme } from '@style'
import { themeContext } from '@config/ThemeContext'

const Wrapper = props => {
  const { children } = props
  return (
    <themeContext.Consumer>
      {context => (
        <>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <div className={context.isDark ? 'darkTheme' : 'lightTheme'}>
              {children}
            </div>
          </ThemeProvider>
        </>
      )}
    </themeContext.Consumer>
  )
}

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Wrapper
