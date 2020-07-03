import React, { useEffect, useState, useRef } from 'react'
import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import { useForm, Controller } from 'react-hook-form'
import qs from 'query-string'
import DOMPurify from 'dompurify'
import { Box, Flex, Input, Button, Text } from '@base'
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { themeGet } from '@style'
import SyncLoader from 'react-spinners/SyncLoader'
import { v4 as uuidv4 } from 'uuid'
import { formatNodes } from '@templates/recipe/mixins.js'
import useDebounce from '@util/useDebounce'
import Autosuggester from '@components/form/SearchBar/Autosuggester'

const defaultValues = {
  fulltext: '',
  DifficultyRadio: '',
  TimeRadio: '',
}

const RecipeSearchForm = ({
  viewport,
  location,
  queryParams,
  setSearchResults,
  children,
}) => {
  const node = useRef()
  const getUrlParameters = location => {
    return qs.parse(location.search)
  }
  // const [queryParams, setQueryParams] = useState(getUrlParameters(location))
  // const [query, setQuery] = useState(queryParams.fulltext)
  // const [dropdown, setDropdown] = useState(false)
  const { fulltext, difficulty, time } = queryParams
  const [suggestions, setSuggestions] = useState([])

  // const cachedResults = localStorage.getItem(searchQuery)
  // const searchValues = JSON.parse(localStorage.getItem('searchValues'))
  // const { fulltext, difficulty, time } = searchValues

  const handleClickOutside = e => {
    console.log('clicking anywhere')
    if (node.current.contains(e.target)) {
      console.log('// inside click')
      return
    }
    console.log('// outside click')
    // outside click
    setDropdown(false)
  }

  const { handleSubmit, register, reset, control } = useForm({ defaultValues })

  const getValidated = values => {
    const obj = {}
    Object.keys(values).map((key, value) => {
      const item = values[key]
      if (item.length > 0) {
        obj[key] = item
      }
      return obj
    })
    return obj
  }

  const buildNewQueryString = values => {
    let q = `?`
    const { length } = Object.keys(values)
    let count = 1
    Object.keys(values).map((key, value) => {
      const item = values[key]
      const str = `${key}=${item}`
      q = q.concat(str)
      if (count < length) {
        q = q.concat('&')
      }
      count += 1
      return q
    })
    return q
  }

  const onSubmit = (submittedData, e) => {
    // localStorage.setItem('searchValues', JSON.stringify(submittedData))
    // const { difficulty, time } = submittedData
    console.log(submittedData)
    // const submittedValues = getValidated(submittedData)
    // setQueryParams(submittedValues)
    // navigate(`/recipes${buildNewQueryString(submittedValues)}`)
    // setSearchQuery(fulltext)
    // setSuggestions([])
  }

  const onReset = () => {
    localStorage.setItem('searchValues', '')
    // setSearchQuery('')
  }

  const handleChange = e => {
    // e.persist()
    const { name } = e.target
    const { value } = e.target
    console.log(name, value)
    // const d = debounce(() => {
    // setLoading(true)
    // const { value } = e.target
    // setQuery(DOMPurify.sanitize(e.target.value))
    onSubmit({ fulltext: value })
    // }, 300)
    // d()
  }

  const [formData, setFormData] = useState(null)

  const [autoQuery, setAutoQuery] = useState('')

  const arrayDifficulty = ['easy', 'medium', 'hard']
  const arrayTime = ['short', 'long']

  function jsUcfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <form
      role="search"
      method="GET"
      onSubmit={handleSubmit(data => {
        // setFormData(data)
        console.log(data)
      })}
      id="recipe-search-form"
    >
      <Flex>
        <Box width={['50%']}>
          {children || <label htmlFor="search-input">{children}</label>}
          <Flex as="section" mr={[2]} css="position: relative;">
            <Input
              type="search"
              id="search-input"
              name="text"
              aria-controls="search-results-count"
              placeholder="Enter a search query"
              ref={register}
              defaultValue={fulltext}
              autoComplete="off"
              onChange={e => {
                // handleChange(e)
                // setQuery(e.target.value)
                // console.log(e.target.value)
                // onChange(e, data)
              }}
              mr={[2]}
            />
            {/* <Box ref={node}>
          <Autosuggester
            suggestions={suggestions}
            open={suggestions.length > 0}
            viewport={viewport}
            setSuggestions={setSuggestions}
          />
        </Box> */}
            <Input
              name="submit"
              ref={register}
              type="submit"
              id="submit"
              defaultValue="Submit"
              mr={[2]}
              onClick={handleSubmit(onSubmit())}
            />
            <Input
              type="reset"
              defaultValue="Reset"
              onClick={e => {
                reset(defaultValues) // Not working :/
                navigate('/recipes')
              }}
            />
          </Flex>
        </Box>
        <Flex
          width={['50%']}
          className="search-filters"
          mt={[2]}
          css={`
            button + button {
              margin-left: ${themeGet('space.unit.base', '23px')};
            }
          `}
        >
          <Box width={['50%']} as="section">
            <Controller
              as={
                <RadioGroup
                  aria-label="cooking-difficulty"
                  name="difficulty"
                  id="difficulty"
                >
                  <FormControlLabel
                    value="easy"
                    control={<Radio />}
                    label="Easy Peasy"
                  />
                  <FormControlLabel
                    value="hard"
                    control={<Radio />}
                    label="Gourmet style"
                  />
                </RadioGroup>
              }
              name="DifficultyRadio"
              control={control}
            />
          </Box>
          <Box width={['50%']} as="section">
            <Controller
              as={
                <RadioGroup aria-label="cooking-time" name="time" id="time">
                  <FormControlLabel
                    value="short"
                    control={<Radio />}
                    label="< 30 mins"
                  />
                  <FormControlLabel
                    value="long"
                    control={<Radio />}
                    label="> 30 mins"
                  />
                </RadioGroup>
              }
              name="TimeRadio"
              control={control}
            />
          </Box>
        </Flex>
      </Flex>
    </form>
  )
}

export default RecipeSearchForm
