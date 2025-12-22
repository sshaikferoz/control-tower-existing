import React from 'react'
import { Currency } from 'react-intl-number-format'

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

export default function WarehouseActivities(props) {
  const { query } = props

  const { data, error, isLoading } = useBexJson(query.techname)

  const values = data?.chartData || []

  const argumentField = values[0]
    ? Object.keys(values[0]).find((key) => key === 'CALYEAR')
    : ''
  const valueField = values[0]
    ? Object.keys(values[0]).find((key) => key === 'VALUE001')
    : ''

  values.map((item) => {
    item[argumentField] = item[argumentField].toString()
  })

  const series = data?.header?.filter?.(
    (headerSrc) => headerSrc.value === 'VALUE002' || headerSrc.value === 'VALUE003'
  )

  return (
    <Chart
      dataSource={values}
      palette={props.theme.palette}
      paletteExtensionMode="blend"
    >
      <Title text={query.title} verticalAlignment="bottom">
        <Font color="#fff" size="1.3rem" />
      </Title>
      <CommonSeriesSettings argumentField={argumentField} type="bar" />
      {/* <Series valueField={valueField}>
        <Label visible={true} format="thousands" backgroundColor="none" />
      </Series> */}
      {series?.map((item, index) => (
        <Series
          valueField={item.value}
          name={item.name}
          key={index}
        >
          <Label visible={true} format="thousands" backgroundColor="none" />
        </Series>
      ))}
      <ArgumentAxis>
        <Label overlappingBehavior="rotate" rotationAngle={-30} />
      </ArgumentAxis>
      <ValueAxis>
        <VisualRange defaultStartValue={0} />
        <Grid visible={false} />
        <ConstantLine value={0}>
          <Label visible={false} />
        </ConstantLine>
      </ValueAxis>
      <Legend visible={true} />
    </Chart>
  )
}
