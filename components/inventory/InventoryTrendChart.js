//@ts-check
import React, { useContext, useEffect, useState } from 'react'
import {
  Chart,
  Font,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Legend,
  Margin,
  Title,
  Subtitle,
  Tooltip,
  Grid,
  BreakStyle,
  ValueAxis,
  ConstantLine,
  Label,
} from 'devextreme-react/chart'
import styles from './InventoryTrendChart.module.css'
import axios from 'redaxios'
import SideLegend from './SideLegend'
import bexToJsonParser from '../../lib/bexQueryXmlToJson'
import { maskContext } from '../../lib/maskContext'
import { useQuery } from 'react-query'

export default function ChartView(props) {
  const { withMask } = useContext(maskContext)
  const { query = '' } = props
  const { isLoading, error, data } = useQuery(['Bex', query.techname], async () => {
    const { data } = await axios.get(
      `/sap/bc/bsp/sap/zbw_reporting/execute_report_oo.htm?query=${query.techname}`
    )
    const regularData = bexToJsonParser(data)
    return { ...bexToJsonParser(data, { reArrangeMultiChars: true }), regularData }
  })
  const sourceValues =
    data && data.chartData && Array.isArray(data.chartData) ? data.chartData : []
  const sourceValueObject = [...sourceValues].pop() || {}

  const argumentField =
    Object.keys(sourceValueObject).filter(
      (fieldName) => !fieldName.startsWith('VALUE0')
    )[4] || ''
  const iqrsNames =
    data && data.headerSources.map((item) => item.name.split(' ')[0].toUpperCase())
  const defaultColors = ['#f4d385', '#5c85c4', '#f98025', '#4247a3']
  const { palette = defaultColors } = props.palette
  return (
    <div className={styles.container}>
      <div className={styles.legends}>
        {data && (
          <>
            <SideLegend
              color={palette[0]}
              label={iqrsNames[0]}
              image={`${iqrsNames[0]}-sticker.png`}
            />
            <SideLegend
              color={palette[1]}
              label={iqrsNames[1]}
              image={`${iqrsNames[1]}-sticker.png`}
            />
            <SideLegend
              color={palette[2]}
              label={iqrsNames[2]}
              image={`${iqrsNames[2]}-sticker.png`}
            />
            <SideLegend
              color={palette[3]}
              label={iqrsNames[3]}
              image={`${iqrsNames[3]}-sticker.png`}
            />
          </>
        )}
      </div>

      {data && (
        <Chart
          palette="Violet"
          dataSource={data.chartData?.sort((a, z) => {
            if (a.CALMONTH) return Date.parse(a.CALMONTH) - Date.parse(z.CALMONTH)
            if (a.ZSCMONTH) return Date.parse(a.ZSCMONTH) - Date.parse(z.ZSCMONTH)
          })}
        >
          <CommonSeriesSettings
            point={{
              hoverMode: 'allArgumentPoints',
            }}
            argumentField={argumentField}
            type="spline"
          />
          {Array.isArray(data?.headerSources) &&
            data?.headerSources.map(function (item, ind) {
              return (
                <Series
                  color={palette[ind]}
                  key={item.value}
                  valueField={item.value}
                  name={iqrsNames[ind].toUpperCase()}
                  showInLegend={false}
                />
              )
            })}
          <Margin bottom={20} />
          <ValueAxis>
            <Label
              visible="false"
              customizeText={(item) => withMask(item.valueText)}
            />
            <Grid visible={false} />
            <ConstantLine value={0}>
              <Label visible={false} />
            </ConstantLine>
          </ValueAxis>
          <ArgumentAxis
            valueMarginsEnabled={true}
            discreteAxisDivisionMode="crossLabels"
          >
            <Grid visible={false} />
            <Label overlappingBehavior="rotate" rotationAngle={-40} />
          </ArgumentAxis>
          <Legend
            verticalAlignment="bottom"
            horizontalAlignment="center"
            itemTextPosition="bottom"
          />
          <Tooltip enabled={true} />
        </Chart>
      )}
    </div>
  )
}
