import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@components/Grid'

const Region = ({
  children,
  width,
  background,
  id,
  className,
  css,
  borderColor,
  flex,
  flexGrow,
  flexShrink,
}) => {
  return (
    <Box
      width={width}
      p={[1, 1, 1]}
      css={css}
      className={className}
      id={id}
      flex={flex}
      flexGrow={flexGrow}
      flexShrink={flexShrink}
    >
      <Box
        p={[2, 3, 4]}
        border={2}
        borderStyle="solid"
        borderColor={borderColor}
        background={background}
        className="region-inner"
        css="min-height: 100%; flex: 1;"
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
  borderColor: PropTypes.string,
}

Region.defaultProps = {
  children: null,
  className: 'region',
  background: null,
  css: null,
  id: null,
  width: null,
  borderColor: null,
}

export default Region
