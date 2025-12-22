import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
// import useSound from 'use-sound'
import styles from './Alert.module.css'
import AlertRealTime from '../common/AlertBoxRealTime'
import AlertBoxBex from '../common/AlertBoxBex'

// NOT BEING USED
const SOUND_DELAY = 800

const delayGen = () => {
  let timer = 0
  return (callback, ms) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(), ms)
  }
}
const delayForSound = delayGen()
export default function Alert2(props) {
  const { queries = [] } = props
  const soundUrl = `${process.env.NEXT_PUBLIC_BSP_NAME}/sounds/ringtone.mp3`
  // const [play] = useSound(soundUrl, { volume: 0.7, id: 'popon' })
  function playSound() {
    // delayForSound(play, SOUND_DELAY)
  }

  return (
    <div className={styles.container}>
      <div className={styles.alertCards}>
        <div className={styles.separator}>
          <div className={styles.alertSticker}>
            <img
              id="alertSticker"
              src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/unify-alert-sticker.png`}
              alt="sticker"
            />
            <p>Alerts</p>
          </div>
          <img
            id={styles.airplane}
            src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/logistics-airplane-light.png`}
            alt="airplane"
          />
          <img
            id={styles.ship}
            src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/logistics-ship-light.png`}
            alt="ship"
          />
          <img
            id={styles.truck}
            src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/logistics-truck-light.png`}
            alt="truck"
          />
        </div>
        {queries.map((item, ind) => {
          if (!item?.techname) return null
          return item.techname.toLowerCase().endsWith('xsjs') ? (
            <AlertRealTime
              playSound={playSound}
              key={ind}
              title={item.title}
              unit={item.unit}
              queryName={item.techname}
              alertStyle={item.alertStyle || 'warn'}
              StrokeColor="blue"
            />
          ) : (
            <AlertBoxBex
              title={item.title}
              key={ind}
              unit={item.unit}
              queryName={item.techname}
              alertStyle={item.alertStyle || 'warn'}
              StrokeColor="blue"
              valueKey={item.valueKey}
            />
          )
        })}
      </div>
    </div>
  )
}
