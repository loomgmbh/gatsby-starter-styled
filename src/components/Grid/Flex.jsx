import styled, { flexbox, propTypes } from 'util/style'

import Box from './Box'

const Flex = styled(Box)`
  ${flexbox}
`

Flex.displayName = `Flex`

Flex.defaultProps = {
  display: 'flex',
}

Flex.propTypes = {
  ...propTypes.flexbox,
}

export default Flex
