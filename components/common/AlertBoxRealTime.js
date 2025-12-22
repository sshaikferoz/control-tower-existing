import React, { useState, useEffect } from 'react'
import { IoAlertCircle } from 'react-icons/io5'
import { useQueryClient } from 'react-query'
import useHanaJson from '../../lib/useHanaJson'
import styles from './AlertBox.module.css'
import {
  before,
  after,
  beforeAfterWrapper,
  scrollDown,
  scrollUp,
  arrowUp,
  arrowDown,
  differenceValue,
  differenceInChangeValue,
  differenceWrapper,
} from './AlertAnimation.module.css'
import withComma from '../../lib/helpers/withComma'
const ALERT_ANIMATION_ACTIVE_TIME = 20000

const delayGen = () => {
  let timer = 0
  return (callback, ms) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(), ms)
  }
}
const delayForCss = delayGen()
const initialDelay = delayGen()

export default function AlertRealTime({
  title,
  queryName,
  unit,
  StrokeColor,
  alertStyle,
  playSound,
  withTrend = false,
  onShowTrend = (e) => console.log(e),
}) {
  const [liveChangeCss, setLiveChangeCss] = useState(false)
  const [initialDelayDone, setInitialDelayDone] = useState(false)

  const { data: hanaData } = useHanaJson(queryName, true)
  const [differenceInChange, setDifferenceInChange] = useState(0)

  const client = useQueryClient()
  const data = {
    text: { title },
    unit,
    figure: !isNaN(hanaData?.[0]?.COUNTER)
      ? hanaData?.[0]?.COUNTER || 0
      : hanaData?.[0]?.KPI_VALUE || 0,
  }

  const handleLiveSoundAnimationForAlert = () => {
    playSound()
    setLiveChangeCss(true)
    delayForCss(() => setLiveChangeCss(false), ALERT_ANIMATION_ACTIVE_TIME)
  }

  // to avoid unnecessary animation trigger on component mount
  useEffect(() => {
    setTimeout(async () => {
      await new Promise((r) => setTimeout(r, 2000))
      setInitialDelayDone(true)
    })
  }, [])

  useEffect(() => {
    const queryCache = client?.getQueryCache()
    if (!queryCache) return
    const cacheData = queryCache.find(['hanaQuery', queryName?.replace('.xsjs', '')])
    const previous = !isNaN(cacheData?.revertState?.data?.[0]?.COUNTER)
      ? cacheData?.revertState?.data?.[0]?.COUNTER
      : cacheData?.revertState?.data?.[0]?.KPI_VALUE
    const current = !isNaN(hanaData?.[0]?.COUNTER)
      ? hanaData?.[0]?.COUNTER
      : hanaData?.[0]?.KPI_VALUE

    if (isNaN(current) || isNaN(previous)) return
    if (initialDelayDone) handleLiveSoundAnimationForAlert()
    console.log('------------')
    console.log(queryName)
    console.log({ previous, current })
    let _differenceInChange = parseInt(current) - parseInt(previous)
    setDifferenceInChange(_differenceInChange)
  }, [hanaData])
  const clickable = withTrend
    ? { onClick: onShowTrend, style: { cursor: 'pointer' } }
    : {}
  return (
    <div className={styles.wrapper} {...clickable}>
      <div className={styles.content}>
        <div className={styles.iconContent}>
          <IoAlertCircle
            className={`${styles[alertStyle || 'normal']} ${
              liveChangeCss && styles[`${alertStyle || 'normal'}LiveChange`]
            }`}
            style={
              Number(data?.figure) === 0 && {
                '--danger-color': 'var(--alert-normal-color)',
              }
            }
            size={50}
          />

          <div
            style={{
              '--arrow-up-path': `url(${process.env.NEXT_PUBLIC_BSP_NAME}/images/arrow-up.svg)`,
              '--arrow-down-path': `url(${process.env.NEXT_PUBLIC_BSP_NAME}/images/arrow-down.svg)`,
              '--live-change-animation2': `${
                liveChangeCss && differenceInChange !== 0
                  ? '0'
                  : withTrend
                  ? '0'
                  : '0'
              }`,
              '--live-change-animation': `${
                liveChangeCss && differenceInChange !== 0 ? '1' : '0'
              }`,
              '--live-change-color': `${
                differenceInChange && differenceInChange > 0 ? 'green' : 'red'
              }`,
            }}
            className={differenceWrapper}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/arrow-green.svg`}
            />
            <div
              className={
                differenceInChange && differenceInChange > 0 ? arrowUp : arrowDown
              }
            >
              {differenceInChange && differenceInChange > 0 ? `\u2191` : '\u2193'}
            </div>
            <p className={differenceInChangeValue}>
              {!isNaN(differenceInChange) &&
                `${
                  differenceInChange && differenceInChange > 0 ? '+' : '-'
                } ${Math.abs(differenceInChange)}`}
            </p>{' '}
          </div>
        </div>
        <h1>{title}</h1>
        <div className={styles.figureContent}>
          <figure>
            {data?.figure ? withComma(data.figure) : 0} {` `}
          </figure>
          <small>{unit !== undefined && <span>{unit}</span>}</small>
        </div>
      </div>
    </div>
  )
}
