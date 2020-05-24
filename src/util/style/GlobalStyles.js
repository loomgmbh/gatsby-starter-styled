// Global styles with example usage of ThemeProvider theme.
// Note: changes do not work with hot-reloader.

import { createGlobalStyle } from './index'

const breakpoint = () => `body { color: yellow;}`

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  ul {
    margin: 0;
    padding: 0;

    li {
      margin: 0;
      list-style: none; 
    }
  }
  
  html,
  body {
    min-height: 100%;
    min-width: 320px;
    padding: 0;
    margin: 0;
    color: ${({ theme }) => theme.colorSchemes.default.base}
  }

  a {
    transition: all 200ms ease-in;
    padding-bottom: ${({ theme }) => theme.space[1]};
  }

  a, a:visited {
    color: ${({ theme }) => theme.colorSchemes.default.link};
    text-decoration: none;
  }

  a: hover {
    color: ${({ theme }) => theme.colorSchemes.default.highlight};
    border-bottom: 1px solid padding-bottom: ${({ theme }) =>
      theme.colorSchemes.default.link};
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.sm}) {
  
    body {
      color: ${({ theme }) => theme.colorSchemes.sm.base}
    }

    a, a:visited {
      color: ${({ theme }) => theme.colorSchemes.sm.link};
      text-decoration: none;
    }
  
    a: hover {
      color: ${({ theme }) => theme.colorSchemes.sm.highlight};
      border-bottom: 1px solid padding-bottom: ${({ theme }) =>
        theme.colorSchemes.sm.link};
    }
  }

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.md}) {
  
    body {
      color: ${({ theme }) => theme.colorSchemes.md.base}
    }

    a, a:visited {
      color: ${({ theme }) => theme.colorSchemes.md.link};
      text-decoration: none;
    }
  
    a: hover {
      color: ${({ theme }) => theme.colorSchemes.md.highlight};
      border-bottom: 1px solid padding-bottom: ${({ theme }) =>
        theme.colorSchemes.md.link};
    }
  }  

  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
  
    body {
      color: ${({ theme }) => theme.colorSchemes.lg.base}
    }

    a, a:visited {
      color: ${({ theme }) => theme.colorSchemes.lg.link};
      text-decoration: none;
    }
  
    a: hover {
      color: ${({ theme }) => theme.colorSchemes.lg.highlight};
      border-bottom: 1px solid padding-bottom: ${({ theme }) =>
        theme.colorSchemes.lg.link};
    }
  }  

`

export default GlobalStyles
