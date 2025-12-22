import React from 'react'
import { IoSquareSharp } from 'react-icons/io5'

import PieChart, { Series, Label, Legend } from 'devextreme-react/pie-chart'

import useBexJson from '../../lib/useBexJson'
import styles from './ActiveDisputesV2.module.css'

export default function ActiveDisputesV2(props) {
  const { theme, query } = props

  const { data } = useBexJson(query.techname)

  const results = data?.chartData || []

  const dispObj = results.find((item) => item.ZHRATTRIC.toLowerCase() === 'disupute')
  const claimObj = results.find((item) => item.ZHRATTRIC.toLowerCase() === 'claims')
  const appealObj = results.find((item) => item.ZHRATTRIC.toLowerCase() === 'appeal')

  const disputes = dispObj?.VALUE001 || 0
  const claims = claimObj?.VALUE001 || 0
  const appeals = appealObj?.VALUE001 || 0

  const series1 = [{ category: 'Claims', value: claims }]
  const series2 = [
    { category: 'Appeals', value: appeals },
    { category: 'Claims', value: claims },
    { category: 'Disputes', value: disputes },
  ]

  const palette1 = [theme.palette[1], theme.palette[0]]
  const palette2 = [theme.palette[2], theme.palette[1], theme.palette[0]]

  const formatNumber = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
  }).format

  function calculateTotal(pieChart) {
    return formatNumber(
      pieChart
        .getAllSeries()[0]
        .getVisiblePoints()
        .reduce((s, p) => s + p.originalValue, 0)
    )
  }

  function centerTemplate(pieChart) {
    return (
      <svg>
        <circle
          cx="100"
          cy="100"
          r={pieChart.getInnerRadius() - 6}
          fill="#eee"
        ></circle>
        <text
          textAnchor="middle"
          x="100"
          y="120"
          style={{ fontSize: 18, fill: '#494949' }}
        >
          <tspan x="100" dy="20px" style={{ fontWeight: 600 }}>
            {calculateTotal(pieChart)}
          </tspan>
        </text>
      </svg>
    )
  }

  return (
    <div className={styles.container2}>
      <PieChart
        id={styles.claimsPi}
        dataSource={series2}
        palette={palette2}
        innerRadius={0.7}
        margin={{bottom:"0"}}
        type="doughnut"
        startAngle={90}
      >
        <Series argumentField="category" valueField="value">
          <Label visible={false} />
        </Series>
        <Legend visible={false} />
        <div className={styles.claims}>
          <div>
            <h1>{claims}</h1>
            <span>Claims</span>
          </div>
        </div>
      </PieChart>
      <div className={styles.legend}>
        <ul>
          <li>
            <IoSquareSharp color="var(--unify-accent2)" size={15} />
            Claims: &nbsp;{claims}
          </li>
          <li>
            <IoSquareSharp color="var(--unify-accent1)" size={15} />
            Disputes: &nbsp;{disputes}
          </li>
          <li>
            <IoSquareSharp color="var(--proc-accent3)" size={15} />
            Appeals: &nbsp;&nbsp;{appeals}
          </li>
        </ul>
      </div>
    </div>
  )
}
