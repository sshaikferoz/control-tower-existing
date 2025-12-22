import {
  Chart,
  CommonSeriesSettings,
  Font,
  Label,
  Legend,
  Series,
  Title,
  ValueAxis,
  Grid,
  ConstantLine,
  ArgumentAxis,
} from 'devextreme-react/chart'
import React from 'react'
import formatCalMonth from '../../lib/helpers/formatCalMonth'
import useBexJson from '../../lib/useBexJson'

export default function GlobalLogisticsActivities(props) {
  const { query } = props

  const { data, error, isLoading } = useBexJson(query.techname)

  const values = data?.chartData || []

  const argumentField = values[0]
    ? Object.keys(values[0]).find((key) => key === 'ZNDF_MON')
    : ''
  const valueField = values[0]
    ? Object.keys(values[0]).find((key) => key === 'VALUE002')
    : ''

  values.map((item) => {
    item[argumentField] = formatCalMonth(item[argumentField])
  })

  const series = data?.header.filter(
    (headerSrc) =>
      headerSrc.value === 'VALUE002' ||
      headerSrc.value === 'VALUE003' ||
      headerSrc.value === 'VALUE004'
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
        <Label visible={true} backgroundColor="none" />
      </Series> */}
      {series?.map((item, index) => (
        <Series
          valueField={item.value}
          name={item.name}
          type={item.value === 'VALUE002' ? 'spline' : 'bar'}
          key={index}
        >
          <Label visible={true} backgroundColor="none" />
        </Series>
      ))}
      <ArgumentAxis>
        <Label overlappingBehavior="rotate" rotationAngle={-40} />
      </ArgumentAxis>
      <ValueAxis>
        <Grid visible={false} />
        <ConstantLine value={0}>
          <Label visible={false} />
        </ConstantLine>
      </ValueAxis>
      <Legend visible={true} verticalAlignment="top" horizontalAlignment="center" />
    </Chart>
  )
}
