import React, { useRef, useState, useContext } from 'react'
import withComma from '../../lib/helpers/withComma'
import AlertBoxBex from './AlertBoxBex'
import Block from './Block'
import formatNumber, { formatToThousand } from '../../lib/helpers/formatNumber'
import { maskContext } from '../../lib/maskContext'
import PopupChart from './PopupChart'

export default function AlertCards(props) {
  const { alertList = [], category = 'LG', rows, cols } = props
  const [
    popupChartDetail,
    setPopupChartDetail,
  ] = useState({})
  const { withMask } = useContext(maskContext)

  function renderAlert(item, ind, isHidden = false) {
    const criticalityKey = item?.Criticality || 'N'
    const criticality = { C: 'danger', W: 'warn', N: 'normal' }
    const {
      Level2Nav,
      DataSourceNav,
      IsCurrencyFormat = false,
      DecimalDigits = '0',
    } = item
    let moreOptions = {}
    const drillOrTrendFound = Level2Nav?.results?.[0] || DataSourceNav?.results?.[0]
    let clickEvent = {}
    if (drillOrTrendFound && typeof drillOrTrendFound === 'object') {
      clickEvent = {
        style: { cursor: 'pointer', userSelect: 'none' },
        onClick: () => {
          setPopupChartDetail({
            ...item,
            ...drillOrTrendFound,
            IsCurrencyFormat,
            DecimalDigits,
          })
        },
      }
    }
    const value = Number(item?.Value) || 0
    const figure =
      value > 1000000
        ? formatNumber(value, item.DecimalDigits, item.IsCurrencyFormat ? 'mm' : 'm')
        : withComma(value, item.DecimalDigits)

    let formatOption = {}
    if (item.IsCurrencyFormat) formatOption.formatter = (number) => withMask(number)

    return (
      <React.Fragment>
        <div {...clickEvent}>
          <AlertBoxBex
            isHidden={isHidden}
            title={item.Title}
            figure={figure}
            alertStyle={criticality[criticalityKey]}
            unit={item.Uom}
            {...formatOption}
          />
        </div>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <PopupChart
        onClose={() => setPopupChartDetail({})}
        popupChartDetail={popupChartDetail}
      />
      {Array.from({ length: cols * rows }, (_, ind) => {
        if (!alertList?.length > 0)
          return (
            <div key={ind}>
              {renderAlert({ Title: '', Value: '', Uom: '' }, ind, true)}
            </div>
          )
        const found = alertList?.find?.(
          (a) => !isNaN(a.OrderOnCT) && Number(a.OrderOnCT) === ind + 1
        )
        if (found) {
          return <div key={ind}>{renderAlert({ ...found }, ind)}</div>
        }
        return (
          <div key={ind}>
            {renderAlert({ Title: '', Value: '', Uom: '' }, ind, true)}
          </div>
        )
      })}
    </React.Fragment>
  )
}
