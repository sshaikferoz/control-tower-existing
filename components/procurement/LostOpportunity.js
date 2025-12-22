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
import formatNumber from '../../lib/helpers/formatNumber'
import DataGrid from '../common/DataGrid'
import { maskContext } from '../../lib/maskContext'
import { PALETTE } from '../../lib/dashboardConfig/helpers'
const ImageSticker = () => (
  <img
    style={{ width: '95%', padding: '0 3em' }}
    src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/proc-area-chart-sticker.png`}
    alt="bar-chart"
  />
)

function inMillion(number, digits = 1) {
  if (isNaN(number)) return 0
  const num = Math.abs(Number(number))

  return (num / 1.0e6).toFixed(digits)
}

export default function LostOpportunity(props) {
  const { query, theme } = props
  const { withMask } = useContext(maskContext)

  const { data } = useBexJson(props.TechnicalName)

  const values = data?.chartData || []

  const lostOpt = values.filter((value) => value.CALYEAR !== 'Overall Result')

  const lostOptObj = [...lostOpt].pop() || {}
  const argumentField =
    Object.keys(lostOptObj).filter(
      (fieldName) => !fieldName.startsWith('VALUE0')
    )[0] || ''

  function customizeTooltip(arg) {
    arg.valueText = withMask(inMillion(arg.value))
  }

  function customizeText(arg) {
    return withMask(inMillion(arg.value))
  }

  function customizeValueAxisText(arg) {
    return withMask(inMillion(arg.value))
  }

  function customizeArgAxisText(arg) {
    return arg.value === new Date().getFullYear() ? 'YTD' : arg.valueText
  }

  return (
    <Chart id="trend" dataSource={lostOpt} palette={PALETTE}>
      <CommonSeriesSettings argumentField={argumentField} type="line" />
      <Series key="VALUE001" valueField="VALUE001">
        <Label visible={true} backgroundColor="none" customizeText={customizeText} />
      </Series>
      <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
      <ArgumentAxis
        valueMarginsEnabled={true}
        discreteAxisDivisionMode="crossLabels"
        allowDecimals={false}
      >
        <Grid visible={false} />
        <Label
          overlappingBehavior="rotate"
          rotationAngle={-40}
          format="decimal"
          customizeText={customizeArgAxisText}
        />
      </ArgumentAxis>
      <ValueAxis>
        <Label customizeText={customizeValueAxisText} />
        <Grid visible={false} />
        <ConstantLine value={0}>
          <Label visible={false} />
        </ConstantLine>
      </ValueAxis>
      <Legend visible={false} />
    </Chart>
  )
}
