const path = require('path')

const { createFilePath } = require('gatsby-source-filesystem')

const { paginate } = require('gatsby-awesome-pagination')

const _ = require(`lodash`)
const Promise = require(`bluebird`)

const slash = require(`slash`)
const transliteration = require('transliteration')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  const { type } = node.internal
  if (type === 'recipes') {
    const slugFragment = transliteration.slugify(node.title)
    const slug = `${slugFragment}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    // @TODO: could also get alias from Drupal entity.
    createNodeField({
      node,
      name: `path`,
      value: `/recipes/${slug}`,
    })
    createNodeField({
      node,
      name: `type`,
      value: type,
    })
  }
}
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const promises = []

  // All Nodes.
  const allNodes = graphql(`
    {
      allRecipes(limit: 30) {
        edges {
          node {
            id
            fields {
              path
              type
            }
          }
        }
      }
    }
  `)
    .then(result => {
      if (result.errors) {
        // eslint-disable-next-line promise/catch-or-return
        Promise.reject(result.errors)
      }
      const articleTemplate = path.resolve(`./src/templates/recipe/node.jsx`)
      const edges = result.data.allRecipes.edges || []
      // Make node pages.
      _.each(edges, (edge, key) => {
        if (edge.node.fields.type === 'recipes') {
          createPage({
            path: edge.node.fields.path,
            component: slash(articleTemplate),
            context: {
              id: edge.node.id,
              prev: key > 0 ? edges[key - 1].node.fields.path : null,
              next:
                key < edges.length - 1 ? edges[key + 1].node.fields.path : null,
            },
          })
        }
      })
      return edges
    })
    // eslint-disable-next-line no-console
    .catch(() => console.error('Error'))

  promises.push(allNodes)

  const paginatedOverview = graphql(`
    {
      allRecipes(limit: 30) {
        edges {
          node {
            id
            fields {
              path
              type
            }
          }
        }
      }
    }
  `)
    .then(result => {
      if (result.errors) {
        // eslint-disable-next-line promise/catch-or-return
        Promise.reject(result.errors)
      }
      const edges = result.data.allRecipes.edges || []
      // Make node pages.
      paginate({
        createPage,
        items: edges,
        itemsPerPage: 9,
        pathPrefix: '/recipes',
        component: path.resolve(
          `./src/templates/recipe/recipe-teasers-page.jsx`
        ),
      })
      return edges
    })
    // eslint-disable-next-line no-console
    .catch(() => console.error('Error'))
  promises.push(paginatedOverview)

  // const filters = ['hard', 'medium', 'easy']
  // filters.map(filter => {
  //   const filterQuery = graphql(`
  //     {
  //       allRecipes(limit: 30, filter: { difficulty: { eq: "hard" } }) {
  //         edges {
  //           node {
  //             id
  //             fields {
  //               path
  //               type
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `)
  //     .then(result => {
  //       if (result.errors) {
  //         // eslint-disable-next-line promise/catch-or-return
  //         Promise.reject(result.errors)
  //       }
  //       const edges = result.data.allRecipes.edges || []
  //       // Make node pages.
  //       paginate({
  //         createPage,
  //         items: edges,
  //         itemsPerPage: 9,
  //         pathPrefix: `/recipes/${filter}`,
  //         component: path.resolve(
  //           `./src/templates/recipe/recipe-teasers-page.jsx`
  //         ),
  //       })
  //       return edges
  //     })
  //     // eslint-disable-next-line no-console
  //     .catch(() => console.error('Error'))
  //   promises.push(filterQuery)
  // })

  return Promise.all(promises)
}

/**
 * Enable absolute imports with `/src` as root.
 *
 * See: https://github.com/alampros/gatsby-plugin-resolve-src/issues/4
 */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@style': path.resolve(__dirname, './src/util/style'),
        '@components': path.resolve(__dirname, './src/components'),
        '@base': path.resolve(__dirname, './src/components/base'),
        '@test': path.resolve(__dirname, './src/util/test'),
        '@config': path.resolve(__dirname, './src/config'),
        '@templates': path.resolve(__dirname, './src/templates'),
        '@util': path.resolve(__dirname, './src/util'),
        '@src': path.resolve(__dirname, './src'),
      },
    },
  })
}
