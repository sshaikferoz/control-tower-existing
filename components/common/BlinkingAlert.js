import React from 'react'

import useBexJson from '../../lib/useBexJson'
import formatNumber from '../../lib/helpers/formatNumber'
import styles from '../inventory/alerts.module.css'

export default function BlinkingAlert(props) {
  const { key, query, mode, title, figure, unit, style = {} } = props

  return (
    <div style={style} className={styles.alertContainer}>
      <div className={styles.alertWidget}>
        <div data-mode={props.mode} className={styles.rippler}>
          <div></div>
        </div>
        <p className={`${styles.alertWidgetText} ${styles.ripplerTextPadding}`}>
          {figure}
          <span>{unit}</span>
        </p>
      </div>
      <p className={styles.alertTitle}>{title}</p>
    </div>
  )
}
