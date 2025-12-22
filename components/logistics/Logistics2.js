import React, { useContext, useEffect, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import Block from '../common/Block'
import styles from './Logistics.module.css'
import { alertIcon } from '../inventory/Alerts.module.css'
import { maskContext } from '../../lib/maskContext'
import ConfigurableAlert from '../common/AlertConfigurable'
import KPIBarConfigurable from '../common/KPIBarConfigurable'
import useComponentConfigurations from '../../lib/useComponentConfigurations'
import DynamicComponent from '../common/DynamicComponent'
import PopupChart from '../common/PopupChart'
import ShippingPriceIndex from './ShippingPriceIndex'
import PressureIndex from '../procurement/PressureIndex'
import InventoryMap from '../inventory/InventoryMap'
import EmployeeMap from '../inventory/EmployeeMap'
import BlockToggleHeader from '../common/BlockToggleHeader'

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
const shippingPriceIndex = {
  title: 'Shipping Price Index ($M)',
  techname: 'YSCM_SCCT_SH_INDEX_01',
}
const transferOrdersCancellation = {
  title: 'Transfer Orders Cancellation',
  techname: 'YSCM_CT_LOG_TOS_CANCELED',
}
const stockAdjstQry = {
  title: 'Stock Adjustment',
  techname: 'YWHO_CT_INV_OVER_STOCK_ADJ',
}
const pressureIndexQry = {
  title: 'Global Supply Chain Pressure Index',
  techname: 'YSCM_CT_GSCPI',
}
const pendingGR = {
  title: 'PENDING GOODS RECEIPT AT WAREHOUSES',
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
    techname: 'EMRG_TO_WO_ASN.xsjs',
    alertStyle: 'danger',
  },
  {
    title: 'Emergency Items without POD',
    unit: 'ASN',
    techname: 'HOT_TAXI_WO_POD.xsjs',
    alertStyle: 'danger',
  },
  {
    title: 'IK Upcoming Bulky Delivery',
    unit: 'Items',
    techname: 'YPDO_SCCT_BULK_DEL_IK',
  },
  {
    title: 'Near Expiry Shelflife',
    unit: 'Items',
    techname: 'SHLF_LIFE_6MO.xsjs',
  },
  {
    title: 'OOK Upcoming Bulky Delivery',
    unit: 'Items',
    techname: 'YPDO_SCCT_BULK_DEL_OOK',
  },
  {
    title: 'Unconfirmed TOs',
    unit: 'TOs',
    techname: 'UNCONFIRMED_TOS.xsjs',
    alertStyle: 'danger',
  },
  {
    title: 'FCN for WH Items',
    unit: 'Items',
    techname: 'FCN_WH_ITEMS.xsjs',
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
    'var(--inv-accent4)',
    'var(--inv-accent5)',
    'var(--inv-accent6)',
    'var(--proc-accent1)',
    'var(--proc-accent2)',
  ],
}

export default function Logistics(props) {
  const { toggleMask } = useContext(maskContext)
  useHotkeys('m', toggleMask)
  const [
    popupChartDetail,
    setPopupChartDetail,
  ] = useState({})
  const [
    switcher,
    setSwitcher,
  ] = useState('employee')
  useHotkeys('e', () => {
    setSwitcher((current) => (current === 'employee' ? 'inventory' : 'employee'))
  })

  const { data, error } = useComponentConfigurations('LG')
  const { results = [] } = data?.d || {}
  const getComponentById = (compId) => {
    if (results.length === 0) return null
    return (
      <DynamicComponent
        compId={compId}
        results={results}
        setDetailFn={(detailProps) => setPopupChartDetail(detailProps)}
      />
    )
  }
  if (!data) return null
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

  return (
    <div className="wrapper">
      <PopupChart
        onClose={() => setPopupChartDetail({})}
        popupChartDetail={popupChartDetail}
      />
      <KPIBarConfigurable category="LG" />
      <div className={styles.container}>
        <div className={styles.twoCol}>
          <BlockToggleHeader
            style={{ paddingBlockStart: '1.5em' , paddingBlockEnd: '2.2em' }}
            title1="Inventory Map"
            title2="Employee Travel Care"
          >
            <EmployeeMap />
            <InventoryMap />
            {/* <div></div> */}
          </BlockToggleHeader>
          <Block>
            <ConfigurableAlert category="LG">
              <img
                className={alertIcon}
                src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/white-alert.svg`}
                style={{ gridColumn: 'span 2' }}
                alt="alert sticker"
              />
            </ConfigurableAlert>
          </Block>
        </div>

        <div className={styles.threeCol}>
          <Block title="CO2 EMISSION Targets">
            <img
              style={{
                width: '91%',
                height: 'auto',
                justifySelf: 'center',
                display: 'block',
                marginBlockEnd: '-1em',
                paddingBlockStart: '1em',
              }}
              src="https://sharek.aramco.com.sa/orgs/30002047/Documents/SCCT/CO2.svg"
            />
          </Block>
          {getComponentById('ShippingPriceIndex')}
          {getComponentById('PressureIndex')}
        </div>
      </div>
    </div>
  )
}
