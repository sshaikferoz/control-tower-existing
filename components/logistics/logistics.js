import React, { useContext, useEffect, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

import styles from './Logistics.module.css'
import Block from '../common/Block'
import LogisticsKPIBar from './LogisticsKPIBar'
import OpenClaims from './OpenClaims'
import Alert from './Alerts'
import PendingGR from './PendingGR'
import ShipmentTracking from './ShipmentTracking'
import { maskContext } from '../../lib/maskContext'
// import ConfigurableAlert from '../common/AlertConfigurable'
import alertStyles from './../logistics/Alert.module.css'
import TransferOrdersCancellation from '../procurement/TransferOrdersCancellation'
import CarponFootprint from './CarponFootprint'

const KPIBarQueries = [
  { title: 'Logistics OTD', techname: 'YCUS_CT_LOG_OTD_SUMM' },
  { title: 'Warehouse OTD', techname: 'YCUS_CT_WH_OTD_SC' },
  { title: 'Target', techname: 'YSCM_SC_MANUAL_TARGET' },
]
const whActivitiesQry = [
  { title: 'WH Activities', techname: 'YWHO_CT_WH_WL_SUMM' },
  { title: 'IK Logistics Activities', techname: 'YPDO_CT_LOG_IK_WORKLOD' },
  { title: 'Global Logistics Activities', techname: 'YSCM_CT_WH_GLD_WORKLOD' },
]
const openClaimsQry = [
  { title: 'Logistics', techname: 'YSCM_CT_LOG_OPEN_CLM' },
  { title: 'Warehouse', techname: 'YSCM_CT_LOG_OPEN_CLM' },
]
const blockedInvQry = {
  title: 'Blocked Inventory',
  techname: 'YWHO_CT_WH_BLKD_INV',
}
const transferOrdersCancellation = {
  title: 'Transfer Orders Cancellation',
  techname: 'YSCM_CT_LOG_TOS_CANCELED',
}
const stockAdjstQry = {
  title: 'Stock Adjustment',
  techname: 'YWHO_CT_INV_OVER_STOCK_ADJ',
}
const pendingGR = {
  title: 'Pending Goods Receipt (POD NO GR)',
  techname: 'YPDO_CT_LOG_PENDNIGGRS',
}
const carponFootprint = {
  title: 'Carbon Foot print - Logistics 2021',
  techname: 'YSCM_CARBON_FPRINT',
}

const alertSources = [
  {
    title: 'Emergency Items without ASN',
    unit: 'TOs',
    techname: 'YWHE_CT_LOG_URG_ASN',
    valueKey: 'VALUE002',
    alertStyle: 'danger',
  },
  {
    title: 'Emergency Items without POD',
    unit: 'ASN',
    techname: 'YSCM_CT_LOG_HT_EMER',
    valueKey: 'VALUE001',
    alertStyle: 'danger',
    fn: 'sum',
  },
  {
    title: 'IK Upcoming Bulky Delivery',
    unit: 'Items',
    techname: 'YPDO_SCCT_BULK_DEL_IK',
  },
  {
    title: 'Near Expiry Shelflife',
    unit: 'Items',
    techname: 'YIMO_CT_LOG_SHELF_LIFE',
  },
  {
    title: 'OOK Upcoming Bulky Delivery',
    unit: 'Items',
    techname: 'YPDO_SCCT_BULK_DEL_OOK',
  },
  {
    title: 'Unconfirmed TOs',
    unit: 'TOs',
    techname: 'YWHE_CT_LOG_UNCONFM_TO',
    alertStyle: 'danger',
  },
  {
    title: 'FCN for WH Items',
    unit: 'Items',
    techname: 'YSCM_CT_WH_FCN_ITEMS',
  },
  {
    title: 'Pending Stock Adjustment',
    unit: 'Items',
    techname: 'YWHO_CT_INV_OVER_ST_ADJ',
  },
]

const curPalette = {
  titleColor: 'var(--unify-accent1)',
  palette: [
    'var(--unify-accent1)',
    'var(--unify-accent2)',
    'var(--unify-accent3)',
    'var(--unify-accent4)',
  ],
}

export default function Logistics(props) {
  const { toggleMask } = useContext(maskContext)
  useHotkeys('m', toggleMask)
  const [cursorState, setCursorState] = useState('')
  // useHotkeys('h', () => setCursorState((c) => (c === 'none' ? '' : 'none')))

  return (
    <div className="wrapper" style={{ '--cursor-state': `${cursorState}` }}>
      <LogisticsKPIBar query={KPIBarQueries} />
      <div className={styles.container}>
        <div className={styles.twoCol}>
          <Block title="Shipment Tracking">
            <ShipmentTracking />
          </Block>
          <Block>
            <Alert queries={alertSources} />
            {/* <ConfigurableAlert layout="grid" visualType="box" category="LG">
              <div className={alertStyles.separator}>
                <div className={alertStyles.alertSticker}>
                  <img
                    id="alertSticker"
                    src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/logistics-alert-sticker.png`}
                    alt="sticker"
                  />
                  <p>Alerts</p>
                </div>
                <img
                  id={alertStyles.airplane}
                  src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/logistics-airplane-light.png`}
                  alt="airplane"
                />
                <img
                  id={alertStyles.ship}
                  src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/logistics-ship-light.png`}
                  alt="ship"
                />
                <img
                  id={alertStyles.truck}
                  src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/logistics-truck-light.png`}
                  alt="truck"
                />
              </div>
            </ConfigurableAlert> */}
          </Block>
        </div>

        <div className={styles.threeCol}>
          <Block title="Carbon Foot print">
            <CarponFootprint theme={curPalette} query={carponFootprint} />
          </Block>
          <Block title={transferOrdersCancellation.title}>
            <TransferOrdersCancellation
              theme={curPalette}
              query={transferOrdersCancellation}
            />
          </Block>
          <Block title={pendingGR.title}>
            <PendingGR theme={curPalette} query={pendingGR} />
          </Block>
        </div>
      </div>
    </div>
  )
}
