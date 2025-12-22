import React, { useEffect, useState, useRef, useContext } from 'react'
import { compileGetter } from 'devextreme/utils'
import {
  Chart,
  Font,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Legend,
  Margin,
  Title,
  ZoomAndPan,
  Subtitle,
  Pane,
  Tooltip,
  Grid,
  BreakStyle,
  ValueAxis,
  ConstantLine,
  Label,
  Size,
  Point,
} from 'devextreme-react/chart'
import processor from 'devextreme/data/query'
import useBexJson from '../../lib/useBexJson'
import { getMonthDigit } from '../../lib/dashboardConfig/helpers'
import { maskContext } from '../../lib/maskContext'
import { formatToBillion } from '../../lib/helpers/formatNumber'

function formatNumber(number, digits = 0) {
  if (isNaN(number)) return number
  const num = Math.abs(Number(number))
  return new Number(num || 0).toLocaleString('en-US', {
    maximumFractionDigits: digits,
    compactDisplay: 'short',
  })
}
const colors = [
  '#0083c1',
  '#438746',
  '#7e8dd5',
  '#b3b3b3',
]

export default function PredictionChart(props) {
  const defaultBackground = 'var(--popup-bg)'
  const defaultTextColor = 'dark'
  const {
    IsCurrencyFormat,
    DecimalDigits = '0',
    background = defaultBackground,
    textColor = defaultTextColor,
  } = props
  const { withMask } = useContext(maskContext)
  const { data, error, isLoading } = useBexJson(props.TechnicalName)
  const rangeTrackRef = useRef(false)
  const visualRangeTrack = useRef(false)
  const enableAnimation = useRef(true)
  console.log({ data })
  const { chartData = [] } = data || {}
  const formattedChartData = chartData.map((i) => {
    const _month = i['CALMONTH']
    const [
      month,
      year,
    ] = _month?.split?.(' ') || []
    const date = new Date(`${year}-${getMonthDigit(month)}`)
    return { ...i, date }
  })
  let categorKeyList = {}
  const groupedChartData = processor(formattedChartData)
    .sortBy('date', false)
    .groupBy('CALMONTH')
    .toArray()
    .map((group) => {
      const { items = [] } = group || {}
      const categoryKey = Object.keys(items[0] || {}).find(
        (k) => k !== 'CALMONTH' && !k?.startsWith?.('VALUE0')
      )
      if (!categoryKey) return

      const formattedGroup = group.items.map((item = {}, ind) => {
        const category = item[categoryKey]
        categorKeyList[category] = [
          {
            color: `${colors[ind]}44`,
            type: 'rangeArea',
            rangeValue1Field: `${category}004`,
            rangeValue2Field: `${category}003`,
            showInLegend: false,
            name: 'Upper/Lower limit',
          },
          {
            color: `${colors[ind]}`,
            valueField: `${category}001`,
            name: category,
            showInLegend: true,
          },
          {
            color: `${colors[ind]}99`,
            valueField: `${category}002`,
            dashStyle: 'dash',
            name: category,
            showInLegend: false,
          },
        ]
        const entries = Object.entries(item).map(
          ([
            key,
            value,
          ]) => {
            const renamedKey = key.startsWith('VALUE0')
              ? key.replace('VALUE', category)
              : key
            return [
              renamedKey,
              value === 0 ? undefined : value /*convert 0 to undefined*/,
            ]
          }
        )
        const formattedEntries = Object.fromEntries(entries)
        return formattedEntries
      })
      return formattedGroup.reduce((cum, cur) => {
        return { ...cum, ...cur }
      }, {})
    })
    .filter(Boolean)
  console.log({ groupedChartData })

  function customizeValueAxisText(arg) {
    return withMask(formatToBillion(arg.value))
  }
  const delayGen = (tiemInMs = 500) => {
    let timer = 0
    return (callback) => {
      clearTimeout(timer)
      timer = setTimeout(() => callback(), tiemInMs)
    }
  }
  const selectedGroup = groupedChartData?.[0]
  useEffect(() => {
    setTimeout(async () => {
      await new Promise((r) => setTimeout(r, 350))
      if (!data?.chartData) await new Promise((r) => setTimeout(r, 350)) // if data not loaded wait more
      if (!data?.chartData) await new Promise((r) => setTimeout(r, 650)) // if data not loaded wait more
      if (!data?.chartData) await new Promise((r) => setTimeout(r, 650)) // if data not loaded wait more
      enableAnimation.current = false
    })
  })
  let seriesFound = []
  Object.values(categorKeyList).forEach((seriesSet) => {
    seriesFound = [
      ...seriesFound,
      ...seriesSet,
    ]
  })
  return (
    <Chart
      animation={enableAnimation.current}
      // dataSource={groupedChartData}
      dataSource={groupedChartData}
      title={selectedGroup?.key}
      commonAxisSettings={{
        color: `var(--popup-font-${textColor})`,
        label: {
          font: { color: `var(--popup-font-${textColor})` },
        },
        valueMarginsEnabled: true,
        maxValueMargin: 0.05,
      }}
      argumentAxis={{
        visualRange: visualRangeTrack?.current ? visualRangeTrack.current : null,
        onVisualRangeChange: (arg) => {
          const { startValue, endValue } = arg
          const [
            time1,
            time2,
          ] = [
            startValue?.getTime?.(),
            endValue?.getTime?.(),
          ]
          console.log({ diff: Math.abs(time1 - time2) })
          if (Math.abs(time2 - time1) < 1000 * 60 * 60 * 24 * 30 * 18)
            rangeTrackRef.current = true
          else rangeTrackRef.current === false
          visualRangeTrack.current = { ...arg }
        },
      }}
    >
      <CommonSeriesSettings argumentField="CALMONTH" />

      <ZoomAndPan dragToZoom={true} argumentAxis="both" />
      {seriesFound.map((categoryKey, ind) => (
        <Series
          key={`pred-${ind}`}
          point={{ visible: false }}
          color="#ec8d64"
          {...categoryKey}
          // showInLegend={false}
        >
          <Label
            visible={true}
            customizeText={customizeValueAxisText}
            backgroundColor="none"
          />
        </Series>
      ))}
      <ValueAxis>
        <Label customizeText={customizeValueAxisText} />
        <Grid visible={false} />
        <Title text="" />
      </ValueAxis>

      <Legend
        font={{ color: `var(--popup-font-${textColor})` }}
        verticalAlignment="bottom"
        margin={{ top: 33, bottom: 0 }}
        horizontalAlignment="center"
      />
    </Chart>
  )
}
