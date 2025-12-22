import React, { useContext } from 'react'
import { Currency, Number } from 'react-intl-number-format'
import formatNumber from '../../lib/helpers/formatNumber'
import { maskContext } from '../../lib/maskContext'

import styles from './BlockLayout.module.css'

export default function BlockLayout({ blockData }) {
  const { withMask } = useContext(maskContext)

  return (
    <div className={styles.block}>
      <div className={styles.value}>
        ${withMask(formatNumber(blockData.value, 0))}
      </div>
      <div className={styles.sticker}>
        <img
          src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/${blockData.sticker}`}
          alt="bar-chart"
        />
      </div>
      <div className={styles.period}>
        <p>Current</p>
      </div>
      <div className={styles.percent}>
        <p>{blockData.percent?.toFixed?.(1)}%</p>
      </div>
    </div>
  )
}
