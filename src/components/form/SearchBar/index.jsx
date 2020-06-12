import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import { useForm } from 'react-hook-form'
import DOMPurify from 'dompurify'
import { Box } from '@components/Grid'
import { Text } from '@components/Text'
import { theme } from '@style'
import Input from '@components/form/Input'
import SyncLoader from 'react-spinners/SyncLoader'
import { formatNodes } from '@templates/recipe/mixins.js'
import useDebounce from '@util/useDebounce'
import { DebounceInput } from 'react-debounce-input'
import Autosuggester from './Autosuggester'

const SearchBar = ({
  id,
  defaultValue,
  button,
  onReset,
  viewport,
  suggestions,
  setSuggestions,
  // onChange,
  onSubmit,
  resetValue,
  searchQuery,
  setSearchQuery,
  loading,
  setLoading,
  placeholder,
  searchResults,
  setSearchResults,
  children,
}) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      fulltext: searchQuery,
    },
  })

  const [autoQuery, setAutoQuery] = useState('')
  useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
    if (autoQuery && window.__LUNR__) {
      const debouncedSearch = debounce(async () => {
        // eslint-disable-next-line no-underscore-dangle
        const lunr = await window.__LUNR__.__loaded
        const refs = lunr.en.index.search(autoQuery)
        const results = refs.map(({ ref }) => lunr.en.store[ref])
        setSuggestions(formatNodes(results, 'search-results'))
        setLoading(false)
      }, 100)
      debouncedSearch()
    } else {
      console.log('empty')
      setLoading(false)
      setSuggestions([])
    }
  }, [autoQuery, setLoading])

  const onChange = (e, data) => {
    e.persist()
    const d = debounce(() => {
      setLoading(true)
      const { value } = e.target
      setAutoQuery(DOMPurify.sanitize(value))
    }, 300)
    d()
  }

  return (
    <>
      <Box id="recipe-search-form">
        <form role="search" method="GET" onSubmit={handleSubmit(onSubmit)}>
          {children || <label htmlFor="search-input">{children}</label>}
          <Box display="inline-block" mr={[2]}>
            <Input
              type="search"
              id={id || 'search-input'}
              name={id || 'search-input'}
              aria-controls="search-results-count"
              placeholder={placeholder}
              // onChange={onChange}
              ref={register}
              autoComplete="off"
              onChange={(e, data) => onChange(e, data)}
            />
            <Autosuggester
              suggestions={suggestions}
              viewport={viewport}
              setSuggestions={setSuggestions}
            />
          </Box>
          {!!button && (
            <Input
              name="submit"
              ref={register}
              type="submit"
              id="submit"
              defaultValue={defaultValue || 'Submit'}
              mr={[2]}
            />
          )}
          {!!searchQuery && (
            <Input
              ref={register}
              id="reset"
              name="reset"
              type="reset"
              defaultValue={resetValue || 'Reset'}
              onClick={(e, data) => {
                onReset(e, data, setValue)
              }}
            />
          )}
        </form>
      </Box>
    </>
  )
}

export default SearchBar
