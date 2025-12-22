import React, { useEffect, useRef, useState } from 'react'

import {
  Chart,
  Series,
  Title,
  Font,
  CommonSeriesSettings,
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
import { PALETTE, getArgumentField } from '../../lib/dashboardConfig/helpers'

function customizeTooltip(arg) {
  console.log({ argfromTooooltip: arg })
  arg.valueText = inMillion(arg.value)
  return 'some text to display'
}

function inMillion(number, digits = 1) {
  if (isNaN(number)) return 0
  const num = Math.abs(Number(number))

  return (num / 1.0e6).toFixed(digits)
}
function monthDiff(dateFrom, dateTo) {
  if (dateFrom?.getMonth && dateTo?.getMonth)
    return (
      dateTo.getMonth() -
      dateFrom.getMonth() +
      12 * (dateTo.getFullYear() - dateFrom.getFullYear())
    )
}
export default function PressureIndex(props) {
  const { TechnicalName } = props || {}
  const trendData = useBexJson(TechnicalName)
  const argField = getArgumentField(trendData?.data?.chartData)
  const visualYearFormatRef = useRef({ year: 'numeric' })
  const yearsBack = 5
  const relativeFiveYearsBackRef = useRef(
    new Date(Date.now() - 60 * 60 * 24 * 360 * 1000 * yearsBack)
  )

  function customizeText(arg) {
    if (visualYearFormatRef.current.month) return arg.value
  }
  let chartData =
    trendData?.data?.chartData?.map((item) => {
      // const [argField, kf] = Object.keys(item)
      const { groups = {} } =
        `${item[argField]}`.match(
          /(?<year>\d\d\d\d)(\/|)(?<month>\d\d)(\/|)(?<day>\d\d)/
        ) ||
        `${item[argField]}`.match(/(?<year>\d\d\d\d)(\/|)(?<month>\d\d)/) ||
        {}
      const { year, month, day } = groups
      if (
        !isNaN(Date.parse(`${year}/${month}-${day}`)) ||
        !isNaN(Date.parse(`${year}/${month}`))
      )
        return { ...item, [argField]: `${year}/${month}${day ? `/${day}` : ''}` }
    }) || []

  const argumentField = getArgumentField(chartData)
  const lastDate = [...chartData].pop()?.[argumentField]
  console.log({ lastDate: new Date(lastDate) })
  const relativeFiveYearsBack = new Date(
    new Date(lastDate).getTime() - 60 * 60 * 24 * 360 * 1000 * yearsBack
  )
  if (
    chartData?.length &&
    relativeFiveYearsBack?.getFullYear() !==
      relativeFiveYearsBackRef.current?.getFullYear()
  ) {
    relativeFiveYearsBackRef.current = new Date(relativeFiveYearsBack.getTime())
  }

  return (
    <Chart
      resolveLabelOverlapping="hide"
      // size={{ width: 590 }}
      // tooltip={{ enabled: true, format: { type: 'monthAndYear' } }}
      palette={PALETTE}
      containerBackgroundColor="#bada55"
      dataSource={chartData}
      commonAxisSettings={{
        color: 'var(--unify-font-light)',
        label: { font: { color: 'var(--unify-font-light)' } },
      }}
    >
      <CommonSeriesSettings type={props.visType} argumentField={argumentField} />
      <Series
        key="VALUE001"
        valueField={'VALUE001'}
        point={{ size: 7, visible: true }}
      >
        <Label
          format={{ type: 'fixedPoint', precision: 1 }}
          visible={true}
          backgroundColor="none"
        >
          <Font color="var(--unify-font-light)" />
        </Label>
      </Series>
      <Tooltip enabled={true} />
      <ZoomAndPan dragToZoom={true} argumentAxis="both" />
      <ArgumentAxis
        argumentType="datetime"
        valueMarginsEnabled={true}
        onVisualRangeChange={(arg) => {
          const { startValue, endValue } = arg
          const diff = monthDiff(startValue, endValue)
          console.log({ startValue, endValue, diff })
          if (diff < 23)
            visualYearFormatRef.current = { year: 'numeric', month: 'short' }
          if (diff > 28) visualYearFormatRef.current = { year: 'numeric' }
        }}
        discreteAxisDivisionMode="crossLabels"
        allowDecimals={false}
        defaultVisualRange={{
          startValue: relativeFiveYearsBackRef.current,
        }}
      >
        <Grid visible={false} />
        <Label
          customizeText={(arg) =>
            arg.value?.toLocaleDateString?.('en-US', visualYearFormatRef.current)
          }
          overlappingBehavior="rotate"
          rotationAngle={-40}
          format="decimal"
        />
      </ArgumentAxis>
      <ValueAxis>
        <Grid visible={false} />
        <ConstantLine value={0}>
          <Label visible={false} />
        </ConstantLine>
      </ValueAxis>
      <Legend visible={false} />
    </Chart>
  )
}
