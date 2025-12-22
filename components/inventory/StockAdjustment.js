import React from 'react'

import useBexJson from '../../lib/useBexJson'
import BlockLayout from './BlockLayout'

export default function StockAdjustment(props) {
  const { query, visible } = props

  const { data, error, isLoading } = useBexJson(query.techname)

  const values =
    data && data.chartData && Array.isArray(data.chartData) ? data.chartData : []

  const value = values[2]?.VALUE002 || 0.0
  const percent = values[4]?.VALUE002 || 0.0

  const blockData = {
    title: query.title,
    value: value,
    sticker: 'chart-animation-purple_APRIL.gif',
    percent: percent,
  }

  return <BlockLayout blockData={blockData} visible={visible}></BlockLayout>
}
