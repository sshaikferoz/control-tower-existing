import React, { useContext, useState } from 'react'
import Block from '../common/Block'

import styles from './Procurement2.module.css'
import ConfigurableAlert from '../common/AlertConfigurable'
import { alertIcon } from '../inventory/Alerts.module.css'
import TotalSpend from './TotalSpend'
import MapComp from './MapComp'
import { maskContext } from '../../lib/maskContext'
import { useHotkeys } from 'react-hotkeys-hook'
import KPIBarConfigurable from '../common/KPIBarConfigurable'
import RSSFeeds2 from '../common/RSSFeeds-2'

export default function Procurement(props) {
  const { toggleMask } = useContext(maskContext)
  useHotkeys('m', toggleMask)
  const [
    cursorState,
    setCursorState,
  ] = useState('')
  // useHotkeys('h', () => setCursorState((c) => (c === 'none' ? '' : 'none')))

  //prettier-ignore
  const KPIBarQueries = [
    { title: 'Operation Proc. Time', techname: 'YCDPLN_CT_PROC_CONTR_TIME' },
    { title: 'IKTVA Score', techname: 'YCDEXDB_CT_PROC_IKTIVA_KPI' },
    { title: 'Spend Under Management', techname: 'YPDE_CT_PROC_SPEND_MANGMENT' },
  ]

  const KPITargetQry = { title: 'Targets', techname: 'YSCM_SC_MANUAL_TARGET' }

  //prettier-ignore
  const alertsQry = [
    {
      title: (
        <span
          dangerouslySetInnerHTML={{ __html: '<span> Emergency &nbsp; PR</span>' }}
        ></span>
      ),
      techname: 'YCUS_CT_PROC_EMRG_PR',
      trend: { techname: 'YSCM_SCCT_ALERT_TRK_04' },
    },
    {
      title: 'Open Orders With Deleted Requirements',
      techname: 'YPDO_CT_PROC_OD_PO',
      trend: { techname: 'YSCM_SCCT_ALERT_TRK_03' },

    },
    { title: 'Extensive Procurement Time',
      techname: 'YCDE_CT_PROC_TIME_ANA' ,
      trend: { techname: 'YSCM_SCCT_ALERT_TRK_02' },
    },
    {
      title: 'Compliance Review Actions',
      techname: 'YCDREP_PEND_COMPL_REVIEW_CT',
      trend: { techname: 'YSCM_SCCT_ALERT_TRK_01' },
    },
    { title: 'Near Expiry PAs', techname: 'YPDE_CT_PROC_PA_NEAR_EXPIR' },
  ]

  const [
    selectedSpendType,
    setSelectedSpendType,
  ] = useState('directSpend')
  const mapQuery = {
    directSpend: {
      title: 'Direct Material Spend',

      byCountry: 'YSCM_CT_PROC_SPEND_COUNTRIES',
      byCategory: 'YSCM_SCCT_MSPENDT_COM_00',
    },
    indirectSpend: {
      title: 'Indirect Material Spend',

      byCountry: 'YSCM_SCCT_INDIRECT_COUNTRY',
      byCategory: 'YSCM_SCCT_INDIRECT_COMMODITY',
    },
    totalSpend: {
      title: 'Total Material Spend',
      byCountry: 'YSCM_SCCT_MSPEND_CONT_00',
      byCategory: 'YSCM_SCCT_MSPEND_COM_00',
    },
    sourcingGap: {
      title: 'Sourcing Coverage',
      byCountry: 'YSCM_SCCT_SOURCING_GAP_BY_CON',
      byCategory: 'YSCM_SCCT_SOURCING_GAP_BY_COM',
    },
    investment: {
      title: 'Investments',

      byCountry: 'YSCM_SCCT_INV_BY_COUNTRY',
      byCategory: 'YSCM_SCCT_INV_BY_COMMODITY',
    },
  }

  const countrySrvSpendQry = {
    title: 'By Contracts',
    techname: 'YSCM_CT_PROC_SPEND_CON_SRV',
  }

  const countrySpendMapQry = {
    title: 'Materials Spend',
    techname: 'YSCM_CT_PROC_SPEND_COUNTRIES',
  }

  const totalSpendQry = {
    title: 'Total Spend',
    techname: 'YSCM_CT_PROC_SPEND_YTD',
  }

  const priceIndexQry = {
    title: 'Material Price Index',
    techname: 'YSCM_SCCT_PRC_PMI',
  }

  const pressureIndexQry = {
    title: 'Global Supply Chain Pressure Index (GSCPI)',
    techname: 'YSCM_CT_GSCPI',
  }

  const totalMatSpendQry = {
    title: 'Materials Spend',
    techname: 'YSCM_CT_PROC_SPEND_BK',
  }

  const totalSrvSpendQry = {
    title: 'Contracts Spend',
    techname: 'YSCM_CT_PROC_SPEND_SBK',
  }

  const last5SpendQry = {
    title: 'Yearly Spend',
    techname: 'YSCM_CT_PROC_SPEND_L5Y',
  }

  const materialSpen = {
    // techname: 'YSCM_CT_PROC_MATSPEND',
    techname: 'YPDS_SCCT_SPEND_MAT_COM_APD',
  }

  const serviceSpen = {
    title: 'Services',
    techname: 'YSCM_CT_PROC_SRVSPEND',
  }

  const costSavings = {
    title: 'Cost Savings & Avoidance',
    techname: 'YSCM_CT_PROC_COST',
  }

  const invoiceProcessingTime = {
    title: 'Invoice Processing Time',
    techname: 'YSCM_CT_PROC_INVOICE_MONTHLY',
  }
  const leadTime = {
    title: 'Procurement Lead Time',
    techname: 'YSCM_CT_PROC_LEAD_TIME',
  }

  const topSuppliers = {
    title: 'Top Suppliers',
    techname: 'YSCM_CT_PROC_TOP',
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

  return (
    <div
      className="wrapper zeroPaddingLeft"
      style={{ '--cursor-state': `${cursorState}` }}
    >
      <KPIBarConfigurable category="PR" pageNo={2} />
      <div className={styles.procurementContainer}>
        <div className={styles.smallColumn}>
          <Block style={{ borderBottomLeftRadius: '0', borderTopLeftRadius: '0' }}>
            {/* <Alerts hanaExperimental={true} query={alertsQry} /> */}
            <ConfigurableAlert
              layout="grid"
              visualType="box"
              pageNo="page2"
              category="PR"
            >
              <img
                className={alertIcon}
                src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/white-alert.svg`}
                alt="alert sticker"
              />
            </ConfigurableAlert>
          </Block>
        </div>
        <div className={styles.bigColumnRss}>
          <Block style={{ overflow: 'hidden' }}>
            <Block title="" transparent={true}>
              <RSSFeeds2 />
              <div className={styles.mapAreaForRss}>
                <div className={styles.map}>
                  <MapComp
                    spendType={selectedSpendType}
                    theme={curPalette}
                    query={mapQuery}
                  />
                </div>
                <div className={styles.totalSpend}>
                  <TotalSpend
                    theme={curPalette}
                    onSpendTypeChange={(spendType) =>
                      setSelectedSpendType(spendType)
                    }
                    query={[
                      totalSpendQry,
                      totalSrvSpendQry,
                      totalMatSpendQry,
                      priceIndexQry,
                      pressureIndexQry,
                    ]}
                  />
                </div>
              </div>
            </Block>
          </Block>
        </div>
      </div>
    </div>
  )
}
