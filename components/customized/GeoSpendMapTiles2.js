import React, { useContext, useRef, useEffect, useState } from 'react'
import { scaleSqrt } from 'd3-scale'
import { VisLeafletMap } from '@unovis/react'
import { LeafletMapRenderer } from '@unovis/ts'
import useBexJson from '../../lib/useBexJson'
import {
  getQueryCountryKey,
  findQuerycontinentCoordinates,
  getCountryCodeByCountryName,
} from '../../lib/helpers/getQueryCountryName'
import { maskContext } from '../../lib/maskContext'
const delayGen = () => {
  let timer = 0
  return (callback, ms = 500) => {
    try {
      clearTimeout(timer)
      timer = setTimeout(() => callback(), ms)
    } catch (e) {
      console.log({ e })
    }
  }
}
const pointGenerationDelay = delayGen()
const getEncodedVariable = (
  varValue,
  queryTechname = 'YPDO_SCCT_MFR_PROFIL_SPEND_MAP',
  varTechname = 'YCOM_ML'
) => {
  const techname = queryTechname
  const var_techname = varTechname
  const var_template = `VAR_NAME_1=${varTechname}`
  const value_template = 'VAR_VALUE_EXT_1=' + varValue || ''
  const operator_template = 'VAR_OPERATOR_1=EQ'
  const string = `${var_template}&${operator_template}&${value_template}`
  return `${techname}&variables=${encodeURIComponent(string)}`
}

const categoryTextVariablemap = {
  'Air Conditioning': 'COFO_ARC',
  Community: 'COFO_COM',
  'Gen Sup & Bldg. Mat.': 'COFO_GSB',
  'Industrial Services': 'COFO_INS',
  'Office Supplies': 'COFO_OFS',
  Chemicals: 'DRCM_CHM',
  Drilling: 'DRCM_DRL',
  Electrical: 'ELTC_ELC',
  Communication: 'INIT_CMM',
  Computers: 'INIT_CMP',
  Instrumentation: 'INIT_INR',
  Compressors: 'MAEQ_CPR',
  Pumps: 'MAEQ_PUM',
  'Power Transmission': 'MAEQ_PWT',
  Turbines: 'MAEQ_TUB',
  'Heat Transfer Equip': 'SCEQ_HTE',
  'Pipe Fittings': 'SCEQ_PIF',
  Pipe: 'SCEQ_PIP',
  'Structural Steel': 'SCEQ_SRS',
  Valves: 'SCEQ_VAL',
  Vessels: 'SCEQ_VEL',
  Environmental: 'SSHE_ENV',
  '"Medical': 'SSHE_MDL',
  'Safety & Security Equip': 'SSHE_SSE',
  Nonmetallic: 'NMT',
  Others: 'OTH',
  Rotating: 'ROT_EQUIP',
  Static: 'STE',
  OCTG: 'DRCM_OCTG',
  Downhole: 'DRCM_DHL',
  Wellhead: 'DRCM_WHD',
}
export default function GeoSpenMapTiles2(props) {
  const { withMask, maskData } = useContext(maskContext)
  const mapRef = useRef(null)
  const trackDataObject = useRef({})
  const trackInitialEventDone = useRef(false)
  const {
    query = {},
    spendType: propsSpendType,
    spendMapArea = 'global',
    selectedCommodity = '',
  } = props
  let selectedCommodityValue = selectedCommodity
  let spendType = propsSpendType
  if (spendMapArea !== 'global') spendType = 'directSpend'
  let {
    byCategory = '',
    byCountry = '',
    title = '',
  } = query?.[propsSpendType]?.[spendMapArea] || {}
  const technameParam = selectedCommodityValue
    ? getEncodedVariable(selectedCommodityValue, byCountry, 'YSCM_TEXT')
    : byCountry
  console.log({ technameParam })
  const { data: dataByCountry = {}, status: statusByCountry } = useBexJson(
    technameParam,
    {
      parser: 'new',
      staleTime: 60000,
    }
  )
  const { data: dataByCommodity, status: statusByCommodity } = useBexJson(
    byCategory,
    {
      parser: 'new',
      staleTime: 60000,
    }
  )
  const titles = [
    `${title} by commidity`,
    `${title} by country`,
  ]
  const {
    chartData = [],
    error: executeQueryError,
    charKeys = [],
    keyFigureKeys = [],
    headerText = {},
    charUniqueValues = {},
    mainAxisUniqueValues = [],
  } = dataByCountry
  trackDataObject.current.keyFigureKeys = [...keyFigureKeys]
  trackDataObject.current.charKeys = [...charKeys]
  const { valueKeyField, percentKeyField, countryKeyField } = getFields()
  console.log({ valueKeyField, percentKeyField, countryKeyField })
  const sortedChartData = [...chartData]
    .sort((a, z) => Number(z[valueKeyField] - a[valueKeyField]))
    .filter((_, ind) => ind < 8)

  const formattedData = sortedChartData.map((item) => {
    console.log({ itemCountryFieldData: item?.[countryKeyField] })
    const countryCode = getCountryCodeByCountryName(item[countryKeyField])
    const coordinates =
      getQueryCountryKey(countryCode) ||
      findQuerycontinentCoordinates(item[countryKeyField]) ||
      []
    console.log({ countryCode, givenCountryKey: item[countryKeyField], coordinates })
    const [
      latitude,
      longitude,
    ] = coordinates
    const LatLng = { lat: latitude, lng: longitude }
    return {
      ...item,
      countryCode: countryCode || item[countryKeyField]?.split(' ')[0],
      latitude,
      longitude,
      LatLng,
    }
  })
  trackDataObject.current.chartData = [...formattedData]
  const [
    isClient,
    setIsClient,
  ] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsClient(true)
    })
    setTimeout(async () => {
      await new Promise((r) => setTimeout(r, 2222))
      mapRef.current?.component?._map?.leaflet?.attributionControl?.setPrefix?.('')
    })
  }, [])
  useEffect(() => {
    if (trackInitialEventDone.current === false) return
    pointGenerationDelay(() => {
      setTimeout(async () => {
        await new Promise((r) => setTimeout(r, 200))
        if (statusByCountry !== 'success')
          await new Promise((r) => setTimeout(r, 200))
        if (statusByCountry !== 'success')
          await new Promise((r) => setTimeout(r, 200))
        if (statusByCountry !== 'success')
          await new Promise((r) => setTimeout(r, 200))
        if (statusByCountry !== 'success')
          await new Promise((r) => setTimeout(r, 200))
        if (statusByCountry !== 'success')
          await new Promise((r) => setTimeout(r, 200))
        await new Promise((r) => setTimeout(r, 200))
      })
    })
  }, [
    propsSpendType,
    selectedCommodity,
    maskData,
  ])

  let zoomStartFn = {}
  let dataObject = { data: formattedData }
  console.log({ dataObject })

  if (formattedData.length === 0 || !Array.isArray(formattedData) || !isClient) {
    zoomStartFn = {}
    dataObject = {}
  } else console.log({ formattedData })
  console.log(dataByCountry)

  function getFields() {
    let [countryKeyField] = trackDataObject.current?.charKeys || charKeys || []
    if (countryKeyField?.endsWith('Key')) {
      countryKeyField =
        trackDataObject.current?.charKeys?.[1] || charKeys?.[1] || countryKeyField
    }
    let [
      valueKeyField,
      percentKeyField,
    ] = trackDataObject.current?.keyFigureKeys || keyFigureKeys
    return { valueKeyField, percentKeyField, countryKeyField }
  }

  function fillPoint(countryItem) {
    const chartData = trackDataObject.current?.chartData || []
    const { valueKeyField, percentKeyField, countryKeyField } = getFields()
    const minVal = Math.min(...chartData.map((i) => i[valueKeyField]))
    const maxVal = Math.max(...chartData.map((i) => i[valueKeyField]))
    // console.log({ maxVal, minVal, chData: chartData.map((i) => i[valueKeyField]) })
    let scale = scaleSqrt()
      .domain([
        minVal,
        maxVal,
      ])
      .range([
        54,
        80,
      ])
    const hslBrightness = Number(scale(countryItem?.[valueKeyField])) || 50
    const hslRevearse = 100 - hslBrightness * 0.92

    return `hsl(var(--map-point-bg,214) ${hslBrightness * 0.7}% ${
      35 + hslRevearse
    }% / 1)`
  }

  const onMapInitializedFn = async () => {
    await new Promise((r) => setTimeout(r, 1140))
    if (trackDataObject.current?.chartData?.length) {
      // console.log({ dataInsideInitFn: trackDataObject.current?.chartData })
      trackInitialEventDone.current = true
    }
    if (trackInitialEventDone.current !== true) {
      // console.log({ stillTrackEventNotDeon: trackInitialEventDone.current })
      await new Promise((r) => setTimeout(r, 4200))
    }
  }

  let mapBoundObj = {
    northEast: {
      lat: 55,
      lng: 80,
    },
    southWest: {
      lat: -10,
      lng: -23,
    },
  }

  if (spendMapArea === 'aoc')
    mapBoundObj = {
      northEast: {
        lat: 60,
        lng: 26,
      },
      southWest: {
        lat: 30,
        lng: 0,
      },
    }

  if (spendMapArea === 'asc')
    mapBoundObj = {
      northEast: {
        lat: 50,
        lng: -76,
      },
      southWest: {
        lat: -10,
        lng: -120,
      },
    }
  let colorMapObj = {
    colorMap: {
      [percentKeyField]: { color: '#66bb6a' },
      Processed: { color: '#e17885' },
    },
    pointBottomLabel: (i) => {
      let countryName = i?.[countryKeyField]
      if (countryName?.length && countryName.length > 10) {
        //make country name shorter
        const term = countryName.toLowerCase()
        if (term.includes('north') && term.includes('south'))
          return countryName.replace(/north.*south/i, 'N&S')
      }
      return `${countryName || i.countryCode}  `
    },
  }

  if (propsSpendType !== 'sourcingGap') {
    colorMapObj = {}
  }
  return (
    <React.Fragment>
      <VisLeafletMap
        ref={mapRef}
        flyToDuration={100}
        className={'spendLeafletMap'}
        height={'100%'}
        // style="/SAP/BC/BSP/SAP/ZSCM_CT_MAPTILE/{z}/{y}/{x}/image.jpg"
        style={process.env.NEXT_PUBLIC_MAP_TILES_URL}
        // style="https://dvb.aramco.com.sa:44303/SAP/BC/BSP/SAP/ZSCM_CT_MAPTILE/{z}/{y}/{x}/image.jpg"
        renderer={LeafletMapRenderer.Raster}
        {...dataObject}
        {...zoomStartFn}
        {...colorMapObj}
        attribution={[]}
        clusteringDistance={1}
        onMapInitialized={onMapInitializedFn}
        pointLabel={(d) =>
          console.log({ d }) ||
          `${
            Number(d?.Processed).toFixed(0) === '0'
              ? '100'
              : Number(d?.Processed).toFixed(0)
          }%`
        }
        pointRadius={(d) => 31}
        initialBounds={mapBoundObj}
      />
    </React.Fragment>
  )
}
