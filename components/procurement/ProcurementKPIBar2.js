import React from 'react'

import KPIBar from '../common/KPIBar'
import useBexJson from '../../lib/useBexJson'

export default function ProcurementKPIBar2(props) {
  const { query, targetQuery } = props

  const optProcTimeQry = query[0]
  const iktvaQry = query[1]
  const spendMngQry = query[2]
  const target = useBexJson(targetQuery.techname)

  const optProcTime = useBexJson(optProcTimeQry.techname)
  const iktva = useBexJson(iktvaQry.techname)
  const spendMng = useBexJson(spendMngQry.techname)

  const optProcData = optProcTime?.data?.chartData || []
  const iktvaData = iktva?.data?.chartData || []
  const spendMngData = spendMng?.data?.chartData || []
  const targetValues = target?.data?.chartData || []

  const optProcDays = parseInt(optProcData[0]?.VALUE001) || 0
  const spendMngPercent = spendMngData[0]?.VALUE001 || 0
  const iktvaPercent = iktvaData[0]?.VALUE001 || 0

  const optTimeTarget = targetValues[0]?.VALUE013 || 0
  const spendMngTarget = targetValues[0]?.VALUE015 || 0
  const iktvaTarget = targetValues[0]?.VALUE014 || 0

  const kpiItems = []

  kpiItems.push({
    title: optProcTimeQry.title,
    days: optProcDays,
    target: optTimeTarget,
    reverseDirection: false,
  })
  kpiItems.push({
    title: spendMngQry.title,
    percent: spendMngPercent,
    target: spendMngTarget,
    reverseDirection: false,
  })
  kpiItems.push({
    title: iktvaQry.title,
    percent: iktvaPercent,
    target: iktvaTarget,
    reverseDirection: false,
  })

  return <KPIBar items={kpiItems} />
}
