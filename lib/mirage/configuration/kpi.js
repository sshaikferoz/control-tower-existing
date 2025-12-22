function randomValues() {
  let values = [
    0,
    0,
    0,
    0,
  ]
  values[0] = Number(Math.random() * 100).toFixed(0)
  values[1] = Number(Math.random() * 100).toFixed(0)
  values[2] = Number(Math.random() * 100).toFixed(0)
  values[3] = Number(Math.random() * 100).toFixed(0)
  return values
}
const kpiConfigurations = () => {
  const values = randomValues()
  return `
{
  "d": {
    "results": [
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0006')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0006')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0006",
        "Title": "Test Manual Input",
        "Description": "",
        "Source": "M",
        "SourceText": "",
        "TechnicalName": "",
        "Value": "9.1E1",
        "ManualValue": "91",
        "Target": "94",
        "Uom": "%",
        "Category": "IN",
        "CategoryText": "",
        "PageNo": "01",
        "Inversed": false,
        "ShowOnCT": false,
        "OrderOnCT": "00",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "ALSAHA0L",
        "ChangedOn": "/Date(1644796800000)/",
        "ChangedAt": "PT11H28M04S",
        "Level2Nav": { "results": [] }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0007')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0007')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0007",
        "Title": "Test Inversed Manual",
        "Description": "",
        "Source": "M",
        "SourceText": "",
        "TechnicalName": "",
        "Value": "8.8E1",
        "ManualValue": "88",
        "Target": "120",
        "Uom": "days",
        "Category": "PR",
        "CategoryText": "",
        "PageNo": "01",
        "Inversed": true,
        "ShowOnCT": false,
        "OrderOnCT": "00",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "ALSAHA0L",
        "ChangedOn": "/Date(1644796800000)/",
        "ChangedAt": "PT11H28M43S",
        "Level2Nav": { "results": [] }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0001')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0001')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0001",
        "Title": "TEST MODIFY",
        "Description": "",
        "Source": "B",
        "SourceText": "",
        "TechnicalName": "YPDO_CT_LOST_OPR_SUM",
        "Value": "2.3E8",
        "ManualValue": "",
        "Target": "89",
        "Uom": "%",
        "Category": "LG",
        "CategoryText": "",
        "PageNo": "01",
        "Inversed": false,
        "ShowOnCT": false,
        "OrderOnCT": "00",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "ALSAHA0L",
        "ChangedOn": "/Date(1644796800000)/",
        "ChangedAt": "PT11H34M08S",
        "Level2Nav": { "results": [] }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0019')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0019')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0019",
        "Title": "Buyer OTD %",
        "Description": "",
        "Source": "M",
        "SourceText": "",
        "TechnicalName": "",
        "Value": "9.1E1",
        "ManualValue": "91",
        "Target": "97",
        "Uom": "%",
        "Category": "PR",
        "CategoryText": "",
        "PageNo": "01",
        "Inversed": true,
        "ShowOnCT": true,
        "OrderOnCT": "01",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "ALTHBA0A",
        "ChangedOn": "/Date(1654646400000)/",
        "ChangedAt": "PT08H55M09S",
        "Level2Nav": {
          "results": [
            {
              "__metadata": {
                "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID5k')",
                "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID5k')",
                "type": "ZSCM_CT_CONFIG_SRV.DataSource"
              },
              "SourceId": "sID9k",
              "CompId": "0019",
              "CompCategory": "kpi",
              "Title": "Buyer OTD",
              "Vistype": "",
              "Crossfade": false,
              "Source": "M",
              "SourceText": "",
              "TechnicalName": "YPDO_CT_PROC_OTD_BUYER_DTL",
              "DrillDown": true,
              "Trend": false,
              "PopupAt": "middle-right"
            }
          ]
        }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0005')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0005')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0005",
        "Title": "IQR MRO",
        "Description": "",
        "Source": "M",
        "SourceText": "",
        "TechnicalName": "",
        "Value": "4.3E1",
        "ManualValue": "43",
        "Target": "44",
        "Uom": "%",
        "Category": "IN",
        "CategoryText": "",
        "PageNo": "01",
        "Inversed": false,
        "ShowOnCT": true,
        "OrderOnCT": "03",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "MIRAJSM",
        "ChangedOn": "/Date(1653264000000)/",
        "ChangedAt": "PT11H57M23S",
        "Level2Nav": {
          "results": [
            {
              "__metadata": {
                "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID5k')",
                "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID5k')",
                "type": "ZSCM_CT_CONFIG_SRV.DataSource"
              },
              "SourceId": "sID5k",
              "CompId": "0005",
              "CompCategory": "kpi",
              "Title": "IQR MRO",
              "Vistype": "",
              "Crossfade": false,
              "Source": "M",
              "SourceText": "",
              "TechnicalName": "YIMO_CT_INV_IQR_MRO_DTL",
              "DrillDown": false,
              "Trend": true
            }
          ]
        }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0014')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0014')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0014",
        "Title": "Drilling Forecast Error",
        "Description": "",
        "Source": "B",
        "SourceText": "",
        "TechnicalName": "YSCM_KPI_TEST",
        "Value": "7.5735E4",
        "ManualValue": "",
        "Target": "22",
        "Uom": "%",
        "Category": "PR",
        "CategoryText": "",
        "PageNo": "02",
        "Inversed": true,
        "ShowOnCT": false,
        "OrderOnCT": "00",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "ALTHBA0A",
        "ChangedOn": "/Date(1654646400000)/",
        "ChangedAt": "PT08H54M00S",
        "Level2Nav": {
          "results": [
            {
              "__metadata": {
                "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID6k')",
                "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID6k')",
                "type": "ZSCM_CT_CONFIG_SRV.DataSource"
              },
              "SourceId": "sID6k",
              "CompId": "0014",
              "CompCategory": "kpi",
              "Title": "Drilling Forecast Error",
              "Vistype": "",
              "Crossfade": false,
              "Source": "B",
              "SourceText": "",
              "TechnicalName": "YSCM_CT_TREND_BLOCK_INVENT",
              "DrillDown": false,
              "Trend": true,
              "PopupAt": "middle-left"
            }
          ]
        }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0013')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0013')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0013",
        "Title": "Project Forecast Error",
        "Description": "",
        "Source": "M",
        "SourceText": "",
        "TechnicalName": "",
        "Value": "5.3E1",
        "ManualValue": "53",
        "Target": "43",
        "Uom": "%",
        "Category": "IN",
        "CategoryText": "",
        "PageNo": "01",
        "Inversed": true,
        "ShowOnCT": true,
        "OrderOnCT": "04",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "MIRAJSM",
        "ChangedOn": "/Date(1653264000000)/",
        "ChangedAt": "PT11H02M20S",
        "Level2Nav": {
          "results": [
            {
              "__metadata": {
                "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID7k')",
                "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID7k')",
                "type": "ZSCM_CT_CONFIG_SRV.DataSource"
              },
              "SourceId": "sID7k",
              "CompId": "0013",
              "CompCategory": "kpi",
              "Title": "Project Forecast Error",
              "Vistype": "",
              "Crossfade": false,
              "Source": "M",
              "SourceText": "",
              "TechnicalName": "YIMO_CT_INV_ERROR_PROJECT_DTL",
              "DrillDown": false,
              "Trend": true
            }
          ]
        }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0015')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0015')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0015",
        "Title": "WareHouse OTD",
        "Description": "",
        "Source": "M",
        "SourceText": "",
        "TechnicalName": "",
        "Value": "9.9E1",
        "ManualValue": "99",
        "Target": "99",
        "Uom": "%",
        "Category": "LG",
        "DecimalDigits":"2",
        "CategoryText": "",
        "PageNo": "01",
        "Inversed": false,
        "ShowOnCT": true,
        "OrderOnCT": "01",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "MIRAJSM",
        "ChangedOn": "/Date(1653264000000)/",
        "ChangedAt": "PT12H10M24S",
        "Level2Nav": {
          "results": [
            {
              "__metadata": {
                "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID8k')",
                "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID8k')",
                "type": "ZSCM_CT_CONFIG_SRV.DataSource"
              },
              "SourceId": "sID8k",
              "CompId": "0015",
              "CompCategory": "kpi",
              "Title": "WareHouse OTD",
              "Vistype": "bar",
              "Crossfade": false,
              "Source": "M",
              "SourceText": "",
              "TechnicalName": "YWHO_OTD_WH_DETAIL_DTL_TRD",
              "DrillDown": false,
              "Trend": true,
              "PopupAt": "middle-right"
            }
          ]
        }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0016')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0016')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0016",
        "Title": "Logistics OTD",
        "Description": "",
        "Source": "M",
        "SourceText": "",
        "TechnicalName": "",
        "Value": "9.8E1",
        "ManualValue": "98",
        "Target": "95",
        "Uom": "%",
        "Category": "LG",
        "CategoryText": "",
        "PageNo": "01",
        "Inversed": false,
        "ShowOnCT": true,
        "OrderOnCT": "02",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "MIRAJSM",
        "ChangedOn": "/Date(1653264000000)/",
        "ChangedAt": "PT12H11M04S",
        "Level2Nav": {
          "results": [
            {
              "__metadata": {
                "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID9k')",
                "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID9k')",
                "type": "ZSCM_CT_CONFIG_SRV.DataSource"
              },
              "SourceId": "sID9k",
              "CompId": "0016",
              "CompCategory": "kpi",
              "Title": "Logistics OTD",
              "Vistype": "bar",
              "Crossfade": false,
              "Source": "M",
              "SourceText": "",
              "TechnicalName": "YSCM_LGO_OTD_WH_DETAIL_DRL",
              "DrillDown": false,
              "Trend": false,
              "PopupAt": "middle-right"
            }
          ]
        }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0018')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0018')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0018",
        "Title": "Supplier OTD",
        "Description": "",
        "Source": "M",
        "SourceText": "",
        "TechnicalName": "",
        "Value": "8E1",
        "ManualValue": "80",
        "Target": "88",
        "Uom": "%",
        "Category": "PR",
        "CategoryText": "",
        "PageNo": "01",
        "Inversed": false,
        "ShowOnCT": true,
        "OrderOnCT": "02",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "MIRAJSM",
        "ChangedOn": "/Date(1653264000000)/",
        "ChangedAt": "PT12H18M30S",
        "Level2Nav": {
          "results": [
            {
              "__metadata": {
                "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID5k')",
                "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID5k')",
                "type": "ZSCM_CT_CONFIG_SRV.DataSource"
              },
              "SourceId": "sID20k",
              "CompId": "0019",
              "ComponentCategory": "K",
              "Title": "Supplier OTD Forecast",
              "Vistype": "",
              "Crossfade": false,
              "Source": "M",
              "SourceText": "",
              "TechnicalName": "YSCM_SOTD_PRED__TEST",
              "Trend":false,
              "ChartType":"P",
              "PopupAt": "middle-right"
            },
            {
              "__metadata": {
                "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID10k')",
                "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID10k')",
                "type": "ZSCM_CT_CONFIG_SRV.DataSource"
              },
              "SourceId": "sID10k",
              "CompId": "0018",
              "CompCategory": "kpi",
              "Title": "Supplier OTD",
              "Vistype": "",
              "Crossfade": false,
              "Source": "M",
              "SourceText": "",
              "TechnicalName": "YPDO_OTD_SUPPLIER_DETAIL_TRD",
              "AggregationType":"avg",
              "DrillDown": false,
              "Trend": false,
              "PopupAt": "middle-right"
            }
          ]
        }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0003')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0003')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0003",
        "Title": "IQR Drilling",
        "Description": "",
        "Source": "B",
        "SourceText": "",
        "TechnicalName": "YSCM_KPI_TEST",
        "Value": "7.5735E1",
        "ManualValue": "",
        "Target": "93",
        "Uom": "%",
        "Category": "IN",
        "CategoryText": "",
        "PageNo": "01",
        "Inversed": false,
        "ShowOnCT": true,
        "OrderOnCT": "01",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "MIRAJSM",
        "ChangedOn": "/Date(1669680000000)/",
        "ChangedAt": "PT08H35M11S",
        "Level2Nav": {
          "results": [
            {
              "__metadata": {
                "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID11k')",
                "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID11k')",
                "type": "ZSCM_CT_CONFIG_SRV.DataSource"
              },
              "SourceId": "sID11k",
              "CompId": "0003",
              "CompCategory": "kpi",
              "Title": "IQR Drilling",
              "Vistype": "",
              "Crossfade": false,
              "Source": "B",
              "SourceText": "",
              "TechnicalName": "YIMO_CT_INV_IQR_DRL_DTL",
              "DrillDown": false,
              "Trend": true
            }
          ]
        }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0023')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0023')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0023",
        "Title": "test",
        "Description": "",
        "Source": "B",
        "SourceText": "",
        "TechnicalName": "YPDO_CT_SUP_OTD_KPI",
        "Value": "6.9E8",
        "ManualValue": "",
        "Target": "12",
        "Uom": "",
        "Category": "IN",
        "CategoryText": "",
        "PageNo": "01",
        "Inversed": true,
        "ShowOnCT": false,
        "OrderOnCT": "00",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "T_BICT",
        "ChangedOn": "/Date(1665532800000)/",
        "ChangedAt": "PT12H07M58S",
        "Level2Nav": { "results": [] }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0012')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0012')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0012",
        "Title": "IQR Project",
        "Description": "",
        "Source": "M",
        "SourceText": "",
        "TechnicalName": "",
        "Value": "4E1",
        "ManualValue": "40",
        "Target": "30",
        "Uom": "days",
        "Category": "IN",
        "CategoryText": "",
        "PageNo": "01",
        "Inversed": true,
        "ShowOnCT": true,
        "OrderOnCT": "02",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "MIRAJSM",
        "ChangedOn": "/Date(1669680000000)/",
        "ChangedAt": "PT08H36M34S",
        "Level2Nav": {
          "results": [
            {
              "__metadata": {
                "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID13k')",
                "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID13k')",
                "type": "ZSCM_CT_CONFIG_SRV.DataSource"
              },
              "SourceId": "sID13k",
              "CompId": "0012",
              "CompCategory": "kpi",
              "Title": "IQR Project",
              "Vistype": "",
              "Crossfade": false,
              "Source": "M",
              "SourceText": "",
              "TechnicalName": "YIMO_CT_INV_IQR_PROJ_DTL",
              "DrillDown": false,
              "Trend": true
            }
          ]
        }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0010')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0010')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0010",
        "Title": "Drilling Forecast Error KPI",
        "Description": "",
        "Source": "M",
        "SourceText": "",
        "TechnicalName": "",
        "Value": "1E1",
        "ManualValue": "10",
        "Target": "30",
        "Uom": "%",
        "Category": "IN",
        "CategoryText": "",
        "PageNo": "01",
        "Inversed": true,
        "ShowOnCT": true,
        "OrderOnCT": "05",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "MIRAJSM",
        "ChangedOn": "/Date(1669680000000)/",
        "ChangedAt": "PT08H45M33S",
        "Level2Nav": {
          "results": [
            {
              "__metadata": {
                "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID14k')",
                "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID14k')",
                "type": "ZSCM_CT_CONFIG_SRV.DataSource"
              },
              "SourceId": "sID14k",
              "CompId": "0010",
              "CompCategory": "kpi",
              "Title": "Drilling Forecast Error KPI",
              "Vistype": "",
              "Crossfade": false,
              "Source": "M",
              "SourceText": "",
              "TechnicalName": "YIMO_CT_INV_ERROR_DRILLING_DTL",
              "DrillDown": false,
              "Trend": true
            }
          ]
        }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0020')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0020')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0020",
        "Title": "Operation Proc. Time",
        "Description": "",
        "Source": "M",
        "SourceText": "",
        "TechnicalName": "",
        "Value": "9.9E1",
        "ManualValue": "99",
        "Target": "102",
        "Uom": "days",
        "Category": "PR",
        "CategoryText": "",
        "PageNo": "02",
        "Inversed": true,
        "ShowOnCT": true,
        "OrderOnCT": "01",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "MIRAJSM",
        "ChangedOn": "/Date(1669680000000)/",
        "ChangedAt": "PT08H52M04S",
        "Level2Nav": {
          "results": [
            {
              "__metadata": {
                "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID15k')",
                "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID15k')",
                "type": "ZSCM_CT_CONFIG_SRV.DataSource"
              },
              "SourceId": "sID15k",
              "CompId": "0020",
              "CompCategory": "kpi",
              "Title": "Operation Proc. Time",
              "Vistype": "",
              "Crossfade": false,
              "Source": "M",
              "SourceText": "",
              "TechnicalName": "YCDPLN_CT_PROC_CONTR_TIME_DTL",
              "DrillDown": false,
              "Trend": true,
              "PopupAt": "middle-left"
            }
          ]
        }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0009')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0009')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0009",
        "Title": "Spend under management KPI",
        "Description": "",
        "Source": "M",
        "SourceText": "",
        "TechnicalName": "",
        "Value": "9.5E1",
        "ManualValue": "95",
        "Target": "94",
        "Uom": "%",
        "Category": "PR",
        "CategoryText": "",
        "PageNo": "02",
        "Inversed": false,
        "ShowOnCT": true,
        "OrderOnCT": "02",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "MIRAJSM",
        "ChangedOn": "/Date(1669680000000)/",
        "ChangedAt": "PT08H53M06S",
        "Level2Nav": {
          "results": [
            {
              "__metadata": {
                "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID16k')",
                "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID16k')",
                "type": "ZSCM_CT_CONFIG_SRV.DataSource"
              },
              "SourceId": "sID16k",
              "CompId": "0009",
              "CompCategory": "kpi",
              "Title": "Spend under management KPI",
              "Vistype": "bar",
              "Crossfade": false,
              "Source": "M",
              "SourceText": "",
              "TechnicalName": "YPDO_BP_PLAHIST_NEW_DTL",
              "DrillDown": false,
              "Trend": false,
              "PopupAt": "middle-left"
            }
          ]
        }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0011')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0011')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0011",
        "Title": "Project Proc. Time",
        "Description": "",
        "Source": "B",
        "SourceText": "",
        "TechnicalName": "YPDO_CT_SUP_OTD_KPI",
        "Value": "6.9E8",
        "ManualValue": "",
        "Target": "900000",
        "Uom": "OTD",
        "Category": "PR",
        "CategoryText": "",
        "PageNo": "02",
        "Inversed": true,
        "ShowOnCT": false,
        "OrderOnCT": "00",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "T_BICT",
        "ChangedOn": "/Date(1665532800000)/",
        "ChangedAt": "PT12H08M57S",
        "Level2Nav": {
          "results": [
            {
              "__metadata": {
                "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID17k')",
                "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID17k')",
                "type": "ZSCM_CT_CONFIG_SRV.DataSource"
              },
              "SourceId": "sID17k",
              "CompId": "0011",
              "CompCategory": "kpi",
              "Title": "Project Proc. Time",
              "Vistype": "",
              "Crossfade": false,
              "Source": "B",
              "SourceText": "",
              "TechnicalName": "YCDPLN_CT_PROC_PROJ_TIME_DTL",
              "DrillDown": false,
              "Trend": false,
              "PopupAt": "middle-left"
            }
          ]
        }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0008')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0008')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0008",
        "Title": "IKTVA Score",
        "Description": "",
        "Source": "M",
        "SourceText": "",
        "TechnicalName": "",
        "Value": "9E1",
        "ManualValue": "90",
        "Target": "90",
        "Uom": "%",
        "Category": "PR",
        "CategoryText": "",
        "PageNo": "02",
        "Inversed": false,
        "ShowOnCT": true,
        "OrderOnCT": "03",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "MIRAJSM",
        "ChangedOn": "/Date(1669680000000)/",
        "ChangedAt": "PT08H55M24S",
        "Level2Nav": { "results": [] }
      },
      {
        "__metadata": {
          "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0017')",
          "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/KPIs('0017')",
          "type": "ZSCM_CT_CONFIG_SRV.KPI"
        },
        "KPIId": "0017",
        "Title": "Project Proc. Time",
        "Description": "",
        "Source": "M",
        "SourceText": "",
        "TechnicalName": "",
        "Value": "1.31E2",
        "ManualValue": "131",
        "Target": "136",
        "Uom": "days",
        "Category": "PR",
        "CategoryText": "",
        "PageNo": "01",
        "Inversed": true,
        "ShowOnCT": true,
        "OrderOnCT": "03",
        "ShowOnApp": false,
        "OrderOnApp": "00",
        "ChangedBy": "MIRAJSM",
        "ChangedOn": "/Date(1669680000000)/",
        "ChangedAt": "PT08H56M49S",
        "Level2Nav": {
          "results": [
            {
              "__metadata": {
                "id": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID19k')",
                "uri": "https://DVB.ARAMCO.COM.SA:44303/sap/opu/odata/sap/zscm_ct_config_srv/DataSources('sID19k')",
                "type": "ZSCM_CT_CONFIG_SRV.DataSource"
              },
              "SourceId": "sID19k",
              "CompId": "0017",
              "CompCategory": "kpi",
              "Title": "Project Proc. Time",
              "Vistype": "",
              "Crossfade": false,
              "Source": "M",
              "SourceText": "",
              "TechnicalName": "YCDPLN_CT_PROC_PROJ_TIME_DTL",
              "DrillDown": false,
              "Trend": false,
              "PopupAt": "middle-right"
            }
          ]
        }
      }
    ]
  }
}

  `
}

export { kpiConfigurations }
