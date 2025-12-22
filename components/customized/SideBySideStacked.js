import styles from './SideBySideStacked.module.css'
import {
  Chart,
  Series,
  CommonSeriesSettings,
  Legend,
  ValueAxis,
  Title,
  Export,
  Tooltip,
  Border,
} from 'devextreme-react/chart'

export default function SideBySideStacked(props) {
  const { data = [], legends, maxRange } = props
  const combined = Object.fromEntries(
    data.map(({ category, sum }) => {
      return [
        category,
        sum,
      ]
    })
  )
  const capacitColors = ['#3569f8']
  const nonCapacitColors = [
    '#0cb191',
    '#00810a',
    '#bf805f',
    '#d6ae99',
    '#7a41bc',
  ]
  const capacityFields = Object.keys(combined).filter((i) =>
    i?.toLowerCase?.()?.includes?.('capacity')
  )
  const nonCapacityFields = Object.keys(combined).filter(
    (i) => !i?.toLowerCase?.()?.includes?.('capacity')
  )
  function customizeTextCapacityStacked(pointInfo) {
    const ind = capacityFields?.findIndex((i) => i === pointInfo.seriesName)
    if (ind === capacityFields?.length - 1) return Number(pointInfo.total).toFixed(0)
    return ''
  }
  function customizeTextNonCapacityStacked(pointInfo) {
    const ind = nonCapacityFields?.findIndex((i) => i === pointInfo.seriesName)
    if (ind === nonCapacityFields?.length - 1)
      return `${Number(pointInfo.total).toFixed(0)}`
    return ''
  }
  return (
    <div className={styles.wrap}>
      <Chart
        animation={{ enabled: false }}
        dataSource={[{ ...combined, category: 'stack' }]}
        className={styles.chart}
        rotated={true}
        height={65}
        tooltip={{
          enabled: true,
          customizeTooltip: customizeTextNonCapacityStacked,
        }}
        commonAxisSettings={{
          visible: false,
          tick: { visible: false },
          grid: { visible: false },
          label: { visible: false },
        }}
        valueAxis={{
          visualRange: [
            0,
            maxRange,
          ],
        }}
      >
        <CommonSeriesSettings
          showInLegend={false}
          type="stackedbar"
          argumentField="category"
        />

        {capacityFields.map((i, ind) => (
          <Series
            color={legends?.find?.((l) => l?.category === i)?.color}
            key={i}
            name={i}
            valueField={i}
            stack="Capacity"
            label={{
              customizeText: customizeTextCapacityStacked,
              visible: true,
              position: 'outside',
              backgroundColor: 'transparent',
            }}
          ></Series>
        ))}
        {nonCapacityFields.map((i, ind) => (
          <Series
            key={i}
            name={i}
            color={legends?.find?.((l) => l?.category === i)?.color}
            valueField={i}
            stack="NonCapacity"
            label={{
              customizeText: customizeTextNonCapacityStacked,
              visible: true,
              position: 'outside',
              backgroundColor: 'transparent',
            }}
          ></Series>
        ))}
      </Chart>
    </div>
  )
}
