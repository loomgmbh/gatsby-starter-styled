import React from 'react'
import PropTypes from 'prop-types'

import { Box, Flex } from '@components/Grid'
import { Link } from '@components/Link'
import { Text } from '@components/Text'

import Region from './Region'

const Layout = ({ title, description, children }) => {
  return (
    <Flex p={[1, 1, 1]} flexWrap="wrap">
      <Region className="header" width={1}>
        <Box
          as="header"
          // bg="primary.800"
          // px={3}
        >
          <Box>
            <Link to="/" css={{ textDecoration: 'none' }}>
              <Text as="h1" mb={1}>
                {title}
              </Text>
            </Link>
          </Box>
        </Box>
      </Region>
      <Region className="main" width={2 / 3}>
        <Box>{children}</Box>
      </Region>
    </Flex>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
}

Layout.defaultProps = {
  children: null,
  title: null,
  description: null,
}

export default Layout
