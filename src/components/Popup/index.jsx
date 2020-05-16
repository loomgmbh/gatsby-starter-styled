import React from 'react'
import { Box } from '@components/Grid'
import { Text } from '@components/Text'

const Popup = ({ dispatch }) => (
  <Box
    background={['grey']}
    p={[4]}
    width={['75%']}
    m={['auto']}
    position="fixed"
    top="50%"
    left="50%"
    css={['transform: translate(-50%, -50%);', 'z-index: 9']}
  >
    <Text as="h3" pb={[3]}>
      We use cookies!
    </Text>
    <button type="button" onClick={() => dispatch({ type: 'acceptCurrent' })}>
      Accept
    </button>
    <button type="button" onClick={() => dispatch({ type: 'declineAll' })}>
      Decline
    </button>
  </Box>
)

export default Popup
