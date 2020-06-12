import React from 'react'
import Img from 'gatsby-image'
import { Flex, Box, Br } from '@components/Grid'
import PropTypes from 'prop-types'
import BgImage from './BgImage'

const Image = props => {
  const { fixed, fluid, alt, children, caption, width } = props
  const Caption = () => {
    return children || caption ? (
      <figcaption>{children ?? caption}</figcaption>
    ) : null
  }

  return (
    <Box as="div" className="img-container" width={width}>
      <Img fluid={fluid} fixed={fixed} alt={alt} />
      <Caption>{children}</Caption>
    </Box>
  )
}

Image.propTypes = {
  fixed: PropTypes.objectOf(PropTypes.any),
  fluid: PropTypes.objectOf(PropTypes.any),
  alt: PropTypes.string,
  caption: PropTypes.string,
  children: PropTypes.node,
}

Image.defaultProps = {
  fixed: null,
  fluid: null,
  caption: null,
  alt: 'Loom Gatsby TNT',
  children: null,
}

export { Image, BgImage }
