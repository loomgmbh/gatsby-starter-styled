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
  const radioGroup = 'theme-picker'
  const handleChange = (e, themeName, changeTheme) => {
    // Interesting here, is that e === the old value!?
    changeTheme(themeName)
    switch (themeName) {
      case 'dark':
        alert.success(`Active theme: ${themeName}`)
        break
      case 'dork':
        alert.error(`You're a: ${themeName}`)
        break
      default:
        alert.show(`Active theme: ${themeName}`)
        break
    }
  }
  return (
    <ThemeContext.Consumer>
      {context => (
        <Flex as="ul" className="menu">
          <MenuItem as="li" className="menu-item">
            <Link to="/recipes">Recipes page</Link>
          </MenuItem>
          <MenuItem as="li" className="menu-item">
            <Link to="/one-pager">One-pager</Link>
          </MenuItem>
          <MenuItem as="li" className="menu-item">
            <Link to="/cookies">Cookies settings</Link>
          </MenuItem>
          <MenuItem as="li" className="menu-item">
            <Radio
              id="default"
              name={radioGroup}
              value={context.theme}
              label="Default"
              type="radio"
              onChange={e => handleChange(e, 'default', context.changeTheme)}
            />
          </MenuItem>
          <MenuItem as="li" className="menu-item">
            <Radio
              id="dark"
              name={radioGroup}
              value={context.theme}
              label="Dark"
              type="radio"
              onChange={e => handleChange(e, 'dark', context.changeTheme)}
            />
          </MenuItem>
          <MenuItem as="li" className="menu-item">
            <Radio
              id="dork"
              name={radioGroup}
              value={context.theme}
              label="Dork"
              type="radio"
              onChange={e => handleChange(e, 'dork', context.changeTheme)}
            />
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
