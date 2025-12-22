import React from 'react'

import useBexJson from '../../lib/useBexJson'
import BlockLayout from './BlockLayout'

export default function BlockedInventory(props) {
  const { query } = props

  const { data, error, isLoading } = useBexJson(query.techname)
  const { data: percentData, error: PercentError } = useBexJson(
    `${query.techname}_PR`
  )

  const values =
    data && data.chartData && Array.isArray(data.chartData) ? data.chartData : []

  const percentValues =
    percentData && percentData.chartData && Array.isArray(percentData.chartData)
      ? percentData.chartData
      : []

  const value = values[0]?.VALUE002 || 0.0
  const percent = percentValues[0]?.VALUE001 || 0.0

  const blockData = {
    title: query.title,
    value: value,
    sticker: 'chart-animation-purple_APRIL.gif',
    percent: percent,
  }

  return <BlockLayout blockData={blockData}></BlockLayout>
}
