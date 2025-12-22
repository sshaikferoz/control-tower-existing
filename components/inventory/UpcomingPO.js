import React, { useContext, useEffect } from 'react'

import {
  Chart,
  CommonSeriesSettings,
  Series,
  Legend,
  Title,
  Font,
  Label,
  ValueAxis,
  Grid,
  ConstantLine,
  ArgumentAxis,
} from 'devextreme-react/chart'

import useBexJson from '../../lib/useBexJson'
import { maskContext } from '../../lib/maskContext'
import formatNumber from '../../lib/helpers/formatNumber'

export default function UpcomingPO(props) {
  const { query = '' } = props
  const { IsCurrencyFormat = true, DecimalDigits = '0' } = props
  const { withMask } = useContext(maskContext)

  const { data, error, isLoading } = useBexJson(props.TechnicalName)

  const values =
    data && data.chartData && Array.isArray(data.chartData) ? data.chartData : []

  const argumentField = values?.[0]
    ? Object.keys(values?.[0]).find((key) => key === 'ZSCMONTH')
    : ''

  return (
    <Chart dataSource={values} palette={['#66BB6A']} paletteExtensionMode="blend">
      <CommonSeriesSettings argumentField={argumentField} type="bar" />
      {data?.headerSources?.map((item, index) => {
        return (
          <Series key={item} name={item.name} valueField={item.value}>
            <Label
              visible={true}
              backgroundColor="none"
              customizeText={({ valueText }) =>
                `${IsCurrencyFormat ? '$' : ''}${withMask(
                  formatNumber(
                    valueText,
                    DecimalDigits,
                    IsCurrencyFormat ? 'mm' : 'm'
                  )
                )}`
              }
            >
              <Font color="#fffb" />
            </Label>
          </Series>
        )
      })}
      <Legend visible={false} />
      <ArgumentAxis>
        <Label overlappingBehavior="rotate" rotationAngle={-30}>
          <Font color="#fffb" />
        </Label>
      </ArgumentAxis>
      <ValueAxis>
        <Label
          visible="false"
          customizeText={(arg) =>
            `${IsCurrencyFormat ? '$' : ''}${withMask(
              formatNumber(arg.value, DecimalDigits, IsCurrencyFormat ? 'mm' : 'm')
            )}`
          }
        >
          <Font color="#fff9" />
        </Label>
        <Grid visible={false} />
        <ConstantLine value={0}>
          <Label visible={false} />
        </ConstantLine>
      </ValueAxis>
    </Chart>
  )
}
