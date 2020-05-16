/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'

export const ThemeContext = React.createContext()

const Provider = props => {
  const [theme, setTheme] = useState('default')

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme: themeName => setTheme(themeName),
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ({ element }) => <Provider>{element}</Provider>
