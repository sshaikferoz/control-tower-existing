import React, { useRef, useMemo, useContext, useState, useEffect } from 'react'
import styles from './CapacityLevel3.module.css'
import useBexJson from '../../lib/useBexJson'
import { Width } from 'devextreme-react/chart'
import SideBySideStacked from './SideBySideStacked'
import { json } from 'd3-fetch'
export default function CapacityLevel3(props) {
  const { commodKey = '', subCommodKey } = props
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
  const localManufFieldKey = searchCharKeys('local')

  const filteredCommoidity = chartData.filter(
    (i) => i?.[commodityFieldKey] === commodKey
  )
  const filteredSubCommoidity = filteredCommoidity.filter(
    (i) => i?.[subCommodityFieldKey] === subCommodKey
  )
  const groupByManuf = Object.groupBy(
    filteredSubCommoidity,
    (i) => i?.[localManufFieldKey]
  )

  let trackMaxRange = 0
  const byManufAggregated = Object.entries(groupByManuf).map(
    ([
      _,
      groupItems,
    ]) => {
      const groupByQuarter = Object.groupBy(groupItems, (i) => i?.[quarterFieldKey])
      const byQuarter = Object.entries(groupByQuarter).map(
        ([
          _,
          groupItems,
        ]) => {
          let totalCapacity = groupItems
            .filter((i) =>
              i?.[categoryFiledKey]?.toLowerCase?.()?.includes('capacity')
            )
            .reduce((cum, cur) => cur?.[keyFigureKeys[0]] + cum, 0)
          let totalNonCapacity = groupItems
            .filter(
              (i) => !i?.[categoryFiledKey]?.toLowerCase?.()?.includes('capacity')
            )
            .reduce((cum, cur) => cur?.[keyFigureKeys[0]] + cum, 0)
          const maxTotal = Math.max(totalNonCapacity, totalCapacity)
          trackMaxRange = Math.max(maxTotal, trackMaxRange)

          const stackedData = groupItems.map((i) => {
            const inkingdomShortText =
              i?.[areaFieldKey]?.startsWith('i') ||
              i?.[areaFieldKey]?.startsWith('I')
                ? 'IK'
                : 'OOK'
            return {
              category: `${inkingdomShortText || ''} ${i?.[subCategoryFieldKey]}`,
              sum: i?.[keyFigureKeys[0]],
            }
          })
          return { quarter: _, stackedData }
        }
      )
      return { manuf: _, byQuarter }
    }
  )

  /*
          first group: by commodity and then by sub-commodity; then for each sub-commodity group:
                  1- groupby Local Manufacturer
                  2- for each local manufacturer groupby quarter for stacked bar chart
        */

  return (
    <div className={styles.wrapper}>
      {byManufAggregated.map(({ manuf, byQuarter }, ind) => {
        return (
          <div key={`${manuf}${ind}`}>
            <div
              style={{ '--column-count': `${byQuarter?.length}` }}
              className={styles.mainHeader}
            >
              {byQuarter.map(
                ({ quarter, stackedData }) =>
                  ind === 0 && (
                    <div key={quarter} className={styles.quar}>
                      {quarter}
                    </div>
                  )
              )}
              <div className={styles.manuf}>{manuf}</div>
              {byQuarter.map(({ quarter, stackedData }, ind) => {
                return (
                  <div key={ind} className={styles.chart}>
                    <SideBySideStacked
                      maxRange={trackMaxRange}
                      legends={props.legends || []}
                      data={stackedData}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
