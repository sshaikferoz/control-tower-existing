import React, { useContext, useRef, useEffect, useState } from 'react'
import { scaleSqrt } from 'd3-scale'
import { VisLeafletMap } from '@unovis/react'
import { LeafletMapRenderer } from '@unovis/ts'
import { SVG } from '@svgdotjs/svg.js'
import useBexJson from '../../lib/useBexJson'
import formatNumber, { formatToBillion } from '../../lib/helpers/formatNumber'
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
export default function GeoSpenMapTiles(props) {
  const mapRef = useRef(null)
  const trackDataObject = useRef({})
  const trackInitialEventDone = useRef(false)
  const {
    query = {},
    spendType: propsSpendType,
    spendMapArea = 'global',
    selectedCommodity = '',
  } = props
  let selectedCommodityValue = ''
  if (selectedCommodity) {
    console.log({ selectedCommodity })
    const [
      title = '',
      variableKey = '',
    ] =
      Object.entries(categoryTextVariablemap).find((c) => {
        const [
          key,
          val,
        ] = c
        if (key) return key.match(new RegExp(selectedCommodity, 'i'))
        return false
      }) || []
    console.log({ title, variableKey })
    if (title) selectedCommodityValue = variableKey
  }
  const { withMask, maskData } = useContext(maskContext)
  let spendType = propsSpendType
  if (spendMapArea !== 'global') spendType = 'directSpend'
  let {
    byCategory = '',
    byCountry = '',
    title = '',
  } = query?.[propsSpendType]?.[spendMapArea] || {}
  const technameParam = selectedCommodityValue
    ? getEncodedVariable(selectedCommodityValue)
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
    .filter((_, ind) => ind < 10)

  const formattedData = sortedChartData.map((item) => {
    // console.log({ itemCountryFieldData: item?.[countryKeyField] })
    const countryCode = getCountryCodeByCountryName(item[countryKeyField])
    const coordinates =
      getQueryCountryKey(countryCode) ||
      findQuerycontinentCoordinates(item[countryKeyField]) ||
      []
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
    if (propsSpendType === 'sourcingGap') return
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
        redrawPoint({}, { forceRedraw: true })
      })
    })
  }, [
    propsSpendType,
    selectedCommodity,
    maskData,
  ])

  let zoomStartFn = {
    onMapMoveZoom: () => pointGenerationDelay(redrawPoint, 200),
  }
  let dataObject = { data: formattedData }

  if (formattedData.length === 0 || !Array.isArray(formattedData) || !isClient) {
    zoomStartFn = {}
    dataObject = {}
  }
  if (propsSpendType === 'sourcingGap') {
    zoomStartFn = {}
  }

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

    return `hsl(var(--map-point-bg,214) ${hslBrightness * 0.7}% ${35 + hslRevearse
      }% / 1)`
  }

  function clearPoints() {
    const svg = SVG('.css-11p8sco-svg-overlay')
    const points = svg.find('.css-1b4fjso-g-point')
    const { valueKeyField, percentKeyField, countryKeyField } = getFields()
    const totalSum = (trackDataObject.current.chartData || []).reduce(
      (cum, cur) => cum + Number(cur?.[valueKeyField]),
      0
    )
    let trackUnAddedPoints = []
    for (const item of trackDataObject.current.chartData || []) {
      const found = svg.findOne(`#ellipse${item.countryCode}`)
      if (!found) {
        trackUnAddedPoints.push(item.countryCode)
        continue
      }

      // console.log({ found })
      const foundText = found.findOne('text')
      if (!foundText) continue

      const translate = foundText.attr('transform') || []

      const parent = found.parent().find('path')[1].fill(fillPoint(item))
      const percentage = isNaN(item?.[percentKeyField])
        ? Number(item?.[valueKeyField] / totalSum) * 100
        : Number(item?.[percentKeyField])
      let dxMove = -9
      let valueText = `$${withMask(formatToBillion(item?.[valueKeyField]))}`
      if (selectedCommodityValue !== '') {
        dxMove = 0
        valueText = `${Number(item?.[valueKeyField]).toFixed(0)}`
      }
      if (maskData === true) {
        dxMove = 0
      }

      const newText = svg
        .text((add) => {
          add.newLine(item?.countryCode).css({ 'font-size': '8' })
          add
            .newLine(valueText)
            .css({ 'font-weight': '600', 'font-size': '10' })
            .dx(dxMove)

          add.newLine(percentage?.toFixed?.() + '%').css({ 'font-size': '8' })
        })
        .leading(1.18)
      if (propsSpendType === 'sourcingGap') return
      newText.attr('transform', 'translate(-7 -65)')
      // newText.attr('transform',translate)
      // console.log({ translate })
      foundText.remove()
      newText.addTo(found)
      // foundText.replace(newText)
    }
    return trackUnAddedPoints
  }
  async function redrawPoint(_points, options = {}) {
    if (propsSpendType === 'sourcingGap') return
    const svg = SVG('.css-11p8sco-svg-overlay')
    if (propsSpendType === 'sourcingGap') {
      await new Promise((r) => setTimeout(r, 200))
      const prevAdded = svg.find('.added')
      prevAdded.forEach((i, ind) => {
        console.log({ addedThing: i })
        if (propsSpendType === 'sourcingGap') return
        i?.remove?.()
      })
      return
    }
    const points = svg.find('.css-1b4fjso-g-point')
    const { forceRedraw = false } = options

    const { valueKeyField, percentKeyField, countryKeyField } = getFields()
    // console.log({ points: points.length })
    let unAddedPoints = []
    if (forceRedraw) {
      //replace text/value with new text/value; returns the list of countries that need to be redrawed
      unAddedPoints = clearPoints()
      // console.log({ needsToRedrawPoints: unAddedPoints?.length })
    }
    const totalSum = (trackDataObject.current.chartData || []).reduce(
      (cum, cur) => cum + Number(cur?.[valueKeyField]),
      0
    )
    points.forEach((i, ind) => {
      if (propsSpendType === 'sourcingGap') return
      const path = i.findOne('path') || {}
      const text = i.findOne('text') || {}
      // i.show()

      if (!path) return
      if (!text) return

      const countryCodeText = text.text()
      // console.log({ countryCodeText })
      if (!countryCodeText) {
        if (forceRedraw === false) return
      }

      if (forceRedraw) {
        if (!unAddedPoints.includes(countryCodeText)) return
      }

      i.attr('style', 'visibility:hidden')

      let dataItem = formattedData.find(
        (item) => item.countryCode === countryCodeText
      )
      if (!dataItem)
        dataItem = trackDataObject.current.chartData?.find(
          (item) => item.countryCode === countryCodeText
        )

      const newPath = svg
        .path(
          'M 35.89547729492188 103.4448013305664 L 35.305908203125 103.4448013305664 C 35.26969528198242 103.3944931030273 35.22042083740234 103.3262710571289 35.15862274169922 103.2407150268555 C 32.08610534667969 98.98659515380859 24.12493133544922 87.74350738525391 16.5775318145752 75.25337219238281 C 11.78518486022949 67.32253265380859 7.981424808502197 60.25097274780273 5.271904468536377 54.2351188659668 C 1.939611315727234 46.83650588989258 0.2499979436397552 41.00165176391602 0.2499979436397552 36.89262390136719 L 0.2499979436397552 34.37721252441406 C 0.2499979436397552 29.76991844177246 1.151291251182556 25.30058479309082 2.928824663162231 21.09334564208984 C 4.645771503448486 17.02953147888184 7.103771209716797 13.37979793548584 10.23455810546875 10.24553203582764 C 13.36533164978027 7.111291408538818 17.01097106933594 4.650571823120117 21.07025146484375 2.931745052337646 C 25.27273178100586 1.152264952659607 29.73701095581055 0.2499983012676239 34.33909225463867 0.2499983012676239 L 36.85171890258789 0.2499983012676239 C 41.45378494262695 0.2499983012676239 45.9180793762207 1.152264952659607 50.12055969238281 2.931745052337646 C 54.17982482910156 4.650571823120117 57.82547760009766 7.111291408538818 60.95623779296875 10.24553203582764 C 64.08702087402344 13.37979793548584 66.54502105712891 17.02953147888184 68.26197052001953 21.09334564208984 C 70.03950500488281 25.30058479309082 70.9407958984375 29.76991844177246 70.9407958984375 34.37721252441406 L 70.9407958984375 36.89262390136719 C 70.9407958984375 41.15707778930664 69.12722778320312 47.2751579284668 65.55045318603516 55.076904296875 C 62.67077255249023 61.35815811157227 58.65403747558594 68.72415924072266 53.61185073852539 76.97029113769531 C 45.23312759399414 90.67308044433594 36.76154708862305 102.3217010498047 35.89547729492188 103.4448013305664 Z'
        )
        .fill(fillPoint(dataItem))
        .addClass('added')

      text.remove()
      path.remove()
      // path.center(path.x(), path.y())
      // console.dir({ path, i })
      newPath.attr('transform', 'scale(.8 .8) translate(-35 -156)')

      i.animate({
        duration: 50,
        delay: 10 * ind,
      })
        .attr('style', 'visibility:visible')
        .css({
          cursor: 'pointer',
        })
      i.animate({
        duration: 70,
        delay: 10 * ind - 10,
      }).dmove(0, 40)

      const percentage = isNaN(dataItem?.[percentKeyField])
        ? Number(dataItem?.[valueKeyField] / totalSum) * 100
        : Number(dataItem?.[percentKeyField])
      const group = svg.group()
      let dxMove = -9
      let valueText = `$${withMask(formatToBillion(dataItem?.[valueKeyField]))}`
      if (selectedCommodityValue !== '') {
        dxMove = 0
        valueText = `${Number(dataItem?.[valueKeyField]).toFixed(0)}`
      }
      const newText = svg
        .text((add) => {
          add.newLine(countryCodeText).css({ 'font-size': '8' })
          add
            .newLine(valueText)
            .css({ 'font-weight': '600', 'font-size': '10' })
            .dx(dxMove)

          add.newLine(percentage?.toFixed?.() + '%').css({ 'font-size': '8' })
        })
        .leading(1.18)

      if (propsSpendType === 'sourcingGap') return
      group.attr('id', `ellipse${countryCodeText}`).addClass('added')
      const ellipse = svg.ellipse(47, 47)
      ellipse.attr('transform', 'translate(-23 -120)').fill('white')
      newText.attr('transform', 'translate(-7 -104)')

      const newPathBg = svg //to show a little border
        .path(
          'M 35.89547729492188 103.4448013305664 L 35.305908203125 103.4448013305664 C 35.26969528198242 103.3944931030273 35.22042083740234 103.3262710571289 35.15862274169922 103.2407150268555 C 32.08610534667969 98.98659515380859 24.12493133544922 87.74350738525391 16.5775318145752 75.25337219238281 C 11.78518486022949 67.32253265380859 7.981424808502197 60.25097274780273 5.271904468536377 54.2351188659668 C 1.939611315727234 46.83650588989258 0.2499979436397552 41.00165176391602 0.2499979436397552 36.89262390136719 L 0.2499979436397552 34.37721252441406 C 0.2499979436397552 29.76991844177246 1.151291251182556 25.30058479309082 2.928824663162231 21.09334564208984 C 4.645771503448486 17.02953147888184 7.103771209716797 13.37979793548584 10.23455810546875 10.24553203582764 C 13.36533164978027 7.111291408538818 17.01097106933594 4.650571823120117 21.07025146484375 2.931745052337646 C 25.27273178100586 1.152264952659607 29.73701095581055 0.2499983012676239 34.33909225463867 0.2499983012676239 L 36.85171890258789 0.2499983012676239 C 41.45378494262695 0.2499983012676239 45.9180793762207 1.152264952659607 50.12055969238281 2.931745052337646 C 54.17982482910156 4.650571823120117 57.82547760009766 7.111291408538818 60.95623779296875 10.24553203582764 C 64.08702087402344 13.37979793548584 66.54502105712891 17.02953147888184 68.26197052001953 21.09334564208984 C 70.03950500488281 25.30058479309082 70.9407958984375 29.76991844177246 70.9407958984375 34.37721252441406 L 70.9407958984375 36.89262390136719 C 70.9407958984375 41.15707778930664 69.12722778320312 47.2751579284668 65.55045318603516 55.076904296875 C 62.67077255249023 61.35815811157227 58.65403747558594 68.72415924072266 53.61185073852539 76.97029113769531 C 45.23312759399414 90.67308044433594 36.76154708862305 102.3217010498047 35.89547729492188 103.4448013305664 Z'
        )
        .fill('#fffc')
        .addClass('added')
      newPathBg.attr('transform', 'scale(.828 .83) translate(-35 -152)')
      newPathBg.addTo(i)
      ellipse.addTo(group)
      newText.addTo(group)
      newPath.addTo(i)
      group.addTo(i)
    })
  }
  const onMapInitializedFn = async () => {
    await new Promise((r) => setTimeout(r, 1140))
    if (trackDataObject.current?.chartData?.length) {
      // console.log({ dataInsideInitFn: trackDataObject.current?.chartData })
      await redrawPoint({}, { forceRedraw: true }).catch((e) => console.log({ e }))
      trackInitialEventDone.current = true
    }
    if (trackInitialEventDone.current !== true) {
      // console.log({ stillTrackEventNotDeon: trackInitialEventDone.current })
      await new Promise((r) => setTimeout(r, 4200))
      await redrawPoint({}, { forceRedraw: true }).catch((e) => console.log({ e }))
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

  if (spendMapArea === 'asia')
    mapBoundObj = {
      northEast: {
        lat: 50,
        lng: 150,
      },
      southWest: {
        lat: 18,
        lng: 90,
      },
    }

  return (
    <React.Fragment>
      <VisLeafletMap
        ref={mapRef}
        flyToDuration={100}
        className={'spendLeafletMap'}
        height={'100%'}
        // style="/SAP/BC/BSP/SAP/ZSCM_CT_MAPTILE/{z}/{y}/{x}/image.jpg"
        // style="https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        style={process.env.NEXT_PUBLIC_MAP_TILES_URL}
        // style="https://dvb.aramco.com.sa:44303/SAP/BC/BSP/SAP/ZSCM_CT_MAPTILE/{z}/{y}/{x}/image.jpg"
        renderer={LeafletMapRenderer.Raster}
        {...dataObject}
        {...zoomStartFn}
        attribution={[]}
        clusteringDistance={1}
        onMapInitialized={onMapInitializedFn}
        pointLabel={(d) => `${d.countryCode}`}
        pointRadius={(d) => 21}
        initialBounds={mapBoundObj}
      />
    </React.Fragment>
  )
}
