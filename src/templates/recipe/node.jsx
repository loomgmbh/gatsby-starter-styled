import React from 'react'
import { graphql } from 'gatsby'
import { Link, OutboundLink } from '@components/Link'
import { SEO } from '@components/SEO'
import { Text } from '@components/Text'
import { Flex, Box, Br } from '@components/Grid'
import Layout from '@components/Layout/base'
import styled, { space, layout, themeGet, theme } from '@style'
import { ThemeContext } from '@config/ThemeContext'
import Region from '@components/Layout'
import Header from '@components/Header'
import Teaser from '@components/Teaser'
import { Image, BgImage } from '@components/Image'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'

import Pager from '@components/Pager'

// import styled, { space, layout } from '@style'

const Article = props => {
  const { data, pageContext, location } = props
  // const getListItems = listItems => listItems.recipesList.edges

  // const getTeaserImage = node => {
  //   return node.relationships.image.relationships.imageFile.localFile
  //     .childImageSharp.fluid
  // }
  const getHeaderImage = image => {
    return image.childImageSharp.fluid
  }

  // const list = getListItems(data)
  // console.log(props)
  return (
    <ThemeContext.Consumer>
      {context => (
        <Layout
          location={location}
          title="LOOM Cookbook"
          description={false}
          customIcon={getHeaderImage(data.image)}
          breadcrumb="Recipes"
        >
          <Flex as="header" flexWrap="wrap">
            <Text as="h2" mb="3">
              Recipes
            </Text>
          </Flex>
          <Flex
            as="ul"
            className="teasers-list"
            flexWrap="wrap"
            margin={[null, -3]}
            css={`
              // li + li {
              //   margin-top: ${themeGet('space.unit.base', '13px')};
              // }
              // article {
              //   padding: ${themeGet('space.unit.small', '4px')};
              // }
            `}
          />
        </Layout>
      )}
    </ThemeContext.Consumer>
  )
}

// page.propTypes = {
//   data: PropTypes.objectOf(PropTypes.any).isRequired,
//   pageContext: PropTypes.objectOf(PropTypes.any).isRequired,
//   location: PropTypes.objectOf(PropTypes.any).isRequired,
// }

export default Article

export const query = graphql`
  query($id: String!) {
    recipes(id: { eq: $id }) {
      title
      id
      preparationTime
      difficulty
      relationships {
        image {
          relationships {
            imageFile {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 600) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
        category {
          name
        }
      }
    }
    image: file(relativePath: { eq: "grill.jpg" }) {
      id
      childImageSharp {
        fluid(maxWidth: 300, maxHeight: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
