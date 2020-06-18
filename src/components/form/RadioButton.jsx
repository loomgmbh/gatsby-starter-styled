import React from 'react'
import { Input, Text } from '@base'

const RadioButton = props => {
  const { id, ref, value, group, current, onChange, children } = props
  return (
    <>
      <Text as="label" pr={[2]} htmlFor={id}>
        {children}
      </Text>
      <Input
        id={id}
        ref={ref}
        type="radio"
        defaultValue={value}
        name={group}
        // checked={current === value}
        onChange={e => !!onChange ?? onChange(e.target.value)}
      />
    </>
  )
}
export default RadioButton
RadioButton.displayName = 'RadioButton'
