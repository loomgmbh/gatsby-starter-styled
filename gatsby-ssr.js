/* eslint-disable react/jsx-props-no-spreading */
// const GoogleAnalytics = require('react-ga')
const React = require('react')
// const website = require('./config/website')
const themeProvider = require('./src/config/Context').default
const Wrapper = require('./src/components/Layout').default

// exports.onClientEntry = () => {
//   GoogleAnalytics.initialize(website.googleAnalyticsId)
// }

// eslint-disable-next-line react/prop-types,react/display-name
exports.wrapPageElement = ({ element, props }) => {
  // eslint-disable-next-line react/jsx-filename-extension
  return <Wrapper {...props}>{element}</Wrapper>
}

exports.wrapRootElement = themeProvider
