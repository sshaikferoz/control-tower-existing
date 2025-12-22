import React, { useContext, useEffect } from 'react'
import { IoCaretUpSharp, IoCaretDownSharp } from 'react-icons/io5'
import { Currency } from 'react-intl-number-format'

import styles from './InventoryValueFigure.module.css'
import formatNumber from '../../lib/helpers/formatNumber'
import useBexJson from '../../lib/useBexJson'
import getSumForBexData from '../../lib/helpers/getSumForBexData'
import { maskContext } from '../../lib/maskContext'
import { useState } from 'react'
function InventoryValueFigure(props) {
  const { withMask } = useContext(maskContext)
  const { query } = props

  const InValueData = useBexJson(props.TechnicalName)
  const { IsCurrencyFormat = true, DecimalDigits = '0' } = props
  const { data, isLoading, error } = useBexJson('YIMO_CT_INV_IQR')

  const InvValue = InValueData?.data?.chartData || []
  const totalColumn = data && getSumForBexData(data)
  const slowNoneMovingData = data?.chartData || []

  const activeInventoryValue = InvValue?.[0]?.VALUE001 || 0
  const fypValue = InvValue[1]?.VALUE001 * 1e9 || 0 // Convert FYP value to billion
  const slowMoving = slowNoneMovingData?.[0]?.VALUE001 || 0
  const nonMoving = slowNoneMovingData?.[0]?.VALUE002 || 0
  const slowMvPercent =
    activeInventoryValue > 0 ? (slowMoving / activeInventoryValue) * 100 : 0
  const nonMvPercent =
    activeInventoryValue > 0 ? (nonMoving / activeInventoryValue) * 100 : 0

  const iconSize = 50

  const [flip, setFlip] = useState('0deg')
  useEffect(() => {
    setTimeout(async () => {
      await new Promise((r) => setTimeout(r, 3000))
      if (flip === '180deg') setFlip('0deg')
      else setFlip('180deg')
    })
  }, [flip])

  return (
    <div className={styles.wrapper}>
      <div className={styles.activeValue}>
        <h1>${withMask(formatNumber(activeInventoryValue))}</h1>
        <h2>FYP ${withMask(formatNumber(fypValue, 1))}</h2>
      </div>
      <img
        src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/graph-animation-coin_Orange.gif`}
        alt="coins"
      />
      <div className={styles.slowNonMoving}>
        <div className={styles.slowNonMovingSection}>
          <h3>Slow Moving</h3>
          <h2> ${withMask(formatNumber(slowMoving, 0))} </h2>
          <h4>{slowMvPercent.toFixed(1)}%</h4>
        </div>
        <div>{/* for middle space only */}</div>
        <div className={styles.slowNonMovingSection}>
          <h3>Non Moving</h3>
          <h2>${withMask(formatNumber(nonMoving, 0))}</h2>
          <h4>{nonMvPercent.toFixed(1)}%</h4>
        </div>
      </div>
    </div>
  )
}

export default InventoryValueFigure
