import React from 'react'

import KPIBar from '../common/KPIBar'
import useBexJson from '../../lib/useBexJson'

export default function ProcurementKPIBar(props) {
  const { query, targetQuery } = props

  const buyerQry = query[0]
  const supplierQry = query[1]
  const projTimeQry = query[2]

  const buyerOTD = useBexJson(buyerQry.techname)
  const supplierOTD = useBexJson(supplierQry.techname)
  const projTime = useBexJson(projTimeQry.techname)
  const target = useBexJson(targetQuery.techname)

  const buyerData = buyerOTD?.data?.chartData || []
  const supplierData = supplierOTD?.data?.chartData || []
  const projTimeData = projTime?.data?.chartData || []
  const targetValues = target?.data?.chartData || []

  const buyerPercent = buyerData[0]?.VALUE001 || 0
  const supplierPercent = supplierData[0]?.VALUE001 || 0
  const projTimeDays = parseInt(projTimeData[0]?.VALUE001) || 0

  const buyerTarget = targetValues[0]?.VALUE008 || 0
  const supplierTarget = targetValues[0]?.VALUE009 || 0
  const procTimeTarget = targetValues[0]?.VALUE012 || 0

  const kpiItems = []

  kpiItems.push({
    title: buyerQry.title,
    percent: buyerPercent,
    target: buyerTarget,
    reverseDirection: false,
  })
  kpiItems.push({
    title: supplierQry.title,
    percent: supplierPercent,
    target: supplierTarget,
    reverseDirection: false,
  })
  kpiItems.push({
    title: 'Project Proc. Time',
    days: projTimeDays,
    target: procTimeTarget,
    reverseDirection: false,
  })

  return <KPIBar items={kpiItems} />
}
