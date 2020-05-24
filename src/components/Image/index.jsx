import React from 'react'
import Img from 'gatsby-image'
import PropTypes from 'prop-types'

const Image = props => {
  const { fixed, fluid, alt, children } = props
  const Caption = () => {
    return children ? <figcaption>{children}</figcaption> : null
  }
  return (
    <figure className="img-container">
      <Img fluid={fluid} fixed={fixed} alt={alt} />
      <Caption>{children}</Caption>
    </figure>
  )
}

Image.propTypes = {
  fixed: PropTypes.objectOf(PropTypes.any),
  fluid: PropTypes.objectOf(PropTypes.any),
  alt: PropTypes.string,
  children: PropTypes.node,
}

Image.defaultProps = {
  fixed: null,
  fluid: null,
  alt: 'Image',
  children: null,
}

export default Image
