// Global styles with example usage of ThemeProvider theme.
// Note: changes do not work with hot-reloader.

import { createGlobalStyle } from './index'
import { bodyStyles, breakpointStyles, bgStyles } from './mixins'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  ul, ol {
    margin: 0;
    padding: 0;

    li {
      margin: 0;
      list-style: none; 
    }
  }

  form {
    margin-bottom: 0;
  }

    
  html,
  body {
    min-height: 100%;
    min-width: 320px;
    padding: 0;
    margin: 0;
  }
  
  .transition-element, a {
    transition: color 300ms ease-in;
  }

  body > div:not(#__react-alert__) {
    ${({ theme }) => bodyStyles(theme.colorSchemes.default)}
    
    ${({ theme }) => breakpointStyles(theme.colorSchemes, theme.breakpoints)};
  }

  
  .default-theme-wrapper {
    ${({ theme }) => bgStyles(theme.colorSchemes.default)};
  }

  .dark-theme-wrapper {
    ${({ theme }) => bgStyles(theme.colorSchemes.dark)};
  }

  .center-x {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .center-y {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
  
`

export default GlobalStyles
