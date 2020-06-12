import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Flex, Box } from '@components/Grid'
import { Text } from '@components/Text'
import Button from '@components/form/Button'
import { themeGet, theme } from '@style'
import ThemeContext from '@config/ThemeContext'
import RecipeTeaser from './RecipeTeaser'

const RecipeTeasersList = ({
  teasers,
  searchResults,
  searchQuery,
  viewport,
}) => {
  return (
    <Flex
      as="ul"
      className="teasers-list"
      flexWrap="wrap"
      // margin={[null, -3]}
      css={`
      li + li {
        @media only screen and (max-width: ${themeGet(
          'breakpoint.sm',
          '600px'
        )}) {
          margin-top: ${themeGet('space.unit.base', '13px')};
        }
      }
      article {
        // padding: ${themeGet('space.unit.small', '4px')};
      }
    `}
    >
      {teasers.map(node => {
        return (
          <Box
            as="li"
            width={[1, null, 1 / 2, 1 / 3]}
            key={uuidv4()}
            className="teasers-list--teaser-wrapper"
            p={[0, 2]}
          >
            <Box
              border={2}
              borderStyle="solid"
              height="100%"
              minHeight="100%"
              className="teasers-list--teaser-wrapper__inner teaser-with-border"
              flexDirection="column"
            >
              <RecipeTeaser
                node={node}
                searchResults={searchResults}
                viewport={viewport}
                searchQuery={searchQuery}
              />
            </Box>
          </Box>
        )
      })}
    </Flex>
  )
}

export default RecipeTeasersList
