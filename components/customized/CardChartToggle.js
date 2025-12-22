import React, { useEffect, useState, useRef, useContext } from 'react'
import merger from 'utils-merge'

import {
  Chart,
  CommonSeriesSettings,
  Legend,
  ZoomAndPan,
  ValueAxis,
  Grid,
  Title,
  Series,
  CommonAxisSettings,
  Label,
  Border,
  Margin
} from 'devextreme-react/chart'
import useBexJson from '../../lib/useBexJson'
import {
  formatQuarterYear,
  formatToDateObject,
  getMonthDigit,
} from '../../lib/dashboardConfig/helpers'
import styles from './CardChartToggle.module.css'
import { maskContext } from '../../lib/maskContext'
import { formatToBillion } from '../../lib/helpers/formatNumber'
import MarketCard from './MarketCard'

function formatNumber(number, digits = 0) {
  if (isNaN(number)) return number
  const num = Math.abs(Number(number))
  return new Number(num || 0).toLocaleString('en-US', {
    maximumFractionDigits: digits,
    compactDisplay: 'short',
  })
}
const delayGen = () => {
  let timer = 0
  return (callback, ms = 300) => {
    try {
      clearTimeout(timer)
      timer = setTimeout(() => callback(), ms)
    } catch (e) {
      console.log({ e })
    }
  }
}

const pointGenerationDelay = delayGen()
export default function CardChartToggle(props) {
  const { withMask } = useContext(maskContext)
  const [
    clickedInd,
    setClickedInd,
  ] = useState(null)
  const [
    delayDone,
    setDelayDone,
  ] = useState(false)
  const delayDoneTrack = useRef(true)
  const chartRef = useRef(null)

  const readyToShowChart =
    (delayDone === false && delayDoneTrack.current === false) ||
    (delayDone === true && delayDoneTrack.current === true)
  useEffect(() => {
    delayDoneTrack.current = !delayDone
    pointGenerationDelay(async () => {
      await new Promise((r) => setTimeout(r, 300))
      setDelayDone(delayDoneTrack.current)
    })
  }, [
    clickedInd,
    delayDone,
  ])

  function customizeValueAxisText(arg) {
    return withMask(formatToBillion(arg.value))
  }

  const {
    data: materialIndData,
    error,
    isLoading,
  } = useBexJson('YSCM_SCCT_PRC_PMI', {
    parser: 'new',
  })

  const {
    data: pressureIndData,
    error: pressureIndError,
    isLoading: pressureIndIsLoading,
  } = useBexJson('YSCM_CT_GSCPI', {
    parser: 'new',
  })
  const {
    data: shippingIndData,
    error: shippingIndError,
    isLoading: shippingIndIsLoading,
  } = useBexJson('YSCM_SCCT_SH_INDEX_01', {
    parser: 'new',
  })
  const {
    data: airFreightIndData,
    error: airFreightIndError,
    isLoading: airFreightIndIsLoading,
  } = useBexJson('YSCM_PSCCT_AIRFREIGHT', {
    parser: 'new',
  })

  const allData = [
    shippingIndData || {},
    materialIndData || {},
    airFreightIndData || {},
    pressureIndData || {},
  ]

  const iconPathes = [
    '/images/ShippingPriceIndex-icon.png',
    '/images/MaterialPriceIndex-icon.png',
    '/images/AirFreightIndex-icon.png',
    '/images/GlobalPressureIndex-icon.png',
  ]

  const backgroungColors = [
    'bg-blue-600',
    'bg-teal-500',
    'bg-green-500',
    'bg-green-600',
  ]

  const formatSubtitle = (data) => {
    const {
      chartData = [],
      charKeys = [],
      keyFigureKeys = [],
      metadata = {},
    } = data || {}
    const lastItem = [...chartData].pop?.() || {}
    let subTitle = lastItem[charKeys[0]]
    if (!isNaN(subTitle)) {
      subTitle = formatQuarterYear(formatToDateObject(subTitle))
    }
    return subTitle
  }
  const formatCurrency = (data) => {
    const {
      chartData = [],
      charKeys = [],
      keyFigureKeys = [],
      metadata = {},
    } = data || {}
  
    const dividedByThousand = metadata?.description
      ?.toLowerCase?.()
      ?.includes('shipp')
  
    const lastItem = [...chartData].pop?.() || {}
  
    const addCurrency =
      metadata?.description?.toLowerCase?.()?.includes('air') ||
      metadata?.description?.toLowerCase?.()?.includes('ship')
  
    const value = dividedByThousand
      ? `${Number(lastItem[keyFigureKeys[0]] / 1000).toFixed(2)}M`
      : lastItem[keyFigureKeys[0]]
  
    let formattedValue = addCurrency ? `$${value}` : value
  
    // Add unit suffix in smaller font
    if (metadata?.description?.toLowerCase?.()?.includes('shipping')) {
      formattedValue = (
        <span>
          {formattedValue}
          <span style={{ fontSize: '0.4em', opacity: 0.8 }}> per container</span>
        </span>
      )
    } else if (metadata?.description?.toLowerCase?.()?.includes('air')) {
      formattedValue = (
        <span>
          {formattedValue}
          <span style={{ fontSize: '0.4em', opacity: 0.8 }}> per KG</span>
        </span>
      )
    }
  
    return formattedValue
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.cardsWrap}>
        {allData.map((data, ind) => {
          // Use the data for this specific card
          const {
            chartData = [],
            charKeys = [],
            keyFigureKeys = [],
            metadata = {},
          } = data

          // Get the specific fields for this card
          const valueField = keyFigureKeys[0] || ''
          const argumentField = charKeys[0] || ''

          let value = formatCurrency(data)
          let subTitle = formatSubtitle(data)

          console.log(valueField,
            argumentField,
            value,
            subTitle)

          return (
            <div key={`card-${ind}`} onClick={() => setClickedInd(ind)}>
              <MarketCard>
                <div className="p-4 flex items-center gap-4">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BSP_NAME}${iconPathes[ind] || ''
                      }`}
                    className="w-14"
                    alt={metadata.description || ''}
                  />
                  <div className="text-white text-lg">{metadata.description}</div>
                </div>

                <div
                  className={`${backgroungColors[ind]} p-4 flex flex-col items-center`}
                  style={{ borderRadius: '10px' }}
                >
                  <div className="text-4xl font-light text-white">{value}</div>
                  <div className="text-white text-sm opacity-60">{subTitle}</div>
             
                  <div className="w-full flex justify-center h-16 mb-2">
                    {chartData.length > 0 && valueField && argumentField ? (
                      <Chart
                        style={{
                          color: 'white',
                          marginTop: '1em'
                        }}
                        className="w-full customChart"
                        height={65}
                        width={250}
                        animation={false}
                        dataSource={chartData.map((item) => {
                          const month = item?.[argumentField]
                          if (isNaN(month)) return item
                          return {
                            ...item,
                            [argumentField]: formatToDateObject(month),
                          }
                        })}
                        argumentAxis={{
                          tick: {
                            visible: false,
                          },
                          label: {
                            visible: false,
                          },
                          endOnTick: false
                        }}
                        crosshair={{ horizontalLine: false }}
                        valueAxis={{
                          label: {
                            visible: false,

                          }, tick: {
                            visible: false,
                          }
                        }}
                      >
                        <CommonSeriesSettings argumentField={argumentField} />
                        <CommonAxisSettings color={'transparent'}>

                          <Grid visible={false} />
                        </CommonAxisSettings>
                        <Series
                          ignoreEmptyPoints={true}
                          point={{ visible: false }}
                          valueField={valueField}
                          color="white"
                          type="spline"
                          showInLegend={false}
                        />
                        <Margin top={20}></Margin>
                      </Chart>
                    ) : ''}
                  </div>
                </div>
              </MarketCard>
            </div>
          )
        })}
      </div>

      {/* Popup chart display */}
      <div
        className={styles.popup}
        style={{
          '--chart-show': `${readyToShowChart ? '1' : '0'}`,
          '--popup-show': `${clickedInd === null ? 'none' : 'grid'}`,
        }}
        onClick={() => setClickedInd(null)}
      >
        {clickedInd !== null && (
          <div>
            <div className={styles.inlineCard}>
              <img
                className={styles.box}
                src={`${process.env.NEXT_PUBLIC_BSP_NAME}${iconPathes[clickedInd] || ''
                  }`}
                alt={allData[clickedInd]?.metadata?.description || ''}
              />
              <div>{allData[clickedInd]?.metadata?.description}</div>
              <h2>{formatCurrency(allData[clickedInd])}</h2>
              <h5>{formatSubtitle(allData[clickedInd])}</h5>
            </div>

            {allData[clickedInd]?.chartData?.length > 0 && (
              <Chart
                className={styles.chart}
                animation={false}
                dataSource={(allData[clickedInd]?.chartData || []).map((item) => {
                  const month = item?.[allData[clickedInd]?.charKeys[0]]
                  if (isNaN(month)) return item
                  return {
                    ...item,
                    [allData[clickedInd]?.charKeys[0]]: formatToDateObject(month),
                  }
                })}
                commonAxisSettings={{
                  valueMarginsEnabled: true,
                  maxValueMargin: 0.05,
                }}
                argumentAxis={{
                  overlappingBehavior: 'hide',
                  tick: { visible: true, color: '#333d69' },
                  color: '#333d69',
                  label: {
                    displayMode: 'rotate',
                    rotationAngle: -33,
                    wordWrap: 'breakWord',
                    textOverflow: 'ellipsis',
                    overlappingBehavior: 'none',
                    font: { color: '#aab3d6', size: 10 },
                  },
                }}
                valueAxis={{
                  color: '#333d69',
                  label: {
                    font: { color: '#aab3d6' },
                    customizeText: customizeValueAxisText,
                  },
                  position: 'right',
                  grid: { visible: false },
                  tick: { visible: false },
                }}
              >
                <CommonSeriesSettings
                  argumentField={allData[clickedInd]?.charKeys[0]}
                />
                <ZoomAndPan dragToZoom={true} argumentAxis="both" />
                <Series
                  ignoreEmptyPoints={true}
                  point={{ visible: false }}
                  valueField={allData[clickedInd]?.keyFigureKeys[0]}
                  name={
                    allData?.[clickedInd]?.headerText?.[
                    allData?.[clickedInd]?.keyFigureKeys[1]
                    ]
                  }
                  showInLegend={false}
                />
                <ValueAxis>
                  <Grid visible={false} />
                  <Title text="" />
                </ValueAxis>
                <Legend verticalAlignment="bottom" horizontalAlignment="center" />
              </Chart>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
