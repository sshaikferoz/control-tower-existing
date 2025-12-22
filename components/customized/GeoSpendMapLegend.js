import React, { useRef, useMemo, useContext, useState, useEffect } from 'react'
import styles from './GeoSpendMapLegend.module.css'

const hueBaseMap = {
  directSpend: 214,
  indirectSpend: 280,
  totalSpend: 214,
  sourcingGap: 357,
  investment: 124,
}

export default function GeoSpendMapLegend(props) {
  const { query = {}, spendType: propsSpendType, spendMapArea = 'global' } = props
  if (propsSpendType === 'sourcingGap') {
    return (
      <div className={styles.wrap}>
        <h3>{query[propsSpendType].title}</h3>
        <div className={styles.gapLegendsForSelected}>
          <ul>
            <li>Closed</li>
            <li>In-Process</li>
          </ul>
        </div>
      </div>
    )
  }

    if (propsSpendType === 'investment') {
    return (
      <div className={styles.wrap}>
        <div className={styles.invLegendsForSelected}>
          <ul>
            <li>Number of Approved Investment Plans </li>
            <li>Value of Investments</li>
          </ul>
        </div>
      </div>
    )
  }


  return (
    <div className={styles.wrap}>
      <h3>{query[propsSpendType].title}</h3>

      <ul className={styles.legends}>
        <li className={styles.one}></li>
        <li className={styles.two}></li>
        <li className={styles.three}></li>
        <li className={styles.four}></li>
        <li className={styles.five}></li>
      </ul>
    </div>
  )
}
