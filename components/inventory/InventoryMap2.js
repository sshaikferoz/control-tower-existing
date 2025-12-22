import { Tooltip, LeafletMap, LeafletMapRenderer } from '@unovis/ts'
import { scaleSqrt } from 'd3-scale'
import useBexJson from '../../lib/useBexJson'
import formatNumber from '../../lib/helpers/formatNumber'
import React, { useRef, useContext, useEffect, useState } from 'react'
import DataQuery from 'devextreme/data/query'
import { VisLeafletMap } from '@unovis/react'
import { maskContext } from '../../lib/maskContext'

function InventoryMap2(props) {
  const { fullscreen = false, box } = props
  const { withMask } = useContext(maskContext)
  const mapRef = useRef(null)
  const { data = {} } = useBexJson('YCUS_ON_HAND_INV_DTL_02')
  const [
    isClient,
    setIsClient,
  ] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  if (!isClient) return null
  setTimeout(async () => {
    await new Promise((r) => setTimeout(r, 2222))
    mapRef.current?.component?._map?.leaflet?.attributionControl?.setPrefix?.('')
  })
  let height = {}
  if (fullscreen) height = { height: '100%' }
  return (
    <React.Fragment>
      <VisLeafletMap
        {...height}
        ref={mapRef}
        flyToDuration={100}
        className={`${fullscreen ? 'leafletMapClass' : 'leafletMapClassSmall'}`}
        style="https://arcservermaps.aramco.com.sa:6443/arcgis/rest/services/EMAP_Services/CacheImageryWorldMercator/MapServer/tile/{z}/{y}/{x}"
        // style="https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        // style="http://127.0.0.1:3001/tile/{z}/{y}/{x}/image.jpg"
        renderer={LeafletMapRenderer.Raster}
        attribution={[]}
        fitViewPadding={[
          0,
          0,
        ]}
        initialBounds={{
          northEast: {
            lat: box[0],
            lng: box[1],
          },
          southWest: {
            lat: box[2],
            lng: box[3],
          },
        }}
        clusteringDistance={80}
      />
    </React.Fragment>
  )
}

export default InventoryMap2

// import ChartView from '../components/chart'
