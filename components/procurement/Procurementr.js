import React, { useContext, useState } from 'react'
import Block from '../common/Block'

import styles from './Procurement.module.css'
import ProcurementKPIBar from './ProcurementKPIBar'
import LostOpportunity from './LostOpportunity'
import OutsourcedInventory from './OutsourcedInventory'
import Alerts from './Alerts'
import ActiveDisputes from './ActiveDisputes'
import ActiveDisputesV2 from './ActiveDisputesV2'
import Iktva from './Iktva'
import SingleSource from './SingleSource'
import { useHotkeys } from 'react-hotkeys-hook'
import { maskContext } from '../../lib/maskContext'
import EndToEndStaticImage from './EndToEndStaticImage'
import SingleSourceTrend from './SingleSourceTrend'

export default function Procurementr(props) {
  const { toggleMask } = useContext(maskContext)
  useHotkeys('m', toggleMask)
  const [cursorState, setCursorState] = useState('')
  // useHotkeys('h', () => setCursorState((c) => (c === 'none' ? '' : 'none')))

  const [singleSrcVisible, setSingleSrcVisible] = useState({
    trend: 'to',
    other: '',
  })

  function singleSourceClicked() {
    const [trend, other] = Object.entries(singleSrcVisible) //?
    const [, trendValue] = trend
    const [, otherValue] = other

    const toggled = Object.fromEntries([
      ['trend', otherValue],
      ['other', trendValue],
    ])
    setSingleSrcVisible(toggled)
  }

  //prettier-ignore
  const KPIBarQueries = [
    { title: 'Buyer OTD', techname: 'YPDO_CT_PROC_OTD_BUYER' },
    { title: 'Supplier OTD', techname: 'YPDO_CT_PROC_OTD_SUPPLIER' },
    { title: 'Project Proc. Time', techname: 'YCDPLN_CT_PROC_PROJ_TIME' },
  ]

  const KPITargetQry = { title: 'Targets', techname: 'YSCM_SC_MANUAL_TARGET' }

  //prettier-ignore
  const alertsQry = [
    { title: 'Emergency PR', techname: 'YCUS_CT_PROC_EMRG_PR' },
    { title: 'POs to be Released', techname: 'YPDO_CT_PROC_PO_TO_RELEASE' },
    { title: 'Expiring Contracts', techname: 'YCDEXDB_CT_PROC_NA_CONTRACT' },
    { title: 'Consumed Contracts', techname: 'YCDEXDB_CT_PROC_CONS_CONT' },
    { title: 'Non-compliant Contractors', techname: 'YSCM_SCCT_PROC_CONTRACTOR' },
  ]

  const activeDispute = {
    title: 'Active Disputes, Claims and appeals',
    techname: 'YCDP_CT_PROC_CLAIM',
  }

  const iktvaQry = {
    title: 'IKTVA',
    techname: 'YCDEXDB_CT_PROC_IKTIVA_VALUE',
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
    techname: 'YPDO_CT_LOST_OPR_SUM',
  }

  const outsourcedInventory = {
    title: 'Outsourced Inventory',
    techname: 'YSCM_CT_PROC_OSS',
  }

  const singleSrcTrendQry = {
    title: 'Single Source Trend',
    techname: 'YSCM_CT_PROC_SS_TREND',
  }

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
    <div
      className="wrapper zeroPaddingRight"
      style={{ '--cursor-state': `${cursorState}` }}
    >
      <ProcurementKPIBar query={KPIBarQueries} targetQuery={KPITargetQry} />
      <div className={styles.procurementContainer}>
        <div className={styles.artboard}>
          <img src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/tower.png`} />
        </div>
        <div className={styles.bigColumn}>
          <Block title="End-To-End Visibility">
            {/* <div style={{ display: 'grid', justifyContent: 'center' }}>
              <img
                style={{
                  maxHeight: '100%',
                  maxWidth: '90%',
                  display: 'block',
                  alignSelf: 'center',
                  marginInline: 'auto',
                }}
                src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/end-to-end.png`}
              />
            </div> */}
            <EndToEndStaticImage />
          </Block>
          <div className={styles.row1}>
            <Block title="Active Disputes, Claims & Appeals">
              {/* <ActiveDisputes theme={curPalette} query={activeDispute} /> */}
              <ActiveDisputesV2 theme={curPalette} query={activeDispute} />
            </Block>
            <Block title={iktvaQry.title}>
              <Iktva theme={curPalette} query={iktvaQry} />
            </Block>
            <Block title="Single Sources">
              <div className={styles.withCrossfade}>
                <SingleSource
                  dataAttr={singleSrcVisible?.other}
                  theme={curPalette}
                  query={singleSrcQry}
                  visible={singleSrcVisible}
                  click={singleSourceClicked}
                />
                <SingleSourceTrend
                  dataAttr={singleSrcVisible?.trend}
                  theme={curPalette}
                  query={singleSrcTrendQry}
                  visible={!singleSrcVisible}
                  click={singleSourceClicked}
                />
              </div>
            </Block>
          </div>
          <div className={styles.row2}>
            <Block title={lostOpportQry.title}>
              <LostOpportunity query={lostOpportQry} theme={curPalette} />
            </Block>
            <Block title="Outsourced Inventory ($MM) ">
              <OutsourcedInventory
                query={outsourcedInventory}
                gridTitle="Aged Outsourced Inventory Details"
              />
            </Block>
          </div>
        </div>
        <div className={styles.smallColumn}>
          <Block style={{ borderBottomRightRadius: '0', borderTopRightRadius: '0' }}>
            <Alerts hanaExperimental={true} query={alertsQry} />
          </Block>
        </div>
      </div>
    </div>
  )
}
