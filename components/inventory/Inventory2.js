import { useHotkeys } from 'react-hotkeys-hook'

import Block from '../common/Block'
import InventoryKPIBar from './InventoryKPIBar'
import BlockedInventory from './BlockedInventory'
import UpcomingPO from './UpcomingPO'
import Alerts from './Alerts2'
import InventoryTrend from './InventoryTrendChart'
import { withCrossfade } from './../procurement/Procurement.module.css'
import InventoryValueFigure from './InventoryValueFigure'
import StockAdjustment from './StockAdjustment'
import StageAndOverdue from './StageAndOverdue'
import styles from './Inventory.module.css'
import alertStyles from './alerts.module.css'
import { useContext, useState } from 'react'
import InventoryTrendStaticImage from './InventoryTrendStaticImage'
import { maskContext } from '../../lib/maskContext'
// import ConfigurableAlert from '../common/AlertConfigurable'
import BlockedInvDetails from './BlockedInvDetails'
import AlertBoxBex from '../common/AlertBoxBex'

const queries = [
  { title: 'Inventory Trend', techname: 'YIMO_CT_INV_TREND' },
  { title: 'STAGE & OVERDUE', techname: 'YCUS_CT_INV_CUST_PORF' },
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
  ],
}

function App() {
  const [alertAnimation, setAlertAnimation] = useState('animate')
  const { maskData, toggleMask } = useContext(maskContext)
  useHotkeys('k', () => setAlertAnimation((c) => (c === 'animate' ? '' : 'animate')))
  useHotkeys('m', toggleMask)
  const [cursorState, setCursorState] = useState('')
  // useHotkeys('h', () => setCursorState((c) => (c === 'none' ? '' : 'none')))

  const [hiddendElement, setHiddenElement] = useState('second')

  function blockedInventoryClicked() {
    if (hiddendElement === 'first') setHiddenElement('second')
    else {
      setHiddenElement('first')
    }
  }

  return (
    <div className="wrapper" style={{ '--cursor-state': `${cursorState}` }}>
      <InventoryKPIBar query={queries[4]} />
      <div className={styles.container}>
        <div className={styles.smallColumn}>
          <Block title={queries[8].title}>
            <InventoryValueFigure query={queries[8]} />
          </Block>
          <Block title={queries[5].title}>
            <div
              data-hidden-place={hiddendElement}
              className={withCrossfade}
              onClick={blockedInventoryClicked}
            >
              <BlockedInventory query={queries[5]} />
              <BlockedInvDetails query={queries[9]} />
            </div>
          </Block>
          <Block title={queries[6].title}>
            <StockAdjustment query={queries[6]} visible={true} />
          </Block>
        </div>
        <div className={styles.bigColumn}>
          <Block title={queries[0].title}>
            {/* <InventoryTrendStaticImage palette={curPalette} query={queries[0]} /> */}
            <InventoryTrend palette={curPalette} query={queries[0]} />
          </Block>
          <div className={styles.row}>
            <Block title={queries[1].title}>
              <StageAndOverdue theme={curPalette} query={queries[1]} />
            </Block>
            <Block title={queries[2].title}>
              <UpcomingPO theme={curPalette} query={queries[2]} />
            </Block>
          </div>
        </div>
        <Block>
          <Alerts query={queries[7]} />
        </Block>
        <div className={styles.artboard}>
          <img src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/tower.png`} />
        </div>
      </div>
    </div>
  )
}

export default App
