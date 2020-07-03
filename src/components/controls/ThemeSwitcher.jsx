/* eslint-disable compat/compat */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex, Text } from '@base'
import styled, { themeGet } from '@style'
import { ThemeContext } from '@config/ThemeContext'
import { useAlert } from 'react-alert'
import { useForm, Controller } from 'react-hook-form'
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'

const ThemeSwitcher = () => {
  const { control } = useForm()
  const alert = useAlert()
  const MenuItem = styled(Box)`
    + li {
      padding-left: ${themeGet('space.unit.base', '13px')};
    }
  `
  const RadioItems = ({ themeName, onClick }) => {
    const items = { default: 'Default', dark: 'Dark', dork: 'Dork' }
    return (
      <RadioGroup
        row
        aria-label="theme-switcher"
        name="theme-switcher-1"
        value={themeName}
        onChange={onClick}
      >
        {Object.entries(items).map(([key, value]) => {
          return (
            <MenuItem as="li" className="menu-item" key={key}>
              <FormControlLabel
                id={key}
                color="secondary"
                value={key}
                control={<Radio />}
                label={value}
                labelPlacement="start"
                // checked={themeName === key} # works with or without.
              />
            </MenuItem>
          )
        })}
      </RadioGroup>
    )
  }
  RadioItems.propTypes = {
    onClick: PropTypes.func.isRequired,
    themeName: PropTypes.string.isRequired,
  }
  const doAlert = themeName => {
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
  const handleChange = (e, changeTheme) => {
    const { value } = e.target
    changeTheme(value)
    doAlert(value)
  }
  return (
    <ThemeContext.Consumer>
      {context => (
        <Flex as="ul" className="menu" alignItems="center">
          <Text as="legend" mr={[4]}>
            Select theme:
          </Text>
          <Controller
            as={
              <RadioItems
                themeName={context.theme}
                onClick={e => {
                  handleChange(e, context.changeTheme)
                }}
              />
            }
            name="RadioGroup"
            control={control}
          />
        </Flex>
      )}
    </ThemeContext.Consumer>
  )
}

export default ThemeSwitcher
