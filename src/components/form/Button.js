import styled, {
  space,
  color,
  layout,
  border,
  background,
  position,
  flexbox,
  variant,
  propTypes,
} from '@style'

const Button = styled.button`
  ${space}
  ${color}
  ${layout}
  ${border}
  ${background}
  ${position}
  ${flexbox}
  ${variant}
`

Button.displayName = `Button`

Button.propTypes = {
  ...propTypes.space,
  ...propTypes.color,
  ...propTypes.layout,
  ...propTypes.border,
  ...propTypes.background,
  ...propTypes.position,
  ...propTypes.flexbox,
  ...propTypes.variant,
}

export default Button
