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
  Format,
  BreakStyle,
  ValueAxis,
  ConstantLine,
  Label,
  Size,
  Point,
} from 'devextreme-react/chart'
import processor from 'devextreme/data/query'
import useBexJson from '../../lib/useBexJson'
import {
  formatChartDataWithShortMonth,
  getMonthDigit,
} from '../../lib/dashboardConfig/helpers'
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
export default function LineChart(props) {
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
  } = data || {}
  const [
    valueField,
    series = [],
  ] = Object.entries(charUniqueValues)[0] || []
  const [argumentField] = charKeys

  const [keyField] = keyFigureKeys
  const dataFormatted =
    series?.map?.((groupedByKey) => {
      const filtered = chartData
        .filter((i) => {
          if (!valueField) return true
          return i[valueField] && i[valueField] === groupedByKey
        })
        .map((fileredGroupItem) => {
          return { ...fileredGroupItem, [groupedByKey]: fileredGroupItem[keyField] }
        })
      return filtered
    }) || []

  dataFormatted.flat() //?

  console.log({
    chartDataForLineChart: chartData,
    dataFormatted: dataFormatted.flat(),
  })
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
  return (
    <Chart
      // dataSource={groupedChartData}
      dataSource={dataFormatted.flat()}
      commonAxisSettings={{ valueMarginsEnabled: true, maxValueMargin: 0.05 }}
      argumentAxis={{
        overlappingBehavior: 'hide',
        tick: { visible: false },
        color: '#333d69',
        label: { font: { color: '#aab3d6' } },
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
      <ValueAxis>
        <Label customizeText={customizeValueAxisText} />
        <Grid visible={false} />
        <Title text="" />
      </ValueAxis>
      {series.map((seriesItem,ind) => {
        return (
          <Series
            key={`${ind}${Math.random()}`}
            name={seriesItem}
            point={{ visible: false }}
            argumentField={argumentField}
            valueField={seriesItem}
          ></Series>
        )
      })}

      <Legend verticalAlignment="bottom" horizontalAlignment="center" />
      <Tooltip style={{ zIndex: 9999 }} enabled={true}>
        <Format type={'largeNumber'} precision={2}></Format>
      </Tooltip>
    </Chart>
  )
}
