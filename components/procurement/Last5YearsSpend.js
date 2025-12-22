import React, { useContext } from 'react'
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
import styles from './Last5YearsSpend.module.css'
import { spendTitle } from './Procurement2.module.css'
import { maskContext } from '../../lib/maskContext'
import formatNumber from '../../lib/helpers/formatNumber'

export default function TotalSpend(props) {
  const { withMask } = useContext(maskContext)
  const { query } = props

  const { data, error, isLoading } = useBexJson(query.techname)

  const results = data?.chartData || []

  // Remove overall result row
  const values = results.filter((item) => item.CALYEAR !== 'Overall Result')

  const argumentField = values[0]
    ? Object.keys(values[0]).find((key) => key === 'CALYEAR') || ''
    : ''
  const valueField = values[0]
    ? Object.keys(values[0]).find((key) => key === 'VALUE001') || ''
    : ''

  // Make argument field as string
  values.map((item) => {
    item[argumentField] = item[argumentField].toString()
  })

  return (
    <div className={styles.container}>
      {/* <h1 className={spendTitle}>{query.title}</h1> */}
      <Chart
        dataSource={values}
        palette={props.theme.palette}
        paletteExtensionMode="blend"
      >
        <Title visible={false} />
        <CommonSeriesSettings
          dashStyle={'dash'}
          argumentField={argumentField}
          type="splinearea"
        />
        <Series dashStyle={'dash'} valueField={valueField} opacity={0.6}>
          <Label
            backgroundColor="none"
            customizeText={({ valueText }) => withMask(formatNumber(valueText, 0))}
            visible={true}
            alignment="center"
          >
            <Font color="#fff" />
          </Label>
        </Series>
        <Series
          type="spline"
          dashStyle="dash"
          valueField={'VALUE002'}
          opacity={0.5}
          label={{ visible: false }}
          point={{ visible: false }}
        />
        <Series
          valueField={'VALUE002'}
          opacity={0.2}
          label={{
            visible: true,
            backgroundColor: 'none',
            customizeText: (item) =>
              Number(item.valueText) > 0 &&
              item.argumentText !== '2020' &&
              item.argumentText !== '2020'
                ? withMask(formatNumber(item.valueText, 0))
                : '',
            font: { color: '#fff' },
          }}
          point={{ visible: false }}
        />
        <Legend visible={false} />
        <ArgumentAxis>
          <Label overlappingBehavior="rotate" rotationAngle={-30} />
        </ArgumentAxis>
        <ValueAxis>
          <Label visible="false" customizeText={(item) => withMask(item.valueText)}>
            <Font color="#fff9" />
          </Label>
          <Grid visible={false} />
          <ConstantLine value={0}>
            <Label visible={false} />
          </ConstantLine>
        </ValueAxis>
      </Chart>
    </div>
  )
}
