import React, { useEffect, useRef, useState } from 'react'

import DataSource from 'devextreme/data/query'
import { ButtonGroup } from 'devextreme-react/button-group'
import { filterByCategory, filterShowOnCT } from '../../lib/dashboardConfig/helpers'
import { FlippingAnimationControlProvider } from '../../lib/flippingAnimationContext'
import useKPIJson from '../../lib/useKPIJson'
import styles from './KPIBar.module.css'
import KPIBarConfigurableUI from './KPIBarConfigurableUI'
import Dialog from './Dialog'
import useBexJson from '../../lib/useBexJson'
import Block from './Block'
import {
  Chart,
  CommonSeriesSettings,
  Series,
  Legend,
  ArgumentAxis,
  ValueAxis,
  Label,
  Grid,
  ConstantLine,
  ZoomAndPan,
  Tooltip,
  Format,
} from 'devextreme-react/chart'
import { getArgumentField } from '../../lib/dashboardConfig/helpers'
import formatNumber from '../../lib/helpers/formatNumber'
import { useQuery } from 'react-query'
import DetailChart from './DetailChart'
import TrendChart from './TrendChart'
import PopupChart from './PopupChart'

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

export default function KPIBarConfigurable(props) {
  const { category = 'LG' } = props
  const [
    popupChartDetail,
    setPopupChartDetail,
  ] = useState({})
  const KPIConfigurations = useKPIJson()
  const KPIList = KPIConfigurations?.data?.KPIList
  let pageFilter = () => true
  if (category === 'PR') {
    pageFilter = ({ PageNo }) => {
      const pageNum = isNaN(props.pageNo) ? 1 : Number(props.pageNo)
      return pageNum === Number(PageNo)
    }
  }
  const filteredKPIList =
    Array.isArray(KPIList) &&
    KPIList.filter(filterByCategory(category))
      .filter((item) => filterShowOnCT(item))
      .filter(pageFilter)
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

      <FlippingAnimationControlProvider>
        <KPIBarConfigurableUI KPIList={filteredKPIList || []} />
      </FlippingAnimationControlProvider>
    </React.Fragment>
  )
}
