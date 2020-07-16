import React, { useState, useEffect, createContext, useContext } from 'react'
import useQueryString from 'use-query-string'
import { graphql, navigate } from 'gatsby'
import debounce from 'lodash.debounce'
// import Autosuggest from 'react-autosuggest';
// import { Link, OutboundLink } from '@components/Link'
import { SEO } from '@components/SEO'
import qs from 'query-string'
import { Text } from '@components/Text'
import { Flex, Box, Br } from '@components/Grid'
import Layout from '@components/Layout/base'
import { themeGet, theme } from '@style'
import { ThemeContext } from '@config/ThemeContext'
import SyncLoader from 'react-spinners/SyncLoader'
import PropTypes from 'prop-types'
import Pager from '@components/Pager'
import RecipeTeasersList from '@templates/recipe/RecipeTeasersList'
import {
  getHighlightColor,
  getHeaderImage,
  getStaticNodes,
  getTeaserImage,
  getFallbackImage,
  formatNodes,
  getTag,
  hasResults,
} from '@templates/recipe/mixins'
import RecipeSearchForm from './RecipeSearchForm'
import '@style/forms.scss'

// export const SearchContext = React.createContext()

const getUrlParameters = location => {
  return qs.parse(location.search || '')
}

let renderCount = 0
const Page = props => {
  renderCount += 1
  const { data, pageContext, location } = props
  const [query, setQuery] = useQueryString(location, navigate)
  // const [queryParams, setQueryParams] = useState(getUrlParameters(location))
  const [searchQuery, setSearchQuery] = useState(query.text || '')
  const [formValues, setFormValues] = useState({})
  const [searchResults, setSearchResults] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const { viewport, loading, setLoading } = React.useContext(ThemeContext)
  // const data.searchQuery
  // const [searchQuery, setSearchQuery] = useQueryString('fulltext')
  // const fulltext = searchParams.fulltext || ''
  // const [searchQuery, setSearchQuery] = useState(fulltext)
  // const params = getSearchParams('fulltext')
  // const [searchQuery, setSearchQuery] = useState(getSearchParams('fulltext'))
  const staticNodes = getStaticNodes(data)
  const teasers = searchResults.length ? searchResults : staticNodes

  useEffect(() => {
    // if (cachedResults) {
    //   console.log('load from cache')
    //   // eslint-disable-next-line no-underscore-dangle
    // } else

    // eslint-disable-next-line no-underscore-dangle
    if (searchQuery && window.__LUNR__) {
      const debouncedSearch = debounce(async () => {
        // eslint-disable-next-line no-underscore-dangle
        const lunr = await window.__LUNR__.__loaded
        const refs = lunr.en.index.search(searchQuery)
        const results = refs.map(({ ref }) => lunr.en.store[ref])
        // setSuggestions(results)
        setSearchResults(results)
        console.log(results)
        // setSuggestions(formatNodes(results, 'search-results'))
        // setOpen(true)
        // console.log(results, suggestions)
        setLoading(false)
      }, 500)
      debouncedSearch()
    } else {
      setLoading(false)
      // setSuggestions([])
    }
  }, [query, setLoading, setSearchResults])

  // const onSubmit = (submittedData, e) => {
  //   console.log(submittedData)
  //   // const { fulltext } = submittedData
  //   // setSearchQuery(fulltext)
  //   // navigate(`/recipes?fulltext=${encodeURIComponent(fulltext)}`)
  //   // setSuggestions([])
  // }
  // const onReset = (e, data, setValue) => {
  //   e.preventDefault()
  //   setValue('fulltext', '')
  //   // setSearchQuery('')
  //   // setSearchResults([])
  //   // setSuggestions([])
  //   navigate(`/recipes`)
  // }

  // const searchQuery = 'temp'
  return (
    <Layout
      customHeaderTitle="LOOM Cookbook"
      location={location} // Required.
      description={false}
      customIcon={getHeaderImage(data.headerImage)}
      breadcrumb="Recipes"
      footer
    >
      <Flex className="teasers-list-header" flexWrap="wrap" p={[null, 2]}>
        <Box
          as="div"
          width={[1]}
          css={`
            display: grid;
          `}
          mb={[2]}
        >
          <Box
            css={`
              grid-column: 1;
            `}
          >
            <Text as="h2">Recipes</Text>
          </Box>
          <Box
            css={`
              grid-column: 2;
            `}
          >
            <Text
              as="h4"
              css={`
                text-align: right;
                line-height: 1.70821rem;
                vertical-align: middle;
              `}
            >
              Render Count: {renderCount}
            </Text>
          </Box>
        </Box>
        {/* <SyncLoader
          loading={loading === false ? null : true}
          color={[theme.colorSchemes[viewport].highlight]}
        /> */}
        {!!loading ||
          (hasResults(searchResults, searchQuery) && (
            <Box
              className="search-results-header"
              // ml={[null, 'auto']}
              // mb={[3]}
              as="section"
              pb="2"
              aria-label="Search results for all posts"
            >
              <Text
                as="h3"
                fontSize={1}
                className="search-results-count"
                id="search-results-count"
                aria-live="assertive"
                css="position: relative; top: 14px;"
              >
                {`Found ${searchResults.length} posts for "${searchQuery}"`}
              </Text>
            </Box>
          ))}

        <Box width={[1]}>
          <RecipeSearchForm />
          {/* <RecipeSearchForm
            viewport={viewport}
            location={location}
            button
            searchQuery={searchQuery}
            placeholder="Search"
            id="fulltext"
            queryParams={queryParams}
            value={searchQuery ? 'Search again' : '=>'}
            onSubmit={onSubmit}
            onReset={onReset}
            loading={loading}
            setLoading={setLoading}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
          /> */}
        </Box>
      </Flex>
      <RecipeTeasersList
        viewport={viewport}
        // teasers={teasers}
        searchQuery={searchQuery}
        searchResults={searchResults}
      />
      {hasResults(searchResults, searchQuery) ? (
        <b>@TODO: Search results pager</b>
      ) : (
        <Pager pager={pageContext} route="/recipes" />
      )}
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  pageContext: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default Page

export const query = graphql`
  query ArticleOverviewPageQuery($skip: Int!, $limit: Int!) {
    recipesList: allRecipes(
      skip: $skip
      limit: $limit
      sort: { fields: [createdAt], order: ASC }
      filter: { isPublished: { eq: true } }
    ) {
      edges {
        node {
          id
          fields {
            slug
            path
          }
          title
          path {
            langcode
          }
          createdAt
          isPublished
          difficulty
          instructions
          totalTime
          relationships {
            image {
              id
              relationships {
                imageFile {
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 600, maxHeight: 300) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    headerImage: file(relativePath: { eq: "grill.jpg" }) {
      id
      childImageSharp {
        fluid(maxWidth: 300, maxHeight: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    errorImage: file(relativePath: { eq: "bomb.png" }) {
      id
      childImageSharp {
        fluid(maxWidth: 300, maxHeight: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`