import React from 'react'

import {
  PieChart,
  Series,
  Title,
  Font,
  Label,
  Connector,
  Legend,
} from 'devextreme-react/pie-chart'

import useBexJson from '../../lib/useBexJson'

export default function WarehouseOC(props) {
  const { query } = props

  const { data, error, isLoading } = useBexJson(query.techname)

  // const values = data?.chartData || []

  // prettier-ignore
  const values = [{ NOT_TYPE: 'DAMAGED MATERIALS', VALUE001: 11}, { NOT_TYPE: 'WRONG MATERIALS', VALUE001: 5}, { NOT_TYPE: 'WRONG QUANTITY', VALUE001: 2}]

  const argumentField = values[0]
    ? Object.keys(values[0]).find((key) => key === 'NOT_TYPE')
    : ''
  const valueField = values[0]
    ? Object.keys(values[0]).find((key) => key === 'VALUE001')
    : ''

  return (
    <PieChart
      className="chart"
      type="doughnut"
      dataSource={values}
      palette={props.theme.palette}
      resolveLabelOverlapping="shift"
      sizeGroup="openClaims"
      innerRadius={0.7}
    >
      <Title text={query.title} verticalAlignment="bottom">
        <Font color="#fff" size="1.2rem" />
      </Title>
      <Series argumentField={argumentField} valueField={valueField}>
        <Label visible={true} backgroundColor="none" position="inside">
          <Font color="var(--unify-font-dark)" weight="700" />
          <Connector visible={true} width={0.5} />
        </Label>
      </Series>
      <Legend horizontalAlignment="right" verticalAlignment="bottom">
        <Font size="0.6rem" color="var(--wh-accent1)" />
      </Legend>
    </PieChart>
  )
}
