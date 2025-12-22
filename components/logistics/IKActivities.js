import {
  Chart,
  CommonSeriesSettings,
  Font,
  Label,
  Legend,
  Series,
  Size,
  Title,
  ValueAxis,
  Grid,
  ConstantLine,
} from 'devextreme-react/chart'
import React from 'react'
import useBexJson from '../../lib/useBexJson'

export default function IKActivities(props) {
  const { query } = props

  const { data, error, isLoading } = useBexJson(query.techname)

  const values = data?.chartData || []

  const argumentField = values[0]
    ? Object.keys(values[0]).find((key) => key === 'ZCSCRYR')
    : ''
  const valueField = values[0]
    ? Object.keys(values[0]).find((key) => key === 'VALUE001')
    : ''

  values.map((item) => {
    item[argumentField] = item[argumentField].toString()
  })

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
      <Series valueField={valueField}>
        <Label visible={true} format="millions" backgroundColor="none" />
      </Series>
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
