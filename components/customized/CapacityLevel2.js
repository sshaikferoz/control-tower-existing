import React from 'react'
import styles from './CapacityLevel2.module.css'
import useBexJson from '../../lib/useBexJson'
import SideBySideStacked from './SideBySideStacked'
export default function CapacityLevel2(props) {
  const { commodKey = '', onSubCommodityClicked, subCommodKey = '' } = props
  const { data } = useBexJson('YSCM_KPI_TEST__1', { parser: 'new' })
  const {
    chartData = [],
    error: executeQueryError,
    charKeys = [],
    keyFigureKeys = [],
    headerText = {},
    charUniqueValues = {},
  } = data || {}

  function searchCharKeys(term) {
    const found = Object.entries(headerText).find(
      ([
        charKey,
        desc,
      ]) => {
        return desc?.match?.(RegExp(term, 'i')) || term?.match?.(RegExp(desc, 'i'))
      }
    )
    return found?.[0]
  }

  const commodityFieldKey = searchCharKeys('^commodity')
  const subCommodityFieldKey = searchCharKeys('sub.*comm')
  const categoryFiledKey = searchCharKeys('^categor')
  const quarterFieldKey = searchCharKeys('quar')
  const subCategoryFieldKey = searchCharKeys('sub.*cate')
  const areaFieldKey = searchCharKeys('area')

  const firstYearData = chartData.filter((i) => {
    console.log({ i })
    const includedQuarters = [
      'Q2 2025',
      'Q3 2025',
      'Q4 2025',
      'Q1 2026',
    ]

    return includedQuarters.includes(i?.[quarterFieldKey])
  })

  const filteredCommoidity = firstYearData.filter(
    (i) => i?.[commodityFieldKey] === commodKey
  )
  const groupBySubCommodity = Object.groupBy(
    filteredCommoidity,
    (i) => i?.[subCommodityFieldKey]
  )
  const formattedData = Object.entries(groupBySubCommodity).map(
    ([
      _,
      groupItems,
    ]) => {
      const groupItemsWithIKOOK = groupItems.map((i) => {
        const inkingdomShortText =
          i?.[areaFieldKey]?.startsWith('i') || i?.[areaFieldKey]?.startsWith('I')
            ? 'IK'
            : 'OOK'
        return {
          ...i,
          [subCategoryFieldKey]: `${inkingdomShortText || ''} ${
            i?.[subCategoryFieldKey]
          }`,
        }
      })
      const groupBySubCategory = Object.groupBy(
        groupItemsWithIKOOK,
        (i) => i?.[subCategoryFieldKey]
      )
      let capacityItems = []
      let actualItems = []
      groupItems.forEach((i) => {
        if (i?.[subCategoryFieldKey]?.toLowerCase?.()?.includes?.('capacity'))
          capacityItems.push(i)
        else actualItems.push(i)
      })
      let capacityItemsSum = capacityItems.reduce(
        (cum, cur) => cum + cur?.[keyFigureKeys[0]],
        0
      )
      let actualItemsSum = actualItems.reduce(
        (cum, cur) => cum + cur?.[keyFigureKeys[0]],
        0
      )
      const gaugePercentage = Number(actualItemsSum / capacityItemsSum) * 100
      const stackedData = Object.keys(groupBySubCategory).map((subCategory) => {
        return {
          category: subCategory,
          sum: groupItemsWithIKOOK
            .filter((i) => i?.[subCategoryFieldKey] === subCategory)
            .reduce((cum, cur) => cum + cur?.[keyFigureKeys[0]], 0),
        }
      })

      console.log({ [_]: gaugePercentage, stackedData })

      return { subCommodity: _, stackedData, gaugePercentage }
    }
  )
  console.log({ formattedData })
  const sortedByMostStacked = formattedData
    .sort((a, z) => {
      const { stackedData: aa = [] } = a
      const { stackedData: zz = [] } = z
      return zz.length - aa.length
    })
    .map((i) => i.stackedData || {})
  const [legendsData = []] = sortedByMostStacked
  const legendRanked = legendsData
    .map(({ category, sum }) => {
      return {
        category,
        sum: formattedData
          .map((i) => i.stackedData?.find((l) => l.category === category)?.sum)
          ?.reduce((cum, cur) => cum + cur, 0),
      }
    })
    .sort((a, z) => {
      return z.sum - a.sum
    })
  console.log({ legendsData })
  const capacitColors = [
    '#1450f4',
    '#3569f8',
  ]
  const nonCapacitColors = [
    '#0cb191',
    '#00810a',
    '#bf805f',
    '#d6ae99',
    '#7a41bc',
    '#b1980c',
    '#b3930c',
  ]
  let nonCapacityCount = 0
  let capacityCount = 0
  const colorMapped = legendRanked.map((item, ind) => {
    const isCapacity = item?.category?.toLowerCase?.()?.includes?.('capacity')
    return {
      category: item?.category,
      color: isCapacity
        ? capacitColors[capacityCount++]
        : nonCapacitColors[nonCapacityCount++],
    }
  })
  if (formattedData.length === 0) return null

  return (
    <div
      style={{ '--commodity-count': formattedData?.length }}
      className={styles.wrapper}
    >
      <div className={styles.commodityContainer}>
        {formattedData.map((item, ind) => {
          const { subCommodity = '', gaugePercentage = 0, stackedData = [] } = item
          return (
            <div
              onClick={() => {
                onSubCommodityClicked?.(subCommodity, commodKey)
                props.onLegendsFinalized?.(colorMapped)
              }}
              key={ind}
              className={`${styles.item} ${
                subCommodity === subCommodKey ? styles.activeItem : ''
              } `}
            >
              <section className={styles.summary}>
                <h2 className={styles.subCommodTitle}>{subCommodity}</h2>n
                <p>2025 Capacity Utilization</p>
                <h3>{Number(gaugePercentage).toFixed(1)}%</h3>
              </section>
              <div className={styles.overviewChart}>
                <span
                  style={{ '--gauge-value': `${gaugePercentage}%` }}
                  className={styles.doughnut}
                  data-value={Number(gaugePercentage).toFixed(1)}
                >
                  <progress
                    class="test"
                    value={gaugePercentage}
                    max="100"
                  ></progress>
                </span>
                <SideBySideStacked legends={colorMapped} data={stackedData} />
              </div>
            </div>
          )
        })}
      </div>
      {props.children && (
        <div className={styles.manufactureTable}>
          <div className={styles.manufactureTable_body}>{props.children || ''}</div>
        </div>
      )}
      <section
        style={{ '--legend-count': `${colorMapped.length || 1}` }}
        className={styles.legends}
      >
        {colorMapped?.map?.((i) => (
          <div key={i.category}>
            <span style={{ backgroundColor: `${i.color}` }}></span>{' '}
            <span>{i.category}</span>
          </div>
        ))}
      </section>
    </div>
  )
}