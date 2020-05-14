import React from 'react'

import { Link } from '@components/Link'
import { SEO } from '@components/SEO'
import { Box } from '@components/Grid'
import { Text } from '@components/Text'
import Layout from '@components/Layout/onePager'

const page = () => {
  const title = 'TNT Layouts Page'
  const description =
    'Layout-components make it easy to create different pages.'
  return (
    <>
      <SEO
        title={title}
        pathname="/page-2"
        description={description}
        isArticle
        articleMeta={{
          datePublished: '2018-09-12',
          dateModified: '2019-09-12',
        }}
      />
      <Layout title={title} type="title-override" description={description}>
        <Text as="h2" mb={3}>
          {description}
        </Text>
        <Text as="p" mb={3}>
          Override metatdata in your top-level page files or wherever you call a
          Layout-Component for increased customization.
        </Text>
        <Text as="p" mb={3} css={{ fontStyle: 'italic' }} color="blue">
          @todo: slick onepager.
        </Text>
        <Box mb={3}>
          <Link to="/">Go back to the homepage</Link>
        </Box>
      </Layout>
    </>
  )
}

export default page
