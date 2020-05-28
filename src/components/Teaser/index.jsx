import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@components/Grid'
import { Link } from '@components/Link'
import Image from '@components/Image'

const Teaser = props => {
  const { title, image, path, alt } = props
  return (
    <Box as="article" className="teaser">
      <h3>
        <Link to={path}>{title}</Link>
      </h3>
      {image ? (
        <Link to={path}>
          <Image fluid={image} alt={alt} />
        </Link>
      ) : null}
    </Box>
  )
}
Teaser.propTypes = {
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
  image: PropTypes.objectOf(PropTypes.any),
  alt: PropTypes.string,
}

Teaser.defaultProps = {
  path: null,
  alt: 'Image',
  image: null,
}
export default Teaser
