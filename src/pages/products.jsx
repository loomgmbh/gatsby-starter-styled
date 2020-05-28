import React from 'react'
import { graphql } from 'gatsby'
import { Link, OutboundLink } from '@components/Link'
import { SEO } from '@components/SEO'
import { Text } from '@components/Text'
import { Flex, Box, Br } from '@components/Grid'
import Layout from '@components/Layout/base'
import styled from '@style'
import { ThemeContext } from '@config/ThemeContext'
import Teaser from '@components/Teaser'

const IndexPage = ({ data, pageContext, location }) => {
  console.log(pageContext, location)
  const { nodes } = data.allShopifyProduct
  const getThumbnail = images => {
    return images.length > 0
      ? images[0].localFile.childImageSharp.thumbnail
      : null
  }

  return (
    <ThemeContext.Consumer>
      {context => (
        <>
          <SEO />
          <Layout title="Products">
            <Flex flexWrap="wrap">
              {nodes.map(node => {
                // console.log(node)
                return (
                  <Box
                    width={[1, 1 / 2, 1 / 3, 1 / 4]}
                    p={[null, 3]}
                    key={node.id}
                  >
                    <Teaser
                      title={node.title}
                      path={node.fields.shopifyThemePath}
                      image={getThumbnail(node.images)}
                    />
                  </Box>
                )
              })}
            </Flex>
          </Layout>
        </>
      )}
    </ThemeContext.Consumer>
  )
}

export const query = graphql`
  query AllProductsQuery {
    allShopifyProduct {
      nodes {
        id
        title
        description
        fields {
          shopifyThemePath
        }
        images {
          localFile {
            childImageSharp {
              # main: fluid(maxWidth: 800, srcSetBreakpoints: [400, 800]) {
              #   ...GatsbyImageSharpFluid
              # }
              thumbnail: fluid(
                maxWidth: 300
                maxHeight: 300 # srcSetBreakpoints: [90]
              ) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`

// query AllProductsQuery {
//   allShopifyCollection(filter: { handle: { eq: $handle } }) {
//     nodes {
//       title
//       handle
//       fields {
//         shopifyThemePath
//       }
//       products {
//         id
//         title
//         description
//         fields {
//           shopifyThemePath
//         }
//         images {
//           localFile {
//             childImageSharp {
//               # main: fluid(maxWidth: 800, srcSetBreakpoints: [400, 800]) {
//               #   ...GatsbyImageSharpFluid
//               # }
//               thumbnail: fluid(
//                 maxWidth: 300
//                 maxHeight: 300 # srcSetBreakpoints: [90]
//               ) {
//                 ...GatsbyImageSharpFluid
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }

export default IndexPage
