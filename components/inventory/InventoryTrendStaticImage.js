//@ts-chec
import React, { useEffect, useState } from 'react'
import useBexJson from '../../lib/useBexJson'
import {
  Chart,
  Font,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Legend,
  Margin,
  Title,
  Subtitle,
  Tooltip,
  Grid,
  BreakStyle,
  ValueAxis,
  ConstantLine,
  Label,
} from 'devextreme-react/chart'
import styles from './InventoryTrendChart.module.css'
import SideLegend from './SideLegend'

export default function ChartView(props) {
  const { query = '' } = props
  const defaultColors = [
    'var(--inv-accent4)',
    'var(--inv-accent2)',
    'var(--inv-accent1)',
    'var(--inv-accent3)',
    'var(--inv-accent5)',
    'var(--inv-accent6)',
  ]
  return (
    <div className={styles.containerStatic}>
      <div className={styles.staticImage}>
        <img
          src="https://sharek.aramco.com.sa/orgs/30002047/Documents/SCCT/Inventory_large.png"
          alt="Inventory Trend"
        />
      </div>
    </div>
  )
}
