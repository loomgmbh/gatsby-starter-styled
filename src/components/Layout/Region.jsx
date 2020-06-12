import React from 'react'
import PropTypes from 'prop-types'
import styled, {
  space,
  color,
  layout,
  border,
  background,
  position,
  flexbox,
  variant,
  themeGet,
  propTypes,
} from '@style'
import { Box, Flex } from '@components/Grid'

const Styled = styled('div')(
  space,
  color,
  layout,
  border,
  background,
  position,
  flexbox,
  variant,
  {
    border: '2px solid',
    height: '100%',
    width: '100%',
  },
  variant({
    variants: {
      borderless: {
        border: 0,
        padding: '0 !important',
      },
    },
  })
)

const Region = ({
  children,
  width,
  // background,
  id,
  className,
  css,
  type,
  flex,
}) => {
  return (
    <Flex
      width={width}
      p={[1, 2, 3]}
      css={css}
      className={className}
      id={id}
      flex={flex}
      flexDirection="column"
      alignItems="stretch"
    >
      <Styled
        p={[2]}
        // border={2}
        // background={background}
        className="region-inner"
        variant={type}
        flex="1 0 auto"
      >
        {children}
      </Styled>
    </Flex>
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
