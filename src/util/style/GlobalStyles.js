// Global styles with example usage of ThemeProvider theme.
// Note: changes do not work with hot-reloader.

import { createGlobalStyle } from './index'

const breakpoint = () => `body { color: yellow;}`

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  // html,
  // body {
  //   min-height: 100%;
  //   min-width: 320px;
  //   padding: 0;
  //   margin: 0;
  //   color: ${({ theme }) => theme.colorSchemes.default.base}
  //   a {
  //     color: ${({ theme }) => theme.colorSchemes.default.highlight}
  //   }
  // }
  // @media only screen and (min-width: ${({ theme }) =>
    theme.breakpoints.sm}) {
  //   body {
  //     color: ${({ theme }) => theme.colorSchemes.sm.base}  
  //   }
  //   a {
  //     color: ${({ theme }) => theme.colorSchemes.sm.highlight}  
  //   }
  // }  
  // @media only screen and (min-width: ${({ theme }) =>
    theme.breakpoints.md}) {
  //   body {
  //     color: ${({ theme }) => theme.colorSchemes.md.base}  
  //   }
  //   a {
  //     color: ${({ theme }) => theme.colorSchemes.md.highlight}  
  //   }
  // }  
  // @media only screen and (min-width: ${({ theme }) =>
    theme.breakpoints.lg}) {
  //   body {
  //     color: ${({ theme }) => theme.colorSchemes.lg.base}  
  //   }
  //   a {
  //     color: ${({ theme }) => theme.colorSchemes.lg.highlight}  
  //   }
  // }  

`

export default GlobalStyles
