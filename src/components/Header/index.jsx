import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { Link } from '@components/Link'
import { Box, Flex } from '@components/Grid'
import { Text } from '@components/Text'
import styled, { space, layout } from '@style'
import icon from '../../../static/images/tnt.svg'
import pixel from '../../../static/images/0.png'

const Header = ({ title, description }) => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `)

  return (
    <Flex
      as="header"
      flexWrap="wrap"
      display={['flex', null, null, 'block']}
      height={[null, null, null, '160px']}
    >
      <Box
        className="header-icon"
        backgroundImage={`url(${icon})`}
        backgroundRepeat="no-repeat"
        backgroundSize="contain"
        flex={[1 / 6, null, null, 'default']}
        ml={[1, null, 0]}
        mr={[null, null, null, 2]}
        width={[null, null, null, '15%']}
        css="float:left; max-height: 155px;"
      >
        <Link to="/">
          <img src={pixel} alt="TNT-Logo-pixel" width="100%" height="100%" />
        </Link>
      </Box>
      <Box className="header-text" flex={[5 / 6]} pl={[2]}>
        <Link to="/" css={{ textDecoration: 'none' }}>
          <Text as="h1" fontSize={[6, 7]} pt={[3, null, 4]} pl={[1, null, 2]}>
            {title ?? data.site.siteMetadata.title ?? 'Default title'}
          </Text>
        </Link>
      </Box>
      <Box className="header-description" flex={['0 0 100%']}>
        <Text as="h2" fontSize={[5, null, 6]} pt={[2, 3]}>
          {description ??
            data.site.siteMetadata.description ??
            'Default description'}
        </Text>
      </Box>
    </Flex>
  )
}

Header.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

Header.defaultProps = {
  title: null,
  description: null,
}

export default Header
