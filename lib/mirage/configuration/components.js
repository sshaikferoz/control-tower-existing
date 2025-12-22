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
const componentConfigurations = () => {
  const values = randomValues()
  return `
{
    "d": {
        "results": [
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Overviews('0001')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Overviews('0001')",
                    "type": "ZSCM_CT_CONFIG_SRV.Overview"
                },
                "OverviewId": "0001",
                "ComponentKey": "UpcomingPO",
                "Title": "Upcoming POs",
                "Description": "",
                "ChartType": "Bar",
                "ChartTypeText": "Bar",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YPDO_CT_INV_UPCOM_PO",
                "Uom": "",
                "IsCurrencyFormat": true,
                "IsGeneric": false,
                "DecimalDigits": "1",
                "Category": "IN",
                "CategoryText": "Inventory",
                "ChangedBy": "SID_BWSCM_01",
                "ChangedOn": "/Date(1679270400000)/",
                "ChangedAt": "PT12H39M47S",
                "ShowOnCT": true,
                "OrderOnCT": "01",
                "PageNo": "00",
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-1ad9-1edd-b1e0-604a69cc7851')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-1ad9-1edd-b1e0-604a69cc7851')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-1ad9-1edd-b1e0-604a69cc7851",
                            "ParentId": "0001",
                            "ComponentCategory": "O",
                            "Title": "Upcoming POs",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YPDO_CT_INV_UPCOM_PO_DTL",
                            "AggregationType": "avg",
                            "PopupPosition": "center",
                            "Trend": true,
                            "ChartType": "",
                            "ChartTypeText": ""
                        }
                    ]
                }
            },
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Overviews('0002')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Overviews('0002')",
                    "type": "ZSCM_CT_CONFIG_SRV.Overview"
                },
                "OverviewId": "0002",
                "ComponentKey": "InventoryValueFigure",
                "Title": "Inventory Value",
                "Description": "",
                "ChartType": "Bar",
                "ChartTypeText": "Bar",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YIMO_INVENTORY_LEVEL_SCCT",
                "Uom": "",
                "IsCurrencyFormat": false,
                "IsGeneric": false,
                "DecimalDigits": "0",
                "Category": "IN",
                "CategoryText": "Inventory",
                "ChangedBy": "SID_BWSCM_01",
                "ChangedOn": "/Date(1679270400000)/",
                "ChangedAt": "PT12H41M34S",
                "ShowOnCT": true,
                "OrderOnCT": "02",
                "PageNo": "00",
                "Level2Nav": {
                    "results": []
                }
            },
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Overviews('0003')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Overviews('0003')",
                    "type": "ZSCM_CT_CONFIG_SRV.Overview"
                },
                "OverviewId": "0003",
                "ComponentKey": "OutsourcedInventory",
                "Title": "Outsourced Inventory ($MM)",
                "Description": "",
                "ChartType": "Bar",
                "ChartTypeText": "Bar",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YSCM_CT_PROC_OSS",
                "Uom": "",
                "IsCurrencyFormat": false,
                "IsGeneric": false,
                "DecimalDigits": "0",
                "Category": "IN",
                "CategoryText": "Inventory",
                "ChangedBy": "SID_BWSCM_01",
                "ChangedOn": "/Date(1679788800000)/",
                "ChangedAt": "PT13H10M54S",
                "ShowOnCT": true,
                "OrderOnCT": "03",
                "PageNo": "00",
                "Level2Nav": {
                    "results": []
                }
            },
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Overviews('0004')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Overviews('0004')",
                    "type": "ZSCM_CT_CONFIG_SRV.Overview"
                },
                "OverviewId": "0004",
                "ComponentKey": "LostOpportunity",
                "Title": "Lost Opportunity ($MM)",
                "Description": "",
                "ChartType": "Bar",
                "ChartTypeText": "Bar",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YSCM_CT_LOSTOPP",
                "Uom": "",
                "IsCurrencyFormat": true,
                "IsGeneric": false,
                "DecimalDigits": "0",
                "Category": "PR",
                "CategoryText": "Procurment",
                "ChangedBy": "SID_BWSCM_01",
                "ChangedOn": "/Date(1679270400000)/",
                "ChangedAt": "PT13H54M49S",
                "ShowOnCT": true,
                "OrderOnCT": "01",
                "PageNo": "01",
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-c13e-1eed-b1e0-bb32fec22a34')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-c13e-1eed-b1e0-bb32fec22a34')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-c13e-1eed-b1e0-bb32fec22a34",
                            "ParentId": "0004",
                            "ComponentCategory": "O",
                            "Title": "Lost Opportunity",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_CT_LOSTOPP_DTL",
                            "AggregationType": "avg",
                            "PopupPosition": "center",
                            "Trend": true,
                            "ChartType": "",
                            "ChartTypeText": ""
                        }
                    ]
                }
            },
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Overviews('0005')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Overviews('0005')",
                    "type": "ZSCM_CT_CONFIG_SRV.Overview"
                },
                "OverviewId": "0005",
                "ComponentKey": "TestAndInspection",
                "Title": "TEST & INSPECTION ( T&I )",
                "Description": "",
                "ChartType": "Bar",
                "ChartTypeText": "Bar",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YPDO_CT_INV_UPCOM_PO_DTL",
                "Uom": "",
                "IsCurrencyFormat": false,
                "IsGeneric": false,
                "DecimalDigits": "0",
                "Category": "IN",
                "CategoryText": "Inventory",
                "ChangedBy": "SID_BWSCM_01",
                "ChangedOn": "/Date(1683763200000)/",
                "ChangedAt": "PT08H10M07S",
                "ShowOnCT": true,
                "OrderOnCT": "04",
                "PageNo": "00",
                "Level2Nav": {
                    "results": []
                }
            },
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Overviews('0006')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Overviews('0006')",
                    "type": "ZSCM_CT_CONFIG_SRV.Overview"
                },
                "OverviewId": "0006",
                "ComponentKey": "InventoryTrendChart",
                "Title": "Inventory Trend",
                "Description": "",
                "ChartType": "Bar",
                "ChartTypeText": "Bar",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YSCM_INVENTORY_PRED_01",
                "Uom": "",
                "IsCurrencyFormat": false,
                "IsGeneric": false,
                "DecimalDigits": "0",
                "Category": "IN",
                "CategoryText": "Inventory",
                "ChangedBy": "SID_BWSCM_01",
                "ChangedOn": "/Date(1697587200000)/",
                "ChangedAt": "PT12H21M18S",
                "ShowOnCT": true,
                "OrderOnCT": "01",
                "PageNo": "00",
                "Level2Nav": {
                    "results": []
                }
            },
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Overviews('0007')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Overviews('0007')",
                    "type": "ZSCM_CT_CONFIG_SRV.Overview"
                },
                "OverviewId": "0007",
                "ComponentKey": "Iktva",
                "Title": "Iktva",
                "Description": "",
                "ChartType": "Bar",
                "ChartTypeText": "Bar",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YSCM_SCCT_PROC_IKTIVA",
                "Uom": "",
                "IsCurrencyFormat": false,
                "IsGeneric": false,
                "DecimalDigits": "0",
                "Category": "PR",
                "CategoryText": "Procurment",
                "ChangedBy": "SID_BWSRV_01",
                "ChangedOn": "/Date(1719705600000)/",
                "ChangedAt": "PT11H03M18S",
                "ShowOnCT": true,
                "OrderOnCT": "01",
                "PageNo": "00",
                "Level2Nav": {
                    "results": []
                }
            },
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Overviews('0008')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Overviews('0008')",
                    "type": "ZSCM_CT_CONFIG_SRV.Overview"
                },
                "OverviewId": "0008",
                "ComponentKey": "ShippingPriceIndex",
                "Title": "Shipping Price Index",
                "Description": "",
                "ChartType": "Bar",
                "ChartTypeText": "Bar",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YSCM_SCCT_SH_INDEX_01",
                "Uom": "",
                "IsCurrencyFormat": false,
                "IsGeneric": false,
                "DecimalDigits": "2",
                "Category": "LG",
                "CategoryText": "Warehouse & Logistics",
                "ChangedBy": "SID_BWSRV_01",
                "ChangedOn": "/Date(1721260800000)/",
                "ChangedAt": "PT10H35M39S",
                "ShowOnCT": true,
                "OrderOnCT": "02",
                "PageNo": "00",
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-4e32-1eef-90ba-75969389c42f')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-4e32-1eef-90ba-75969389c42f')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-4e32-1eef-90ba-75969389c42f",
                            "ParentId": "0008",
                            "ComponentCategory": "O",
                            "Title": "Air Freight Index ($/KG)",
                            "Vistype": "",
                            "Crossfade": true,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_PSCCT_AIRFREIGHT",
                            "AggregationType": "avg",
                            "PopupPosition": "center",
                            "Trend": false,
                            "ChartType": "",
                            "ChartTypeText": ""
                        },
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-b002-1eef-90ba-76565474842f')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-b002-1eef-90ba-76565474842f')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-b002-1eef-90ba-76565474842f",
                            "ParentId": "0008",
                            "ComponentCategory": "O",
                            "Title": "Air Freight Index ($/KG)",
                            "Vistype": "",
                            "Crossfade": true,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_PSCCT_AIRFREIGHT",
                            "AggregationType": "avg",
                            "PopupPosition": "center",
                            "Trend": false,
                            "ChartType": "",
                            "ChartTypeText": ""
                        }
                    ]
                }
            }
        ]
    }
}




`
}

export { componentConfigurations }
