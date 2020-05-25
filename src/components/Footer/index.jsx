import React from 'react'
import styled, { themeGet } from '@style'
import { OutboundLink } from '@components/Link'

import PropTypes from 'prop-types'

import { Box, Flex } from '@components/Grid'
import { ThemeSwitcher } from '@components/controls'

const Footer = ({ children }) => {
  const CopyrightLink = styled(OutboundLink)`
    padding-right: ${themeGet('space.unit.base', '13px')};
  `
  return (
    <Box as="footer">
      <Flex>
        <Box width="50%">
          <CopyrightLink to="https://loom.de" from="footer">
            Loom {new Date().getFullYear()}
          </CopyrightLink>
        </Box>
        <Box width="50%">
          <ThemeSwitcher />
        </Box>
      </Flex>
      {children}
    </Box>
  )
}

Footer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Footer
