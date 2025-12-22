import { Tooltip, LeafletMap, LeafletMapRenderer } from '@unovis/ts'
import { scaleSqrt } from 'd3-scale'
import useBexJson from '../../lib/useBexJson'
import formatNumber from '../../lib/helpers/formatNumber'
import React, { useRef, useContext, useEffect, useState } from 'react'
import DataQuery from 'devextreme/data/query'
import { VisLeafletMap } from '@unovis/react'
import { maskContext } from '../../lib/maskContext'

const markersData = [
  {
    location: [
      26.70462513648344,
      50.08331595881317,
    ],

    tooltip: `${'Ras Tanura Main Warehouse 300'}<br>${'Inventory Value: '}$${1.6}MM<br> ${'Inventory %: '}${'%'}${30}`,
  },

  {
    location: [
      26.792633803420724,
      49.98836575729364,
    ],

    tooltip: `${'Juaymah Main Warehouse 321'}<br>${'Inventory Value: '}$${1.6}MM <br> ${'Inventory %: '}${'%'}${30}`,
  },

  {
    location: [
      27.771346720430397,
      48.87293684809517,
    ],

    tooltip: `${'Tanajib Main Warehouse 322'}<br>${'Inventory Value: '}$${1.6}MM<br> ${'Inventory %: '}${'%'}${30}`,
  },

  {
    location: [
      26.31031406559796,
      50.12054501817425,
    ],

    tooltip: `${'Dhahran Main Warehouse 100'}<br>${'Inventory Value: '}$${1.6}MM<br> ${'Inventory %: '}${'%'}${30}`,
  },

  {
    location: [
      27.138346168675977,
      49.19680879562134,
    ],

    tooltip: `${'Khursaniyah  Warehouse 340'}<br>${'Inventory Value: '}$${1.6}MM<br> ${'Inventory %: '}${'%'}${30}`,
  },

  {
    location: [
      26.087782667277,
      49.7869223518532,
    ],

    tooltip: `${'Central Pipe Yard 111'}<br>${'Inventory Value: '}$${1.6}MM<br> ${'Inventory %: '}${'%'}${30}`,
  },

  {
    location: [
      25.94623544376001,
      49.6797210411139,
    ],

    tooltip: `${'Abqaiq Main Warehouse 500'}<br>${'Inventory Value: '}$${1.6}MM<br> ${'Inventory %: '}${'%'}${30}`,
  },

  {
    location: [
      25.661507095530034,
      49.388611858661974,
    ],

    tooltip: `${'Shedgum Main Warehouse 531'}<br>${'Inventory Value: '}$${1.6}MM<br> ${'Inventory %: '}${'%'}${30}`,
  },

  {
    location: [
      25.19631586951352,
      49.312251842102725,
    ],

    tooltip: `${'Uthmaniyah Main Warehouse 532'}<br>${'Inventory Value: '}$${1.6}MM <br>${'Inventory %: '}${'%'}${30}`,
  },

  {
    location: [
      24.53073467024783,
      46.86217393249058,
    ],

    tooltip: `${'Riyadh Main Warehouse 953'}<br>${'Inventory Value: '}$${1.6}MM<br> ${'Inventory %: '}${'%'}${30}`,
  },

  {
    location: [
      24.58149904121501,
      47.025834952530076,
    ],

    tooltip: `${'Riyadh SSSP Warehouse 930'}<br>${'Inventory Value: '}$${1.6}MM<br> ${'Inventory %: '}${'%'}${30}`,
  },

  {
    location: [
      26.574937650803047,
      43.23481038192964,
    ],

    tooltip: `${'Qaseem SSSP Warehouse 947'}<br>${'Inventory Value: '}$${1.6}MM<br> ${'Inventory %: '}${'%'}${30}`,
  },

  {
    location: [
      23.971056484662785,
      38.26438230416024,
    ],

    tooltip: `${'Yanbu Main Warehouse 104'}<br>${'Inventory Value: '}$${1.6}MM<br> ${'Inventory %: '}${'%'}${30}`,
  },

  {
    location: [
      17.284245621878142,
      42.35907550754664,
    ],

    tooltip: `${'Jazan Main Warehouse 960'}<br>${'Inventory Value: '}$${1.6}MM<br> ${'Inventory %: '}${'%'}${30}`,
  },
  {
    location: [
      21.40527632458748,
      39.46019116776205,
    ],

    tooltip: `${'Jeddah SSSP Warehouse'}<br>${'Inventory Value: '}$${1.6}MM<br> ${'Inventory %: '}${'%'}${30}`,
  },
  {
    location: [
      18.246695762613207,
      42.51162512789718,
    ],

    tooltip: `${'Abha SSSP Warehouse'}<br>${'Inventory Value: '}$${1.6}MM<br> ${'Inventory %: '}${'%'}${30}`,
  },
  {
    location: [
      21.443936919699006,
      39.18461996930932,
    ],

    tooltip: `${'Jeddah Main Warehouse'}<br>${'Inventory Value: '}$${1.6}MM<br> ${'Inventory %: '}${'%'}${30}`,
  },
  {
    location: [
      22.608802307736312,
      54.068016968111515,
    ],

    tooltip: `${'Shaybah Main Warehouse'}<br>${'Inventory Value: '}$${1.6}MM<br> ${'Inventory %: '}${'%'}${30}`,
  },
  {
    location: [
      26.098390899738032,
      49.7926234627169,
    ],

    tooltip: `${'Al Midra & WPY Warehouse'}<br>${'Inventory Value: '}$${1.6}MM<br> ${'Inventory %: '}${'%'}${30}`,
  },
]

function InventoryMap(props) {
  const { fullscreen = false } = props
  const { withMask } = useContext(maskContext)
  const mapRef = useRef(null)
  const { data = {} } = useBexJson('YCUS_ON_HAND_INV_DTL_02')
  const { chartData = [] } = data
  const [
    formattedData,
    setFormattedData,
  ] = useState([])

  const [
    isClient,
    setIsClient,
  ] = useState(false)

  const sumValue = formattedData.reduce((cum, cur) => cum + cur?.value, 0)

  useEffect(() => {
    setIsClient(true)
  }, [])
  useEffect(() => {
    if (chartData.length === 0) return
    setTimeout(async () => {
      const processorForGrouping = new DataQuery(chartData)
      const groupedWarehouse = processorForGrouping.groupBy('WHSE_NUM').toArray()
      const formattedGroupedWarehouses = groupedWarehouse.map(
        async ({ key, items }) => {
          if (!key || !items?.length) return
          const processor = new DataQuery(items || [])
          const groupedByCommodity = processor.groupBy('ZSBCOMMCD').toArray()
          const topCommodityUnsorted = groupedByCommodity.map(
            async ({ key, items }) => {
              if (!key || !items?.length) return

              const groupedByCommodityProcessor = new DataQuery(items)
              const sum = await groupedByCommodityProcessor.sum('VALUE001')
              return {
                key,
                sum,
              }
            }
          )
          const sortedResolvedCommidity = await Promise.all(topCommodityUnsorted)
          console.log({ [key]: sortedResolvedCommidity })
          const topResolvedCommodity = sortedResolvedCommidity.sort(
            (a, z) => z.sum - a.sum
          )?.[0]
          const warehouse = `${key}`
            .replace(/\bwarehouse\b|\bW.hse\b/i, '')
            .replace(' amp;', '&')
          const found = markersData.find((i) =>
            i.tooltip?.toLowerCase?.()?.includes?.(warehouse?.toLowerCase?.())
          )
          let [
            latitude,
            longitude,
          ] = Array.isArray(found?.location) ? found.location : []
          const value = await processor.sum('VALUE001')
          return {
            warehouse,
            topCommidity: `${topResolvedCommodity.key} (${Number(
              (topResolvedCommodity.sum / value) * 100
            ).toFixed(0)}%)`,
            value,
            latitude: items?.[0]?.ZEXISSC || latitude,
            longitude: items?.[0]?.ZEXFSSC || longitude,
          }
        }
      )
      const resolved = await Promise.all(formattedGroupedWarehouses)
      if (resolved) setFormattedData(resolved?.filter?.((i) => i?.value > 0))
    })
  }, [chartData.length])
  if (!isClient) return null
  const formattedLine = `<span class="invMap__tooltip__item"><strong>${'___'}</strong>  ++++  (----) <strong> — </strong>$$$$$`
  const tooltip = new Tooltip({
    triggers: {
      [LeafletMap.selectors.point]: (d) => {
        return d.isCluster
          ? `${d.clusterPoints
              .sort((a, z) => z?.value - a?.value)
              .map((i) =>
                formattedLine
                  .replace('___', `$${withMask(formatNumber(i?.value))}`)
                  .replace('++++', i.warehouse)
                  .replace('$$$$$', i.topCommidity)
                  .replace(
                    '----',
                    `${Number((i?.value / sumValue) * 100).toFixed(1)}%`
                  )
              )
              .join('')} `
          : formattedLine
              .replace('___', `$${withMask(formatNumber(d.properties?.value))}`)
              .replace('++++', d.properties.warehouse)
              .replace('$$$$$', d.properties.topCommidity)
              .replace(
                '----',
                `${Number((d.properties?.value / sumValue) * 100).toFixed(1)}%`
              )
      },
    },
  })
  const minValue = Math.min(...formattedData.map((i) => i?.value))
  const maxValue = sumValue
  let scale = scaleSqrt()
    .domain([
      minValue,
      maxValue,
    ])
    .range([
      28,
      42,
    ])
  setTimeout(async () => {
    await new Promise((r) => setTimeout(r, 2222))
    mapRef.current?.component?._map?.leaflet?.attributionControl?.setPrefix?.('')
  })
  // const key = '4Kb1ZXWgxApxewBQyWjD'
  // const style = `https://api.maptiler.com/maps/positron/style.json?key=${key}`
  const attribution = []
  let height = {}
  if (fullscreen) height = { height: '100%' }
  return (
    <React.Fragment>
      {console.log(formattedData) ||
        (formattedData?.length > 0 && (
          <VisLeafletMap
            {...height}
            ref={mapRef}
            flyToDuration={100}
            tooltip={tooltip}
            className={`${fullscreen ? 'leafletMapClass' : 'leafletMapClassSmall'}`}
            // style="https://server.arcgisonline.com/arcgis/rest/services/Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}"
            // style="https://dvb.aramco.com.sa:44303/SAP/BC/BSP/SAP/YSCM_MAPTILE_TE/{z}/{y}/{x}/image.jpg"
            // style={style}
            // style="https://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
            // style="https://server.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
            // style="https://server.arcgisonline.com/arcgis/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
            // style="https://server.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
            // style="https://server.arcgisonline.com/arcgis/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}"
            // style="https://server.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}"
            // style="https://server.arcgisonline.com/arcgis/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}"
            // style="https://arcgisportal.aramco.com.sa/arcgis/rest/services/GFDPRD_DEMservices/Terrain_Model/ImageServer/tile/{z}/{y}/{x}?f=json&token=M5bYt71_oB2_KH2FlYt9dOJuakm_H4yBDtRjb7WjYDD8qqbYsZgiGfea2dVDGCxVAMP_OFPO-UXerIHAKtOHkCr3ilQK46_awLFeKibKmE5C67r3wU4gLdGKDO2NKSJWPwFaHCZl6N-BxBff1w0gTK-QZceTpRWu2Ig8E5KW3nRBwiEwbQGPfD2QUVubidy5"
            // style="https://arcservermaps.aramco.com.sa:6443/arcgis/rest/services/EMAP_Services/CacheImageryWorldMercator/MapServer/tile/{z}/{y}/{x}"
            style="https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            // style="https://arcservermaps.aramco.com.sa:6443/arcgis/rest/services/EMAP_Services/TopoBasemap_WM/MapServer/tile/{z}/{y}/{x}"
            renderer={LeafletMapRenderer.Raster}
            data={formattedData}
            pointBottomLabel={(d) => d.warehouse}
            attribution={[]}
            pointRadius={(d) => (!isNaN(d?.value) ? scale(d?.value) : 11)}
            fitViewPadding={[
              0,
              0,
            ]}
            initialBounds={{
              northEast: {
                lat: 28,
                lng: 54,
              },
              southWest: {
                lat: 17.1,
                lng: 37.5,
              },
            }}
            clusteringDistance={80}
            clusterRadius={(d) =>
              scale(
                d.clusterPoints
                  .filter((d) => !isNaN(d?.value))
                  .reduce((cum, cur) => parseInt(cur?.value) + cum, 0)
              )
            }
            pointLabel={(d) => `$${withMask(formatNumber(d?.value))}`}
            clusterLabel={(d, ind) => {
              const value = formatNumber(
                d.clusterPoints
                  .filter((d) => !isNaN(d?.value))
                  .reduce((cum, cur) => parseInt(cur?.value) + cum, 0)
              )
              return `$${withMask(value)}`
            }}
          />
        ))}
    </React.Fragment>
  )
}

export default InventoryMap

// import ChartView from '../components/chart'
