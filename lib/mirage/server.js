//@ts-check
import { createServer, Response } from 'miragejs'
import { logisticsAlerts } from './configuration/alert'
import { componentConfigurations } from './configuration/components'
import { newsFeedsConfigurations } from './configuration/newsfeeds'
import { kpiConfigurations } from './configuration/kpi'
import inventoryQueries from './queries/inventory'
import logisticsQueries from './queries/logistics'
import procurementQueries from './queries/procurement'
import otherQueries from './queries/otherQueries'
let startValue = 995
let startValue2 = 995
let startValue3 = 0
let startValue4 = 995
let startValue5 = 995
let startValue6 = 995
let pastValue = startValue
let pastValue2 = startValue2
let pastValue3 = startValue3
let pastValue4 = startValue4
let pastValue5 = startValue4
let pastValue6 = startValue4
const RANDOM_FACTOR = 0.29
const createMirageServer = () => {
  const server = createServer({
    routes() {
      // this.passthrough('/_next/static/development/_devPagesManifest.json')
      // this.passthrough('https://hana05dr1n1:4300/**')
      // this.passthrough('https://arcgisportal.aramco.com.sa/**')
      // this.passthrough('https://server.arcgisonline.com/**')
      // this.passthrough('https://arcservermaps.aramco.com.sa:6443/**')
      this.urlPrefix = '/sap/'
      this.get(
        'https://prwhana.aramco.com.sa:4300/Supply_Chain/Real_Time/Data_Sources/HOT_TAXI_WO_POD.xsjs',
        (_, req) => {
          let newStartValue = startValue + 1 + parseInt(Number(Math.random() * 2))
          startValue = Math.random() > RANDOM_FACTOR ? pastValue : newStartValue
          pastValue = startValue
          return new Response(
            200,
            { 'content-type': 'application/json' },
            `[{"COUNTER":${startValue}}]`
          )
        }
      )
      this.get(
        'https://prwhana.aramco.com.sa:4300/Supply_Chain/Real_Time/Data_Sources/FCN_WH_ITEMS.xsjs',
        (_, req) => {
          let newStartValue = startValue2 + 1 + parseInt(Number(Math.random() * 2))
          startValue2 = Math.random() > RANDOM_FACTOR ? pastValue2 : newStartValue
          pastValue2 = startValue2
          return new Response(
            200,
            { 'content-type': 'application/json' },
            `[{"COUNTER":${66 || startValue2}}]`
          )
        }
      )
      this.get(
        'https://prwhana.aramco.com.sa:4300/Supply_Chain/Real_Time/Data_Sources/SHLF_LIFE_6MO.xsjs',
        (_, req) => {
          let newStartValue = startValue4 + 1 + parseInt(Number(Math.random() * 2))
          startValue4 = Math.random() > RANDOM_FACTOR ? pastValue4 : newStartValue
          pastValue4 = startValue4
          return new Response(
            200,
            { 'content-type': 'application/json' },
            `[{"COUNTER":${startValue4}}]`
          )
        }
      )
      this.get(
        'https://prwhana.aramco.com.sa:4300/Supply_Chain/Real_Time/Data_Sources/EMRG_TO_WO_ASN.xsjs',
        async (_, req) => {
          let decrease = 0 //Math.random() > 0.44 ? -1 : 1
          let newStartValue =
            startValue3 +
            1 * decrease +
            parseInt(Number(Math.random() * 2)) * decrease
          startValue3 = pastValue3 //Math.random() > RANDOM_FACTOR ? pastValue3 : newStartValue
          pastValue3 = startValue3
          const randomeDelay = Number(Math.random() * 10000).toFixed()
          await new Promise((r) => setTimeout(r, parseInt(randomeDelay)))
          return new Response(
            200,
            { 'content-type': 'application/json' },
            `[{"CONTER":${startValue3}}]`
          )
        }
      )
      this.get(
        'https://prwhana.aramco.com.sa:4300/Supply_Chain/Real_Time/Data_Sources/UNCONFIRMED_TOS.xsjs',
        (_, req) => {
          let decrease = Math.random() > 0.44 ? -1 : 1
          let newStartValue =
            startValue6 +
            1 * decrease +
            parseInt(Number(Math.random() * 2)) * decrease
          startValue6 = Math.random() > RANDOM_FACTOR ? pastValue6 : newStartValue
          pastValue6 = startValue6
          return new Response(
            200,
            { 'content-type': 'application/json' },
            `[{"COUNTER":${startValue3}}]`
          )
        }
      )
      //procurement hana calls
      this.get(
        'https://prwhana.aramco.com.sa:4300/Supply_Chain/Real_Time/Data_Sources/EMERGENCY_PR.xsjs',
        (_, req) => {
          let newStartValue = startValue5 + 1 + parseInt(Number(Math.random() * 2))
          startValue5 = Math.random() > RANDOM_FACTOR ? pastValue5 : newStartValue
          pastValue5 = startValue5
          return new Response(
            200,
            { 'content-type': 'application/json' },
            `[{"COUNTER":${startValue5}}]`
          )
        }
      )

      this.get('/bc/bsp/sap/zbw_reporting/execute_report_oo.htm', (_, req) => {
        const { queryParams } = req

        /**
         * @constant
         * @type { keyof inventoryQueries | keyof logisticsQueries | keyof procurementQueries | keyof otherQueries}
         */
        const query = queryParams.query

          switch (query) {
            
              case 'YSCM_ALL_SPEND_PRED_01':
                return new Response(
                  200,
                  { 'content-type': 'text/xml' },
                  procurementQueries[query]
                )
              case 'YSCM_MAT_SPEND_PRED_01':
                return new Response(
                  200,
                  { 'content-type': 'text/xml' },
                  procurementQueries[query]
                )
              case 'YSCM_SRV_SPEND_PRED_01':
                return new Response(
                  200,
                  { 'content-type': 'text/xml' },
                  procurementQueries[query]
                )
          case 'YIMO_INV_ACT_IQR_CRP_TRND_Q001':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YPDO_CT_INV_UPCOM_PO_DTL':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YPDO_CT_INV_UPCOM_PO':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YIMO_CT_INV_TREND':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YIMO_CT_INV_IQR_DSHBRD':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YIMO_CT_INV_IQR':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YCUS_CT_INV_CUST_PORF':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YWHO_CT_INV_ST_ADJS_BLKD':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YIMO_CT_INV_OUT_OF_STOCK':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YIMO_SCCT_POTENTIAL_SLOW':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YCUS_SCCT_INV_OVERDUE':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YWHO_CT_INV_STG_OVERDUE':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YIMO_CT_INV_ERROR_KPI':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YIMO_CT_INV_ERROR_DRILLING_KPI':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YIMO_CT_INV_ERROR_PROJECT_KPI':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YSCM_SC_MANUAL_TARGET':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YIMO_INVENTORY_LEVEL_SCCT':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YWHO_CT_INV_ST_ADJS_BLKD_PR':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YWHO_CT_INV_ORDUE':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YWHO_CT_INV_ST_ADJS_BLKD_M_PLA':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YWHO_CT_INV_ST_ADJS_BLKD_CUST':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YSCM_SCCT_INV_ALERT1':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YSCM_SCCT_INV_ALERT2':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'Y_SCM_CT_ALERT_KPI_TREND_DEMO':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YCUS_SCCT_INV_OVERDUE_DTL':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YIMO_SCCT_POTENTIAL_SLOW_DTL':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'Y_TEST_MAP':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YSCM_INV_PRED':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YSCM_INVENTORY_PRED_01':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YSCM_INV_PRED_1':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YSCM_SOTD_PRED_01':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_SOTD_PRED__TEST':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_INVENTORY_PRED_BAR':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YIMO_CT_INV_OUT_OF_STOCK_DTL1':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YSCM_SCCT_INV_ALERT1_DTL':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YIMO_INV_TRND_DET_SLOW':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YIMO_INV_TRND_NONMOV':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YIMO_INV_TRND_DET_SLOW2':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )
          case 'YIMO_INV_TRND_NONMOV2':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              inventoryQueries[query]
            )

          /**************************** LOGISTICS AND WAREHOUSE ****************************/
          case 'YWHO_CT_WH_WL_SUMM':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YSCM_SC_MANUAL_TARGET':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YSCM_CT_WH_GLD_WORKLOD':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YPDO_CT_LOG_IK_WORKLOD':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YCUS_CT_WH_OTD_SC':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YCUS_CT_LOG_OTD_SUMM':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YSCM_CT_LOG_OPEN_CLM':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YWHO_CT_WH_BLKD_INV':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YWHO_CT_INV_OVER_STOCK_ADJ':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YPDO_SCCT_BULK_DEL_OOK':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YPDO_CT_LOG_PENDNIG_GRS':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YPDO_CT_LOG_PENDNIG_GR_1':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YPDO_CT_LOG_PENDNIGGRS':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )

          case 'YWHE_CT_LOG_UNCONFM_TO':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YSCM_CT_WH_FCN_ITEMS':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YIME_CT_LOG_SHELF_LIFE':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YSCM_CT_LOG_HT_EMER':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YSCM_CT_LOG_HT_EMER_ASN':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YIMO_CT_LOG_RETURN_MATRIAL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YIMO_CT_LOG_SHELF_LIFE':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YPDO_SCCT_BULK_DEL_IK':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YSCM_CT_WH_ALERTS':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YSCM_CT_LOG_TOS_CANCELED':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YWHE_CT_LOG_URG_ASN':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YWHO_CT_INV_OVER_ST_ADJ':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YSCM_CARBON_FPRINT':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YSCM_SCCT_SH_INDEX_01':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )

          case 'YSCM_CT_EXT_ASSIGN_map':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YPDO_SCCT_BULK_DEL_IK_DTL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YSCM_CT_EMP_EXTER_ASSIGNM_01':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YSCM_CT_EMP_EXTER_ASSIGNMENT':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          case 'YIMO_CT_LOG_SHELF_LIFE_DTL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              logisticsQueries[query]
            )
          /**************************** PROCUREMENT ****************************/
          case 'YPDO_CT_PROC_OTD_BUYER':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_CT_PROC_OTD_BUYER_DTL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_CT_PROC_OTD_SUPPLIER':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_CT_PROC_LOCAL_MANUF':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDE_CT_PROC_SPEND_MANGMENT':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCDEXDB_CT_PROC_IKTIVA_KPI':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCDEXDB_CT_PROC_SINGLE_SOURCE':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCDPLN_CT_PROC_PROJ_TIME':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'yscm_scct_sourc_inv':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_SCCT_SOURCING_GAP_BY_CON':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_SCCT_SOURCING_GAP_BY_COM':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )

          case 'YSCM_SCCT_INV_BY_COUNTRY':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )

          case 'YSCM_SCCT_INV_BY_COMMODITY':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCDPLN_CT_PROC_CONTR_TIME':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDE_CT_PROC_CONSUMED_PAS':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCUS_CT_PROC_EMRG_PR':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_CT_PROC_PO_TO_RELEASE':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCDEXDB_CT_PROC_NA_CONTRACT':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCDIK_CT_PROG_INV_PROG_TIME':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDE_CT_PROC_PA_NEAR_EXPIR':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_CT_PROC_OPEN_VER_PO':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_TREND_CON_SCON':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCDEXDB_CT_PROC_CONS_CONT':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_CT_PROC_OD_PO':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCDE_CT_PROC_TIME_ANA':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_TREND_PROC_TIME':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCDEXDB_CT_PROC_PCR':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_TREND_PEN_CON':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCDREP_PEND_COMPL_REVIEW_CT':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_SCCT_PROC_CONTRACTOR':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCUS_PSCCT_EGR_AGED':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_BP_PLAHIST_PSCM_DASHBOARD':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_PROC_SPEND_COUNTRY':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_PROC_SPEND_CON_SRV':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_SCCT_MSPEND_CONT_00':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_SCCT_MSPEND_COM_00':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_SCCT_INDIRECT_COUNTRY':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_PROC_SPEND_COUNTRIES':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_PROC_SPEND_YTD':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_PROC_SPEND_L5Y':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCUS_SCCT_PROC_EGR_TIME':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCDIK_SCCT_PROC_SES_TIME':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCUS_MOB_PROC_EGR_TIME':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_PSCCT_PROC_SES_TIME':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_SCCT_MFR_PROFIL_SPEND_MAP':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_SCCT_PROC_IKTIVA':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCDEXDB_CT_PROC_IKTIVA_VALUE':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCDEXDB_CT_PROC_SINGLE_SLFC':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCDEXDB_CT_PROC_SFCMFC':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_PROC_CT_SNG_MAT':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCDP_CT_PROC_CLAIM':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_CT_PROC_SUMMARY':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDS_SCCT_SPEND_MAT_COM_APD':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_PROC_MATSPEND':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_PROC_SRVSPEND':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_PROC_COST':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_PROC_INVOICE_MONTHLY':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_PROC_LEAD_TIME':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_PROC_TOP':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_PROC_OSS':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_LOSTOPP':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_LOSTOPP_DTL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_CT_LOST_OPR_SUM':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_SCCT_PROC_RPA':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_SCCT_PROC_RPA_01':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_PROC_SS_TREND':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCDP_CT_PROC_CLAIM_TREND':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_SCCT_PRC_PMI':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_PROC_SPEND_BK':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_PROC_SPEND_SBK':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_SCCT_ALERT_TRK_01':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_SCCT_ALERT_TRK_02':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_SCCT_ALERT_TRK_03':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_SCCT_ALERT_TRK_04':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_SCCT_MSPENDT_COM_00':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_SCCT_INDIRECT_COMMODITY':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_PROC_CONTRACT_SPEND':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_SCCT_MFR_PROFILE_01':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_SCCT_MFR_PROFILE_02':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_SCCT_MFR_PROFILE_03':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_SCCT_MFR_PROFILE_04':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_SCCT_MFR_PROFILE_05':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_SCCT_MFR_PROFILE_06':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_SCCT_MFR_PROFILE_07':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_SCCT_MFR_PROFILE_08':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YPDO_SCCT_MFR_PROFILE_09':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YCDIK_CT_PROG_INV_PR_DTL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_GSCPI':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_PSCCT_AIRFREIGHT':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CAPACITY_MNGT':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CM_MAIN':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CM_MAIN1':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_KPI_TEST__1':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )

          case 'YSCM_AOC_MSPEND_CONT_00':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_AOC_MSPEND_COM_00':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_AOC_PROC_SPEND_SBK':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_ASC_MSPEND_CONT_00':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_SPEND_ASMO_COM':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_SPEND_ASMO_CNTR':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_CT_SPEND_ASMO_TOT':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_ASIA_MSPEND_CONT_00':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_ASIA_MSPEND_COM_00':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_ASIA_PROC_SPEND_BK':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_ASIA_PROC_SPEND_SBK':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_ASIA_PROC_SPEND_YTD':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_ASC_MSPEND_COM_00':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_AOC_PROC_SPEND_YTD':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_ASC_PROC_SPEND_BK':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_ASC_PROC_SPEND_YTD':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_OOK_AOCCT_PROC_SPEND_SBK':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_OOK_AOCCT_PROC_SPEND_BK':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_PSCCT_SPENEPM':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_INDRCTSPEND_COUNTRY':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              procurementQueries[query]
            )
          case 'YSCM_OOK_ASCCT_SRCING_GAP_CNRY':
            return new Response(
              200,
              { 'content-type': 'text/xml' },
              procurementQueries[query]
            )
          /**************************** Other Queries ****************************/
          case 'YCUS_ON_HAND_INV_DTL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_SCCT_RSSFEED':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_OVRDU_RSRV':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_INV_STOCK_OUT':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_POTEN_SLOW':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_BLOCK_INVENT':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_RTRND_INV':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_EMER_WO_ASN':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_EMER_WO_POD':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_IK_BULKY':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_OOK_BULKY':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_FCN_WH':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_EXP_SHEL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_UNCONF_TOS':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_PEND_STOCK':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_NON_COMP':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_PO_TO_RELES':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_CONS_CONTRA':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_OPEN_VER_PO':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_OPEN_DEL_REQ':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_EMER_PR':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_PROC_TIME':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_PEND_CONTRA':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_EXPIRY_PAS':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_PEND_SES':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CT_TREND_COMPL_ACT':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YCUS_ON_HAND_INV_DTL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YCUS_ON_HAND_INV_DTL_02':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          // kpis
          case 'YPDO_BP_PLAHIST_NEW_DTL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YCDPLN_CT_PROC_CONTR_TIME_DTL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YCDPLN_CT_PROC_PROJ_TIME_DTL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YPDO_OTD_SUPPLIER_DETAIL_DTL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YPDO_OTD_SUPPLIER_DETAIL_TRD':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_LGO_OTD_WH_DETAIL_DRL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YWHO_OTD_WH_DETAIL_DTL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YWHO_OTD_WH_DETAIL_DTL_TRD':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YIMO_CT_INV_ERROR_DRILLING_DTL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YIMO_CT_INV_ERROR_PROJECT_DTL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YIMO_CT_INV_IQR_MRO_DTL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YIMO_CT_INV_IQR_PROJ_DTL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YIMO_CT_INV_IQR_DRL_DTL':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_KPI_TEST':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YCDCR_LFC_TEXT_MOB':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
          case 'YSCM_CIRCULAR_ECO':
            return new Response(
              200,
              { 'content-typ': 'text/xml' },
              otherQueries[query]
            )
        }
      })

      this.get(
        'http://localhost:3000/sap/opu/odata/sap/zscm_ct_config_srv/KPIs',
        (_, req) => {
          console.log({ requestToKPIConfig: req })
          return new Response(
            200,
            { 'content-type': 'application/json' },
            kpiConfigurations()
          )
        }
      )

      this.get(
        'http://localhost:3000/sap/opu/odata/sap/zscm_ct_config_srv/Alerts',
        (req, res) => {
          return new Response(
            200,
            { 'content-type': 'application/json' },
            logisticsAlerts()
          )
        }
      )
      this.get(
        'http://localhost:3000/sap/opu/odata/sap/zscm_ct_config_srv/Overviews',

        (req, res) => {
          return new Response(
            200,
            { 'content-type': 'application/json' },
            componentConfigurations()
          )
        }
      )
      this.get(
        'http://localhost:3000/sap/opu/odata/sap/zscm_ct_config_srv/Components',
        (req, res) => {
          return new Response(
            200,
            { 'content-type': 'application/json' },
            componentConfigurations()
          )
        }
      )
      this.get(
        'http://localhost:3000/sap/opu/odata/sap/zscm_ct_config_srv/NewsFeedSet',
        (req, res) => {
          return new Response(
            200,
            { 'content-type': 'application/json' },
            newsFeedsConfigurations()
          )
        }
      )
      // this.get(
      //   'file:///sap/opu/odata/sap/zscm_ct_config_srv/Components',
      //   (req, res) => {
      //     return new Response(
      //       200,
      //       { 'content-type': 'application/json' },
      //       componentConfigurations()
      //     )
      //   }
      // )
      // this.get(
      //   '/sap/opu/odata/sap/zscm_ct_config_srv/Components',
      //   (req, res) => {
      //     return new Response(
      //       200,
      //       { 'content-type': 'application/json' },
      //       componentConfigurations()
      //     )
      //   }
      // )
      this.passthrough('https://api.maptiler.com/**')
      this.passthrough('https://dvb.aramco.com.sa:44303/**')
      this.passthrough('http://localhost:3000/procurement-capacity/*')
      this.passthrough()
    },
  })
  return server
}

//small utils
export default createMirageServer
