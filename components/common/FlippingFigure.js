import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { flippingAnimationContext } from '../../lib/flippingAnimationContext'
import { frontBackWrapper, flipping, front, back } from './FlippingFigure.module.css'

function FlippingFigure({
  value,
  percent,
  flipTime = 8000,
  delay = 0,
  transformOriginShift = '0.76em',
}) {
  const { resetAnimation } = useContext(flippingAnimationContext)
  const timerRef = useRef(null)
  const [flip, setFlip] = useState('0deg')
  const [doneDelay, setDoneDelay] = useState(false)
  useEffect(() => {
    if (resetAnimation === undefined) return
    setTimeout(async () => {
      await new Promise((r) => {
        timerRef.current = setTimeout(
          r,
          doneDelay ? flipTime : flipTime + delay || 0
        )
      })
      if (flip === '180deg') setFlip('0deg')
      else setFlip('180deg')
    })
  }, [flip])

  useEffect(() => {
    setDoneDelay(false)
    if (timerRef?.current) {
      clearTimeout(timerRef.current)
    }
    if (resetAnimation === undefined) return
    if (flip === '180deg') setFlip('0deg')
    else setFlip('180deg')
    setTimeout(async () => {
      await new Promise((r) => setTimeout(r, delay || 0))
      setDoneDelay(true)
    })
  }, [resetAnimation])

  return (
    <div
      style={{
        '--transform-origin-shift': transformOriginShift,
      }}
      className={frontBackWrapper}
    >
      <div
        style={{
          '--rotate-deg': flip,
        }}
        className={flipping}
      >
        <small className={front}>{value}</small>
        <small className={back}>{percent}</small>
      </div>
    </div>
  )
}

export default FlippingFigure
