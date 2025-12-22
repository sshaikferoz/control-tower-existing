import React, { createContext, useEffect, useRef, useState } from 'react'
import useEventListener from './hooks/useEventListener'

export const flippingAnimationContext = createContext(false)

export const FlippingAnimationControlProvider = ({ children }) => {
  const [resetAnimation, setResetAnimation] = useState()
  const counterRef = useRef(null)
  useEffect(() => {
    setTimeout(async () => {
      await new Promise((r) => setTimeout(r, 10000))
      counterRef.current = 1
      setResetAnimation(`rest#${counterRef.current}`)
      window.addEventListener('focus', () =>
        setResetAnimation(`rest#${++counterRef.current}`)
      )
    })
  }, [])
  return (
    <flippingAnimationContext.Provider value={{ resetAnimation }}>
      {children}
    </flippingAnimationContext.Provider>
  )
}
