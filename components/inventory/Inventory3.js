import { useHotkeys } from 'react-hotkeys-hook'
import { withCrossfade } from './../procurement/Procurement.module.css'
import Block from '../common/Block'
import styles from './Inventory.module.css'
import { alertIcon } from '../inventory/Alerts.module.css'
import { useContext, useRef, useState, useCallback } from 'react'
import { maskContext } from '../../lib/maskContext'
import ConfigurableAlert from '../common/AlertConfigurable'
import KPIBarConfigurable from '../common/KPIBarConfigurable'
import useComponentConfigurations from '../../lib/useComponentConfigurations'
import ComponentById from '../common/ComponentById'
import Dialog from '../common/Dialog'
import DetailChart from '../common/DetailChart'
import TrendChart from '../common/TrendChart'
const PopupTemplate = (props) => {
  return (
    <Block
      style={{
        backgroundColor: 'var(--popup-bg)',
        padding: 'var(--space-lg)',
        minHeight: '100%',
      }}
      popup={true}
      title={props.title}
      transparent={true}
    >
      {props.children}
    </Block>
  )
}

const CrossfadeTemplate = (props) => {
  const [hiddendElement, setHiddenElement] = useState('second')

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

function App() {
  const { maskData, toggleMask } = useContext(maskContext)
  useHotkeys('m', toggleMask)
  const [popupChartDetail, setPopupChartDetail] = useState({})
  const [showDialog, setShowDialog] = useState(false)
  const dialogRef = useRef(null)
  const { data, error } = useComponentConfigurations()
  const getComponentById = (compId) => {
    // const getComponentById =  useCallback((compId) => {
    let clickEvent = {}
    let style = {}
    let drilldownProps = {}
    const found = results.find(
      (comp) =>
        comp.ComponentKey === compId || comp.ComponentKey === compId?.toUpperCase?.()
    )
    const trendFound =
      found?.Level2Nav?.results?.[0] || found?.DataSourceNav?.results?.[0]

    if (trendFound) {
      const { IsCurrencyFormat = true, DecimalDigits = '0' } = found || {}
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
      componentProps: found || {},
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
      console.log({ trendFound }) || (
        <CrossfadeTemplate>
          <Block {...BlockProps}>
            <ComponentById {...ComponentProps} />
          </Block>
          <Block {...drilldownBlockProps} title={trendFound.Title || found.Title}>
            {trendFound?.Trend ? (
              <TrendChart
                background="transparent"
                textColor="light"
                key={`${trendFound.TechnicalName || found.TechnicalName}`}
                aggregationType={trendFound?.trendAggrType}
                {...trendFound}
              />
            ) : (
              <DetailChart
                background="transparent"
                textColor="light"
                key={`${trendFound.TechnicalName || found.TechnicalName}`}
                {...trendFound}
              />
            )}
          </Block>
        </CrossfadeTemplate>
      )
    )
  }
  // ,[popupChartDetail])
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
  const {
    d: { results },
  } = data

  return (
    <div className="wrapper">
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
            {popupChartDetail?.Trend ? (
              <TrendChart
                containerRef={dialogRef.current}
                key={`${popupChartDetail.TechnicalName}${Number(
                  Math.random() * 30
                ).toFixed(0)}`}
                aggregationType={popupChartDetail.trendAggrType}
                {...popupChartDetail}
              />
            ) : (
              <DetailChart
                containerRef={dialogRef.current}
                key={`${popupChartDetail.TechnicalName}${Number(
                  Math.random() * 30
                ).toFixed(0)}`}
                {...popupChartDetail}
              />
            )}
          </PopupTemplate>
        )}
      </Dialog>
      <KPIBarConfigurable category="IN" />
      <div className={styles.container}>
        <div className={styles.smallColumn}>
          {getComponentById('InventoryValueFigure')}
          {getComponentById('OutsourcedInventory')}
        </div>
        <div className={styles.bigColumn}>
          {getComponentById('InventoryTrendFrame')}
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

export default App
