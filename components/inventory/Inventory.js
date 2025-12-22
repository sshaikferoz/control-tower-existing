import { useContext, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import Block from '../common/Block'
import styles from './Inventory.module.css'
import { alertIcon } from '../inventory/Alerts.module.css'
import { maskContext } from '../../lib/maskContext'
import ConfigurableAlert from '../common/AlertConfigurable'
import KPIBarConfigurable from '../common/KPIBarConfigurable'
import useComponentConfigurations from '../../lib/useComponentConfigurations'
import DynamicComponent from '../common/DynamicComponent'
import PopupChart from '../common/PopupChart'

const queries = [
  { title: 'Inventory Trend', techname: 'YIMO_CT_INV_TREND' },
  {
    title: 'Outsourced Inventory',
    techname: 'YSCM_CT_PROC_OSS',
  },
  { title: 'UPCOMING PURCHASE ORDERS', techname: 'YPDO_CT_INV_UPCOM_PO' },

  { title: 'Inventory Detail', techname: 'ZIMO_INKP_CIGB_CI01_DETAIL' },
  {
    title: 'KPI',
    techname: {
      iQR: 'YIMO_CT_INV_IQR_DSHBRD',
      drillingForecast: 'YIMO_CT_INV_ERROR_DRILLING_KPI',
      projectsForecast: 'YIMO_CT_INV_ERROR_PROJECT_KPI',
      target: 'YSCM_SC_MANUAL_TARGET',
    },
  },
  { title: 'BLOCKED INVENTORY', techname: 'YWHO_CT_INV_ST_ADJS_BLKD' },
  { title: 'STOCK ADJUSTMENT', techname: 'YWHO_CT_INV_ST_ADJS_BLKD' },
  {
    title: 'Alerts',
    techname: {
      stock: 'YIMO_CT_INV_OUT_OF_STOCK',
      overdue: 'YCUS_SCCT_INV_OVERDUE',
      potentialSlow: 'YIMO_SCCT_POTENTIAL_SLOW',
    },
  },
  {
    title: 'Inventory Value',
    techname: {
      invValue: 'YIMO_INVENTORY_LEVEL_SCCT',
      iQR: 'YIMO_CT_INV_IQR',
    },
  },
  {
    q: [
      {
        title: 'P&SCM Warehouses',
        techname: 'YWHO_CT_INV_ST_ADJS_BLKD_M_PLA',
      },
      {
        title: 'Customer Plants',
        techname: 'YWHO_CT_INV_ST_ADJS_BLKD_CUST',
      },
    ],
  },
]

const curPalette = {
  titleColor: 'var(--unify-accent1)',
  palette: [
    'var(--unify-accent1)',
    'var(--unify-accent2)',
    'var(--unify-accent3)',
    'var(--unify-accent4)',
    'var(--wh-accent1)',
    'var(--proc-accent1)',
    'var(--proc-orange)',
    'var(--inv-accent5)',
    'var(--wh-accent1)',
  ],
}

function Inventory() {
  const { toggleMask } = useContext(maskContext)
  useHotkeys('m', toggleMask)
  const [
    popupChartDetail,
    setPopupChartDetail,
  ] = useState({})
  const { data, error } = useComponentConfigurations()
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
      <KPIBarConfigurable category="IN" />
      <div className={styles.container}>
        <div className={styles.smallColumn}>
          {getComponentById('InventoryValueFigure')}
          {getComponentById('OutsourcedInventory')}
        </div>
        <div className={styles.bigColumn}>
          {getComponentById('InventoryTrendChart')}
          <div className={styles.row}>{getComponentById('TestAndInspection')}</div>
        </div>
        <Block>
          <ConfigurableAlert category="IN">
            <img
              className={alertIcon}
              src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/white-alert.svg`}
              alt="alert sticker"
            />
          </ConfigurableAlert>
        </Block>
      </div>
    </div>
  )
}

export default Inventory
