const website = require('./src/config/website')

const pathPrefix = website.pathPrefix === `/` ? `` : website.pathPrefix

const shopName = process.env.GATSBY_SHOP_NAME
const accessToken = process.env.GATSBY_SHOPIFY_ACCESS_TOKEN
const imageQuality = '95'
const manifest = {}
const shopifyLite = false

module.exports = {
  pathPrefix: website.pathPrefix,
  siteMetadata: {
    pathPrefix,
    siteUrl: website.url + pathPrefix,
    title: website.title,
    titleTemplate: website.titleTemplate,
    description: website.description,
    image: website.image,
    siteLanguage: website.siteLanguage,
    headline: website.headline,
    author: website.author,
    twitter: website.twitter,
    gatsbyStorefrontConfig: {
      storeName: 'Gatsby Storefront',
      storeDescription: 'Demo store description',
      email: 'info@gatsbystorefront.com',
      logoUrl: '',
      company: 'Gatsby Storefront Inc.',
      location: 'New York, NY',
      address: '1 Centre St.',
      phone: '+1 (800) 123-1234',
      workingDays: 'Mon - Fri',
      workingHours: '8AM - 6PM',
      socialNetworks: [],
      payments: [],
      // For available socia share buttons see: https://github.com/nygardk/react-share
      shareButtons: [],
      googleAnalyticsId: 'UA-141525658-3',
      isShopifyLite: shopifyLite,
      //
      // Main page types: "carousel", "collection", "product"
      //
      mainPage: [],
      // Menu types: "header", "collection", "product", "link"
      menu: {},
      footerLinks: [],
      locales: 'en-US',
      currency: 'USD',
      productsPerCollectionPage: '9',
      articlesPerBlogPage: '6',
    },
  },
  plugins: [
    // {
    //   resolve: '@gatsbystorefront/gatsby-theme-storefront-shopify',
    //   options: {
    //     shopName: process.env.GATSBY_SHOP_NAME,
    //     accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
    //     basePath: '/',
    //     shopifyLite: false, // default 'false'
    //     enableWebp: true, // default 'true'
    //     imageQuality: '95', // default '95', better to decrease but always check your result images quality
    //     manifest: {
    //       // web app manifest options to be passed to 'gatsby-plugin-manifest' installed inside theme
    //       name: 'Gatsby Storefront Demo Store',
    //       short_name: 'Gatsby Storefront',
    //       start_url: '/',
    //       background_color: '#fff',
    //       theme_color: '#333',
    //       display: 'standalone',
    //       icon: 'src/images/shopping_bag.svg',
    //       cache_busting_mode: 'none',
    //     },
    //   },
    // },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        prettier: true, // use prettier to format JS code output (default)
        svgo: true, // use svgo to optimize SVGs (default)
        svgoConfig: {
          removeViewBox: true, // remove viewBox when possible (default)
          cleanupIDs: true, // remove unused IDs and minify remaining IDs (default)
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/images`,
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: process.env.NODE_ENV !== `production`,
        fileName: false,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `./src/config/typography.js`,
      },
    },
    {
      resolve: `gatsby-plugin-lodash`,
      options: {
        disabledFeatures: [`shorthands`, `cloning`, `currying`],
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: website.googleAnalyticsId,
        anonymize: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: website.title,
        short_name: website.shortName,
        description: website.description,
        start_url: `${pathPrefix}/?utm_source=a2hs`,
        background_color: website.backgroundColor,
        theme_color: website.themeColor,
        display: `standalone`,
        icon: website.favicon,
      },
    },
    {
      resolve: 'gatsby-source-shopify',
      options: {
        shopName,
        accessToken,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Work Sans'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: '#333',
        showSpinner: false,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: imageQuality,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-theme-ui',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: manifest.hasOwnProperty('name')
          ? manifest.name
          : 'Gatsby Storefront',
        short_name: manifest.hasOwnProperty('short_name')
          ? manifest.short_name
          : 'Gatsby Storefront',
        start_url: manifest.hasOwnProperty('start_url')
          ? manifest.start_url
          : '/',
        background_color: manifest.hasOwnProperty('background_color')
          ? manifest.background_color
          : '#fff',
        theme_color: manifest.hasOwnProperty('theme_color')
          ? manifest.theme_color
          : '#333',
        display: manifest.hasOwnProperty('display')
          ? manifest.display
          : 'standalone',
        icon: manifest.hasOwnProperty('icon') ? manifest.icon : undefined,
        cache_busting_mode: manifest.hasOwnProperty('cache_busting_mode')
          ? manifest.cache_busting_mode
          : 'none',
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
    },
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-lint-queries',
    {
      resolve: '@gatsby-contrib/gatsby-plugin-elasticlunr-search',
      options: {
        // Fields to index
        fields: ['title', 'tags'],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          ShopifyProduct: {
            title: node => node.title,
            tags: node => node.tags,
            shopifyThemePath: node => node.fields.shopifyThemePath,
          },
        },
      },
    },
  ],
}
