import React, { useContext } from 'react'

import {
  PieChart,
  Title,
  Font,
  Series,
  Label,
  Connector,
  Legend,
} from 'devextreme-react/pie-chart'

import formatNumber from '../../lib/helpers/formatNumber'
import useBexJson from '../../lib/useBexJson'
import { maskContext } from '../../lib/maskContext'
import { getArgumentField } from '../../lib/dashboardConfig/helpers'

export default function StageAndOverdue(props) {
  const { withMask } = useContext(maskContext)
  const { query } = props
  const { data, error, isLoading } = useBexJson(query.techname)

  // change the order of the theme colors
  const customPalette = props.theme.palette
  const primaryColor = customPalette[0]
  customPalette[0] = '#0083C1'
  customPalette[1] = '#66BB6A'

  const values =
    data && data.chartData && Array.isArray(data.chartData) ? data.chartData : []

  const argumentField = getArgumentField(data?.chartData)

  const formatPieLabel = function (arg) {
    const number = Math.abs(Number(arg.value))

    const fNumber = withMask(formatNumber(number))

    return `$${fNumber} (${arg.percentText})`
  }
  return (
    <PieChart
      dataSource={values}
      palette={customPalette}
      resolveLabelOverlapping="shift"
      legend={{
        orientation: 'horizontal',
        verticalAlignment: 'bottom',
        horizontalAlignment: 'center',
        itemsAlignment: 'left',
        itemTextPosition: 'right',
      }}
    >
      {data && (
        <Series argumentField={argumentField} valueField={'VALUE001'}>
          <Label
            visible={true}
            backgroundColor="none"
            customizeText={formatPieLabel}
            position="outside"
            radialOffset={-13}
          >
            <Font color="var(--unify-font-light)" />
            <Connector visible={false} width={1} />
          </Label>
        </Series>
      )}
      <Legend verticalAlignment="bottom">
        <Font color="#fffb" />
      </Legend>
    </PieChart>
  )
}
