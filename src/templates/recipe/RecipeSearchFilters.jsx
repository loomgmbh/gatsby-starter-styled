import React, { useState } from 'react'
import { Box, Input, Button, Text } from '@base'
import { Link } from '@components/Link'
import RadioButton from '@components/form/RadioButton'
import Dropdown from '@components/Dropdown'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import styled, { themeGet } from '@style'

const parameters = path => {
  return path.split('/')
}
const getFilter = path => {
  const params = parameters(path)
  // console.log(params)
  if (typeof params[3] !== 'undefined') {
    return params[3]
  }
}

const RecipeSearchFilters = ({ location, register }) => {
  const [vegetagle, setVegetable] = useState(undefined)

  const pathname = location ? location.pathname : null
  const current = pathname ? getFilter(pathname) : null

  const arrayDifficulty = ['easy', 'medium', 'hard']
  const arrayTime = ['short', 'long', 'very long']
  function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  return (
    <Box
      className="search-filters"
      mt={[2]}
      css={`
        button + button {
          margin-left: ${themeGet('space.unit.base', '23px')};
        }
      `}
    >
      <Box className="search-filters__difficulty">
        {arrayDifficulty.map(item => {
          return (
            <Button key={uuidv4()}>
              {/* <Link
                to={`/recipes/difficulty/${item}`}
                from="search-bar"
                className="search-filter-button"
              > */}
              <RadioButton
                id={item}
                ref={register}
                defaultValue={item}
                group="difficulty"
                // current={current}
              >
                {jsUcfirst(item)}
              </RadioButton>
              {/* </Link> */}
            </Button>
          )
        })}
      </Box>
      <Box className="search-filters__time">
        {/* <Dropdown
          placeholder="Duration"
          value={vegetagle}
          onChange={v => setVegetable(v)}
          options={['Tomato', 'Cucumber', 'Potato']}
        > */}
        <Box as="ul" className="dropdown">
          {arrayTime.map(item => {
            return (
              <Box as="li" className="dropdown__item" key={uuidv4()}>
                <RadioButton
                  id={item}
                  ref={register}
                  defaultValue={item}
                  group="time"
                  // current={current}
                >
                  {item}
                </RadioButton>
              </Box>
            )
          })}
        </Box>
        {/* </Dropdown> */}
      </Box>
    </Box>
  )
}
export default RecipeSearchFilters
