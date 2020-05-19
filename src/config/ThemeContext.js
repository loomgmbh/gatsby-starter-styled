/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import { useWindowDimensions, getViewport } from '../util/index'

export const ThemeContext = React.createContext()

const Provider = props => {
  const [theme, setTheme] = useState('default')
  const { height, width } = useWindowDimensions()
  const [viewport, setViewport] = useState('none')
  useEffect(() => {
    setViewport(getViewport(height, width))
  }, [height, width])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme: themeName => setTheme(themeName),
        viewport,
        changeViewport: viewportName => setViewport(viewportName),
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ({ element }) => <Provider>{element}</Provider>
