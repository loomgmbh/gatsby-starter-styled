import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '@components/Link'
import { Box, Flex } from '@components/Grid'
import Radio from '@components/Radio'
import styled, { themeGet } from '@style'
import { ThemeContext } from '@config/ThemeContext'
import { useAlert } from 'react-alert'

const Menu = props => {
  const alert = useAlert()

  const MenuItem = styled(Box)`
    + li {
      padding-left: ${themeGet('space.unit.base', '13px')};
    }
  `
  return (
    // todo, add active page context.
    <ThemeContext.Consumer>
      {context => (
        <Flex as="ul" className="menu">
          <MenuItem as="li" className="menu-item">
            <Link to="/products">Product catalog</Link>
          </MenuItem>
          <MenuItem as="li" className="menu-item">
            <Link to="/one-pager">One-pager</Link>
          </MenuItem>
          <MenuItem as="li" className="menu-item">
            <Link to="/cookies">Cookies settings</Link>
          </MenuItem>
        </Flex>
      )}
    </ThemeContext.Consumer>
  )
}

// Menu.propTypes = {
//   title: PropTypes.string,
//   description: PropTypes.string,
// }

// Menu.defaultProps = {
//   title: null,
//   description: null,
// }

export default Menu
