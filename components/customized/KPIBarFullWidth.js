import React, { useEffect, useRef, useState } from 'react'

import { filterShowOnCT } from '../../lib/dashboardConfig/helpers'
import useKPIJson from '../../lib/useKPIJson'
import PopupChart from './../common/PopupChart'
import KPI from './KPI'
import styles from './KPIBarFullWidth.module.css'

const DialogOuter = (props) => {
  return (
    <>
      <div className="dialog-outer">
        <div className="dialog_container">
          <div data-area="top-left"></div>
          <div data-area="top-center"></div>
          <div data-area="top-right"></div>
          <div data-area="middle-left"></div>
          <div data-area="center"></div>
          <div data-area="middle-right"></div>
          <div data-area="bottom-left"></div>
          <div data-area="bottom-center"></div>
          <div data-area="bottom-right"></div>
        </div>
      </div>
      {props.children}
    </>
  )
}

export default function KPIBarFullWidth(props) {
  const { limit = 4, skip = 0 } = props
  const [
    popupChartDetail,
    setPopupChartDetail,
  ] = useState({})
  const KPIConfigurations = useKPIJson()
  const KPIList = KPIConfigurations?.data?.KPIList
  const filteredKPIList = Array.isArray(KPIList)
    ? KPIList.filter((item) => filterShowOnCT(item))
        .sort((a, z) => parseInt(a.OrderOnCT) - parseInt(z.OrderOnCT))
        .map((item) => {
          let moreOptions = {}
          const {
            Level2Nav,
            DataSourceNav,
            IsCurrencyFormat = true,
            DecimalDigits = '0',
          } = item
          const drillOrTrendFound = Level2Nav?.results?.length

          if (drillOrTrendFound) {
            const trendFound = Level2Nav?.results?.[0]
            moreOptions = {
              ...moreOptions,
              style: { cursor: 'pointer', userSelect: 'none' },
              onClick: () => {
                setPopupChartDetail({
                  ...trendFound,
                  IsCurrencyFormat,
                  DecimalDigits,
                })
              },
            }
          }
          return { ...item, ...moreOptions }
        })
    : []
  const invKpi = filteredKPIList.filter(({ Category }) => Category === 'IN') || []
  const lgKpi = filteredKPIList.filter(({ Category }) => Category === 'LG') || []
  const prKpi = filteredKPIList.filter(({ Category }) => Category === 'PR') || []
  const filteredKPIListSorted = [
    ...invKpi,
    ...lgKpi,
    ...prKpi,
  ]

  console.log({ filteredKPIList })
  const filteredKPIListLimitted = filteredKPIListSorted
    .map((i, ind) => {
      if (ind < skip) return
      if (ind >= skip + limit) return
      return i
    })
    .filter(Boolean)
  const curPalette = {
    titleColor: 'var(--unify-accent1)',
    palette: [
      'var(--unify-accent1)',
      'var(--unify-accent2)',
      'var(--unify-accent3)',
      'var(--unify-accent4)',
    ],
  }
  return (
    <React.Fragment>
      <DialogOuter>
        <PopupChart
          onClose={() => setPopupChartDetail({})}
          popupChartDetail={popupChartDetail}
        />
      </DialogOuter>
      {filteredKPIListLimitted.length && (
        <div
          className={styles.autoFit}
          style={{ '--cols': `${filteredKPIListLimitted.length}` }}
        >
          {filteredKPIListLimitted.map((kpi, ind) => (
            <KPI {...kpi} key={`${kpi.Id}_${ind}`} />
          ))}
        </div>
      )}
    </React.Fragment>
  )
}
