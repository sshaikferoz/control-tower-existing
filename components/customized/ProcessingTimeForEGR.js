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
  ArgumentAxis,
  Tooltip,
} from 'devextreme-react/chart'

import formatNumber from '../../lib/helpers/formatNumber'
import useBexJson from '../../lib/useBexJson'
import { maskContext } from '../../lib/maskContext'
import { getArgumentField } from '../../lib/dashboardConfig/helpers'

export default function ProcessingTimeForEGR(props) {
  const { query } = props
  const { data, error, isLoading } = useBexJson(query.techname, { parser: 'new' })

  const {
    chartData = [],
    error: executeQueryError,
    charKeys = [],
    keyFigureKeys = [],
    headerText = {},
    charUniqueValues = {},
  } = data || {}
  let [argumentField] = charKeys
  let [
    actualKey,
    targetKey,
  ] = keyFigureKeys
  const values =
    chartData.map((item) => {
      const yearText = item[argumentField]?.toString()
      let value001 = item[actualKey]
      if (item[actualKey] === 0) value001 = null
      let value002 = item[targetKey]
      if (item[targetKey] === 0) value002 = null

      return {
        ...item,
        [argumentField]: yearText,
        [actualKey]: value001,
        [targetKey]: value002,
      }
    }) || []

  const palette = props.theme?.palette

  return (
    <Chart
      resolveLabelOverlapping="stack"
      dataSource={values}
      palette={[
        palette[1],
        palette[0],
      ]}
      paletteExtensionMode="blend"
      commonAxisSettings={{
        color: 'var(--unify-font-light)',
        label: { font: { color: 'var(--unify-font-light)' } },
      }}
      argumentAxis={{
        overlappingBehavior: 'hide',
        tick: { visible: true, color: 'var(--light-blue)' },
        color: 'var(--light-blue)',
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

      <CommonSeriesSettings argumentField={argumentField} type="spline">
        <Label
          visible={true}
          backgroundColor="none"
          verticalOffset={10}
          font={{ color: 'var(--unify-font-light)' }}
          customizeText={({ valueText }) => new Number(valueText).toFixed(1)}
        />
      </CommonSeriesSettings>
      <Tooltip enabled={true} format={(value) => value?.toFixed(1)} />
      <ArgumentAxis>
        <Label rotationAngle={-45}>
          <Font color="var(--wh-accent1)"></Font>
        </Label>
      </ArgumentAxis>
      <Series valueField={actualKey} name={headerText[actualKey]}>
        <Label visible={true} backgroundColor="none" />
      </Series>
      <Series
        color="var(--kpiYellow)"
        point={{ visible: false }}
        valueField={targetKey}
        name={headerText[targetKey]}
      >
        <Label visible={false} backgroundColor="none" />
      </Series>

      <ValueAxis
        allowDecimals={false}
        tick={{ color: 'var(--light-blue)' }}
        color="var(--light-blue)"
      >
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
