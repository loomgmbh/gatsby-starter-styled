/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import { getSearchParams } from '@util/getSearchParams'

// const Provider = props => {
//   const [searchQuery, setSearchQuery] = useState(getSearchParams())
//   const test = getSearchParams()
//   console.log(test)
//   return (
//     <SearchContext.Provider
//       value={{
//         searchQuery,
//         changeSearchQuery: searchQueryParams => {
//           setSearchQuery(searchQueryParams)
//         },
//       }}
//     >
//       {props.children}
//     </SearchContext.Provider>
//   )
// }

// export default ({ element }) => <Provider>{element}</Provider>

export const SearchContext = React.createContext()

const Provider = props => {
  const [searchParams, setSearchParams] = useState(getSearchParams())
  console.log(searchParams)
  return (
    <SearchContext.Provider
      value={{
        searchParams,
        changeViewport: searchParams => setSearchParams(searchParams),
      }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}
export default ({ element }) => <Provider>{element}</Provider>
