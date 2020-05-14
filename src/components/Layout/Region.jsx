import React from 'react'
import PropTypes from 'prop-types'
import { theme } from '@style'
import { Box } from '@components/Grid'

const { schemes } = theme

const Region = ({ children, width, background, id, className, css }) => {
  return (
    <Box width={width} p={[1, 1, 1]} css={css} className={className} id={id}>
      <Box
        p={[2, 3, 4]}
        border={2}
        borderStyle="solid"
        borderColor={[
          `${schemes.base.base}`,
          `${schemes.base.sm}`,
          `${schemes.base.md}`,
          `${schemes.base.lg}`,
        ]}
        background={background}
      >
        {children}
      </Box>
    </Box>
  )
}

Region.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  background: PropTypes.string,
  css: PropTypes.oneOfType([PropTypes.object]),
  id: PropTypes.string,
  width: PropTypes.number,
}

Region.defaultProps = {
  children: null,
  className: null,
  background: null,
  css: null,
  id: null,
  width: null,
}

export default Region
