import React from 'react'
import styled, { ThemeProvider } from '@style'

import {
  borderRadius,
  buttonStyle,
  space,
  fontSize,
  variant,
} from 'styled-system'

const buttonSize = variant({
  prop: 'size',
  key: 'buttonSizes',
})

const Button = styled('button')(
  {
    appearance: 'button',
    border: 0,
    outline: 0,
  },
  borderRadius,
  buttonStyle,
  buttonSize,
  space,
  fontSize
)

Button.defaultProps = {
  variant: 'primary',
  size: 'medium',
}

Button.displayName = `Button`

export { Button }
