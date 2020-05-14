import styled, {
  space,
  color,
  layout,
  border,
  background,
  position,
  flexbox,
  propTypes,
} from '@style'

const Box = styled.div`
  ${space}
  ${color}
  ${layout}
  ${border}
  ${background}
  ${position}
  ${flexbox}
`

Box.displayName = `Box`

Box.propTypes = {
  ...propTypes.space,
  ...propTypes.color,
  ...propTypes.layout,
  ...propTypes.border,
  ...propTypes.background,
  ...propTypes.position,
  ...propTypes.flexbox,
}

export default Box
