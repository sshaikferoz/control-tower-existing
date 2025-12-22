import React, { useEffect, useState, useRef, useContext } from 'react'
import merger from 'utils-merge'
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
export default function PredictionLineChart(props) {
  const { withMask } = useContext(maskContext)
  const { data, error, isLoading } = useBexJson(props.TechnicalName, {
    parser: 'new',
  })
  const {
    chartData = [],
    error: executeQueryError,
    charKeys = [],
    keyFigureKeys = [],
    headerText = {},
    charUniqueValues = {},
    mainAxisUniqueValues = [],
  } = data || {}
  const [
    refresh,
    setRefresh,
  ] = useState(0)
  const rangeTrackRef = useRef(false)
  const visualRangeTrack = useRef(false)
  const enableAnimation = useRef(false)
  console.log({ data })
  const [valueField] = charKeys

  function customizeValueAxisText(arg) {
    return withMask(formatToBillion(arg.value))
  }
  const [
    argumentField,
    groupKey,
  ] = charKeys

  const groupedData = Object.groupBy?.(chartData, (i) => i?.[groupKey]) || {}

  const groupUniqueValues = charUniqueValues[groupKey] || []
  // console.log({ groupUniqueValues })

  const colorList = [
    '#badaff',
    '#0f80b2',
    '#ec8d64',
  ]

  function fixLastActualEntry(entry) {
    if (Boolean(entry) === false) return []
    let mergedObject = {}
    groupUniqueValues.forEach((g) => {
      const actualValue = entry[`${keyFigureKeys[0]}${g}`]
      const mergeEntry = Object.fromEntries(
        Object.entries(entry)
          .map(
            ([
              k,
              v,
            ]) => {
              if (v !== null || !k.includes(g)) return
              return [
                k,
                actualValue,
              ]
            }
          )
          .filter(Boolean)
      )
      mergedObject = { ...mergedObject, ...mergeEntry }
    })
    console.log({ mergedEntry: { ...entry, ...mergedObject } })
    return { ...entry, ...mergedObject }
  }
  const colors = groupUniqueValues
    .map((i, ind) => ({
      [i]: colorList[ind] || colorList[0],
    }))
    .reduce((cum, cur) => merger(cum, cur), {})
  // console.log({ colors })
  const dataForFirstGroupInitial = groupedData?.[groupUniqueValues?.[0]] || []
  //replace value as empty string with null so tha chart cuts the line
  const dataForFirstGroupFormatted =
    dataForFirstGroupInitial.map?.((i) => {
      const entries = Object.entries(i).map(
        ([
          key,
          val,
        ]) => {
          return [
            key,
            val || null,
          ]
        }
      )
      return Object.fromEntries(entries)
    }) || []
  const actualEntry = dataForFirstGroupFormatted.findLast?.(
    (i) => i[keyFigureKeys[1]] === null
  )
  const actualEntryFixed = fixLastActualEntry(actualEntry)
  const dataForFirstGroupSynced = dataForFirstGroupFormatted.map((i) => {
    if (i[argumentField] === actualEntryFixed[argumentField]) return actualEntryFixed
    return i
  })

  const dataFormattedKeyFigure = Object.keys(groupedData || {})
    .map((groupKey) => {
      return groupedData[groupKey].map((item) => {
        const entries = Object.entries(item).map(
          ([
            k,
            v,
          ]) => {
            if (data.keyFigureKeys.includes(k))
              return [
                `${k}${groupKey}`,
                v,
              ]
            return [
              k,
              v,
            ]
          }
        )
        return Object.fromEntries(entries)
      })
    })
    .reduce((cum, cur) => cum.concat(cur), [])
  const groupedByMonth = Object.groupBy?.(
    dataFormattedKeyFigure,
    (i) => i[argumentField]
  )
  const groupedFormatted = Object.keys(groupedByMonth || {})
    .map((month) => {
      const list = groupedByMonth[month]
      const merged = list.reduce((cum, cur) => {
        return merger(cum, cur)
      }, {})
      return merged
    })
    .map((i) => {
      const entries = Object.entries(i).map(
        ([
          key,
          val,
        ]) => {
          return [
            key,
            val || null,
          ]
        }
      )
      return Object.fromEntries(entries)
    })
  const lastActualEntry = groupedFormatted?.findLast?.(
    (i) => i[`${keyFigureKeys[1]}${groupUniqueValues[0]}`] === null
  )
  // console.log({ lastActualEntry })
  const lastActualEntryFixed = fixLastActualEntry(lastActualEntry)
  // console.log({ lastActualEntryFixed })
  const groupedFormattedSynced = groupedFormatted
    .map((i) => {
      if (i[argumentField] === lastActualEntryFixed[argumentField])
        return lastActualEntryFixed
      return i
    })
    .map((i) => {
      // if month is in a numeric format yyyymm, convert to date object
      const month = i?.[argumentField]
      if (isNaN(month)) return i
      const [
        y1,
        y2,
        y3,
        y4,
        m1,
        m2,
      ] = `${month}`
      return { ...i, [argumentField]: new Date(`${y1}${y2}${y3}${y4}-${m1}${m2}`) }
    })
  // console.log({ groupedFormattedSynced, groupedFormatted })
  const [
    ,
    ,
    g,
  ] = groupUniqueValues
  if (groupUniqueValues.length)
    return (
      <Chart
        animation={false}
        dataSource={groupedFormattedSynced}
        commonAxisSettings={{ valueMarginsEnabled: true, maxValueMargin: 0.05 }}
        argumentAxis={{
          overlappingBehavior: 'hide',
          tick: { visible: true, color: '#333d69' },
          color: '#333d69',
          label: {
            // displayMode: 'rotate',
            // rotationAngle: 33,
            wordWrap: 'breakWord',
            textOverflow: 'ellipsis',
            overlappingBehavior: 'none',
            font: { color: '#aab3d6', size: 10 },
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
          label: {
            font: { color: '#aab3d6' },
            customizeText: customizeValueAxisText,
          },
          position: 'right',
          grid: { visible: false },
          tick: { visible: false },
          visible: false,
        }}
      >
        <CommonSeriesSettings argumentField={argumentField} />
        <ZoomAndPan dragToZoom={true} argumentAxis="both" />
        {groupUniqueValues.map((g, ind) => (
          <Series
            key={`range${g}`}
            color={`${colors[g]}67`}
            type="rangeArea"
            rangeValue1Field={`${keyFigureKeys[3]}${g}`}
            rangeValue2Field={`${keyFigureKeys[2]}${g}`}
            showInLegend={false}
            name="Upper/Lower limit"
          ></Series>
        ))}
        {groupUniqueValues.map((g, ind) => (
          <Series
            key={`act${g}`}
            ignoreEmptyPoints={true}
            point={{ visible: false }}
            valueField={`${keyFigureKeys[0]}${g}`}
            name={g}
            // showInLegend={false}
            color={colors[g]}
            showZero={false}
          ></Series>
        ))}
        {groupUniqueValues.map((g, ind) => (
          <Series
            key={`pred${g}`}
            ignoreEmptyPoints={true}
            point={{ visible: false }}
            color={colors[g]}
            valueField={`${keyFigureKeys[1]}${g}`}
            dashStyle="dash"
            name={headerText?.[keyFigureKeys[1]]}
            showInLegend={false}
          ></Series>
        ))}
        <ValueAxis>
          <Grid visible={false} />
          <Title text="" />
        </ValueAxis>
        <Legend verticalAlignment="bottom" horizontalAlignment="center" />
      </Chart>
    )
    else
    return(<></>)
}
