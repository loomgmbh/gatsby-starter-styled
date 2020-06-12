import React from 'react'
import { Box } from '@components/Grid'
import { Text } from '@components/Text'
import { Link } from '@components/Link'
import { v4 as uuidv4 } from 'uuid'
import { theme } from '@style'

const formatSuggestions = suggestions => {
  const items = {}
  suggestions.map(item => {
    const label = item.difficulty || 'unknown'
    if (typeof items[label] === 'undefined') {
      items[label] = []
    }
    items[label].push({ title: item.title, path: item.path })
    return items
  })
  return items
}

const active = suggestions => suggestions.length > 0

const Autosuggester = ({ suggestions, viewport }) => {
  const formatted = formatSuggestions(suggestions)
  return (
    <Box
      className="autosuggester"
      color={theme.colorSchemes[viewport].link}
      border="2px solid"
      borderColor={theme.colorSchemes[viewport].highlight}
      bg={theme.colorSchemes[viewport].base_contrast}
      style={{
        maxHeight: active(suggestions) ? '500px' : 0,
        opacity: active(suggestions) ? 1 : 0,
      }}
      css={`
        transition: all 500ms ease-in;
        // opacity: 0;
        position: absolute;
        z-index: 1;
        max-height: 0;
        overflow: auto;
        padding: 0;
        border: 0;
        li + li {
          margin-top: 5px;
        }
      `}
    >
      {Object.entries(formatted).map(([key, values]) => {
        return (
          <Box key={uuidv4()} as="ul" p={[2]}>
            <Box key={uuidv4()} as="li">
              <Text as="small" color={theme.colorSchemes[viewport].highlight}>
                {key}
              </Text>
            </Box>
            {values.map(item => {
              return (
                <Box key={uuidv4()} as="li" pl={[2]}>
                  <Link to={item.path} from="search-bar">
                    {item.title}
                  </Link>
                </Box>
              )
            })}
          </Box>
        )
      })}
    </Box>
  )
}

export default Autosuggester
