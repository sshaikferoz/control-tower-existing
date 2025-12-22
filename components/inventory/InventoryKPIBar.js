import React from 'react'
import { Currency } from 'react-intl-number-format'

import KPIBar from '../common/KPIBar'
import useBexJson from '../../lib/useBexJson'
import getFirstValueOfChartData from '../../lib/helpers/getFirstValueOfChartData'

const getCurrentQuarter = () => {
  const today = new Date()

  const quarter = Math.floor(today.getMonth() / 3)
  const lastQuarter = quarter === 0 ? 4 : quarter

  return `Q${lastQuarter} ${today.getFullYear()}`
}

export default function InventoryKPIBar(props) {
  const { query } = props

  const iQRRes = useBexJson(query.techname.iQR)
  const drillingForcast = useBexJson(query.techname.drillingForecast)
  const projectsForecast = useBexJson(query.techname.projectsForecast)
  const targetRes = useBexJson(query.techname.target)

  const iQRData = iQRRes?.data?.chartData || []
  const projectsFrcstData = projectsForecast?.data?.chartData || []
  const drillinFrcstData = drillingForcast?.data?.chartData || []
  const targetData = targetRes?.data?.chartData[0] || []

  const frcstDrilling = getFirstValueOfChartData(drillinFrcstData)
  const frcstProjects = getFirstValueOfChartData(projectsFrcstData)
  const frcstProjTarget = targetData.VALUE004
  const frcstDrilTarget = targetData.VALUE005

  const kpiItems = []

  iQRData?.forEach((item) => {
    if (item.ZMDMCPGRP.toLowerCase() === 'overall result') return

    let target = 0
    switch (item.ZMDMCPGRP) {
      case 'Projects':
        target = targetData.VALUE001
        break
      case 'Drilling':
        target = targetData.VALUE002
        break
      case 'MRO':
        target = targetData.VALUE003
        break
      default:
        break
    }

    kpiItems.push({
      title: 'IQR ' + item.ZMDMCPGRP,
      percent: item.VALUE001,
      target: target,
    })
  })

  kpiItems.push({
    title: 'Projects Forecast Error',
    percent: frcstProjects,
    target: frcstProjTarget,
    reverseDirection: true,
  })
  kpiItems.push({
    title: 'Drilling Forecast Error',
    percent: frcstDrilling,
    target: frcstDrilTarget,
    reverseDirection: true,
  })

  return <KPIBar items={kpiItems} />
}
