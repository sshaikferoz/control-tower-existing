import React, { useEffect, useState, useContext, useRef } from 'react'
import withComma from '../../lib/helpers/withComma'
import formatNumber from '../../lib/helpers/formatNumber'
import useAlertConfigurations from '../../lib/useAlertConfigurations'
import styles from './AlertList.module.css'
import { filterShowOnCT } from '../../lib/dashboardConfig/helpers'
import { maskContext } from '../../lib/maskContext'
import Dialog from '../common/Dialog'
import PopupChart from '../common/PopupChart'

export default function AlertList(props) {
  const { withMask, maskData } = useContext(maskContext)
  const [
    dialogOpen,
    setDialogOpen,
  ] = useState(false)
  const [
    popupChartDetail,
    setPopupChartDetail,
  ] = useState({})
  const alertConfigurations = useAlertConfigurations('', '', true)
  const mouseTrack = useRef([
    0,
    0,
  ])

  //prettier-ignore
  let extraStyleVars = {}
  const allAlertList = alertConfigurations?.data?.alertList || []
  const alertList = allAlertList
    .filter(({ Category }) => Category !== 'IP')
    .filter(({ Value }) => Number(Value).toFixed() !== '0')
    .sort((a, z) => {
      return a.OrderOnCT - z.OrderOnCT
    })

  console.log({ alertList })
  const filteredAlertList =
    Array.isArray(alertList) && alertList.filter((item) => filterShowOnCT(item))
  const alertOrders = Array.isArray(filteredAlertList)
    ? filteredAlertList
        .map((i) => i?.OrderOnCT || 0)
        .filter(Boolean)
        .map((i) => new Number(i))
    : []
  const maxOrder = Math.max(...alertOrders)
  const grouped =
    Object.groupBy?.(alertList || [], ({ CategoryText }) => CategoryText) || {}
  const formatter = (value, fraction, mode) => {
    const formattedVal =
      value > 1000000
        ? formatNumber(value, fraction, mode)
        : withComma(value, fraction)
    return formattedVal
  }

  const alertListSorted =
    Object.keys(grouped)?.sort?.((a, z) => {
      if (z?.startsWith?.('Inv')) return -1
      if (z?.startsWith?.('Ware')) return 2
      if (z?.startsWith?.('Pro')) return 3
      return -1
    }) || []

  return (
    <div className={styles.wrapper}>
      {alertList &&
        alertList.length &&
        alertListSorted.map((category) => {
          let title = category
          if (category?.startsWith('Pro')) title = 'Procurement' //fix typo in category label (from the odata service)
          return (
            <section
              key={`${category}${Math.random()}`}
              className={styles.listGroup}
            >
              <h3 key={category}>{title}</h3>
              {grouped[category].map((alertItem, ind) => {
                if (ind > 5) return null
                const isPercentageUnit = [
                  '%',
                ].includes(`${alertItem.Uom || ''}`.trim())
                const isCurrencyUnit = [
                  '$',
                ].includes(`${alertItem.Uom || ''}`.trim())

                const isPercentageOrCurrencyUnit = isPercentageUnit || isCurrencyUnit
                let alertValueFormatted = ''
                if (alertItem.IsCurrencyFormat)
                  alertValueFormatted = withMask(
                    formatter(alertItem.Value, alertItem.DecimalDigits, 'm')
                  )
                else {
                  alertValueFormatted = formatter(
                    alertItem.Value,
                    alertItem.DecimalDigits,
                    'm'
                  )
                }

                return (
                  <div
                    onClick={(e) => {
                      const { clientX, clientY } = e
                      mouseTrack.current = [
                        Number(clientX) ,
                        Number(clientY) ,
                      ]
                      const { Level2Nav = [] } = alertItem
                      setPopupChartDetail({
                        ...(Level2Nav?.results?.[0] || {}),
                        mouseTrack: mouseTrack.current,
                      })

                      setDialogOpen(true)
                    }}
                    key={`${ind}${Math.random()}`}
                    data-level={`${alertItem.Criticality}`}
                    className={styles.alertItem}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/alert-${alertItem.CriticalityText}.png`}
                      alt={alertItem.CriticalityText}
                    />
                    <h4>{alertItem.Title}</h4>
                    <section>
                      <h3>
                        {isCurrencyUnit && `${alertItem.Uom}`}
                        {alertValueFormatted}{' '}
                        {isPercentageUnit && `${alertItem.Uom}`}
                      </h3>
                      <abbr title={`${alertItem.Uom || 'unit'}`}>
                        <span>
                          {!isPercentageOrCurrencyUnit && `${alertItem.Uom || ''}`}
                        </span>
                      </abbr>
                    </section>
                  </div>
                )
              })}
            </section>
          )
        })}
      <PopupChart
        onClose={() => setDialogOpen(false)}
        popupChartDetail={popupChartDetail}
      />
    </div>
  )
}
