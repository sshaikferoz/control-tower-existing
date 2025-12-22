import React, { useRef, useMemo, useContext, useState, useEffect } from 'react'
import styles from './CapacityLevel1.module.css'
import useBexJson from '../../lib/useBexJson'
import FullStackedBarChart from './FullStackedBarChart'
import CapacityLevel2 from './CapacityLevel2'
export default function CapacityLevel1(props) {
  const { commodKey = '', onSubCommodityClicked, onCommodityClicked } = props
  const [
    commodityKey,
    setCommodityKey,
  ] = useState('')
  const { data } = useBexJson('YSCM_KPI_TEST__1', { parser: 'new' })
  const { data: capacityData } = useBexJson('YSCM_CM_MAIN1', { parser: 'new' })
  const {
    chartData = [],
    error: executeQueryError,
    charKeys = [],
    keyFigureKeys = [],
    headerText = {},
    charUniqueValues = {},
  } = capacityData || {}

  const grouped = Object.groupBy(chartData, (i) => i?.[charKeys[1]]) || {}
  console.log({ grouped })
  const groupedKeys = Object.keys(grouped) || []
  useEffect(() => {
    return () => setCommodityKey('')
  }, [])

  if (groupedKeys.find((i) => commodKey === i)) {
    const formatedData =
      grouped?.[commodKey]?.map?.((item, ind) => {
        return { percentage: item[keyFigureKeys[0]], label: item[charKeys[0]] }
      }) || []
    return (
      <div
        style={{ '--commod-count': 1 }}
        className={`${styles.horizontal} ${styles.onhover}`}
      >
        {/* <h2 className={styles.quickPreview}>{commodKey}</h2> */}
        <div className={styles.overviewChart}>
          {<FullStackedBarChart data={formatedData} />}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div
        style={{ '--commod-count': groupedKeys.length }}
        className={styles.horizontal}
      >
        {groupedKeys.sort().map((commodKey, ind) => {
          const splitted = commodKey.split(/[\s,&-]/)
          let iconPath = `${splitted[0]}-${
            splitted[splitted.length - 1]
          }`.toLowerCase()
          if (splitted.length === 1) iconPath = `${commodKey}-icon`.toLowerCase()
          const formatedData =
            grouped?.[commodKey]?.map?.((item, ind) => {
              return {
                percentage: item[keyFigureKeys[0]],
                label: item[charKeys[0]],
              }
            }) || []
          return (
            <div
              onClick={() => onCommodityClicked(commodKey)}
              key={`${commodKey}${ind}`}
              className={styles.item}
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/${iconPath}.png`}
                width={iconPath === 'drilling-icon' ? '100px' : 'auto'}
                height={iconPath === 'drilling-icon' ? '81px' : 'auto'}
              />

              {commodKey}
              <div className={styles.overviewChart}>
                {<FullStackedBarChart data={formatedData} />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
