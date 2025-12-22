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
  Aggregation,
} from 'devextreme-react/chart'

import useBexJson from '../../lib/useBexJson'
import formatCalMonth from '../../lib/helpers/formatCalMonth'
import formatNumber, { formatToThousand } from '../../lib/helpers/formatNumber'
import { PALETTE, getArgumentField } from '../../lib/dashboardConfig/helpers'

export default function ShippingPriceIndex(props) {

  const { data, error, isLoading } = useBexJson(props.TechnicalName)

  const argumentField = getArgumentField(data?.chartData)

  return (
    <Chart
      dataSource={data?.chartData}
      palette={PALETTE}
      paletteExtensionMode="blend"
      ignoreEmptyPoints={false}
    >
      <Title visible={false} />
      <CommonSeriesSettings argumentField={argumentField} type="line">
        <Label
          visible={true}
          backgroundColor="none"
          verticalOffset={10}
          customizeText={({ valueText }) => formatToThousand(new Number(valueText))}
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
        <Label customizeText={(text) => formatToThousand(text.value, 0)}>
          <Font color="var(--wh-accent1)"></Font>
        </Label>
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
