import React, { useEffect, useState, useRef, useContext } from 'react'
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
export default function PredictionChartTest(props) {
  const { withMask } = useContext(maskContext)
  const { data, error, isLoading } = useBexJson(props.TechnicalName)
  const [
    refresh,
    setRefresh,
  ] = useState(0)
  const rangeTrackRef = useRef(false)
  const visualRangeTrack = useRef(false)
  const enableAnimation = useRef(true)
  // console.log({ data })
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
  const groupedChartData = processor(formattedChartData)
    .sortBy('date', false)
    .groupBy('CALMONTH')
    .toArray()
    .map((group) => {
      const formattedGroup = group.items.map((item = {}) => {
        const category = item.ZMDMCPGRP
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
              value,
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
  /*
   * fill the gap so that trend solid lines and dashed/range lines are connected
   */
  const indexOfCurrentMonth = groupedChartData.findIndex((item) => {
    // index = length of the list of months with values ( predicted, forecast upper/lower)
    const entries = Object.entries(item).filter(
      ([
        key,
        value,
      ]) =>
        [
          '002',
          '003',
          '004',
        ].includes(key.substring(key.length - 3)) && Boolean(value) === true
    )
    return entries.length
  })
  let formattedGroupedChartData = [...groupedChartData]
  if (indexOfCurrentMonth > 0) {
    const firstPredectedMonth = groupedChartData[indexOfCurrentMonth] || {}
    const lastActualMonth = groupedChartData[indexOfCurrentMonth - 1] || {}
    const actualValueObject = Object.entries(lastActualMonth).filter(
      ([
        key,
        value,
      ]) => key.endsWith('001')
    )
    const restOfValuseEntries = Object.entries(firstPredectedMonth)
      .filter(
        ([
          key,
          value,
        ]) => key.endsWith('002') || key.endsWith('003') || key.endsWith('004')
      )
      .map(
        ([
          key,
          value,
        ]) => {
          const searchTerm = key.substring(0, key.length - 2)
          const foundValue = actualValueObject.find(
            ([
              k,
              val,
            ]) => k.match(new RegExp(searchTerm, 'g'))
          )?.[1]
          return [
            key,
            foundValue,
          ]
        }
      )
    const restOfValuseObject = Object.fromEntries(restOfValuseEntries)
    formattedGroupedChartData[indexOfCurrentMonth - 1] = {
      ...lastActualMonth,
      ...restOfValuseObject,
    }
  }

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
  const delayForPointHide = delayGen(300)
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
  // console.log({ formattedGroupedChartData })
  return (
    <Chart
      animation={enableAnimation.current}
      // dataSource={groupedChartData}
      dataSource={formattedGroupedChartData}
      title={selectedGroup?.key}
      commonAxisSettings={{ valueMarginsEnabled: true, maxValueMargin: 0.05 }}
      argumentAxis={{
        overlappingBehavior: 'hide',
        tick: { visible: false },
        color: '#333d69',
        label: { font: { color: '#aab3d6' } },
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
          // console.log({ diff: Math.abs(time1 - time2) })
          if (Math.abs(time2 - time1) < 1000 * 60 * 60 * 24 * 30 * 18)
            rangeTrackRef.current = true
          else rangeTrackRef.current === false
          visualRangeTrack.current = { ...arg }
        },
      }}
      commonSeriesSetting={{
        label: {
          alignment: 'left',
          border: { color: 'red', visible: true },
          position: 'outside',
          visible: true,
        },
        customizeText: (e) => 'some texdt',
      }}
      valueAxis={{
        color: '#333d69',
        label: { font: { color: '#aab3d6' } },
        position: 'right',
        grid: { visible: false },
        tick: { visible: false },
        visible: false,
      }}
    >
      <CommonSeriesSettings argumentField="CALMONTH" />

      <ZoomAndPan dragToZoom={true} argumentAxis="both" />
      {/* drilling */}
      <Series
        color="#ec8d6444"
        type="rangeArea"
        rangeValue1Field="DRILLING004"
        rangeValue2Field="DRILLING003"
        showInLegend={false}
        name="Upper/Lower limit"
      ></Series>
      <Series
        point={{ visible: false }}
        color="#ec8d64"
        valueField="DRILLING001"
        name="Drilling"
        // showInLegend={false}
      ></Series>
      <Series
        point={{ visible: false }}
        color="#ec8d6499"
        valueField="DRILLING002"
        dashStyle="dash"
        name="Predicted"
        showInLegend={false}
      ></Series>
      {/* project */}
      <Series
        color="#0f80b288"
        type="rangeArea"
        rangeValue1Field="PROJECTS004"
        rangeValue2Field="PROJECTS003"
        showInLegend={false}
      ></Series>
      <Series
        point={{ visible: false }}
        color="#0f80b2"
        valueField="PROJECTS001"
        name="Projects"
      ></Series>
      <Series
        point={{ visible: false }}
        color="#0f80b2d8"
        valueField="PROJECTS002"
        dashStyle="dash"
        showInLegend={false}
      ></Series>
      {/* MRO */}
      <Series
        color="#b0daff33"
        type="rangeArea"
        rangeValue1Field="MRO004"
        rangeValue2Field="MRO003"
        name="Upper/Lower limit"
        showInLegend={false}
      ></Series>
      <Series
        point={{ visible: false }}
        color="#badaff"
        valueField="MRO001"
        name="MRO"
        // showInLegend={false}
      ></Series>
      <Series
        point={{ visible: false }}
        color="#badaff88"
        valueField="MRO002"
        dashStyle="dash"
        name="Predicted"
        showInLegend={false}
      ></Series>
      <ValueAxis>
        <Label customizeText={customizeValueAxisText} />
        <Grid visible={false} />
        <Title text="" />
      </ValueAxis>

      <Legend verticalAlignment="bottom" horizontalAlignment="center" />
    </Chart>
  )
}
