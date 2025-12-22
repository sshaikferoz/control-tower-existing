import React, { useEffect, useState, useRef } from 'react'
import {
  BarGauge,
  Border,
  Label,
  Export,
  Title,
  Tooltip,
  Font,
  Legend,
  Margin,
  Size,
} from 'devextreme-react/bar-gauge'
import styles from './CapacityGauges.module.css'
import useBexJson from '../../lib/useBexJson'
import CapacityLevel1 from './CapacityLevel1'
import CapacityLevel2 from './CapacityLevel2'
import CapacityLevel3 from './CapacityLevel3'

const format = {
  type: 'fixedPoint',
  precision: 1,
}

const delayGen = (waitTime) => {
  let timer = 0
  return (callback, ms = waitTime) => {
    try {
      clearTimeout(timer)
      timer = setTimeout(() => callback(), ms)
    } catch (e) {
      console.log({ e })
    }
  }
}

const showVisibilityDelay = delayGen(100)
export default function CapacityGauges(props) {
  const [
    commodToPreview,
    setCommodToPreview,
  ] = useState('')

  const [
    commodClicked,
    setCommodClicked,
  ] = useState('')

  const [
    subCommodityClicked,
    setSubCommodityClicked,
  ] = useState('')

  const [
    legends,
    setLegends,
  ] = useState([])

  const gaugeRef = useRef(null)
  const circleRef = useRef(null)
  const [
    selectedLabelIndex,
    setSelectedLabelIndex,
  ] = useState(-1)

  useEffect(() => {
    circleRef.current?.addEventListener?.(
      'mouseover',
      () => {
        if (commodToPreview !== '') {
          setTimeout(async () => {
            await new Promise((r) => setTimeout(r, 100))
            setCommodToPreview('')
          })
        }
      },
      { once: true }
    )
  }, [commodToPreview])

  const { navBack, navTo } = props
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

  const [valueField] = keyFigureKeys
  const grouped = Object.groupBy?.(chartData, (i) => i?.[charKeys[1]]) || {}

  const groupedKeys = Object.keys(grouped) || []

  const capacityAvgList = groupedKeys
    .map((name) => {
      const totalSum =
        grouped?.[name]?.reduce?.(
          (cum, cur) =>
            isNaN(cur?.[valueField]) ? 0 + cum : Number(cur?.[valueField]) + cum,
          0
        ) || 0
      const count = grouped?.[name]?.length || 1
      const average = Number(totalSum / count)
      return { name, value: average }
    })
    .sort((a, z) => z.value - a.value)

  const capacityValues = capacityAvgList.map(({ value }) => value)
  if (chartData?.length === 0) return null

  function customizeText({ valueText, index }) {
    if (commodToPreview === capacityAvgList?.[index]?.name) {
      if (index === 0) return `${capacityAvgList?.[index]?.name}  ${valueText} %`
      return `${capacityAvgList?.[index]?.name}\n\r\n\r ${valueText} %`
    }
    return ''
  }

  const COLOR_PALETTE = [
    '#00810a',
    '#64af0b',
    '#85ef8a',
    '#24e3dc',
    '#0093ff',
    '#1e4ce8',
  ]
  const CapacityLabels = ({ capacityData = [] }) => {
    return (
      <div className={styles.labelsContainer}>
        {capacityData.map((item, index) => (
          <div key={index} className={styles.categoryLabel}>
            <span
              className={styles.categoryName}
              // Apply the color conditionally based on selectedLabelIndex
              style={{
                color:
                  selectedLabelIndex === index
                    ? COLOR_PALETTE[index % COLOR_PALETTE.length]
                    : 'white',
              }}
            >
              {item.name}
            </span>
            <span
              className={styles.categoryValue}
              style={{ color: COLOR_PALETTE[index % COLOR_PALETTE.length] }}
            >
              {item.value.toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className={styles.wrap}>
      <h2
        className={styles.title}
        onClick={() => {
          if (commodClicked === '') navBack(1)
          else {
            if (subCommodityClicked !== '') {
              setSubCommodityClicked('')
              navBack(3)
              return
            }
            navBack(2)
            setCommodClicked('')
          }
        }}
      >
        {commodClicked === '' && (
          <img
            className={styles.backArrow}
            src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/backArrow.png`}
            ref={gaugeRef}
          />
        )}
        Capacity Management
      </h2>
      <div className={styles.gaugeContainer}>
        {/* Add the labels component */}
        <CapacityLabels capacityData={capacityAvgList} />
        <div ref={circleRef} className={styles.center}>
          <div onClick={() => navTo(2)} className={styles.circle}>
            <img
              className={styles.circleIcon}
              src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/capacity-management-icon.svg`}
            />
          </div>
        </div>
        <React.Fragment>
          <BarGauge
            style={{ overflow: 'visible' }}
            onTooltipShown={(arg, s) => {
              showVisibilityDelay(() => {
                const { target, element, component } = arg
                gaugeRef.current?.addEventListener?.(
                  'mouseleave',
                  (e) => {
                    setCommodToPreview('')
                    capacityAvgList.forEach((_, ind) => {
                      gaugeRef.current.style.setProperty(
                        `--stroke${ind + 1}-width`,
                        'var(--stroke-width)'
                      )
                    })
                  },
                  { once: true }
                )
                const foundCommodToShow = capacityAvgList[target.index]?.name
                if (foundCommodToShow) {
                  capacityAvgList.forEach((_, ind) => {
                    gaugeRef.current.style.setProperty(
                      `--stroke${ind + 1}-width`,
                      'var(--stroke-width)'
                    )
                  })
                  gaugeRef.current.style.setProperty(
                    `--stroke${target.index + 1}-width`,
                    '23px'
                  )
                  setCommodToPreview(foundCommodToShow)
                  // Set the selected index to highlight the label
                  setSelectedLabelIndex(target.index)
                }

                console.log({ arg })
              })
            }}
            className={styles.barGauge}
            geometry={{ endAngle: 450, startAngle: 90 }}
            defaultValues={capacityValues}
            barSpacing={24}
            palette={[
              '#00810a',
              '#64af0b',
              '#85ef8a',
              '#24e3dc',
              '#0093ff',
              '#1e4ce8',
            ]}
          >
            <Label
              indent={45}
              visible={false}
              format={format}
              customizeText={customizeText}
            />
            <Tooltip
              opacity={0}
              enabled={true}
              format={format}
              contentRender={(e) => <div style={{ color: 'transparent' }}>.</div>}
            />
            <Margin
              bottom={20}
            />
            {/* <Size width={633} height={442} /> */}
          </BarGauge>
          <div className={styles.capacityLevel1}>
            {commodClicked === '' ? (
              <CapacityLevel1
                onCommodityClicked={(c) => {
                  setCommodClicked(c)
                  navTo(3)
                }}
              />
            ) : subCommodityClicked === '' ? (
              <CapacityLevel2
                commodKey={commodClicked}
                onLegendsFinalized={(legendColorMap = []) =>
                  setLegends(legendColorMap)
                }
                onSubCommodityClicked={(s) => {
                  setSubCommodityClicked(s)
                  navTo(4)
                }}
              />
            ) : (
              <CapacityLevel2
                commodKey={commodClicked}
                subCommodKey={subCommodityClicked}
                onLegendsFinalized={(legendColorMap = []) =>
                  setLegends(legendColorMap)
                }
                onSubCommodityClicked={(s) => {
                  setSubCommodityClicked(s)
                  navTo(4)
                }}
              >
                <CapacityLevel3
                  commodKey={commodClicked}
                  subCommodKey={subCommodityClicked}
                  legends={legends}
                />
              </CapacityLevel2>
            )}
          </div>
        </React.Fragment>
        {commodToPreview && <CapacityLevel1 commodKey={commodToPreview} />}
      </div>
    </div>
  )
}