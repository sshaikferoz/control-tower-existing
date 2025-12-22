import React, { useEffect, useState } from 'react'
// import useSound from 'use-sound'
import styles from './../logistics/Alert.module.css'
import { container } from './../procurement/Alerts.module.css'
import useAlertConfigurations from '../../lib/useAlertConfigurations'
import AlertCards from './AlertCards'
import { filterByCategory, filterShowOnCT } from '../../lib/dashboardConfig/helpers'

const SOUND_DELAY = 800
const ALERT_ANIMATION_ACTIVE_TIME = 20000

const delayGen = () => {
  let timer = 0
  return (callback, ms) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(), ms)
  }
}
const delayForSound = delayGen()
const delayForCss = delayGen()
const delayForInitial = delayGen()
export default function ConfigurableAlert(props) {
  // POD POS without GRs
  const visualProps = {
    IN: { cols: 1, rows: 9 },
    LG: { cols: 2, rows: 7 },
    PR: {
      page1: { cols: 1, rows: 9, alignContent: 'start' },
      page2: { cols: 1, rows: 9, alignContent: 'start' },
    },
  }
  let alertLayout = visualProps[props.category]
  let pageFilter = () => true
  if (props.category === 'PR') {
    alertLayout = alertLayout[props.pageNo]
    pageFilter = ({ PageNo }) => {
      return props.pageNo?.match(`${Number(PageNo)}`)
    }
  }
  let alertRows = alertLayout.rows
  if (props.children) alertRows = alertRows - 1
  const soundUrl = `${process.env.NEXT_PUBLIC_BSP_NAME}/sounds/ringtone.mp3`
  // const [play] = useSound(soundUrl, { volume: 0.7, id: 'popon' })
  let pageNo = props?.pageNo === 'page2' ? '02' : '01'
  const alertConfigurations = useAlertConfigurations(props.category, pageNo)

  /*
   * To avoid the triggering of animation/sound in initial load of alert data
   */
  const [isDoneInitialLoad, setIsDoneInitialLoad] = useState(false)
  useEffect(() => {
    delayForInitial(() => setIsDoneInitialLoad(true), 5000)
  }, [])

  //prettier-ignore
  const data = [
  ]
  let extraStyleVars = {}
  if (props.category === 'LG')
    extraStyleVars = { '--alert-padding': `1rem`, '--alert-gap': `1.225rem` }
  const alertList = alertConfigurations?.data?.alertList
  const filteredAlertList =
    Array.isArray(alertList) &&
    alertList
      .filter(filterByCategory(props.category))
      .filter((item) => filterShowOnCT(item))
      .filter(pageFilter)
  const alertOrders = Array.isArray(filteredAlertList)
    ? filteredAlertList
        .map((i) => i?.OrderOnCT || 0)
        .filter(Boolean)
        .map((i) => new Number(i))
    : []
  const maxOrder = Math.max(...alertOrders)
  return (
    <div
      className={styles.container}
      style={{
        display: props.layout,
        gridTemplateRows: 'max-content 1fr',
        gap: '1em',
      }}
    >
      <div
        className={container}
        style={{
          display: props.layout,
          flex: '1',
          justifyContent: 'space-around',
          alignItems: 'center',
          '--alert-col': `${alertLayout.cols}`,
          '--alert-row': `${Math.ceil(maxOrder / alertLayout.cols)}`,
          '--alert-alignContent': `${alertLayout.alignContent}`,
          ...extraStyleVars,
        }}
      >
        {props.children}
        <AlertCards
          visualType={props.visualType}
          alertList={filteredAlertList}
          rows={Math.ceil(maxOrder / alertLayout.cols)}
          category={props.category || 'IN'}
          cols={alertLayout.cols}
        />
      </div>
    </div>
  )
}
