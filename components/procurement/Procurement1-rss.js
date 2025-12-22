import React, { useRef, useContext, useState } from 'react'
import Block from '../common/Block'

import styles from './Procurement.module.css'
import { withCrossfade } from './../procurement/Procurement.module.css'
import ProcurementKPIBar from './ProcurementKPIBar'
import LostOpportunity from './LostOpportunity'
import OutsourcedInventory from './OutsourcedInventory'
import Alerts from './Alerts2'
import ConfigurableAlert from '../common/AlertConfigurable'
import ActiveDisputes from './ActiveDisputes'
import ActiveDisputesV2 from './ActiveDisputesV2'
import Iktva from './Iktva'
import SingleSource from './SingleSource'
import { useHotkeys } from 'react-hotkeys-hook'
import { maskContext } from '../../lib/maskContext'
import EndToEndStaticImage from './EndToEndStaticImage'
import SingleSourceTrend from './SingleSourceTrend'
import LowValueProc from './LowValueProc'
import ActiveDisputesTrend from './ActiveDisputesTrend'
import KPIBarConfigurable from '../common/KPIBarConfigurable'
import RSSFeeds from '../common/RSSFeeds'
import ProcessingTimeForEGR from './ProcessingTimeForEGR'
import ProcessingTimeForSES from './ProcessingTimeForSES'
import useComponentConfigurations from '../../lib/useComponentConfigurations'
import ComponentById from '../common/ComponentById'
import Dialog from '../common/Dialog'
import useBexJson from '../../lib/useBexJson'
import { getArgumentField } from '../../lib/dashboardConfig/helpers'
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
import formatNumber from '../../lib/helpers/formatNumber'
import DetailChart from '../common/DetailChart'
const PopupTemplate = (props) => {
  return (
    <Block
      style={{
        boxShadow: 'unset',
        backgroundColor: 'var(--popup-bg)',
        padding: 'var(--space-lg)',
        minHeight: '100%',
      }}
      title={props.title}
      popup={true}
      transparent={true}
    >
      {props.children}
    </Block>
  )
}

const CrossfadeTemplate = (props) => {
  const [
    hiddendElement,
    setHiddenElement,
  ] = useState('second')

  function blockedInventoryClicked() {
    if (hiddendElement === 'first') setHiddenElement('second')
    else {
      setHiddenElement('first')
    }
  }
  return (
    <div
      data-hidden-place={hiddendElement}
      className={withCrossfade}
      onClick={blockedInventoryClicked}
    >
      {props.children}
    </div>
  )
}
export default function ProcurementRss(props) {
  const { toggleMask } = useContext(maskContext)
  useHotkeys('m', toggleMask)
  const [
    popupChartDetail,
    setPopupChartDetail,
  ] = useState({})
  const [
    showDialog,
    setShowDialog,
  ] = useState(false)
  const dialogRef = useRef(null)
  const { data, error } = useComponentConfigurations('PR', '01')

  //prettier-ignore
  const KPIBarQueries = [
    { title: 'Buyer OTD', techname: 'YPDO_CT_PROC_OTD_BUYER' },
    { title: 'Supplier OTD', techname: 'YPDO_CT_PROC_OTD_SUPPLIER' },
    { title: 'Project Proc. Time', techname: 'YCDPLN_CT_PROC_PROJ_TIME' },
  ]

  const KPITargetQry = { title: 'Targets', techname: 'YSCM_SC_MANUAL_TARGET' }

  //prettier-ignore
  const alertsQry = [
    { title: 'Non-Compliant Contractors', techname: 'YSCM_SCCT_PROC_CONTRACTOR' },
    { title: 'POs to be Released', techname: 'YPDO_CT_PROC_PO_TO_RELEASE' },
    { title: 'Open Version POs', techname: 'YPDO_CT_PROC_OPEN_VER_PO' },
    { title: 'Consumed Contracts', techname: 'YCDEXDB_CT_PROC_CONS_CONT' },
    {
      title: 'Pending SES',
      techname: 'YCDIK_CT_PROG_INV_PROG_TIME',
    },
    { title: 'Overdue eGRs', techname: 'YCUS_PSCCT_EGR_AGED' },
  ]
  const activeDispute = {
    title: 'Active Claims',
    techname: 'YCDP_CT_PROC_CLAIM',
  }

  const iktvaQry = {
    title: 'IKTVA',
    techname: 'YSCM_SCCT_PROC_IKTIVA',
  }

  const singleSrcQry = [
    { title: 'LFC', techname: 'YCDEXDB_CT_PROC_SINGLE_SLFC' },
    { title: 'MFC/SFC', techname: 'YCDEXDB_CT_PROC_SFCMFC' },
    { title: 'Material', techname: 'YPDO_PROC_CT_SNG_MAT' },
  ]

  /* const lostOpportQry = {
    title: 'Lost Opportunity',
    techname: 'YPDO_CT_PROC_SUMMARY',
  } */
  const lostOpportQry = {
    title: 'Lost Opportunity ($MM)',
    techname: 'YSCM_CT_LOSTOPP',
  }

  const outsourcedInventory = {
    title: 'Outsourced Inventory',
    techname: 'YSCM_CT_PROC_OSS',
  }

  const activeDisputesTrendQry = {
    title: 'Active Disputes Trend',
    techname: 'YCDP_CT_PROC_CLAIM_TREND',
  }
  const singleSrcTrendQry = {
    title: 'Single Source Trend',
    techname: 'YSCM_CT_PROC_SS_TREND',
  }
  const PRAQry = {
    title: 'DIGITAL WORKFORCE',
    techname: 'YSCM_SCCT_PROC_RPA_01',
  }
  const SESPrTimeQry = {
    title: 'SES Processing Time (Days)',
    techname: 'YSCM_PSCCT_PROC_SES_TIME',
  }
  const eGRPrTimeQry = {
    title: 'eGRs Processing Time (Days)',
    techname: 'YCUS_MOB_PROC_EGR_TIME',
  }
  const curPalette = {
    titleColor: 'var(--unify-accent1)',
    palette: [
      'var(--unify-accent1)',
      'var(--unify-accent2)',
      'var(--unify-accent3)',
      'var(--unify-accent4)',
      'var(--inv-accent4)',
      'var(--inv-accent5)',
      'var(--inv-accent6)',
      'var(--proc-accent1)',
      'var(--proc-accent2)',
    ],
  }

  console.log({ error })
  if (error && error.status === 403)
    return (
      <dialog open>
        <div>Your are not authorized to view this page</div>
      </dialog>
    )
  if (error)
    return (
      <dialog open>
        <div>There is an error loading page components</div>
      </dialog>
    )
  if (!data) return null
  const {
    d: { results },
  } = data
  const getComponentById = (compId) => {
    let clickEvent = {}
    let style = {}
    let drilldownProps = {}
    const found = results.find(
      (comp) =>
        comp.ComponentKey === compId || comp.ComponentKey === compId?.toUpperCase?.()
    )
    const trendFound =
      found?.Level2Nav?.results?.[0] || found?.DataSourceNav?.results?.[0]
    if (trendFound?.DrillDown || trendFound?.Trend) {
      const { IsCurrencyFormat = true, DecimalDigits = '0' } = found || {}
      if (found) console.log(found)
      const renderDelay = found?.ComponentKey ? { renderDelay: 680 } : {}
      style = { cursor: 'pointer', userSelect: 'none' }
      if (trendFound?.Crossfade !== true)
        clickEvent = {
          onClick: () => {
            setShowDialog(true)
            setPopupChartDetail({
              ...trendFound,
              IsCurrencyFormat,
              DecimalDigits,
              ...renderDelay,
            })
          },
        }

      drilldownProps = { ...trendFound }
    }
    const ComponentProps = {
      componentId: compId,
      componentProps: { ...found } || {},
      drilldownProps,
    }
    const drilldownBlockProps =
      { title: trendFound?.Title || found?.Title, clickEvent, style } || {}
    const BlockProps = { title: found?.Title, clickEvent, style } || {}
    if (trendFound?.Crossfade !== true)
      return (
        <Block {...BlockProps}>
          <ComponentById {...ComponentProps} />
        </Block>
      )
    return (
      <CrossfadeTemplate>
        <Block {...BlockProps}>
          <ComponentById {...ComponentProps} />
        </Block>
        <Block {...drilldownBlockProps} title={trendFound.Title || found.Title}>
          <DetailChart
            background="transparent"
            textColor="light"
            key={`${trendFound.TechnicalName || found.TechnicalName}`}
            {...trendFound}
          />
        </Block>
      </CrossfadeTemplate>
    )
  }

  return (
    <div className="wrapper zeroPaddingRight">
      <Dialog
        ref={dialogRef}
        modalState={showDialog ? 'show' : 'close'}
        popupAt={popupChartDetail?.PopupPosition}
        onModalClose={() => {
          // setPopupChartDetail({})
          setShowDialog(false)
        }}
      >
        {popupChartDetail.TechnicalName && (
          <PopupTemplate title={popupChartDetail.Title}>
            <DetailChart
              containerRef={dialogRef.current}
              key={`${popupChartDetail.TechnicalName}${Number(
                Math.random() * 30
              ).toFixed(0)}`}
              {...popupChartDetail}
            />
          </PopupTemplate>
        )}
      </Dialog>
      {/* <ProcurementKPIBar query={KPIBarQueries} targetQuery={KPITargetQry} /> */}
      <KPIBarConfigurable category="PR" pageNo={1} />
      <div className={styles.procurementContainer}>
        <div className={styles.artboard}>
          <img src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/tower.png`} />
        </div>
        <div className={styles.bigColumnRss}>
          <Block transparent={true} title="">
            <RSSFeeds />
          </Block>
          <Block title="End-To-End Visibility">
            <EndToEndStaticImage />
          </Block>
          <div className={styles.row1}>
            <Block title="DIGITAL WORKFORCE">
              <LowValueProc query={PRAQry} />
            </Block>
            {getComponentById('LostOpportunity')}
            <Block title={iktvaQry.title}>
              <Iktva theme={curPalette} query={iktvaQry} />
            </Block>
          </div>
          <div className={styles.row2}>
            <Block title={SESPrTimeQry.title}>
              <ProcessingTimeForSES theme={curPalette} query={SESPrTimeQry} />
            </Block>
            <Block title={eGRPrTimeQry.title}>
              <ProcessingTimeForEGR theme={curPalette} query={eGRPrTimeQry} />
            </Block>
          </div>
        </div>
        <div className={styles.smallColumn}>
          <Block style={{ borderBottomRightRadius: '0', borderTopRightRadius: '0' }}>
            <ConfigurableAlert
              layout="grid"
              visualType="box"
              pageNo="page1"
              category="PR"
            ></ConfigurableAlert>
          </Block>
        </div>
      </div>
    </div>
  )
}
