import React from 'react'
import PropTypes from 'prop-types'
// import { useStaticQuery, graphql } from 'gatsby'

import { Box, Flex } from '@components/Grid'
// import { Link } from '@components/Link'
// import { Text } from '@components/Text'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Menu from '@components/Menu'
import { Breadcrumbs } from '@components/Breadcrumbs'
import { SEO } from '@components/SEO'

import Region from './Region'

/**
 * 1. Avoid the IE 10-11 `min-height` bug.
 * 2. Set `flex-shrink` to `0` to prevent some browsers from
 *    letting these items shrink to smaller than their content's default
 *    minimum size. See http://bit.ly/1Mn35US for details.
 * 3. Use `%` instead of `vh` since `vh` is buggy in older mobile Safari.
 */
const Layout = ({
  icon,
  header,
  customHeaderTitle,
  menu,
  location,
  description,
  customIcon,
  breadcrumb,
  footer,
  children,
}) => {
  return (
    <>
      <SEO />
      <Flex
        p={[1, 1, 1]}
        height="100%"
        flexWrap="wrap"
        alignItems="stretch"
        flexDirection="column"
        css="min-height: 100vh;"
      >
        {!header || (
          <Region className="header" width={1} flex="none">
            <Header
              title={customHeaderTitle}
              description={description}
              icon={icon}
              customIcon={customIcon}
            />
          </Region>
        )}
        {!menu || (
          <Region className="menu" width={1} flex="none" type="borderless">
            <Menu />
          </Region>
        )}
        {!breadcrumb || (
          <Region className="breadcrumbs" width={1} type="borderless">
            <Breadcrumbs location={location} crumbLabel={breadcrumb} />
          </Region>
        )}
        <Region className="main" width={1} flex="1 0 auto">
          <Flex flexWrap="wrap" flexDirection="column">
            <Box flex="1 0 auto">{children}</Box>
          </Flex>
        </Region>
        {!footer || (
          <Region className="footer" width={1} flexShrink="0" flex="none">
            <Footer> </Footer>
          </Region>
        )}
      </Flex>
    </>
  )
}

// Layout.propTypes = {
//   children: PropTypes.node,
//   title: PropTypes.string,
//   description: PropTypes.string,
// }

// Layout.defaultProps = {
//   children: null,
//   title: null,
//   description: null,
// }

export default Layout
