/*
 * Recipe Mix-ins.
 */

const getTeaserImage = node =>
  node.relationships.image.relationships.imageFile.localFile.childImageSharp
    .fluid

// const getFallbackImage = image => image.childImageSharp.fluid

const getHeaderImage = image => image.childImageSharp.fluid

const getTag = type => {
  let tag
  switch (type) {
    case 'hard':
      tag = 'strong'
      break
    default:
      tag = 'em'
      break
  }
  return tag
}
const getHighlightColor = (colors, type) => {
  const { green, yellow, red } = colors
  let color
  switch (type) {
    case 'middle':
      color = yellow[500]
      break
    case 'hard':
      color = red[500]
      break
    default:
      color = green[600]
  }
  return color
}

const formatNodes = (list, type) => {
  const items = []
  list.map(item => {
    const object = {}
    switch (type) {
      case 'query-nodes':
        const node = { ...item.node }
        object.title = node.title
        object.image = getTeaserImage(node)
        object.difficulty = node.difficulty
        object.instructions = node.instructions
        const { path } = node.fields
        object.path = path
        object.time = node.totalTime
        break
      case 'search-results':
        object.title = item.title
        object.difficulty = item.difficulty
        object.instructions = item.instructions
        object.path = item.path
        object.time = item.time
        break
      default: // test
    }
    items.push(object)
    return items
  })
  return items
}

const getStaticNodes = listItems =>
  formatNodes(listItems.recipesList.edges, 'query-nodes')

const hasResults = (searchResults, searchQuery) =>
  !!searchResults.length && searchQuery

export {
  getHighlightColor,
  getHeaderImage,
  getStaticNodes,
  getTeaserImage,
  getTag,
  formatNodes,
  hasResults,
}
