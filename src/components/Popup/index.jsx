import React from 'react'
import { Box } from '@components/Grid'
import { Text } from '@components/Text'
import { Button } from '@components/Button'

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
    <Button
      size="large"
      variant="secondary"
      onClick={() => dispatch({ type: 'acceptCurrent' })}
      mr={[2]}
    >
      Accept
    </Button>
    <Button size="large" onClick={() => dispatch({ type: 'declineAll' })}>
      Decline
    </Button>
  </Box>
)

export default Popup
