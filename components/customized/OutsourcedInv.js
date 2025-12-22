import React, { useContext } from 'react'
import useBexJson from '../../lib/useBexJson'
import { scaleSqrt, scaleLinear } from 'd3-scale'
import styles from './OutsourcedInv.module.css'
import layoutStyles from '../layout/LayoutStyle.module.css'
import { maskContext } from '../../lib/maskContext'
const prettyNumber = new Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 5,
})

export default function OutsourcedInv(props) {
  const { withMask, maskData } = useContext(maskContext)
  const { data = {} } = useBexJson('YSCM_CT_PROC_OSS', { parser: 'new' })
  const { keyFigureKeys = [], charKeys = [], chartData = [], headerText = {} } = data
  const dataLists = keyFigureKeys
    .map((k, ind) => {
      if (ind === 0) return
      const charField = charKeys[0]
      return chartData
        .map(
          (i, _ind) =>
            _ind < 3 && [
              i[charField],
              i[k],
            ]
        )
        .filter(Boolean)
    })
    .filter(Boolean)
    .map((list) => {
      return Object.fromEntries(list)
    }) //?
  const dataListFormatted = Object.keys(dataLists[0] || {}).map((i) => {
    return [...dataLists.map((item) => item[i], i)]
  })
  const labels = Object.keys(dataLists[0] || {}).map((i) => {
    return i
  })

  const sum = dataLists.reduce((cum, cur) => {
    return Object.values(cur || {}).reduce((cm, cr) => cr + cm, 0) + cum
  }, 0)
  // console.log({ dataLists, dataListFormatted })
  const domainSum = dataListFormatted.map((i) => {
    return i.reduce((cum, cur) => cum + cur, 0)
  })
  const domainMax = Math.max(...domainSum)
  let scale = scaleLinear()
    .domain([
      0,
      domainMax,
    ])
    .range([
      0,
      10,
    ])

  const frSum = dataListFormatted.map((i) => {
    return scale(i.reduce((cum, cur) => cum + cur, 0))
  })
  return (
    <div className={styles.centerContent}>
      <div className={styles.outsourcedInv}>
        <h2 className={layoutStyles.title}>
          Supplier Managed Inventory (${withMask(prettyNumber.format(Number(sum).toFixed(0)))}MM)
        </h2>
        
        <div className={styles.wrap}>
          <div className={styles.bars}>
            {dataListFormatted.map((item, ind) => {
              return (
                <li
                  key={`${ind}${Math.random()}`}
                  style={{
                    '--template-rows': `${10 - frSum[ind]}fr minmax(0,${scale(
                      item[2]
                    )}fr) minmax(0,${scale(item[1])}fr) minmax(0,${scale(
                      item[0]
                    )}fr)`,
                  }}
                >
                  <span> </span>
                  {item.reverse().map((i) => (
                    <span
                      key={`${i}${Math.random()}`}
                      data-empty={`${i < 21 ? 'true' : ''}`}
                    >
                      {withMask(i)}
                    </span>
                  ))}
                </li>
              )
            })}
          </div>
          <div className={styles.labels}>
            {labels.map((i) => (
              <li key={`${i}${Math.random()}`}>
                {`${i}`.replace(/total/i, '').trim()}
              </li>
            ))}
          </div>
          <div className={styles.legends}>
            {keyFigureKeys.map(
              (i, ind) =>
                ind > 0 && (
                  <li key={`${i}${Math.random()}`}>
                    {headerText[i]?.replace('OSS INV -', '')}
                  </li>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
