import React, { createContext, useEffect, useState } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import useEventListener from './hooks/useEventListener'

const delayGen = () => {
  let timer = 0
  return (callback, ms) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(), ms)
  }
}

/* possible mask shapes:
♯		\u266F
☱  \u2631 till \u2637
…	\u2026;
∴ \u2234
X \u0425
x \u0445
 */
const maskedPlaceHolder = 'X'
const delay = delayGen()

export const maskContext = createContext(false)

export const MaskProvider = ({ children }) => {
  const [maskFlag, setMaskFlag] = useLocalStorage('maskData', false)
  const [maskData, setMaskData] = useState(maskFlag)
  useEventListener('storage', toggleMask)

  useEffect(() => {
    if (maskFlag !== maskData) setMaskFlag(maskData)
  }, [maskData])

  function toggleMask() {
    delay(() => {
      setMaskData((m) => !m)
    }, 550)
  }

  function withMask(value) {
    return maskData ? maskedPlaceHolder : value
  }

  return (
    <maskContext.Provider value={{ maskData, toggleMask, withMask }}>
      {children}
    </maskContext.Provider>
  )
}
