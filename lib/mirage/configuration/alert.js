
function randomValues() {
  let values = [0, 0, 0, 0]
  values[0] = Number(Math.random() * 100).toFixed(0)
  values[1] = Number(Math.random() * 100).toFixed(0)
  values[2] = Number(Math.random() * 100).toFixed(0)
  values[3] = Number(Math.random() * 100).toFixed(0)
  return values
}
const logisticsAlerts = () => {
  const values = randomValues()
  return `

{
    "d": {
        "results": [
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0027')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0027')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0027",
                "Title": "Consumed Contracts",
                "Description": "",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YCDEXDB_CT_PROC_CONS_CONT",
                "Value": "0",
                "ErrorMessage": "Error: Could not find the OUTPUT node in XML",
                "IsCurrencyFormat": false,
                "DecimalDigits": "0",
                "Uom": "Contract",
                "Category": "PR",
                "CategoryText": "Procurment",
                "PageNo": "01",
                "Criticality": "W",
                "CriticalityText": "Warning",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "04",
                "AutoEmail": false,
                "EmailTo": "",
                "EmailCC": "",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "",
                "Frequency": "D",
                "FrequencyText": "Daily",
                "ChangedBy": "AFALIGNS",
                "ChangedOn": "\/Date(1686700800000)\/",
                "ChangedAt": "PT08H33M59S",
                "Trend": true,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0027')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-112f-1eed-b2a9-704f605df3fa')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-112f-1eed-b2a9-704f605df3fa')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-112f-1eed-b2a9-704f605df3fa",
                            "ParentId": "0027",
                            "ComponentCategory": "A",
                            "Title": "Consumed Contracts",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_CT_TREND_CONS_CONTRA",
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
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0009')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0009')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0009",
                "Title": "IK Upcoming Bulky Delivery",
                "Description": "",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YPDO_SCCT_BULK_DEL_IK",
                "Value": "2.9E1",
                "ErrorMessage": "",
                "IsCurrencyFormat": false,
                "DecimalDigits": "0",
                "Uom": "Item",
                "Category": "LG",
                "CategoryText": "Warehouse & Logistics",
                "PageNo": "01",
                "Criticality": "W",
                "CriticalityText": "Warning",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "03",
                "AutoEmail": false,
                "EmailTo": "thamer.sanounah@aramco.com",
                "EmailCC": "thamer.sanounah@aramco.com",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "",
                "Frequency": "D",
                "FrequencyText": "Daily",
                "ChangedBy": "MASHAA0J",
                "ChangedOn": "\/Date(1719705600000)\/",
                "ChangedAt": "PT08H56M05S",
                "Trend": true,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0009')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-c13e-1eed-b0fb-8e7995e3c91b')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-c13e-1eed-b0fb-8e7995e3c91b')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-c13e-1eed-b0fb-8e7995e3c91b",
                            "ParentId": "0009",
                            "ComponentCategory": "A",
                            "Title": "IK Bulky Trend",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_CT_TREND_IK_BULKY",
                            "AggregationType": "avg",
                            "PopupPosition": "center",
                            "Trend": true,
                            "ChartType": "G",
                            "ChartTypeText": "Generic"
                        }
                    ]
                }
            },
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0002')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0002')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0002",
                "Title": "Inventory Stock Out",
                "Description": "",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YIMO_CT_INV_OUT_OF_STOCK",
                "Value": "2.2559E4",
                "ErrorMessage": "",
                "IsCurrencyFormat": true,
                "DecimalDigits": "0",
                "Uom": "Items",
                "Category": "IN",
                "CategoryText": "Inventory",
                "PageNo": "01",
                "Criticality": "W",
                "CriticalityText": "Warning",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "01",
                "AutoEmail": false,
                "EmailTo": "ali.mashhad.1@aramco.com",
                "EmailCC": "ali.mashhad.1@aramco.com",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "",
                "Frequency": "D",
                "FrequencyText": "Daily",
                "ChangedBy": "SID_BWSCM_01",
                "ChangedOn": "\/Date(1703635200000)\/",
                "ChangedAt": "PT15H38M46S",
                "Trend": true,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0002')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-1ad9-1ede-a996-9c0e6270f5eb')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-1ad9-1ede-a996-9c0e6270f5eb')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-1ad9-1ede-a996-9c0e6270f5eb",
                            "ParentId": "0002",
                            "ComponentCategory": "A",
                            "Title": "Inventory Stock Out",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_CT_TREND_INV_STOCK_OUT",
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
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0010')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0010')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0010",
                "Title": "Returned Inventory",
                "Description": "",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YSCM_RETURNED_INVENTORY_RATE2",
                "Value": "1.1115624383444599E1",
                "ErrorMessage": "",
                "IsCurrencyFormat": false,
                "DecimalDigits": "1",
                "Uom": "%",
                "Category": "IN",
                "CategoryText": "Inventory",
                "PageNo": "01",
                "Criticality": "W",
                "CriticalityText": "Warning",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "05",
                "AutoEmail": false,
                "EmailTo": "",
                "EmailCC": "",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "",
                "Frequency": "D",
                "FrequencyText": "Daily",
                "ChangedBy": "MASHAA0J",
                "ChangedOn": "\/Date(1729641600000)\/",
                "ChangedAt": "PT11H13M03S",
                "Trend": true,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0010')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-c13e-1ede-a996-a6fa0b7e720e')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-c13e-1ede-a996-a6fa0b7e720e')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-c13e-1ede-a996-a6fa0b7e720e",
                            "ParentId": "0010",
                            "ComponentCategory": "A",
                            "Title": "Returned inventory",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_ISS_RET_PRED_CHART",
                            "AggregationType": "avg",
                            "PopupPosition": "center",
                            "Trend": true,
                            "ChartType": "P",
                            "ChartTypeText": "Prediction"
                        }
                    ]
                }
            },
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0008')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0008')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0008",
                "Title": "Emergency items without  POD",
                "Description": "",
                "Source": "H",
                "SourceText": "Real-Time Data",
                "TechnicalName": "HOT_TAXI_WO_POD.xsjs",
                "Value": "0",
                "ErrorMessage": "",
                "IsCurrencyFormat": false,
                "DecimalDigits": "0",
                "Uom": "ASN",
                "Category": "LG",
                "CategoryText": "Warehouse & Logistics",
                "PageNo": "01",
                "Criticality": "N",
                "CriticalityText": "Normal",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "02",
                "AutoEmail": false,
                "EmailTo": "",
                "EmailCC": "",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "",
                "Frequency": "D",
                "FrequencyText": "Daily",
                "ChangedBy": "SID_BWSCM_01",
                "ChangedOn": "\/Date(1703635200000)\/",
                "ChangedAt": "PT15H42M37S",
                "Trend": true,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0008')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-0244-1ede-a996-ad42ceca390f')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-0244-1ede-a996-ad42ceca390f')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-0244-1ede-a996-ad42ceca390f",
                            "ParentId": "0008",
                            "ComponentCategory": "A",
                            "Title": "Emergency items without POD",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_CT_TREND_EMER_WO_POD",
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
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0018')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0018')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0018",
                "Title": "Overdue Reservation",
                "Description": "",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YCUS_SCCT_INV_OVERDUE",
                "Value": "7.4652165239999995E7",
                "ErrorMessage": "",
                "IsCurrencyFormat": true,
                "DecimalDigits": "0",
                "Uom": "$",
                "Category": "IN",
                "CategoryText": "Inventory",
                "PageNo": "01",
                "Criticality": "N",
                "CriticalityText": "Normal",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "02",
                "AutoEmail": false,
                "EmailTo": "",
                "EmailCC": "",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "",
                "Frequency": "D",
                "FrequencyText": "Daily",
                "ChangedBy": "SID_BWSCM_01",
                "ChangedOn": "\/Date(1703635200000)\/",
                "ChangedAt": "PT15H39M40S",
                "Trend": true,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0018')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-1ad9-1ede-a996-a01f7f79b5eb')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-1ad9-1ede-a996-a01f7f79b5eb')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-1ad9-1ede-a996-a01f7f79b5eb",
                            "ParentId": "0018",
                            "ComponentCategory": "A",
                            "Title": "Overdue Reservation",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_CT_TREND_OVRDU_RSRV",
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
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0024')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0024')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0024",
                "Title": "Non-Compliant Contractors",
                "Description": "",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YSCM_CT_CONTRCTOR_PASSPORT_SUM",
                "Value": "1.5E1",
                "ErrorMessage": "",
                "IsCurrencyFormat": false,
                "DecimalDigits": "0",
                "Uom": "Contract",
                "Category": "PR",
                "CategoryText": "Procurment",
                "PageNo": "01",
                "Criticality": "C",
                "CriticalityText": "Critical",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "02",
                "AutoEmail": false,
                "EmailTo": "",
                "EmailCC": "",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "",
                "Frequency": "D",
                "FrequencyText": "Daily",
                "ChangedBy": "SID_BWSCM_01",
                "ChangedOn": "\/Date(1733011200000)\/",
                "ChangedAt": "PT07H59M27S",
                "Trend": true,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0024')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-6494-1edd-b2a9-62fb843c5917')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-6494-1edd-b2a9-62fb843c5917')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-6494-1edd-b2a9-62fb843c5917",
                            "ParentId": "0024",
                            "ComponentCategory": "A",
                            "Title": "Non-Compliant Contractors",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_CT_TREND_NON_COMP",
                            "AggregationType": "avg",
                            "PopupPosition": "center",
                            "Trend": true,
                            "ChartType": "G",
                            "ChartTypeText": "Generic"
                        }
                    ]
                }
            },
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0015')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0015')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0015",
                "Title": "OOK Upcoming Bulky Delivery",
                "Description": "",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YSCM_OOK_BULKY_DELV_SUM",
                "Value": "2.8E1",
                "ErrorMessage": "",
                "IsCurrencyFormat": false,
                "DecimalDigits": "0",
                "Uom": "Items",
                "Category": "LG",
                "CategoryText": "Warehouse & Logistics",
                "PageNo": "01",
                "Criticality": "W",
                "CriticalityText": "Warning",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "05",
                "AutoEmail": false,
                "EmailTo": "#30028406",
                "EmailCC": "althba0a@aramco.com",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "",
                "Frequency": "D",
                "FrequencyText": "Daily",
                "ChangedBy": "SID_BWSCM_01",
                "ChangedOn": "\/Date(1703635200000)\/",
                "ChangedAt": "PT15H43M42S",
                "Trend": true,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0015')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-c13e-1ede-a996-b20dfe76b20e')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-c13e-1ede-a996-b20dfe76b20e')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-c13e-1ede-a996-b20dfe76b20e",
                            "ParentId": "0015",
                            "ComponentCategory": "A",
                            "Title": "OOK Upcoming Bulky Delivery",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_CT_TREND_OOK_BULKY",
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
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0020')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0020')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0020",
                "Title": "FCN for WH Items",
                "Description": "",
                "Source": "H",
                "SourceText": "Real-Time Data",
                "TechnicalName": "FCN_WH_ITEMS.xsjs",
                "Value": "0",
                "ErrorMessage": "",
                "IsCurrencyFormat": false,
                "DecimalDigits": "0",
                "Uom": "Items",
                "Category": "LG",
                "CategoryText": "Warehouse & Logistics",
                "PageNo": "01",
                "Criticality": "W",
                "CriticalityText": "Warning",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "07",
                "AutoEmail": false,
                "EmailTo": "",
                "EmailCC": "",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "",
                "Frequency": "",
                "FrequencyText": "",
                "ChangedBy": "SID_BWSCM_01",
                "ChangedOn": "\/Date(1703635200000)\/",
                "ChangedAt": "PT15H43M59S",
                "Trend": true,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0020')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-0244-1ede-a996-b35c7f9df90f')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-0244-1ede-a996-b35c7f9df90f')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-0244-1ede-a996-b35c7f9df90f",
                            "ParentId": "0020",
                            "ComponentCategory": "A",
                            "Title": "FCN for WH Items",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_CT_TREND_FCN_WH",
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
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0021')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0021')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0021",
                "Title": "Pending Stock Adjustment",
                "Description": "",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YWHO_CT_INV_OVER_ST_ADJ",
                "Value": "1.277E3",
                "ErrorMessage": "",
                "IsCurrencyFormat": false,
                "DecimalDigits": "2",
                "Uom": "Item",
                "Category": "LG",
                "CategoryText": "Warehouse & Logistics",
                "PageNo": "01",
                "Criticality": "W",
                "CriticalityText": "Warning",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "08",
                "AutoEmail": false,
                "EmailTo": "",
                "EmailCC": "",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "",
                "Frequency": "D",
                "FrequencyText": "Daily",
                "ChangedBy": "MASHAA0J",
                "ChangedOn": "\/Date(1722124800000)\/",
                "ChangedAt": "PT13H54M04S",
                "Trend": true,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0021')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-129f-1eee-a996-b67e5355e8ad')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-129f-1eee-a996-b67e5355e8ad')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-129f-1eee-a996-b67e5355e8ad",
                            "ParentId": "0021",
                            "ComponentCategory": "A",
                            "Title": "Pending Stock Adjustment",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_CT_TREND_PEND_STOCK",
                            "AggregationType": "avg",
                            "PopupPosition": "center",
                            "Trend": true,
                            "ChartType": "G",
                            "ChartTypeText": "Generic"
                        }
                    ]
                }
            },
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0005')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0005')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0005",
                "Title": "Unconfirmed TOs",
                "Description": "",
                "Source": "H",
                "SourceText": "Real-Time Data",
                "TechnicalName": "UNCONFIRMED_TOS.XSJS",
                "Value": "0",
                "ErrorMessage": "",
                "IsCurrencyFormat": false,
                "DecimalDigits": "0",
                "Uom": "TO",
                "Category": "LG",
                "CategoryText": "Warehouse & Logistics",
                "PageNo": "01",
                "Criticality": "N",
                "CriticalityText": "Normal",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "06",
                "AutoEmail": false,
                "EmailTo": "",
                "EmailCC": "",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "",
                "Frequency": "D",
                "FrequencyText": "Daily",
                "ChangedBy": "SID_BWSRV_01",
                "ChangedOn": "\/Date(1705968000000)\/",
                "ChangedAt": "PT15H37M02S",
                "Trend": true,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0005')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-1ad9-1edd-bdfa-7e21a074bc6f')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-1ad9-1edd-bdfa-7e21a074bc6f')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-1ad9-1edd-bdfa-7e21a074bc6f",
                            "ParentId": "0005",
                            "ComponentCategory": "A",
                            "Title": "",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_CT_TREND_UNCONF_TOS",
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
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0003')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0003')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0003",
                "Title": "Blocked Inventory",
                "Description": "",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YSCM_SCCT_INV_ALERT1",
                "Value": "7.9337660199999996E6",
                "ErrorMessage": "",
                "IsCurrencyFormat": true,
                "DecimalDigits": "2",
                "Uom": "$",
                "Category": "IN",
                "CategoryText": "Inventory",
                "PageNo": "01",
                "Criticality": "W",
                "CriticalityText": "Warning",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "04",
                "AutoEmail": false,
                "EmailTo": "",
                "EmailCC": "",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "",
                "Frequency": "D",
                "FrequencyText": "Daily",
                "ChangedBy": "MASHAA0J",
                "ChangedOn": "\/Date(1729641600000)\/",
                "ChangedAt": "PT11H15M18S",
                "Trend": true,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0003')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-c13e-1ede-a996-a54cb8d4320e')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-c13e-1ede-a996-a54cb8d4320e')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-c13e-1ede-a996-a54cb8d4320e",
                            "ParentId": "0003",
                            "ComponentCategory": "A",
                            "Title": "Blocked Inventory",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_CT_TREND_BLOCK_INVENT",
                            "AggregationType": "avg",
                            "PopupPosition": "center",
                            "Trend": true,
                            "ChartType": "G",
                            "ChartTypeText": "Generic"
                        }
                    ]
                }
            },
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0025')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0025')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0025",
                "Title": "POs to be Released",
                "Description": "",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YPDO_CT_PROC_PO_TO_RELEASE",
                "Value": "1.18E2",
                "ErrorMessage": "",
                "IsCurrencyFormat": false,
                "DecimalDigits": "0",
                "Uom": "PO",
                "Category": "PR",
                "CategoryText": "Procurment",
                "PageNo": "01",
                "Criticality": "N",
                "CriticalityText": "Normal",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "03",
                "AutoEmail": false,
                "EmailTo": "SALMA.JESHI@ARAMCO.COM",
                "EmailCC": "SALMA.JESHI@ARAMCO.COM",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "",
                "Frequency": "D",
                "FrequencyText": "Daily",
                "ChangedBy": "JESHISS",
                "ChangedOn": "\/Date(1733011200000)\/",
                "ChangedAt": "PT15H21M59S",
                "Trend": true,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0025')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-129f-1edd-b2a9-683aa64cf1cb')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-129f-1edd-b2a9-683aa64cf1cb')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-129f-1edd-b2a9-683aa64cf1cb",
                            "ParentId": "0025",
                            "ComponentCategory": "A",
                            "Title": "POs to be Released",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_CT_TREND_PO_TO_RELES",
                            "AggregationType": "avg",
                            "PopupPosition": "center",
                            "Trend": true,
                            "ChartType": "G",
                            "ChartTypeText": "Generic"
                        }
                    ]
                }
            },
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0007')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0007')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0007",
                "Title": "Open Orders with Deleted Requirements",
                "Description": "",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YPDO_CT_PROC_OD_PO",
                "Value": "2.047E3",
                "ErrorMessage": "",
                "IsCurrencyFormat": false,
                "DecimalDigits": "1",
                "Uom": "Line item",
                "Category": "PR",
                "CategoryText": "Procurment",
                "PageNo": "02",
                "Criticality": "W",
                "CriticalityText": "Warning",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "03",
                "AutoEmail": false,
                "EmailTo": "",
                "EmailCC": "",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "",
                "Frequency": "D",
                "FrequencyText": "Daily",
                "ChangedBy": "JESHISS",
                "ChangedOn": "\/Date(1733011200000)\/",
                "ChangedAt": "PT15H23M04S",
                "Trend": true,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0007')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-129f-1edd-b2a9-85e1892bf1cb')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-129f-1edd-b2a9-85e1892bf1cb')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-129f-1edd-b2a9-85e1892bf1cb",
                            "ParentId": "0007",
                            "ComponentCategory": "A",
                            "Title": "Open Orders with Deleted Requirements",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_CT_TREND_OPEN_DEL_REQ",
                            "AggregationType": "avg",
                            "PopupPosition": "middle-left",
                            "Trend": true,
                            "ChartType": "G",
                            "ChartTypeText": "Generic"
                        }
                    ]
                }
            },
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0031')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0031')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0031",
                "Title": "Expired Svcs POs",
                "Description": "",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YCDIK_EXPIRED_PO_LIST",
                "Value": "0",
                "ErrorMessage": "Error: Could not find the OUTPUT node in XML",
                "IsCurrencyFormat": false,
                "DecimalDigits": "0",
                "Uom": "PO",
                "Category": "PR",
                "CategoryText": "Procurment",
                "PageNo": "01",
                "Criticality": "W",
                "CriticalityText": "Warning",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "05",
                "AutoEmail": false,
                "EmailTo": "",
                "EmailCC": "",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "",
                "Frequency": "D",
                "FrequencyText": "Daily",
                "ChangedBy": "SID_BWSCM_01",
                "ChangedOn": "\/Date(1733011200000)\/",
                "ChangedAt": "PT15H24M50S",
                "Trend": true,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0031')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-6494-1edd-b5d8-d71065c819f9')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-6494-1edd-b5d8-d71065c819f9')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-6494-1edd-b5d8-d71065c819f9",
                            "ParentId": "0031",
                            "ComponentCategory": "A",
                            "Title": "Expired Svcs POs",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_CT_TREND_EXPIRED_POS_SRV",
                            "AggregationType": "avg",
                            "PopupPosition": "center",
                            "Trend": true,
                            "ChartType": "G",
                            "ChartTypeText": "Generic"
                        }
                    ]
                }
            },
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0048')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0048')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0048",
                "Title": "ECC Below Safety Stock",
                "Description": "",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YIMO_INVLVL_ECC_LTSS_01",
                "Value": "3E0",
                "ErrorMessage": "",
                "IsCurrencyFormat": false,
                "DecimalDigits": "2",
                "Uom": "",
                "Category": "IN",
                "CategoryText": "Inventory",
                "PageNo": "01",
                "Criticality": "C",
                "CriticalityText": "Critical",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "03",
                "AutoEmail": false,
                "EmailTo": "",
                "EmailCC": "",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "",
                "Frequency": "D",
                "FrequencyText": "Daily",
                "ChangedBy": "HOTHEYRM",
                "ChangedOn": "\/Date(1733011200000)\/",
                "ChangedAt": "PT15H33M13S",
                "Trend": false,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0048')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-129f-1eef-85b4-eee293e0d38e')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-129f-1eef-85b4-eee293e0d38e')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-129f-1eef-85b4-eee293e0d38e",
                            "ParentId": "0048",
                            "ComponentCategory": "A",
                            "Title": "ECC Below Safety Stock",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YWHO_INVLVL_ECC_ALERT_TREND",
                            "AggregationType": "sum",
                            "PopupPosition": "top-right",
                            "Trend": false,
                            "ChartType": "",
                            "ChartTypeText": ""
                        },
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-112f-1eef-85b4-f103c2fd75f9')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-112f-1eef-85b4-f103c2fd75f9')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-112f-1eef-85b4-f103c2fd75f9",
                            "ParentId": "0048",
                            "ComponentCategory": "A",
                            "Title": "ECC Below Safety Stock",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YIMO_INVLVL_ECC_LTSS",
                            "AggregationType": "count",
                            "PopupPosition": "top-right",
                            "Trend": true,
                            "ChartType": "G",
                            "ChartTypeText": "Generic"
                        }
                    ]
                }
            },
            {
                "__metadata": {
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0001')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0001')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0001",
                "Title": "Near Expiry Shelflife",
                "Description": "",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YWHO_EXPIRING_SHELF_6MONTHS",
                "Value": "2.15E2",
                "ErrorMessage": "",
                "IsCurrencyFormat": false,
                "DecimalDigits": "0",
                "Uom": "Item",
                "Category": "LG",
                "CategoryText": "Warehouse & Logistics",
                "PageNo": "01",
                "Criticality": "N",
                "CriticalityText": "Normal",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "04",
                "AutoEmail": false,
                "EmailTo": "saleh.miraj@aramco.com",
                "EmailCC": "",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "YIMO_CT_LOG_SHELF_LIFE",
                "Frequency": "D",
                "FrequencyText": "Daily",
                "ChangedBy": "HOTHEYRM",
                "ChangedOn": "\/Date(1733011200000)\/",
                "ChangedAt": "PT15H33M48S",
                "Trend": true,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0001')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-1ad9-1edd-bdfa-a6a5432f7c6f')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-1ad9-1edd-bdfa-a6a5432f7c6f')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-1ad9-1edd-bdfa-a6a5432f7c6f",
                            "ParentId": "0001",
                            "ComponentCategory": "A",
                            "Title": "",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_CT_TREND_EXP_SHEL",
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
                    "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0053')",
                    "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0053')",
                    "type": "ZSCM_CT_CONFIG_SRV.Alert"
                },
                "AlertId": "0053",
                "Title": "Suppliers Capacity Constraint",
                "Description": "This is when Aramco orders are higher than the supplier capacity. This Alert will represent the no. of suppliers who are receiving orders more than their actual capacity leading to delays and supply chain disruptions.",
                "Source": "B",
                "SourceText": "BW Query",
                "TechnicalName": "YSCM_CT_CAPACITY_CONST",
                "Value": "1E0",
                "ErrorMessage": "",
                "IsCurrencyFormat": false,
                "DecimalDigits": "1",
                "Uom": "Suppliers",
                "Category": "PR",
                "CategoryText": "Procurment",
                "PageNo": "02",
                "Criticality": "N",
                "CriticalityText": "Normal",
                "Detail": "",
                "DetailURL": "",
                "InfoLink": "",
                "ShowOnApp": false,
                "ShowOnCT": true,
                "OrderOnApp": "00",
                "OrderOnCT": "01",
                "AutoEmail": false,
                "EmailTo": "",
                "EmailCC": "",
                "EmailBCC": "",
                "EmailOrg": "",
                "EmailBody": "",
                "EmailDetail": "",
                "Frequency": "D",
                "FrequencyText": "Daily",
                "ChangedBy": "JESHISS",
                "ChangedOn": "\/Date(1733011200000)\/",
                "ChangedAt": "PT15H42M58S",
                "Trend": true,
                "AlertLog": {
                    "__deferred": {
                        "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Alerts('0053')/AlertLog"
                    }
                },
                "DataSourceNav": {
                    "results": []
                },
                "Level2Nav": {
                    "results": [
                        {
                            "__metadata": {
                                "id": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-112f-1eed-b2a9-704f605df3fa')",
                                "uri": "https://prwascs.aramco.com.sa:44382/sap/opu/odata/sap/zscm_ct_config_srv/Level2Set(guid'00505684-112f-1eed-b2a9-704f605df3fa')",
                                "type": "ZSCM_CT_CONFIG_SRV.Level2"
                            },
                            "Id": "00505684-112f-1eed-b2a9-704f605df3fa",
                            "ParentId": "0027",
                            "ComponentCategory": "A",
                            "Title": "Consumed Contracts",
                            "Vistype": "",
                            "Crossfade": false,
                            "Source": "",
                            "SourceText": "",
                            "TechnicalName": "YSCM_CT_TREND_CONS_CONTRA",
                            "AggregationType": "avg",
                            "PopupPosition": "center",
                            "Trend": true,
                            "ChartType": "",
                            "ChartTypeText": ""
                        }
                    ]                }
            }
        ]
    }
}




`
}

export { logisticsAlerts }
