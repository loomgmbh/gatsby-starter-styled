import React, { useEffect, useState, useRef } from 'react'
import { Box } from '@components/Grid'
import { Button } from '@components/Button'
import { v4 as uuidv4 } from 'uuid'

const Dropdown = ({ value, options, placeholder = 'Select', onChange }) => {
  const node = useRef()

  const [open, setOpen] = useState(false)

  const handleClickOutside = e => {
    console.log('clicking anywhere')
    if (node.current.contains(e.target)) {
      // inside click
      return
    }
    // outside click
    setOpen(false)
  }

  const handleChange = selectedValue => {
    onChange(selectedValue)
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  return (
    <Box ref={node} className="dropdown">
      <Button className="dropdown-toggler" onClick={e => setOpen(!open)}>
        {value || placeholder}
      </Button>
      {open && (
        <Box as="ul" className="dropdown-menu">
          {options.map(opt => (
            <Box
              key={uuidv4()}
              as="li"
              className="dropdown-menu-item"
              onClick={e => handleChange(opt)}
            >
              {opt}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default Dropdown
