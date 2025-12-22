import React, { useContext } from 'react'

import useBexJson from '../../lib/useBexJson'
import formatNumber from '../../lib/helpers/formatNumber'
import DataGrid from '../common/DataGrid'
import { maskContext } from '../../lib/maskContext'

export default function OutsourcedInventory(props) {
  const { withMask } = useContext(maskContext)

  const { data } = useBexJson(props.TechnicalName)

  const chartData = data?.chartData || []

  const gridHeader = [
    { text: 'Commodity' },
    { text: '<6 Months' },
    { text: '6-12 Months', bg: 'warning' },
    { text: '>12 Months', bg: 'danger' },
  ]
  function formatNumberIgnoreZeros(number) {
    const value = new Number(number)
    const num = Math.abs(Number(value))

    if (!isNaN(value) && value > 0) {
      const prettyNumber = new Intl.NumberFormat('en-US', {
        maximumSignificantDigits: 3,
      })

      const formattedValue = prettyNumber.format(num.toFixed(1))
      return `${withMask(formattedValue)}`
    }
    return '—'
  }

  const values = chartData
    .map(({ VALUE002, VALUE003, VALUE004, ZSCMCMD }) => {
      let label = ZSCMCMD?.startsWith('Overall') ? 'Total' : ZSCMCMD
      return [
        { text: label || '' },
        { text: !Number(VALUE002) > 0 ? '—' : formatNumberIgnoreZeros(VALUE002) },
        { text: !Number(VALUE003) > 0 ? '—' : formatNumberIgnoreZeros(VALUE003) },
        { text: !Number(VALUE004) > 0 ? '—' : formatNumberIgnoreZeros(VALUE004) },
      ]
    })
    .flat?.()
  const gridData = [
    ...gridHeader,
    ...values,
  ]
  const cols = 4

  const rows = gridData.length / cols
  return (
    <DataGrid
      style={{ padding: '0 0' }}
      data={gridData}
      colNum={cols}
      rowNum={rows}
    />
  )
}
