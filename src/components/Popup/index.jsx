import React from 'react'
import { Box } from '@components/Grid'

const Popup = ({ dispatch }) => (
  <Box
    background={['grey']}
    p={[3]}
    width={['50%']}
    m={['auto']}
    position="fixed"
    top="50%"
    left="50%"
    css={['transform: translate(-50%, -50%);']}
  >
    <p>We use cookies!</p>
    <button type="button" onClick={() => dispatch({ type: 'acceptCurrent' })}>
      Accept
    </button>
    <button type="button" onClick={() => dispatch({ type: 'declineAll' })}>
      Decline
    </button>
  </Box>
)

export default Popup
