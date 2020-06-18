import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { Text } from '@components/Text'
import { Flex, Box } from '@components/Grid'
import Button from '@components/form/Button'
import Teaser from '@components/Teaser'
import ThemeContext from '@config/ThemeContext'
import FallbackImage from '@components/Image/FallbackImage'
import { themeGet, theme } from '@style'
import RecipeTeaserOverlay from './RecipeTeaserOverlay'
import {
  getHighlightColor,
  getHeaderImage,
  getListItems,
  getTeaserImage,
  getTag,
} from './mixins'

const RecipeTeaser = ({ node, searchResults, searchQuery, viewport }) => {
  const [loadmore, setLoadmore] = React.useState(false)
  const { title, path, image, difficulty, time, instructions } = node
  return (
    <Flex
      flexDirection="column"
      css="position: relative;"
      height="100%"
      pb={[2]}
    >
      <RecipeTeaserOverlay
        description={instructions}
        searchQuery={searchQuery}
        loadmore={loadmore}
        viewport={viewport}
        setLoadmore={setLoadmore}
      />
      {!searchResults.length || (
        <Box p={[2]}>
          <FallbackImage />
        </Box>
      )}
      <Teaser // Using the generic Component Teaser wrapper.
        title={title}
        image={image}
        path={path}
        padding={2}
      >
        {!difficulty || (
          <Text as="p">
            Difficulty:{' '}
            <Text
              as={getTag(difficulty)}
              color={getHighlightColor(theme.colors, difficulty)}
            >
              {difficulty}
            </Text>
          </Text>
        )}
        {!time || <Text as="p">Cooking time: {time} mins.</Text>}
      </Teaser>
      <Box mt={['auto']}>
        <Button
          pl={[1]}
          disabled
          className="center-x center-y"
          // onClick={() => {
          //   console.log(loadmore)
          //   setLoadmore(!loadmore)
          // }}
        >
          <Text
            as="em"
            className="transition-element"
            fontSize={[1]}
            color={theme.colorSchemes[viewport].link}
            css={`
              cursor: pointer;
              :hover {
                color: ${theme.colorSchemes[viewport].highlight};
              }
            `}
            onClick={() => {
              setLoadmore(!loadmore)
            }}
          >
            Learn more...
          </Text>
        </Button>
      </Box>
    </Flex>
  )
}

export default RecipeTeaser
