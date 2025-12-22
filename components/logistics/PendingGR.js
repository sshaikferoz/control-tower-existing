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
  ArgumentAxis,
} from 'devextreme-react/chart'
import selectBexColumnByFieldName from '../../lib/helpers/selectBexColumByFieldName'

import useBexJson from '../../lib/useBexJson'
import formatCalMonth from '../../lib/helpers/formatCalMonth'
import { getArgumentField } from '../../lib/dashboardConfig/helpers'

export default function PendingGR(props) {
  const { query, theme } = props

  const { data, error, isLoading } = useBexJson(query.techname)

  const values = data?.chartData || []

  const argumentField = getArgumentField(values)
  const valueField = values[0]
    ? Object.keys(values[0]).find((key) => key === 'VALUE001')
    : ''

  // skip overall column and warehouses total
  const items = values.filter(
    (item) =>
      item.WHSE_NUM?.toLowerCase?.() !== 'overall result' &&
      item.WHSE_NUM?.toLowerCase?.() !== 'warehouses departments'
  )

  // values.map((item) => {
  //   item[argumentField] = formatCalMonth(item[argumentField])
  // })
  return (
    <Chart
      dataSource={values}
      palette={theme.palette}
      paletteExtensionMode="blend"
      resolveLabelOverlapping="stack"
    >
      <Title visible={false} />
      <CommonSeriesSettings argumentField={argumentField} type="bar">
        <Label visible={true} backgroundColor="transparent" />
      </CommonSeriesSettings>
      <ArgumentAxis>
        <Label customizeText={cutomizeArgumentLabel}>
          <Font color="var(--wh-accent1)"></Font>
        </Label>
      </ArgumentAxis>
      <Series
        valueField={'VALUE001'}
        name={data?.headerSources?.[0]?.name}
      />
      <Series
        valueField={'VALUE002'}
        name={data?.headerSources?.[1]?.name}
      />
      <Legend horizontalAlignment="center" itemTextPosition="left" />
      <ValueAxis>
        <Grid visible={false} />
        <Label>
          <Font color="var(--wh-accent1)"></Font>
        </Label>
        <ConstantLine value={0}>
          <Label visible={false} />
        </ConstantLine>
      </ValueAxis>
    </Chart>
  )
}

function cutomizeArgumentLabel({ valueText }) {
  const text = valueText.replace(/\sDivis\w+|\snumber.*/, '')
  const splited = text.split(' ')

  return splited.join('\n')
}
