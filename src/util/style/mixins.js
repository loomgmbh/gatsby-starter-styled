const bodyStyles = colorScheme => {
  return `
    * {
      color: ${colorScheme.base};
    }
    a, a:visited {
      color: ${colorScheme.link};
      text-decoration: none;
    }
    a: hover {
      color: ${colorScheme.highlight};
    }
  `
}

const breakpointStyles = (colorSchemes, breakpoints) => {
  let string = ``
  Object.keys(breakpoints).map(breakpoint => {
    if (isNaN(breakpoint)) {
      string += `
      @media only screen and (min-width: ${breakpoints[breakpoint]}) {
       ${bodyStyles(colorSchemes[breakpoint])}
      }
    `
    }
  })
  return string
}

const bgStyles = colorScheme => {
  return `background-color: ${colorScheme.background};`
}

export { bodyStyles, breakpointStyles, bgStyles }
