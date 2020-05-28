const path = require('path')

const { createFilePath } = require('gatsby-source-filesystem')

const hasOwnProp = require('has-own-prop')
const R = require('ramda')

const { paginate } = require('gatsby-awesome-pagination')

const productTemplate = require.resolve('./src/templates/product/index.jsx')
const cartTemplate = require.resolve('./src/templates/cart/index.jsx')
const catalogTemplate = require.resolve('./src/templates/catalog/index.jsx')
const mainPageTemplate = require.resolve('./src/templates/main/index.jsx')
const policyTemplate = require.resolve('./src/templates/policy/index.jsx')
const blogTemplate = require.resolve('./src/templates/blog/index.jsx')
const pageTemplate = require.resolve('./src/templates/page/index.jsx')
// const articleTemplate = require.resolve(
//   './src/templates/blog/article/index.jsx'
// )

const typeDefs = require('./typedefs')

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
    createNodeField({
      node,
      name: `path`,
      value: `/${slug}`,
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
  return new Promise((resolve, reject) => {
    return graphql(
      `
        {
          allRecipes(limit: 100) {
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
      `
    ).then(result => {
      if (result.errors) {
        reject(result.errors)
      }
      const articleTemplate = path.resolve(`./src/templates/recipe.jsx`)
      const edges = result.data.allRecipes.edges || []
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
      paginate({
        createPage,
        items: edges,
        itemsPerPage: 9,
        pathPrefix: '/recipes',
        component: path.resolve(`./src/templates/recipes.jsx`),
      })
      resolve()
    })
  })
}

// let isShopifyLite = false
// let enableWebp = true

// Used as workaround (together with cache) to store and access Blogs ids and handles while creating fields for Articles
// const availableBlogs = []

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
        '@test': path.resolve(__dirname, './src/util/test'),
        '@config': path.resolve(__dirname, './src/config'),
        '@templates': path.resolve(__dirname, './src/templates'),
        '@util': path.resolve(__dirname, './src/util'),
        '@src': path.resolve(__dirname, './src'),
      },
    },
  })
}

// exports.onCreateNode = ({ node, getNode, actions }) => {
//   const { createNodeField } = actions
//   if (node.internal.type === `MarkdownRemark`) {
//     const slug = createFilePath({ node, getNode, basePath: 'pages' })
//     createNodeField({
//       node,
//       name: `slug`,
//       value: slug,
//     })
//   }
// }

function removeTrailingLeadingSlashes(string) {
  return string.replace(/^\/*|\/*$/g, '')
}

const getMainPageHandles = mainPage => {
  const handles = []
  mainPage.forEach(element => {
    if (element.type === 'collection' || element.type === 'product') {
      handles.push(element.handle)
    } else if (
      (element.type === 'carousel' || element.type === 'header') &&
      element.children.length > 0
    ) {
      element.children.forEach(e => {
        handles.push(e.handle)
      })
    }
  })
  return handles
}

const createProductNode = (options, actions, node) => {
  let { basePath = '', productPageBasePath = 'product' } = options
  const { createNodeField } = actions
  basePath = removeTrailingLeadingSlashes(basePath)
  productPageBasePath = removeTrailingLeadingSlashes(productPageBasePath)

  // Todo: Improve the way this is done. Maybe using the config.json file.
  createNodeField({
    node,
    name: 'shopifyThemePath',
    value: `${basePath && `/${basePath}`}/${productPageBasePath}/${
      node.handle
    }`,
  })

  createNodeField({
    node,
    name: 'firstImage',
    value: node.images[0] ? node.images[0] : {},
  })
}

const createCollectionNode = (options, actions, node) => {
  let { basePath = '', collectionPageBasePath = 'collection' } = options
  const { createNodeField } = actions
  basePath = removeTrailingLeadingSlashes(basePath)
  collectionPageBasePath = removeTrailingLeadingSlashes(collectionPageBasePath)
  // Todo: Improve the way this is done. Maybe using the config.json file.
  createNodeField({
    node,
    name: 'shopifyThemePath',
    value: `${basePath && `/${basePath}`}/${collectionPageBasePath}/${
      node.handle
    }`,
  })
}

const createCollectionsPages = async (
  graphql,
  productsPerCollectionPage,
  createPage,
  finalCartPagePath
) => {
  const queryCollections = await graphql(`
    {
      collections: allShopifyCollection {
        nodes {
          handle
          products {
            id
          }
          fields {
            shopifyThemePath
          }
        }
      }
    }
  `)

  if (
    queryCollections &&
    queryCollections.data &&
    R.hasPath(['collections', 'nodes'], queryCollections.data)
  ) {
    queryCollections.data.collections.nodes.forEach(
      ({ handle, products, fields }) => {
        const { shopifyThemePath } = fields
        const collectionProductsCount = products.length
        const productsPerPage = parseInt(productsPerCollectionPage, 10)
        const numPages = Math.ceil(collectionProductsCount / productsPerPage)
        Array.from({
          length: numPages,
        }).forEach((_, i) => {
          createPage({
            path:
              i === 0 ? `${shopifyThemePath}` : `${shopifyThemePath}/${i + 1}`,
            component: catalogTemplate,
            context: {
              handle,
              shopifyThemePath,
              limit: productsPerPage,
              skip: i * productsPerPage,
              numPages,
              currentPage: i + 1,
              // Todo: Find a better way to do this.
              cartUrl: finalCartPagePath,
              enableWebp,
            },
          })
        })
      }
    )
  }
}

const createProductsPages = async (graphql, createPage, finalCartPagePath) => {
  const queryProducts = await graphql(`
    {
      products: allShopifyProduct {
        nodes {
          handle
          fields {
            shopifyThemePath
          }
        }
      }
    }
  `)
  queryProducts.data.products.nodes.forEach(({ handle, fields }) => {
    const { shopifyThemePath } = fields
    createPage({
      path: shopifyThemePath,
      component: productTemplate,
      context: {
        handle,
        // Todo: Find a better way to do this.
        cartUrl: finalCartPagePath,
        enableWebp,
      },
    })
  })
}

exports.onPreInit = (_, pluginOptions) => {
  isShopifyLite = hasOwnProp(pluginOptions, 'shopifyLite')
    ? pluginOptions.shopifyLite
    : false
  enableWebp = hasOwnProp(pluginOptions, 'enableWebp')
    ? pluginOptions.enableWebp
    : true
}

exports.onCreateNode = async ({ node, actions, cache, getNode }, options) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: 'pages' })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
  switch (node.internal.type) {
    case `ShopifyProduct`:
      createProductNode(options, actions, node)
      break
    case `ShopifyCollection`:
      createCollectionNode(options, actions, node)
      break
    // case `ShopifyShopPolicy`:
    //   createShopPolicyNode(options, actions, node)
    //   break
    case `ShopifyPage`:
      // createPageNode(options, actions, node)
      break
    // case `ShopifyBlog`:
    //   await createBlogNode(options, actions, node, cache)
    //   break
    // case `ShopifyArticle`:
    //   await createArticleNode(options, actions, node, cache)
    //   break
    default: // do nothing
  }
}

exports.createPages = async ({ graphql, actions }, options) => {
  const gatsbyStorefrontConfig = await graphql(`
    {
      site {
        siteMetadata {
          gatsbyStorefrontConfig {
            productsPerCollectionPage
            articlesPerBlogPage
          }
        }
      }
    }
  `)
  const {
    productsPerCollectionPage = 9,
    articlesPerBlogPage = 6,
  } = gatsbyStorefrontConfig.data.site.siteMetadata.gatsbyStorefrontConfig

  const { createPage } = actions
  let { cartPagePath = 'cart', basePath = '' } = options
  basePath = removeTrailingLeadingSlashes(basePath)
  cartPagePath = removeTrailingLeadingSlashes(cartPagePath)

  const finalCartPagePath = `${basePath && `/${basePath}`}/${cartPagePath}`
  createPage({
    path: finalCartPagePath,
    component: cartTemplate,
  })

  // await createMainPage(basePath, graphql, createPage)

  await createCollectionsPages(
    graphql,
    productsPerCollectionPage,
    createPage,
    finalCartPagePath
  )

  await createProductsPages(graphql, createPage, finalCartPagePath)

  // await createPoliciesPages(graphql, createPage, finalCartPagePath)

  // In case Shopify Lite plan we don't have data to create Pages, Blogs and Articles
  // if (!isShopifyLite) {
  //   await createPagePages(graphql, createPage, finalCartPagePath)

  // const queryArticles = await createArticlePages(
  //   graphql,
  //   createPage,
  //   finalCartPagePath
  // )

  // await createBlogPages(
  //   graphql,
  //   queryArticles,
  //   articlesPerBlogPage,
  //   createPage,
  //   finalCartPagePath
  // )
  // }

  // Fetch your items (blog posts, categories, etc).
  const products = await graphql(`
    query AllProductsQuery {
      allShopifyProduct {
        nodes {
          id
        }
      }
    }
  `)

  // Create your paginated pages
  paginate({
    createPage, // The Gatsby `createPage` function
    items: products.data.allShopifyProduct.nodes, // An array of objects
    itemsPerPage: 9, // How many items you want per page
    pathPrefix: '/products', // Creates pages like `/blog`, `/blog/2`, etc
    component: path.resolve('src/pages/products.jsx'), // Just like `createPage()`
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  // Here we define types.
  // We need it in case some data wasn't set up, but queries need to pass verification during build process.
  // While build process GatsbyJS extracts queries and checks them against schema (see https://www.gatsbyjs.org/docs/query-extraction/).

  const { createTypes } = actions
  createTypes(typeDefs)
}
