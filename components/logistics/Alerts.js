import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
// import useSound from 'use-sound'
import styles from './Alert.module.css'
import {alertIcon} from './../inventory/Alerts.module.css'
import AlertRealTime from '../common/AlertBoxRealTime'
import AlertBoxBex from '../common/AlertBoxBex'

const SOUND_DELAY = 800

const delayGen = () => {
  let timer = 0
  return (callback, ms) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(), ms)
  }
}
const delayForSound = delayGen()
export default function Alert(props) {
  const { queries = [] } = props
  const soundUrl = `${process.env.NEXT_PUBLIC_BSP_NAME}/sounds/ringtone.mp3`
  // const [play] = useSound(soundUrl, { volume: 0.7, id: 'popon' })
  function playSound() {
    // delayForSound(play, SOUND_DELAY)
  }

  return (
    <div className={styles.container}>
      <div className={styles.alertCards}>
        <div className={styles.alertCard}>
          <img
            className={alertIcon}
            src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/white-alert.svg`}
            alt="alert sticker"
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
              fn={item.fn}
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
