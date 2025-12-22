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
} from 'devextreme-react/chart'

import formatCalMonth from '../../lib/helpers/formatCalMonth'
import useBexJson from '../../lib/useBexJson'
import { getArgumentField } from '../../lib/dashboardConfig/helpers'

export default function LeadTime(props) {
  const isInitial = useRef(true)
  const { query } = props
  const materialPriceData = useBexJson(query.techname)
  const { error } = materialPriceData
  const dataByQuarter = materialPriceData?.data?.chartData
  const oldHardCoded = [
    { QUARTER: 'Q1 2020', VALUE001: 2.5 },
    { QUARTER: 'Q2 2020', VALUE001: 2.2 },
    { QUARTER: 'Q3 2020', VALUE001: 2.8 },
    { QUARTER: 'Q4 2020', VALUE001: 3.2 },

    { QUARTER: 'Q1 2021', VALUE001: 4.0 },
    { QUARTER: 'Q2 2021', VALUE001: 4.6 },
    { QUARTER: 'Q3 2021', VALUE001: 4.5 },
    { QUARTER: 'Q4 2021', VALUE001: 4.3 },

    { QUARTER: 'Q1 2022', VALUE001: 4.9 },
    { QUARTER: 'Q2 2022', VALUE001: 5.0, VALUE002: 5.0 },
    { QUARTER: 'Q3 2022', VALUE002: 4.7 },
    { QUARTER: 'Q4 2022', VALUE002: 4.4 },

    { QUARTER: 'Q1 2023', VALUE002: 4.2 },
    { QUARTER: 'Q2 2023', VALUE002: 3.9 },
    { QUARTER: 'Q3 2023', VALUE002: 3.8 },
    { QUARTER: 'Q4 2023', VALUE002: 3.6 },
    { QUARTER: 'Q1 2024', VALUE002: 3.7 },
    { QUARTER: 'Q2 2024', VALUE002: 3.6 },
    { QUARTER: 'Q3 2024', VALUE002: 3.5 },
    { QUARTER: 'Q4 2024', VALUE002: 3.5 },
  ]

  const data = [
    { CALMONTH: '202101', VALUE001: 3.9 },
    { CALMONTH: '202102', VALUE001: 3.93 },
    { CALMONTH: '202103', VALUE001: 4.14 },
    { CALMONTH: '202104', VALUE001: 4.29 },
    { CALMONTH: '202105', VALUE001: 4.73 },
    { CALMONTH: '202106', VALUE001: 4.65 },
    { CALMONTH: '202107', VALUE001: 4.77 },
    { CALMONTH: '202108', VALUE001: 4.38 },
    { CALMONTH: '202109', VALUE001: 4.24 },
    { CALMONTH: '202110', VALUE001: 4.14 },
    { CALMONTH: '202111', VALUE001: 4.14 },
    { CALMONTH: '202112', VALUE001: 4.14 },
    { CALMONTH: '202201', VALUE001: 4.1 },
    { CALMONTH: '202202', VALUE001: 4.1 },
    { CALMONTH: '202203', VALUE001: 4.1 },
    { CALMONTH: '202204', VALUE001: 3.93 },
    { CALMONTH: '202205', VALUE001: 3.93 },
    { CALMONTH: '202206', VALUE001: 3.93 },
    { CALMONTH: '202207', VALUE001: 3.63 },
    { CALMONTH: '202208', VALUE001: 3.63 },
    { CALMONTH: '202209', VALUE001: 3.63 },
    { CALMONTH: '202210', VALUE001: 3.5 },
    { CALMONTH: '202211', VALUE001: 3.5 },
    { CALMONTH: '202212', VALUE001: 3.5 },
  ]
  function monthYearFormatted(_SAPMonth) {
    const SAPMonth = _SAPMonth && _SAPMonth.toString()
    if ((SAPMonth && SAPMonth.length !== 6) || isNaN(Number(SAPMonth)))
      return 'invalid date'
    const match = SAPMonth.match(/(?<year>\d\d\d\d)(?<month>\d\d)/)
    const { year, month } = match.groups
    return Date.parse(`${year}-${month}`)
  }
  const values =
    data
      .map((item) => ({
        ...item,
        CALMONTH: monthYearFormatted(item.CALMONTH),
      }))
      .sort((a, z) => a.CALMONTH - z.CALMONTH)
      .map((item) => ({
        ...item,
        CALMONTH: new Date(item.CALMONTH).toLocaleDateString('en', {
          month: 'short',
          year: '2-digit',
        }),
      })) || []

  const argumentField = getArgumentField(materialPriceData?.data?.chartData)
  const palette = props.theme.palette
  setTimeout(async () => {
    await new Promise((r) => setTimeout(r, 200))
    isInitial.current = false
  })
  const DataNotReady = () => (
    <div style={{ background: 'var(--popup-bg)', minHeight: '300px' }}></div>
  )
  if (isInitial.current === true) return <DataNotReady />
  if (error) return `${typeof error === 'string' ? error : 'Error loading the data'}`
  if (!Array.isArray(materialPriceData?.data?.chartData)) return <DataNotReady />
  return (
    <Chart
      size={{ width: '90%' }}
      dataSource={dataByQuarter}
      palette={[palette[0], palette[0]]}
      paletteExtensionMode="blend"
      ignoreEmptyPoints={false}
      commonAxisSettings={{
        color: 'var(--unify-font-light)',
        label: { font: { color: 'var(--unify-font-light)' } },
      }}
    >
      <Title visible={false} />
      <CommonSeriesSettings
        point={{ size: 11 }}
        argumentField={argumentField}
        type="line"
      >
        <Label
          visible={true}
          backgroundColor="none"
          verticalOffset={10}
          font={{ color: 'var(--unify-font-light)' }}
          // customizeText={({ valueText }) => new Number(valueText).toFixed(1)}
        />
      </CommonSeriesSettings>
      <ArgumentAxis>
        <Label overlappingBehavior="rotate" rotationAngle={-45}>
          <Font color="var(--wh-accent1)"></Font>
        </Label>
      </ArgumentAxis>
      <Series
        valueField={'VALUE001'}
        point={{ size: 7, visible: true }}
        name={data?.headerSources?.[0].name}
      />
      <Series
        dashStyle="dash"
        valueField={'VALUE002'}
        opacity={0.5}
        point={{ size: 7, visible: true }}
      />

      <ValueAxis visualRangeUpdateMode="keep" visualRange={[2, 5]}>
        <Title text="MPI">
          <Font size="12" color="var(--wh-accent1)" />
        </Title>
        <Grid visible={false} />
        <Label>
          <Font color="var(--wh-accent1)"></Font>
        </Label>
        <VisualRange startValue={2} defaultStartValue={2}>
          <Title text="MPI">
            <Font size="12" color="var(--wh-accent1)" />
          </Title>
          <Label>
            <Font color="var(--wh-accent1)"></Font>
          </Label>
          <VisualRange startValue={0} />
          <Grid visible={false} />
          <ConstantLine value={0}>
            <Label visible={false} />
          </ConstantLine>
        </VisualRange>
      </ValueAxis>
      <Legend horizontalAlignment="center" visible={false} itemTextPosition="left" />
    </Chart>
  )
}
