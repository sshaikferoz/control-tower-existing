import React, { useContext } from 'react'
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
  Tooltip,
} from 'devextreme-react/chart'

import formatNumber from '../../lib/helpers/formatNumber'
import useBexJson from '../../lib/useBexJson'
import { maskContext } from '../../lib/maskContext'
import { getArgumentField } from '../../lib/dashboardConfig/helpers'

export default function ProcessingTimeForSES(props) {
  const { query } = props
  const { data, error, isLoading } = useBexJson(query.techname)

  const chartData = data?.chartData
  const argumentField = getArgumentField(chartData)
  const values =
    chartData
      ?.filter((item) => {
        if (item[argumentField]?.match?.(/overall result/i)) return false
        return true
      })

      .map((item) => {
        const yearText = item[argumentField]?.toString()

        let value001 = item['VALUE001']
        if (item['VALUE001'] === 0) value001 = null
        let value002 = item['VALUE002']
        if (item['VALUE002'] === 0) value002 = null
        let value003 = item['VALUE003']
        if (item['VALUE003'] === 0) value003 = null

        return {
          ...item,
          [argumentField]: yearText,
          VALUE001: value001,
          VALUE002: value002,
          VALUE003: value003,
        }
      }) || []

  const palette = props.theme?.palette
  const keyFigureLabels = data?.header?.filter((i) => i.type === 'KF')

  return (
    <Chart
      resolveLabelOverlapping="stack"
      dataSource={values}
      palette={[
        palette[1],
        palette[0],
      ]}
      argumentAxis={{
        overlappingBehavior: 'hide',
        tick: { visible: true, color: 'var(--light-blue)' },
        color:'var(--light-blue)',
        label: {
          displayMode: 'rotate',
          rotationAngle: -33,
          wordWrap: 'breakWord',
          textOverflow: 'ellipsis',
          overlappingBehavior: 'none',
          font: { color: 'white', size: 11 },
        },
      }}
    >
      <Title visible={false} />

      <CommonSeriesSettings argumentField={argumentField}></CommonSeriesSettings>
      <Tooltip enabled={true} format={(value) => value?.toFixed(1)} />
      {/* <Series
        type="stackedsplinearea"
        valueField={'VALUE001'}
        name={keyFigureLabels?.[0]?.label}
      >
        <Label
          customizeText={({ valueText }) => new Number(valueText).toFixed(1)}
          visible={true}
          font={{ color: 'white' }}
          backgroundColor="none"
        />
      </Series>*/}
      <Series
        type="spline"
        valueField={'VALUE001'}
        name={keyFigureLabels?.[0]?.label}
      >
        <Label
          customizeText={({ valueText }) => new Number(valueText).toFixed(1)}
          verticalOffset={18}
          visible={true}
          font={{ color: 'white' }}
          backgroundColor="none"
        />
      </Series>
      <Series
        point={{ visible: false }}
        type="spline"
        valueField={'VALUE002'}
        name={keyFigureLabels?.[1]?.label}
        color="var(--kpiYellow)"
        label={{ visible: false }}
      ></Series>

      <ValueAxis tick={{color:'var(--light-blue)'}} color="var(--light-blue)">
        <Grid visible={false} />
        <Label customizeText={(arg) => `${arg?.value}`}>
          <Font color="white"></Font>
        </Label>
        <Title text="">
          <Font size="12" color="white" />
        </Title>
        <Grid visible={false} />
        <ConstantLine value={0}>
          <Label visible={false} />
        </ConstantLine>
      </ValueAxis>
      <Legend horizontalAlignment="center" itemTextPosition="left" />
    </Chart>
  )
}
