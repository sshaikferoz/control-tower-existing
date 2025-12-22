// useScreenSize.js
import { useState, useEffect } from 'react'

export default function useScreenSize() {
  const [
    screenSize,
    setScreenSize,
  ] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    setTimeout(async () => {
      setScreenSize({
        width: window?.innerWidth,
        height: window?.innerHeight,
      })
    })
    const handleResize = () => {
      setScreenSize({
        width: window?.innerWidth,
        height: window?.innerHeight,
      })
    }

    window?.addEventListener?.('resize', handleResize)

    // Clean up the event listener when the component unmounts
    return () => {
      window?.removeEventListener?.('resize', handleResize)
    }
  }, [])

  return screenSize
}
