import React, { useContext } from 'react'

import useBexJson from '../../lib/useBexJson'
import formatNumber from '../../lib/helpers/formatNumber'
import styles from './alerts.module.css'
import getFirstValueOfChartData from '../../lib/helpers/getFirstValueOfChartData'
import { maskContext } from '../../lib/maskContext'

export default function Alerts(props) {
  const { query, mode } = props
  const { withMask } = useContext(maskContext)

  const stockRes = useBexJson(query.techname.stock)
  const overdueRes = useBexJson(query.techname.overdue)
  const potentialSlowRes = useBexJson(query.techname.potentialSlow)

  const stockData = stockRes.data?.chartData || []
  const overdueData = overdueRes.data?.chartData || []
  const potentialSlowData = potentialSlowRes.data?.chartData || []


  const stockValue = formatNumber(stockData?.[0]?.VALUE001, 1, '') || 0.0
  const overdueValue =
    formatNumber(getFirstValueOfChartData(overdueData), 1, 'mm') || 0.0
  const potentialSlowValue =
    formatNumber(potentialSlowData?.[0]?.VALUE001, 1, 'mm') || 0.0

  return (
    <div className={styles.alertArea}>
      <div className={styles.alertSticker}>
        <p>{query.title}</p>
        <img
          src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/unify-alert-sticker.png`}
          alt={query.title}
          width={90}
          height={90}
        />
      </div>
      <div className={styles.alertContainer}>
        <div className={styles.alertWidget}>
          <div data-mode={mode} className={styles.rippler}>
            <div></div>
          </div>
          <p className={`${styles.alertWidgetText} ${styles.ripplerTextPadding}`}>
            {stockValue}
            <span>Items</span>
          </p>
        </div>
        <p className={styles.alertTitle}>inventory stock out</p>
      </div>
      <div className={styles.alertContainer}>
        <div className={styles.alertWidget}>
          <div data-mode={mode} className={styles.rippler}>
            <div></div>
          </div>
          <p className={`${styles.alertWidgetText} ${styles.ripplerTextPadding}`}>
            ${withMask(overdueValue)}
            <span></span>
          </p>
        </div>
        <p className={styles.alertTitle}>Overdue reservation</p>
      </div>
      <div className={styles.alertContainer}>
        <div className={styles.alertWidget}>
          <div data-mode={mode} className={styles.rippler}>
            <div></div>
          </div>
          <p className={`${styles.alertWidgetText} ${styles.ripplerTextPadding}`}>
            ${withMask(potentialSlowValue)}
            <span></span>
          </p>
        </div>
        <p className={styles.alertTitle}>Potential slow moving items</p>
      </div>
    </div>
  )
}
