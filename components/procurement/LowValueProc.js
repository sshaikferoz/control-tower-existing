import React from 'react'

import useBexJson from '../../lib/useBexJson'
import withComma from '../../lib/helpers/withComma'

import styles from './LowValueProc.module.css'
import RobotSVG from './RobotSVG'
import formatNumber from '../../lib/helpers/formatNumber'

export default function LowValueProc(props) {
  /* return (
    <div className={styles.container}>
      <RobotSVG />
    </div>
  ) */

  const { query } = props
  const { data } = useBexJson(query?.techname)

  const itemsData = data?.chartData
  const headerData = data?.headerSources

  const { VALUE001, VALUE002, VALUE003, VALUE004, VALUE005, VALUE006 } =
    itemsData?.[0] || {}

  const firstRow = [VALUE001, 'POs', 'Reports', VALUE004].map((i) =>
    isNaN(i) ? i : formatNumber(i, 2, 'm')
  )
  const secondtRow = [VALUE002, 'Man Hours Saved', VALUE005].map((i) =>
    isNaN(i) ? i : formatNumber(i, 2, 'm')
  )
  const thirdRow = [VALUE003, 'Money Saved', VALUE006].map((i) =>
    isNaN(i) ? i : `$${formatNumber(i, 0)}`
  )

  return (
    <div className={styles.containerComp}>
      <div className={styles.robot}>
        <img src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/roba.png`} />
      </div>
      <div className={styles.component}>
        <div className={styles.firstRow}>
          <div className={styles.leftValueBox}>{firstRow[0]}</div>
          <div className={styles.labelBox1}>{firstRow[1]}</div>
          <div className={styles.labelBox2}>{firstRow[2]}</div>
          <div className={styles.rightValueBox}>{firstRow[3]}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.leftValueBox}>{secondtRow[0]}</div>
          <div className={styles.labelBox}>{secondtRow[1]}</div>
          <div className={styles.rightValueBox}>{secondtRow[2]}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.leftValueBox}>{thirdRow[0]}</div>
          <div className={styles.labelBox}>{thirdRow[1]}</div>
          <div className={styles.rightValueBox}>{thirdRow[2]}</div>
        </div>
      </div>
      <div className={styles.robot}>
        <img src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/arwa.png`} />
      </div>
    </div>
  )
}
