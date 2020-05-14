// Global styles with example usage of ThemeProvider theme.
// Note: changes do not work with hot-reloader.

import { createGlobalStyle } from './index'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    min-height: 100%;
    min-width: 320px;
    padding: 0;
    margin: 0;
    color: ${({ theme }) => theme.schemes.base.base};
  }
  a {
    color: ${({ theme }) => theme.schemes.base.base};
  }
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    body {
      color: ${({ theme }) => theme.schemes.base.sm};
    }
    a {
      color: ${({ theme }) => theme.schemes.base.sm};
    }
  }  
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
    body {
      color: ${({ theme }) => theme.schemes.base.md};
    }
    a {
      color: ${({ theme }) => theme.schemes.base.md};
    }
  }  
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    body {
      color: ${({ theme }) => theme.schemes.base.lg};
      a {
        color: ${({ theme }) => theme.schemes.base.lg};
      }
    }
  }  

`

export default GlobalStyles
