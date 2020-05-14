/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'

export const themeContext = React.createContext()

const Provider = props => {
  const [theme, setTheme] = useState('default')

  return (
    <themeContext.Provider
      value={{
        theme,
        changeTheme: themeName => setTheme(themeName),
      }}
    >
      {props.children}
    </themeContext.Provider>
  )
}

export default ({ element }) => <Provider>{element}</Provider>
