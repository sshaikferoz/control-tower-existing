import React from 'react'

import KPIBar from '../common/KPIBar'
import useBexJson from '../../lib/useBexJson'

export default function LogisticsKPIBar(props) {
  const { query } = props

  const LGOTD = useBexJson(query[0].techname)
  const WHOTD = useBexJson(query[1].techname)
  const target = useBexJson(query[2].techname)

  const WHData = WHOTD?.data?.chartData || []
  const LGData = LGOTD?.data?.chartData || []
  const targetData = target?.data?.chartData[0] || []

  const lastMonthDate = new Date(new Date().setDate(0)) // Gets the last day of last month
  const dateArr = lastMonthDate.toDateString().split(' ')
  const lastMonth = dateArr[1].toUpperCase() + ' ' + dateArr[3]

  const lastWH = WHData.filter((item) => item.CALMONTH === lastMonth)[0]
  const lastLG = LGData.filter((item) => item.CALMONTH === lastMonth)[0]

  const LGTarget = targetData?.VALUE006 || 0
  const WHTarget = targetData?.VALUE007 || 0

  const kpiItems = [
    {
      title: 'Warehouse OTD',
      percent: lastWH?.VALUE001 || 0,
      target: WHTarget,
      reverseDirection: false,
    },
    {
      title: 'Logistics OTD',
      percent: lastLG?.VALUE001 || 0,
      target: LGTarget,
      reverseDirection: false,
    },
  ]

  return <KPIBar items={kpiItems} />
}
