import React, { useContext } from 'react'

import {
  Chart,
  CommonSeriesSettings,
  Series,
  Legend,
  ArgumentAxis,
  ValueAxis,
  Label,
  Grid,
  ConstantLine,
  Tooltip,
  Size,
  Font,
} from 'devextreme-react/chart'

import useBexJson from '../../lib/useBexJson'
import { maskContext } from '../../lib/maskContext'

import styles from './SingleSourceTrend.module.css'
import formatNumber from '../../lib/helpers/formatNumber'
import { getArgumentField } from '../../lib/dashboardConfig/helpers'

function customizeValueAxisLabel(arg) {
  return `${arg.valueText}%`
}

function customizeSeriesTooltip(arg) {
  return `${formatNumber(arg, 0)}%`
}

export default function ActiveDisputesTrend(props) {
  const { query, theme } = props
  const { withMask } = useContext(maskContext)

  const { data } = useBexJson(query.techname)
  console.log({ data: data })

  const argumentField = getArgumentField(data?.chartData) || 'CALYEAR'
  const filteredChartData = data?.chartData?.filter(
    (item) => item[argumentField] !== 'Overall Result'
  )
  const allYears = filteredChartData?.map?.((item) => item[argumentField])
  const allYearUnique = [...new Set(allYears)]
  const combinedByYear = allYearUnique.map((year) => {
    const yearData = filteredChartData.filter((item) => item[argumentField] === year)
    const [Claims, Dispute, Appeal] = yearData
    return {
      [argumentField]: year,
      Claims: Claims?.VALUE001,
      Dispute: Dispute?.VALUE001,
      Appeal: Appeal?.VALUE001,
    }
  })
  return (
    <div className={styles.container}>
      <Chart
        id="trend"
        style={{ padding: '1em', marginBlockEnd: '-2em' }}
        dataSource={combinedByYear}
        palette={theme.palette}
      >
        <Size height={170} width={680} />
        <CommonSeriesSettings argumentField={argumentField} type="spline" />
        <Series valueField="Claims" name="Claims" />
        <Series valueField="Dispute" name="Dispute" />
        <Series valueField="Appeal" name="Appeal" />
        <Tooltip format={customizeSeriesTooltip} />
        <ArgumentAxis
          type={'discrete'}
          valueMarginsEnabled={true}
          discreteAxisDivisionMode="crossLabels"
        >
          <Grid visible={false} />
          <Label overlappingBehavior="rotate" rotationAngle={-40} />
        </ArgumentAxis>
        <ValueAxis>
          <Grid visible={false} />
          <ConstantLine value={0}>
            <Label visible={false} />
          </ConstantLine>
        </ValueAxis>
        <Tooltip enabled={true} />
        <Legend
          visible={true}
          horizontalAlignment="center"
          verticalAlignment="bottom"
          itemTextPosition="right"
        >
          <Font size={9} weight="500" />
        </Legend>
      </Chart>
    </div>
  )
}
