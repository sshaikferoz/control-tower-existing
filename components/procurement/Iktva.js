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
import { PALETTE, getArgumentField } from '../../lib/dashboardConfig/helpers'

export default function Iktva(props) {
  console.log({ props })
  const { data } = useBexJson(props.TechnicalName)

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

        return {
          ...item,
          [argumentField]: yearText,
          VALUE001: value001,
          VALUE002: value002,
        }
      }) || []

  const palette = PALETTE
  return (
    <Chart
      dataSource={values}
      palette={[
        palette[0],
        palette[0],
      ]}
      paletteExtensionMode="blend"
      commonAxisSettings={{
        color: 'var(--unify-font-light)',
        label: { font: { color: 'var(--unify-font-light)' } },
      }}
    >
      <Title visible={false} />

      <CommonSeriesSettings argumentField={argumentField} type="line">
        <Label
          visible={true}
          backgroundColor="none"
          verticalOffset={10}
          font={{ color: 'var(--unify-font-light)' }}
          customizeText={({ valueText }) =>
            `${formatNumber(
              valueText,
              props.DecimalDigits,
              props.IsCurrencyFormat ? 'mm' : 'm'
            )}%`
          }
        />
      </CommonSeriesSettings>
      <Tooltip enabled={true} />
      <ArgumentAxis>
        <Label overlappingBehavior="rotate" rotationAngle={-45}>
          <Font color="var(--wh-accent1)"></Font>
        </Label>
      </ArgumentAxis>
      <Series valueField={'VALUE001'} name={data?.header?.[0].label}>
        <Label visible={true} backgroundColor="none" />
      </Series>
      <Series dashStyle="dash" valueField={'VALUE002'} opacity={0.5}>
        <Label visible={true} backgroundColor="none" />
      </Series>

      <ValueAxis>
        <Grid visible={true} />
        <Label
          customizeText={(arg) =>
            `${formatNumber(
              arg.valueText,
              props.DecimalDigits,
              props.IsCurrencyFormat ? 'mm' : 'm'
            )}%`
          }
        >
          <Font color="var(--wh-accent1)"></Font>
        </Label>
        <Title text="">
          <Font size="12" color="var(--wh-accent1)" />
        </Title>
        <Grid visible={false} />
        <ConstantLine value={0}>
          <Label visible={false} />
        </ConstantLine>
      </ValueAxis>
      <Legend horizontalAlignment="center" visible={false} itemTextPosition="left" />
    </Chart>
  )
}
