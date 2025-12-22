import React, { useEffect, useContext, useRef } from 'react'
import {
  Chart,
  Series,
  Title,
  CommonSeriesSettings,
  Legend,
  Label,
  ValueAxis,
  Grid,
  ConstantLine,
  ArgumentAxis,
  Font,
  Connector,
} from 'devextreme-react/chart'

import useBexJson from '../../lib/useBexJson'
import { maskContext } from '../../lib/maskContext'
import formatNumber from '../../lib/helpers/formatNumber'
import {
  CommonAxisSettings,
  CommonAxisSettingsMinorTick,
} from 'devextreme-react/polar-chart'

export default function CarponFootprint(props) {
  const { withMask } = useContext(maskContext)
  const { query } = props

  const { data, error, isLoading } = useBexJson(query.techname)

  const result = data?.chartData || []

  const s1 = result
    .filter((item) => {
      return item.ZCARBONCT.match(/asns/i)
    })
    .map((item) => ({ ...item, asn: item.VALUE001 }))

  const s2 = result
    .filter((item) => {
      return item.ZCARBONCT.match(/co2/i)
    })
    .map((item) => ({ ...item, co2: item.VALUE001 }))

  const s3 = result
    .filter((item) => {
      return item.ZCARBONCT.match(/ratio/i)
    })
    .map((item) => ({ ...item, ratio: item.VALUE001 }))
  const final = result
    .filter(
      (item) => item.CALMONTH.includes('2021') || item.CALMONTH.includes('2022')
    )
    .map((item) => {
      const s1obj = s1.find((s) => s.CALMONTH === item.CALMONTH)
      const s2obj = s2.find((s) => s.CALMONTH === item.CALMONTH)
      const s3obj = s3.find((s) => s.CALMONTH === item.CALMONTH)
      return { ...s1obj, ...s2obj, ...s3obj }
    })

  return (
    <Chart dataSource={final} palette={props.theme.palette}>
      <Title visible={false} />
      <CommonSeriesSettings
        dashStyle={'dash'}
        argumentField={'CALMONTH'}
        type="splinearea"
      />
      <Series type={'bar'} valueField={'co2'} name="CO2" opacity={0.6}>
        <Label
          backgroundColor="none"
          customizeText={({ valueText }) => withMask(formatNumber(valueText, 0, ''))}
          visible={true}
          alignment="center"
        >
          <Font color="#fff" />
        </Label>
      </Series>
      <Series
        valueField="asn"
        name="ASNs"
        label={{
          visible: true,
          customizeText: ({ valueText }) => withMask(formatNumber(valueText, 0, '')),
          backgroundColor: 'none',
          font: { color: '#fff' },
        }}
        point={{ visible: false }}
        type="bar"
      />
      <Series
        type="line"
        axis="ratioAxis"
        name="Ratio"
        valueField="ratio"
        customizeText={({ valueText }) => withMask(formatNumber(valueText, 0))}
      />
      <Legend horizontalAlignment="left" itemTextPosition="right" />
      <ArgumentAxis>
        <Label overlappingBehavior="rotate" rotationAngle={-30} />
      </ArgumentAxis>
      <ValueAxis name="mainAxis">
        <Label customizeText={(item) => withMask(item.valueText)}>
          <Font color="#fff9" />
        </Label>
        <Grid visible={false} />
        <ConstantLine value={0}>
          <Label visible={false} />
        </ConstantLine>
      </ValueAxis>
      <ValueAxis offset={1000} name="ratioAxis">
        <Grid visible={false} />
        <ConstantLine value={0}>
          <Label visible={false} />
        </ConstantLine>
      </ValueAxis>
    </Chart>
  )
}
