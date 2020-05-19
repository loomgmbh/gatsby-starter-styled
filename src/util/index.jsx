import { useState, useEffect } from 'react'
import { theme } from '@style/theme'

const { breakpoints } = theme

const getWindowDimensions = () => {
  if (typeof window !== `undefined`) {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }

  return { width: 900, height: 900 }
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}

const getViewport = (height, width) => {
  if (width <= 0) return null
  let viewportName = 'xs'
  Object.keys(theme.breakpoints).map((key, value) => {
    if (!isNaN(key)) return
    const breakpoint = parseInt(theme.breakpoints[key], 10)
    if (width > breakpoint) {
      viewportName = key
    }
  })
  return viewportName ?? null
}

export { getWindowDimensions, useWindowDimensions, getViewport }
