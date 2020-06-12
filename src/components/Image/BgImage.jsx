import BackgroundImage from 'gatsby-background-image'
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

const BgImage = styled(BackgroundImage)`
  ${space}
  ${color}
  ${layout}
  ${border}
  ${background}
  ${position}
  ${flexbox}
  ${variant}
`

BgImage.displayName = `BgImage`

BgImage.propTypes = {
  ...propTypes.space,
  ...propTypes.color,
  ...propTypes.layout,
  ...propTypes.border,
  ...propTypes.background,
  ...propTypes.position,
  ...propTypes.flexbox,
  ...propTypes.variant,
}

export default BgImage
