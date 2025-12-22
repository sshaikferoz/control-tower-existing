import React from 'react'

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

import useBexJson from '../../lib/useBexJson'
import formatCalMonth from '../../lib/helpers/formatCalMonth'

export default function InvoiceProcessingTime(props) {
  const { query } = props

  const { data, error, isLoading } = useBexJson(query.techname)

  function monthYearFormatted(_SAPMonth) {
    const SAPMonth = _SAPMonth && _SAPMonth.toString()
    if ((SAPMonth && SAPMonth.length !== 6) || isNaN(Number(SAPMonth)))
      return 'invalid date'
    const match = SAPMonth.match(/(?<year>\d\d\d\d)(?<month>\d\d)/)
    const { year, month } = match.groups
    return Date.parse(`${year}-${month}`)
  }
  const values =
    data?.chartData
      .map((item) => ({
        ...item,
        CALMONTH: monthYearFormatted(item.CALMONTH),
      }))
      .sort((a, z) => a.CALMONTH - z.CALMONTH)
      .map((item) => ({
        ...item,
        CALMONTH: new Date(item.CALMONTH).toLocaleDateString('en', {
          month: 'short',
          year: 'numeric',
        }),
      })) || []

  const argumentField = 'CALMONTH'

  return (
    <Chart
      dataSource={values}
      palette={props.theme.palette}
      paletteExtensionMode="blend"
      ignoreEmptyPoints={false}
    >
      <Title visible={false} />
      <CommonSeriesSettings argumentField={argumentField} type="line">
        <Label
          visible={true}
          backgroundColor="none"
          verticalOffset={10}
          customizeText={({ valueText }) => new Number(valueText).toFixed()}
        />
      </CommonSeriesSettings>
      <ArgumentAxis>
        <Label overlappingBehavior="rotate" rotationAngle={-30}>
          <Font color="var(--wh-accent1)"></Font>
        </Label>
      </ArgumentAxis>
      <Series valueField={'VALUE001'} name={data?.headerSources?.[0].name} />
      <Series valueField={'VALUE002'} name={data?.headerSources?.[1].name} />
      <ValueAxis>
        <Label>
          <Font color="var(--wh-accent1)"></Font>
        </Label>
        <Title text="Days">
          <Font size="12" color="var(--wh-accent1)" />
        </Title>
        <VisualRange startValue={0} />
        <Grid visible={false} />
        <ConstantLine value={0}>
          <Label visible={false} />
        </ConstantLine>
      </ValueAxis>
      <Legend horizontalAlignment="center" itemTextPosition="left" />
    </Chart>
  )
}
