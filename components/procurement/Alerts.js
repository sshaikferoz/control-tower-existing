import React, { useRef, useEffect, useState } from 'react'
// import useSound from 'use-sound'
import { alertIcon } from '../inventory/Alerts.module.css'
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
  Tooltip,
} from 'devextreme-react/chart'

import Dialog from '../common/Dialog'
import styles from './Alerts.module.css'
import useBexJson from '../../lib/useBexJson'
import AlertRealTime from '../common/AlertBoxRealTime'
import AlertBoxBex from '../common/AlertBoxBex'
import { getArgumentField } from '../../lib/dashboardConfig/helpers'
import Block from '../common/Block'

const delayGen = () => {
  let timer = 0
  return (callback, ms) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(), ms)
  }
}
const delayForSound = delayGen()
const delayForCss = delayGen()
const delayForInitial = delayGen()
const TrendTemplate = (props) => {
  const trend1 = useBexJson('YSCM_SCCT_ALERT_TRK_04')
  const trend2 = useBexJson('YSCM_SCCT_ALERT_TRK_03')
  const trend3 = useBexJson('YSCM_SCCT_ALERT_TRK_02')
  const trend4 = useBexJson('YSCM_SCCT_ALERT_TRK_01')

  const { trendVisible = [], titles = [] } = props
  const argumentField = 'CALMONTH'
  let chartData = []
  const trendIndex = trendVisible?.indexOf?.(true)
  if (trendIndex === 0) {
    chartData = trend1 ? [...trend1.data?.chartData] : []
  }
  if (trendIndex === 1) chartData = trend2 ? [...trend2.data?.chartData] : []
  if (trendIndex === 2) chartData = trend3 ? [...trend3.data?.chartData] : []
  if (trendIndex === 3) chartData = trend4 ? [...trend4.data?.chartData] : []
  let title =
    typeof titles?.[trendIndex] === 'string' ? titles[trendIndex] : 'Emergency PR'
  return (
    <Block
      style={{
        backgroundColor: '#606c80',
        padding: 'var(--space-lg)',
        boxShadow: 'unset',
      }}
      title={title}
      transparent={true}
    >
      <div style={{ padding: '1em 2em', display: 'grid' }}>
        <Chart
          size={{ width: 590 }}
          palette="Harmony Light"
          containerBackgroundColor="#bada55"
          dataSource={chartData}
          commonAxisSettings={{
            color: 'var(--unify-font-light)',
            label: { font: { color: 'var(--unify-font-light)' } },
          }}
        >
          <CommonSeriesSettings
            argumentField={argumentField}
            label={{ font: { color: '#fff9' } }}
          />
          <Series valueField={'VALUE001'}></Series>
          <ArgumentAxis
            valueMarginsEnabled={true}
            discreteAxisDivisionMode="crossLabels"
            allowDecimals={false}
          >
            <Grid visible={false} />
            <Label
              overlappingBehavior="rotate"
              rotationAngle={-40}
              format="decimal"
            />
          </ArgumentAxis>
          <ValueAxis>
            <Grid visible={false} />
            <ConstantLine value={0}>
              <Label visible={false} />
            </ConstantLine>
          </ValueAxis>
          <Legend visible={false} />
        </Chart>
      </div>
    </Block>
  )
}
export default function Alerts(props) {
  const soundUrl = `${process.env.NEXT_PUBLIC_BSP_NAME}/sounds/ringtone.mp3`
  // const [play] = useSound(soundUrl, { volume: 0.7, id: 'popon' })
  const { query } = props

  const emergencyQry = query[0]
  const openDelQry = query[1]
  const extProcQry = query[2]
  const penContQry = query[3]
  const expirePAQry = query[4]
  const dialogRef = useRef(null)
  const [
    trendVisible,
    setTrendVisible,
  ] = useState([
    false,
    false,
    false,
    false,
  ])

  function closeCurrentVisible() {
    setTrendVisible([
      false,
      false,
      false,
      false,
    ])
  }
  const titles = [
    emergencyQry.title,
    `${openDelQry.title} ( 1% )`,
    extProcQry.title,
    penContQry.title,
  ]

  return (
    <div className={styles.container}>
      <Dialog
        modalState={trendVisible?.find((item) => item === true) ? 'show' : 'close'}
        ref={dialogRef}
        onModalClose={closeCurrentVisible}
      >
        <TrendTemplate trendVisible={trendVisible} titles={titles} />
      </Dialog>
      <img
        className={alertIcon}
        src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/white-alert.svg`}
        alt="alert sticker"
      />
      <AlertBoxBex
        title={openDelQry.title}
        unit={' '}
        queryName={openDelQry.techname}
        alertStyle={'warn'}
        StrokeColor="blue"
        withTrend={openDelQry?.trend}
        onShowTrend={() =>
          setTrendVisible([
            false,
            true,
            false,
            false,
          ])
        }
      />
      {props.hanaExperimental ? (
        <AlertRealTime
          title={emergencyQry.title}
          unit={' '}
          queryName="EMERGENCY_PR.xsjs"
          StrokeColor="blue"
          alertStyle="danger"
          playSound={() => console.log('sound')}
          withTrend={emergencyQry?.trend}
          onShowTrend={() =>
            setTrendVisible([
              true,
              false,
              false,
              false,
            ])
          }
        />
      ) : (
        <AlertBoxBex
          title={emergencyQry.title}
          unit={' '}
          queryName={emergencyQry.techname}
          alertStyle={'danger'}
          StrokeColor="blue"
          withTrend={emergencyQry?.trend}
          onShowTrend={() =>
            setTrendVisible([
              true,
              false,
              false,
              false,
            ])
          }
        />
      )}

      <AlertBoxBex
        title={extProcQry.title}
        unit={' '}
        queryName={extProcQry.techname}
        alertStyle={'warn'}
        StrokeColor="blue"
        withTrend={extProcQry?.trend}
        onShowTrend={() =>
          setTrendVisible([
            false,
            false,
            true,
            false,
          ])
        }
      />
      <AlertBoxBex
        title={penContQry.title}
        unit={' '}
        queryName={penContQry.techname}
        alertStyle={'normal'}
        StrokeColor="blue"
        withTrend={penContQry?.trend}
        onShowTrend={() =>
          setTrendVisible([
            false,
            false,
            false,
            true,
          ])
        }
      />
      <AlertBoxBex
        title={expirePAQry.title}
        unit={' '}
        queryName={expirePAQry.techname}
        alertStyle={'warn'}
        StrokeColor="blue"
        withTrend={expirePAQry?.trend}
      />
    </div>
  )
}
