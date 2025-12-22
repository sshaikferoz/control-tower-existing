import React, { useEffect, useRef, useState } from 'react'

import DataSource from 'devextreme/data/query'
import { ButtonGroup } from 'devextreme-react/button-group'
import useBexJson from '../../lib/useBexJson'
import {
  Chart,
  CommonSeriesSettings,
  Series,
  Legend,
  ArgumentAxis,
  ValueAxis,
  Font,
  Label,
  Grid,
  ConstantLine,
  ZoomAndPan,
  Tooltip,
  Format,
} from 'devextreme-react/chart'
import formatNumber from '../../lib/helpers/formatNumber'
import { useQuery } from 'react-query'
import {
  formatChartDataWithShortMonth,
  PALETTE,
  PALETTE2,
} from '../../lib/dashboardConfig/helpers'
const DetailChart = (props) => {
  console.log({ detailChart: 'here is the detail chart' })
  const [
    renderDelayFinished,
    setRenderDelayFinished,
  ] = useState(false)
  const defaultBackground = 'var(--popup-bg)'
  const defaultTextColor = 'dark'
  const {
    IsCurrencyFormat,
    DecimalDigits = '0',
    background = defaultBackground,
    textColor = defaultTextColor,
  } = props
  const trendTechName = props.TechnicalName
  const detailData = useBexJson(trendTechName, { staleTime: 60000 })
  const { error } = detailData
  const [
    aggregationType,
    setAggregationType,
  ] = useState('avg')
  const [
    aggHeaderInd,
    setAggHeaderInd,
  ] = useState(0)
  const shouldSwap = useRef(true)
  const minChartDataValue = detailData?.data
    ? Math.min(
        ...detailData?.data?.chartData
          ?.map((d) => (!isNaN(d.VALUE001) ? d.VALUE001 : null))
          .filter(Boolean)
      )
    : null
  const minRange = Math.abs(
    Math.min(minChartDataValue) - Math.ceil(minChartDataValue * 0.1)
  )
  const firstobj = detailData?.data?.chartData?.[0]
  let [
    argField,
    ...keys
  ] = firstobj ? Object.keys(firstobj).filter((k) => k?.match?.(/value0\d\d/i) === null) : []

  const firstObjArgEntries = firstobj
    ? Object.entries(firstobj).filter((item) => {
        return item?.[0]?.match?.(/value0\d\d/i) === null
      })?.[0]
    : null
  const [
    ,
    firstObjValue,
  ] = firstObjArgEntries || []
  const isMonthAndYear = Boolean(
    `${firstObjValue || ''}`?.match?.(
      /(\b\w\w\w \d\d)|(\b20\d\d\d\d)|(\b19\d\d\d\d)/i
    )
  )
  const isYearOnly =
    isMonthAndYear === false &&
    Boolean(`${firstObjValue || ''}`?.match?.(/(\b\d\d\d\d\b)/i))
  const isMonthOrYear = isMonthAndYear || isYearOnly
    let argumentSettingsForDate = {}
  let aggregationForDate = {}
  if ((aggHeaderInd + 1) % 2 === 0) {
    const temp = keys?.[0]
    if (keys?.[0]) keys[0] = argField
    argField = temp || argField
    shouldSwap.current = true
  }
  if (aggHeaderInd === 2 && shouldSwap.current) {
    const temp = keys?.[0]
    if (keys?.[0]) keys[0] = argField
    argField = temp || argField
  }
  let itemsCountTrack = 0
  const { chartData = [] } = detailData?.data || {}
  const formattedChartData = isMonthAndYear
    ? formatChartDataWithShortMonth(chartData)
    : chartData
  const ds = new DataSource(formattedChartData)
  ds?.groupBy?.(argField)
    ?.toArray?.()
    .forEach((keyItems) => {
      itemsCountTrack = Math.max(itemsCountTrack, keyItems?.items?.length)
    })
  // aggHeaderInd == 2 means it combined is selected
  const combinedAggr = aggHeaderInd === 2
  const includeAggregation =
    Array.isArray(keys) && keys?.length > 0 && itemsCountTrack > 1
  argumentSettingsForDate = {
    argumentType: isMonthAndYear && aggHeaderInd === 0 ? 'datetime' : 'string',
    allowDecimals: false,
    defaultVisualRange: { startValue: new Date('2020') },
    type: isMonthAndYear && aggHeaderInd === 0 ? 'continuous' : 'discrete',
    label: {
      format: (d) =>
        isMonthAndYear && aggHeaderInd === 0
          ? d.toLocaleDateString(
              'en-US',
              isYearOnly ? { year: 'numeric' } : { year: 'numeric', month: 'short' }
            )
          : d,
    },
  }
  const headerForAggreg = detailData?.data?.header
    ?.filter((d) => d.type !== 'KF')
    .map((d) => ({ text: d.label }))
    .slice(0, 2)

  const aggregation = ds
    ?.groupBy?.(argField)
    .aggregate(Promise.resolve([]), async (cum, cur) => {
      const { key, items } = cur
      const result = await new DataSource(items)[aggregationType]('VALUE001')
      const resolvedArray = await cum
      return [
        ...resolvedArray,
        { [argField]: key, VALUE001: result },
      ]
    })

  let resolvedAggregation = useQuery(
    [
      `BexAggregate${aggregationType}${aggHeaderInd}${
        shouldSwap?.current && 'swapped'
      }}`,
      trendTechName,
    ],
    async () => await aggregation,
    {
      enabled: Boolean(detailData?.data),
      refetchOnMount: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  )
  const sideBySide = ds
    ?.groupBy?.(argField)
    ?.toArray?.()
    .map((i) => {
      const result = i.items
        .map((d, ind) => {
          const seriesKeyValue =
            keys?.[0] && !isNaN(d['VALUE001']) ? { [d[keys[0]]]: d['VALUE001'] } : {}
          return { [argField]: d[argField], ...seriesKeyValue }
        })
        ?.reduce?.((cum, cur) => {
          cum = { ...cum, ...cur }
          return cum
        }, {})
      return result
    }) //?
  const seriesCollectedaForSide = sideBySide?.reduce?.((cum, cur) => {
    return [
      ...cum,
      ...Object.keys(cur).filter((name) => name !== argField),
    ]
  }, [])
  const seriesCollected = resolvedAggregation?.data?.reduce((cum, cur) => {
    return [
      ...cum,
      ...Object.keys(cur).filter((name) => name !== argField),
    ]
  }, [])
  const seriesKeysForSide = [...new Set(seriesCollectedaForSide)]
  const seriesKeys = seriesCollected ? [...new Set(seriesCollected)] : []
  const sideBySideWtihAggr =
    combinedAggr && resolvedAggregation?.data
      ? resolvedAggregation?.data
      : resolvedAggregation?.data
      ? resolvedAggregation.data.map((item) => {
          const found = sideBySide.find((d) => {
            const dField = d[argField]
            const itemField = item[argField]
            if (typeof dField === 'object' && typeof itemField === 'object')
              return dField.toLocaleDateString() === itemField.toLocaleDateString()
            return d[argField] === item[argField]
          })
          return found ? { ...item, ...found } : item
        })
      : sideBySide

  const seriesCollectedWtihAggr = includeAggregation
    ? sideBySideWtihAggr?.reduce((cum, cur) => {
        return [
          ...cum,
          ...Object.keys(cur).filter((name) => name !== argField),
        ]
      }, [])
    : seriesKeys

  const seriesKeysWtihAggr = [...new Set(seriesCollectedWtihAggr)]
  // console.log({
  //   sideBySide,
  //   headerData: detailData?.data,
  //   sideBySideWtihAggr,
  //   seriesKeysWtihAggr,
  //   resolvedAggregation: resolvedAggregation?.data,
  //   includeAggregation,
  //   isMonthAndYear,
  // })

  useEffect(() => {
    setTimeout(async () => {
      await new Promise((r) => setTimeout(r, props?.renderDelay || 50))
      setRenderDelayFinished(true)
    })
  }, [])
  const DataNotReady = () => <div style={{ background: background }}></div>
  if (renderDelayFinished === false) return null
  if (error) return `${typeof error === 'string' ? error : 'Error loading the data'}`
  if (!Array.isArray(detailData?.data?.chartData)) return <DataNotReady />
  return (
    <div
      style={{
        display: 'grid',
      }}
    >
      <Chart
        onDrawn={(v) => {
          console.log({ v: v.component.getValueAxis() })
        }}
        onLegendClick={(info) => {
          const { component, target } = info
          const { series } = component
          const currentVisible = series.filter((i) => i.isVisible())
          const isAlreadyHidden = currentVisible.length === 1
          console.dir(target)
          series.forEach((s, ind) => {
            if (ind === target?.index) {
              s?.show?.()
            } else {
              if (isAlreadyHidden) s?.show?.()
              else s?.hide?.()
            }
          })
        }}
        valueAxis={{
          visualRangeUpdateMode: 'keep',
          visualRange: { startValue: minRange },
          grid: { visible: false },
          label: {
            customizeText: (arg) =>
              `${formatNumber(
                arg.value,
                DecimalDigits,
                IsCurrencyFormat ? 'mm' : 'm'
              )}`,
          },
        }}
        style={{ position: 'relative' }}
        size={{ width: '90%' }}
        autoHidePointMarkers={true}
        stickyHovering={true}
        dataSource={sideBySideWtihAggr}
        resolveLabelOverlapping="hide"
        palette={PALETTE2}
        argumentAxis={argumentSettingsForDate}
        // argumentAxis={{ argumentType: 'datetime', type: 'continuous' }}
        commonAxisSettings={{
          valueMarginsEnabled: isMonthOrYear ? false : true,
          color: `var(--popup-font-${textColor})`,
          label: {
            font: { color: `var(--popup-font-${textColor})` },
          },
        }}
        commonSeriesSettings={{
          aggregation: aggregationForDate,
          argumentField: argField,
          // type: isMonthAndYear && !includeAggregation ? 'spline' : 'bar',
          type: isMonthOrYear && aggHeaderInd === 0 ? 'spline' : 'bar',
        }}
      >
        {seriesKeysWtihAggr.map((sKey, ind) =>
          sKey === 'VALUE001' && includeAggregation ? null : (
            <Series key={sKey} valueField={sKey} name={sKey}>
              <Label
                visible={true}
                backgroundColor="none"
                customizeText={({ valueText }) =>
                  `${formatNumber(
                    valueText,
                    DecimalDigits,
                    IsCurrencyFormat ? 'mm' : 'm'
                  )}`
                }
              >
                <Font color={`var(--popup-font-${textColor}-dimmed)`} />
              </Label>
            </Series>
          )
        )}
        {props.Trend === true && (
          <ZoomAndPan dragToZoom={true} argumentAxis="both" />
        )}
        {!combinedAggr && includeAggregation && aggregationType === 'sum' && (
          <ValueAxis name={'sum'} position="right">
            <Grid visible={false} />
          </ValueAxis>
        )}

        <Legend
          verticalAlignment="bottom"
          horizontalAlignment="center"
          visible={includeAggregation}
          font={{
            color: `var(--popup-font-${textColor}-dimmed)`,
          }}
        ></Legend>
        <Tooltip
          style={{ zIndex: 9999 }}
          format={(d) =>
            `${formatNumber(d, DecimalDigits, IsCurrencyFormat ? 'mm' : 'm')}`
          }
          container={props?.containerRef || null}
          enabled={true}
          // contentRender={(e) => (
          //   <div>
          //     {includeAggregation && e.seriesName}
          //     <br />
          //     {e.valueText}{' '}
          //     {includeAggregation && e.percentText && `(${e.percentText})`}
          //   </div>
          // )}
        >
          <Format type={'largeNumber'} precision={DecimalDigits}></Format>
        </Tooltip>
      </Chart>
    </div>
  )
}
export default DetailChart
