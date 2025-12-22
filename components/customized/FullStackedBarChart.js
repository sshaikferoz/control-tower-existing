import useBexJson from '../../lib/useBexJson'
import { scaleSqrt, scaleLinear } from 'd3-scale'
import styles from './FullStackedBarChart.module.css'

export default function FullStackedBarChart(props) {
  //list of [{percentage:44,label:'LSWC' },....]
  const { data = [] } = props
  const rangeMax = 80
  let scale = scaleLinear()
    .domain([
      1,
      100,
    ])
    .range([
      0,
      rangeMax,
    ])

  return (
    <div className={styles.wrap}>
      <div
        className={styles.bars}
        style={{
          '--bar-count': `${data.length}`,
        }}
      >
        {data.map((item, ind) => {
          let alertingColorObj = {}
          if (item.percentage > 90)
            alertingColorObj = { '--percentage-color1': 'red' }
          return (
            <li
              key={`${ind}${Math.random()}`}
              style={{
                '--max-height': `${rangeMax}px`,
                ...alertingColorObj,
              }}
            >
              <div
                className={styles.bar}
                style={{
                  '--percentage': `${Number(scale(item.percentage)).toFixed(0)}px`,
                }}
              >
                <span>{Number(item.percentage).toFixed(0)}%</span>
              </div>
              <p>{item.label}</p>
            </li>
          )
        })}
      </div>
    </div>
  )
}
