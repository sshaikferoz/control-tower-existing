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

Date.prototype.SAPFormat = function () {
  let mm = this.getMonth() + 1 // getMonth() is zero-based
  let dd = this.getDate()

  return [
    this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd,
  ].join('')
}

function aggregateValues(values, argField, valField) {
  const now = new Date()
  const nextDate = new Date(now.getFullYear() - 1, now.getMonth() + 1, now.getDate())

  let aggregation = []

  let count = 1
  while (count < 12) {
    const date = nextDate.SAPFormat().substr(0, 6)
    const nextAgg = values.filter((item) => item[argField].substr(0, 6) === date)

    let total = 0
    nextAgg.map((item) => {
      if (item[valField]) total += item[valField]
    })

    const record = {
      [argField]: [date.substr(4, 2), date.substr(0, 4)].join('/'),
      [valField]: total,
    }
    aggregation.push(record)

    nextDate.setMonth(nextDate.getMonth() + 1)
    count++
  }

  return aggregation
}

export default function StockAdjustment(props) {
  const { query } = props

  const { data, error, isLoading } = useBexJson(query.techname)

  const values = data?.chartData || []
  const items = values.slice(0, values.length - 2) || []

  const argumentField = items[0]
    ? Object.keys(items[0]).find((key) => key === 'ZWMMOVDAT')
    : ''
  const valueField = items[0]
    ? Object.keys(items[0]).find((key) => key.startsWith('Total'))
    : ''

  const aggregation = aggregateValues(values, argumentField, valueField)

  return (
    <Chart
      dataSource={aggregation}
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
      <Series valueField={valueField}>
        <Label backgroundColor="none" visible={true}>
          <Font color="#fff" />
        </Label>
      </Series>
      <ValueAxis>
        <Label>
          <Font color="var(--wh-accent1)"></Font>
        </Label>
        <VisualRange startValue={0} />
        <Grid visible={false} />
        <ConstantLine value={0}>
          <Label visible={false} />
        </ConstantLine>
      </ValueAxis>
      <Legend visible={false} />
    </Chart>
  )
}
