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
import formatNumber from '../../lib/helpers/formatNumber'

export default function TransferOrdersCancellation(props) {
  const { query } = props

  const { data, error, isLoading } = useBexJson(query.techname)

  const values =
    data?.chartData
      .map((item) => ({
        ...item,
        CALMONTH: new Date(Date.parse(item.CALMONTH)),
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
          customizeText={({ valueText }) => formatNumber(new Number(valueText),0,'') }
        />
      </CommonSeriesSettings>
      <ArgumentAxis>
        <Label overlappingBehavior="rotate" rotationAngle={-30}>
          <Font color="var(--wh-accent1)"></Font>
        </Label>
      </ArgumentAxis>
      <Series valueField={'VALUE001'}>
        <Label backgroundColor="none" visible={true}>
          <Font color="#fff" />
        </Label>
      </Series>
      <ValueAxis>
        <Label>
          <Font color="var(--wh-accent1)"></Font>
        </Label>
        <Title text="TOs">
          <Font size="12" color="var(--wh-accent1)" />
        </Title>
        <VisualRange startValue={0} />
        <Grid visible={false} />
        <ConstantLine value={0}>
          <Label visible={false} />
        </ConstantLine>
      </ValueAxis>
      <Legend horizontalAlignment="center" visible={false} itemTextPosition="left" />
    </Chart>
  )
}
