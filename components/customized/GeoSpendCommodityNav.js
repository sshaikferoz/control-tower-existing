import React, { useContext, useRef, useEffect, useState } from 'react'
import {
  LinearGauge,
  RangeContainer,
  Range,
  ValueIndicator,
} from 'devextreme-react/linear-gauge'
import useBexJson from '../../lib/useBexJson'
import styles from './GeoSpendCommodityNav.module.css'
import formatNumber, { formatToBillion } from '../../lib/helpers/formatNumber'
import {
  getQueryCountryKey,
  getCountryCodeByCountryName,
} from '../../lib/helpers/getQueryCountryName'
import { maskContext } from '../../lib/maskContext'

const iconPathes = [
  'octg-icon.png',
  'vessels-icon.png',
  'drilling-icon.png',
  'chemicals-icon.png',
  'wellhead-icon.png',
  'instrumentation-icon.png',
  'static-equipment-icon.png',
  'rotating-equipment-icon.png',
  'fitting-icon.png',
  'heat-icon.png',
  'material-icon.png',
  'pressure-icon.png',
  'valves-icon.png',
  'compressor-icon.png',
  'electrical-icon.png',
  'pipe-icon.png',
]

const getRandomPath = () => iconPathes[Math.floor(Math.random() * iconPathes.length)]

export default function GeoSpenMapCommodityNav(props) {
  const mapRef = useRef(null)
  const trackRenders = useRef(0)
  trackRenders.current = trackRenders.current + 1
  const {
    query = {},
    spendType: propsSpendType,
    spendMapArea = 'global',
    onSpendCommodityChange = () => null,
    selectedCommodity = '',
  } = props
  const { withMask, maskData } = useContext(maskContext)
  let {
    byCategory = '',
    byCountry = '',
    title = '',
  } = query?.[propsSpendType]?.[spendMapArea] || {}
  const { data: dataByCommodity, status: statusByCommodity } = useBexJson(
    byCategory,
    {
      parser: 'new',
      staleTime: 60000,
    }
  )
  const titles = [
    `${title} by commidity`,
    `${title} by country`,
  ]
  const {
    chartData = [],
    error: executeQueryError,
    charKeys = [],
    keyFigureKeys = [],
    headerText = {},
    charUniqueValues = {},
    mainAxisUniqueValues = [],
  } = dataByCommodity || {}
  let [countryKeyField] = charKeys
  if (countryKeyField?.endsWith('Key')) {
    countryKeyField = charKeys[1] || countryKeyField
  }
  let [
    valueKeyField,
    percentKeyField,
    approvedGapPercentage,
  ] = keyFigureKeys
  const totalSum = (chartData || []).reduce(
    (cum, cur) => cum + Number(cur?.[valueKeyField]),
    0
  )
  console.log({ totalSum })
  const valueAndPercentageHtml = (i) => {
    if (propsSpendType === 'investment')
      return (
        <React.Fragment>
          <div className={styles.val}>{i[valueKeyField]}</div>
          <div className={styles.perc}>{formatNumber(i[percentKeyField])}</div>
        </React.Fragment>
      )

    if (propsSpendType === 'sourcingGap')
      return (
        <React.Fragment>
          <div className={styles.val}>{Number(i[valueKeyField]).toFixed(0)}</div>
          <div className={styles.perc}>{Number(i[percentKeyField]).toFixed(0)}%</div>
        </React.Fragment>
      )

    return (
      <React.Fragment>
        <div className={styles.val}>{withMask(formatNumber(i[valueKeyField]))}</div>
        <div className={styles.perc}>
          {Number((i[valueKeyField] / totalSum || 1) * 100).toFixed(0)}%
        </div>
      </React.Fragment>
    )
  }

  const sortedChartData = [...chartData]
    .sort((a, z) => Number(z[valueKeyField] - a[valueKeyField]))
    .filter((_, ind) => ind < 8)

  function getIconPath(commodity) {
    const found = iconPathes.find((i) => {
      const [keyword] = i.split('-')
      // console.log({ commodity, keyword })
      return commodity?.match(new RegExp(keyword, 'i'))
    })
    return found || iconPathes[10]
  }
  return (
    <ul className={styles.list}>
      {sortedChartData.map((i, ind) => {
        if (
          propsSpendType === 'sourcingGap' &&
          selectedCommodity === i?.[countryKeyField]
        )
          return (
            <li
              data-status="active"
              onClick={() => {
                if (selectedCommodity === i?.[countryKeyField])
                  onSpendCommodityChange('')
                else onSpendCommodityChange(i?.[countryKeyField] || '')
              }}
              key={`${i[countryKeyField]}${ind}`}
              className={styles.gapWrap}
            >
              <div className={styles.desc}>{i[countryKeyField]}</div>
              <div className={styles.gapLegendsForSelected}>
                <ul>
                  <li>Closed</li>
                  <li>In-Process</li>
                </ul>
              </div>
              <LinearGauge
                scale={{
                  label: {
                    format: (arg) => (arg === 100 ? `${arg}%` : arg),
                  },
                }}
                tooltip={{
                  enabled: true,
                  format: (arg) => `${new Number(arg).toFixed(1)}%`,
                }}
                id="c1"
                value={
                  100 - i?.[approvedGapPercentage] > 1
                    ? i?.[approvedGapPercentage]
                    : Math.floor(i?.[approvedGapPercentage])
                }
              >
                <RangeContainer>
                  <Range
                    startValue={0}
                    endValue={`${
                      100 - i?.[approvedGapPercentage] > 1
                        ? i?.[approvedGapPercentage]
                        : Math.floor(i?.[approvedGapPercentage])
                    }`}
                    color="rgb(163, 200, 61)"
                  />
                  <Range
                    startValue={
                      100 - i?.[approvedGapPercentage] > 1
                        ? i?.[approvedGapPercentage]
                        : Math.floor(i?.[approvedGapPercentage])
                    }
                    endValue={100}
                    color="#ff797d"
                  />
                </RangeContainer>
                <ValueIndicator
                  type="rectangle"
                  color="rgb(163, 200, 61)"
                  width={`${100 - i?.[approvedGapPercentage] > 1 ? '2' : '1'}`}
                ></ValueIndicator>
              </LinearGauge>
            </li>
          )

        return (
          <li
            data-status={`${
              selectedCommodity === i?.[countryKeyField] ? 'active' : 'inActive'
            }`}
            onClick={() => {
              if (selectedCommodity === i?.[countryKeyField])
                onSpendCommodityChange('')
              else onSpendCommodityChange(i?.[countryKeyField] || '')
            }}
            key={`${i[countryKeyField]}${ind}`}
            className={styles.tile}
          >
            <div className={styles.icon}>
              <img
                src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/${getIconPath(
                  i[countryKeyField]
                )}`}
              />
            </div>
            <div className={styles.desc}>{i[countryKeyField]}</div>
            {valueAndPercentageHtml(i)}
          </li>
        )
      })}
    </ul>
  )
}
