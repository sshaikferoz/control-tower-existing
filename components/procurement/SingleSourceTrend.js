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

function customizeValueAxisLabel(arg) {
  return `${arg.valueText}%`
}

function customizeSeriesTooltip(arg) {
  return `${formatNumber(arg, 0)}%`
}

export default function SingleSourceTrend(props) {
  const { query, theme, visible, click } = props
  const { withMask } = useContext(maskContext)

  const { data } = useBexJson(query.techname)

  const values = data?.chartData || []

  const trendObject = [...values].pop() || {}

  const argumentField =
    Object.keys(trendObject).filter(
      (fieldName) => !fieldName.startsWith('VALUE0')
    )[0] || ''

  const trendData = values.filter((item) => item[argumentField] !== 'Overall Result')

  trendData.map((item) => {
    item[argumentField] = item[argumentField].toString()
  })

  const sourceNames =
    data && data.headerSources.map((item) => item.name.split(' ')[0].toUpperCase())

  return (
    <div data-place={props.dataAttr} className={styles.container} onClick={click}>
      <Chart id="trend" dataSource={trendData} palette={theme.palette}>
        <Size height={170} width={350} />
        <CommonSeriesSettings argumentField={argumentField} type="spline" />
        {Array.isArray(data?.headerSources) &&
          data?.headerSources.map(function (item, ind) {
            return (
              <Series
                key={item.value}
                valueField={item.value}
                name={sourceNames[ind].toUpperCase()}
              />
            )
          })}
        <Tooltip format={customizeSeriesTooltip} />
        <ArgumentAxis
          valueMarginsEnabled={true}
          discreteAxisDivisionMode="crossLabels"
        >
          <Grid visible={false} />
          <Label overlappingBehavior="rotate" rotationAngle={-40} />
        </ArgumentAxis>
        <ValueAxis>
          <Grid visible={false} />
          <Label customizeText={customizeValueAxisLabel} />
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
