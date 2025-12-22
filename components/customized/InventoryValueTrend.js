import React, { useState, useContext } from 'react'
import styles from './InventoryValueTrend.module.css'
import useBexJson from '../../lib/useBexJson'
import formatNumber from '../../lib/helpers/formatNumber'
import getSumForBexData from '../../lib/helpers/getSumForBexData'
import PredictionLineChart from './PredictionLineChart'
import { maskContext } from '../../lib/maskContext'

const titleStyle = {
  lineHeight: '1.3',
  translate: ' -3px 12px',
  paddingInlineStart: '.4em',
  color: 'var(--unify-font-light)',
  fontWeight: '400',
  fontSize: '1.35rem',
  justifyContent: 'left',
}

export default function InventoryValueTrend(props) {
  const { withMask, maskData } = useContext(maskContext)
  const [
    selectedChart,
    setSelectedChart,
  ] = useState('overall')

  const { data: InValueData } = useBexJson('YIMO_INVENTORY_LEVEL_SCCT')
  const { data, isLoading, error } = useBexJson('YIMO_CT_INV_IQR')
  const InvValue = InValueData?.chartData || []
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
  let inventoryChart = <PredictionLineChart TechnicalName="YSCM_INVENTORY_PRED_01" />
  if (selectedChart === 'slowMoving')
    inventoryChart = <PredictionLineChart TechnicalName="YIMO_INV_TRND_DET_SLOW2" />
  else if (selectedChart === 'nonMoving')
    inventoryChart = <PredictionLineChart TechnicalName="YIMO_INV_TRND_NONMOV2" />

  return (
    <div className={styles.wrapper}>
      <div className={styles.styledBlock}>
        <div className={styles.inv}>
          <div
            onClick={() => setSelectedChart('overall')}
            className={styles.figureCard}
          >
            <img
              className={styles.box}
              src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/ValueIcon.png`}
            />
            <h2>${withMask(formatNumber(activeInventoryValue))}</h2>
            <h3>FYP ${withMask(formatNumber(fypValue, 1))}</h3>
          </div>
          <div
            onClick={() => setSelectedChart('slowMoving')}
            className={styles.subfigureCard}
          >
            <div className={styles.iconLabel}>
              <img
                className={styles.iconLabel__icon}
                src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/SlowMovingIcon.svg`}
              />
              <h3>Slow Moving</h3>
            </div>
            <div className={styles.subfigureCard__figure}>
              <h2> ${withMask(formatNumber(slowMoving, 0))} </h2>
              <h4>{withMask(slowMvPercent.toFixed(1))}%</h4>
            </div>
          </div>

          <div
            onClick={() => setSelectedChart('nonMoving')}
            className={styles.subfigureCard}
          >
            <div className={styles.iconLabel}>
              <img
                className={styles.iconLabel__icon}
                src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/NonMovingIcon.svg`}
              />
              <h3>Non Moving</h3>
            </div>
            <div className={styles.subfigureCard__figure}>
              <h2> ${withMask(formatNumber(nonMoving, 0))} </h2>
              <h4>{withMask(nonMvPercent.toFixed(1))}%</h4>
            </div>
          </div>
        </div>
      </div>
      <h2 style={titleStyle}> Inventory Trend </h2>
      <div className={styles.styledBlock}>{inventoryChart}</div>
    </div>
  )
}
