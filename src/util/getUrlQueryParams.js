import qs from 'query-string'

export const getSearchParams = key => {
  const values = qs.parse(window.location.search)
  return key ? values[key] : values
}
