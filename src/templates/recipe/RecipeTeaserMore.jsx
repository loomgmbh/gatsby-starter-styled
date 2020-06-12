import React from 'react'
import { Text } from '@components/Text'
import { Box } from '@components/Grid'
import Button from '@components/form/Button'
import Highlighter from 'react-highlight-words'
import Close from '@components/icons/Close'
import { theme, themeGet } from '@style'
import { getHighlightColor } from './mixins'

const RecipeTeaserMore = ({
  description,
  searchQuery,
  loadmore,
  viewport,
  setLoadmore,
}) => {
  return (
    <Box
      className={`${loadmore ?? `loaded`}`}
      bg={['#000']}
      style={{ maxHeight: loadmore ? `100%` : `0` }}
      css={`
        transition: all 300ms ease-in;
        max-height: 0;
        opacity: 1;
        padding: 0;
        position: absolute;
        z-index: 1;
        overflow: hidden;
        height: 100%;
        text-overflow: ellipsis;
      `}
    >
      <Text
        as="p"
        color={getHighlightColor(theme.colors)}
        fontSize={[4]}
        p={[4]}
        fontStyle="italic"
        css={`
          position: relative;
          width: 100%;
          overflow: hidden;
          height: calc(100% - ${themeGet('space.unit.large')} - 13px);
          text-overflow: ellipsis;
        `}
      >
        <Highlighter
          searchWords={[searchQuery]}
          autoEscape
          textToHighlight={description}
        />
      </Text>
      <Button
        m={[2]}
        className="transition-element"
        width={['25px']}
        css={`
          cursor: pointer;
          border: 0;
          padding: 0;
          background: none;
          color: inherit;
          :hover {
            color: ${theme.colorSchemes[viewport].link};
          }
        `}
        onClick={() => setLoadmore(!loadmore)}
      >
        <Close />
      </Button>
    </Box>
  )
}
export default RecipeTeaserMore
