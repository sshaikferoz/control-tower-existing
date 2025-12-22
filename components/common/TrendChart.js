import React, { useEffect, useRef, useState } from 'react'

import {
  Chart,
  Series,
  Title,
  Font,
  CommonSeriesSettings,
  CommonAxisSettings,
  Legend,
  Label,
  ValueAxis,
  Grid,
  ConstantLine,
  VisualRange,
  ArgumentAxis,
  ZoomAndPan,
  Tooltip,
} from 'devextreme-react/chart'
import useBexJson from '../../lib/useBexJson'
import {
  PALETTE,
  PALETTE2,
  getArgumentField,
  getMonthDigit,
} from '../../lib/dashboardConfig/helpers'
import formatNumber from '../../lib/helpers/formatNumber'

const delayGen = () => {
  let timer = 0
  return (callback, ms) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(), ms)
  }
}
const delayVisualChange = delayGen()
function monthDiff(dateFrom, dateTo) {
  if (dateFrom?.getMonth && dateTo?.getMonth)
    return (
      dateTo.getMonth() -
      dateFrom.getMonth() +
      12 * (dateTo.getFullYear() - dateFrom.getFullYear())
    )
}
export default function TrendChart(props) {
  const defaultBackground = 'var(--popup-bg)'
  const defaultTextColor = 'dark'
  const trendTechName = props.TechnicalName
  const {
    IsCurrencyFormat,
    DecimalDigits = '1',
    containerRef = null,
    AggregationType = 'avg',
    background = defaultBackground,
    textColor = defaultTextColor,
  } = props

  const trendData = useBexJson(trendTechName)
  const visualYearFormatRef = useRef({ year: 'numeric', month: 'short' })
  const visualRangeTrack = useRef(null)
  const [
    visualYearFormat,
    setVisualYearFormat,
  ] = useState({
    year: 'numeric',
    month: 'short',
  })
  const argField = getArgumentField(trendData?.data?.chartData)
    let chartData =
    trendData?.data?.chartData?.map((item) => {
      // const [argField, kf] = Object.keys(item)
      const isTextMonthAndYear = Boolean(
        `${item[argField] || ''}`?.match?.(/(\w\w\w \d\d)/i)
      )
      if (isTextMonthAndYear) {
        const [
          month,
          year = new Date().getFullYear(),
        ] = item[argField]?.split?.(' ')
        const monthDigit = getMonthDigit(month)
        return {
          ...item,
          [argField]: new Date(`${year}${monthDigit ? '/' : ''}${monthDigit}`),
        }
      }

      const { groups = {} } =
        `${item[argField]}`.match(
          /(?<year>\d\d\d\d)(\/|)(?<month>\d\d)(\/|)(?<day>\d\d)/
        ) ||
        `${item[argField]}`.match(/(?<year>\d\d\d\d)(\/|)(?<month>\d\d)/) ||
        `${item[argField]}`.match(/(?<year>\b\d\d\d\d\b)/) ||
        {}
      const { year, month, day } = groups
      if (
        !isNaN(Date.parse(`${year}/${month}/${day}`)) ||
        !isNaN(Date.parse(`${year}/${month}`)) ||
        !isNaN(Date.parse(`${year}`))
      )
        return {
          ...item,
          [argField]: `${year}${month ? `/${month}` : ''}${day ? `/${day}` : ''}`,
        }
    }) || []

  const argumentField = getArgumentField(chartData)
  const getWeekFormat = (currentDate) => {
    const startDate = new Date(currentDate.getFullYear(), 0, 1)
    var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000))

    var weekNumber = Math.ceil(days / 7)
    return `${currentDate.getFullYear()}/${weekNumber}`
  }

  const customizeText = (arg, d) => {
    // if (visualYearFormatRef.current.day)
    return formatNumber(arg.value, DecimalDigits, IsCurrencyFormat ? 'mm' : 'm')
  }

  const DataNotReady = () => <div style={{ background: background }}></div>
  return (
    <Chart
      size={{ width: '90%' }}
      className="trendPopup"
      autoHidePointMarkers={true}
      stickyHovering={true}
      valueAxis={{
        grid: { visible: false },
        label: {
          customizeText: (arg) =>
            `${formatNumber(
              arg.value,
              DecimalDigits,
              IsCurrencyFormat ? 'mm' : 'm'
            )}`,
        },
      }}
      dataSource={chartData}
      resolveLabelOverlapping="hide"
      palette={PALETTE2}
      argumentAxis={{
        label: {
          format: (d) =>
            visualYearFormatRef.current?.day
              ? getWeekFormat(d)
              : d.toLocaleDateString('en-US', visualYearFormatRef.current),
          alignment: 'center',
          indentFromAxis: true,
        },
        aggregationInterval: visualYearFormatRef.current.day ? 'week' : 'month',
        argumentType: 'datetime',
        type: 'continuous',
        visualRange: visualRangeTrack?.current ? visualRangeTrack.current : null,
        onVisualRangeChange: (arg) => {
          const { startValue, endValue } = arg
          const diff = monthDiff(startValue, endValue)
          if (diff < 13)
            visualYearFormatRef.current = { year: 'numeric', month: 'short' }
          if (diff > 22) visualYearFormatRef.current = { year: 'numeric' }

          if (diff < 3)
            visualYearFormatRef.current = {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }
          if (diff > 4 && diff < 12)
            visualYearFormatRef.current = { year: 'numeric', month: 'short' }
          delayVisualChange(() => {
            if (
              JSON.stringify(visualYearFormatRef.current) ===
              JSON.stringify(visualYearFormat)
            )
              return
            visualRangeTrack.current = { ...arg }
            setVisualYearFormat(visualYearFormatRef.current)
          }, 777)
        },
      }}
      commonAxisSettings={{
        color: `var(--popup-font-${textColor})`,
        label: {
          font: { color: `var(--popup-font-${textColor})` },
        },
      }}
      commonSeriesSettings={{
        aggregation: {
          method: AggregationType,
          enabled: true,
        },
        argumentField,
      }}
    >
      <Series
        key="VALUE001"
        valueField={'VALUE001'}
        point={{ size: 7, visible: true }}
        type="spline"
      >
        <Label visible={true} backgroundColor="none" customizeText={customizeText}>
          <Font color={`var(--popup-font-${textColor}-dimmed)`} />
        </Label>
      </Series>
      <ZoomAndPan dragToZoom={true} argumentAxis="both" />
      <Grid visible={false} />
      <Label
        customizeText={(arg) =>
          arg.value?.toLocaleDateString?.('en-US', visualYearFormatRef.current)
        }
        overlappingBehavior="rotate"
        rotationAngle={-40}
        format="decimal"
      />

      <Legend
        font={{
          color: `var(--popup-font-${textColor}-dimmed)`,
        }}
        visible={false}
      />
      <Tooltip
        container={containerRef}
        enabled={true}
        argumentFormat={{ type: 'shortDate' }}
        format={(d) =>
          `${formatNumber(d, DecimalDigits, IsCurrencyFormat ? 'mm' : 'm')}`
        }
        // contentRender={(d) => {
        //   console.log(d)
        //   return (
        //     <div>
        //       {d.argument?.toLocaleDateString('en-US', visualYearFormatRef.current)}
        //       <p>{`${formatNumber(
        //         d.value,
        //         DecimalDigits,
        //         IsCurrencyFormat ? 'mm' : 'm'
        //       )}`}</p>
        //     </div>
        //   )
        // }}
      />
    </Chart>
  )
}
