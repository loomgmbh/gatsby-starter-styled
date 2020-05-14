import React from 'react'
import { OutboundLink } from '@components/Link'

import PropTypes from 'prop-types'

import { Box } from '@components/Grid'

const Footer = ({ children }) => (
  <Box as="footer">
    <OutboundLink to="https://loom.de" from="footer">
      Loom {new Date().getFullYear()}
    </OutboundLink>
    {children}
  </Box>
)

Footer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default Footer
