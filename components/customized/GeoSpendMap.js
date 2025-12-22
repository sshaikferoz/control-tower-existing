import React, { useRef, useContext, useState, useEffect } from 'react'
import styles from './GeoSpendMap.module.css'
import GeoSpenMapTiles from './GeoSpendMapTiles'
import GeoSpenMapTiles2 from './GeoSpendMapTiles2'
import GeoSpenMapCommodityNav from './GeoSpendCommodityNav'
import GeoSpendTypeNav from './GeoSpendTypeNav'
import { maskContext } from '../../lib/maskContext'
import GeoSpendMapLegend from './GeoSpendMapLegend'

function getCategoryInvMapImage(categoryLayerToShow) {
  if (typeof categoryLayerToShow !== 'string') return 'OverallInvestment'
  console.log({ categoryLayerToShow })
  switch (true) {
    case Boolean(categoryLayerToShow.match(/static/i)):
      return 'Static'
    case Boolean(categoryLayerToShow.match(/electrical/i)):
      return 'electrical'
    case Boolean(categoryLayerToShow.match(/chemical/i)):
      return 'Chemicals'
    case Boolean(categoryLayerToShow.match(/drilling/i)):
      return 'Drilling'
    case Boolean(categoryLayerToShow.match(/Nonmetallic/i)):
      return 'Nonmetallic'
    case Boolean(categoryLayerToShow.match(/offshore/i)):
      return 'Offshore'
    case Boolean(categoryLayerToShow.match(/fire/i)):
      return 'fireprotection'
  }
  return 'OverallInvestment'
}

const totalSpendQry = {
  title: 'Total Spend',
  global: {
    techname: 'YSCM_CT_PROC_SPEND_YTD',
  },
  aoc: {
    techname: 'YSCM_AOC_PROC_SPEND_YTD',
  },
  asc: {
    techname: 'YSCM_ASC_PROC_SPEND_YTD',
  },
  asmo:{
    techname: 'YSCM_CT_SPEND_ASMO_TOT',
  },
  asia:{
    techname: 'YSCM_ASIA_PROC_SPEND_YTD',
  }
}

const totalMatSpendQry = {
  title: 'Direct Materials Spend',
  global: {
    techname: 'YSCM_CT_PROC_SPEND_BK',
  },
  aoc: {
    techname: 'YSCM_OOK_AOCCT_PROC_SPEND_BK',
  },
  asc: {
    techname: 'YSCM_ASC_PROC_SPEND_BK',
  },
  asmo:{
    techname: 'YSCM_CT_SPEND_ASMO_TOT',
  },
  asia:{
    techname: 'YSCM_ASIA_PROC_SPEND_BK',
  }
}

const totalSrvSpendQry = {
  title: 'Indirect Materials Spend',
  global: {
    techname: 'YSCM_CT_PROC_SPEND_SBK',
  },
  aoc: {
    techname: 'YSCM_OOK_AOCCT_PROC_SPEND_SBK',
  },
  asc: {
    techname: 'YSCM_ASC_PROC_SPEND_SBK',
  },
  asmo:{
    techname: 'YSCM_ASC_PROC_SPEND_SBK',
  },
  asia:{
    techname: 'YSCM_ASIA_PROC_SPEND_SBK',
  },
}

const mapQuery = {
  directSpend: {
    bexVariableTechname: 'YCOM_ML',
    title: 'Direct Materials Spend',
    global: {
      byCountry: 'YSCM_CT_PROC_SPEND_COUNTRIES',
      byCategory: 'YSCM_SCCT_MSPENDT_COM_00',
    },
    aoc: {
      byCountry: 'YSCM_AOC_MSPEND_CONT_00',
      byCategory: 'YSCM_AOC_MSPEND_COM_00',
    },
    asc: {
      byCountry: 'YSCM_ASC_MSPEND_CONT_00',
      byCategory: 'YSCM_ASC_MSPEND_COM_00',
    },
    asmo:{
      byCountry: 'YSCM_CT_SPEND_ASMO_CNTR',
      byCategory: 'YSCM_CT_SPEND_ASMO_COM',
    },
    asia:{
      byCountry: 'YSCM_ASIA_MSPEND_CONT_00',
      byCategory: 'YSCM_ASIA_MSPEND_COM_00',
    }
  },
  indirectSpend: {
    bexVariableTechname: 'YCOM_ML',
    title: 'Indirect Materials Spend',
    global: {
      byCountry: 'YSCM_INDRCTSPEND_COUNTRY',
      byCategory: 'YSCM_SCCT_INDIRECT_COMMODITY',
      click: '',
    },
  },
  totalSpend: {
    bexVariableTechname: 'YCOM_ML',
    title: 'Total Material Spend',
    global: {
      byCountry: 'YSCM_SCCT_MSPEND_CONT_00',
      byCategory: 'YSCM_SCCT_MSPEND_COM_00',
    },
  },
  sourcingGap: {
    bexVariableTechname: 'YCOM_ML',
    title: 'Sourcing Coverage',
    global: {
      byCountry: 'YSCM_SCCT_SOURCING_GAP_BY_CON',
      byCategory: 'YSCM_SCCT_SOURCING_GAP_BY_COM',
    },
    aoc: {
      byCountry: 'YSCM_OOK_AOCCT_SRCING_GAP_CNRY',
      byCategory: 'YSCM_OOK_AOCCT_SRCNG_GAP_COM',
    },
    asc: {
      byCountry: 'YSCM_OOK_ASCCT_SRCING_GAP_CNRY',
      byCategory: 'YSCM_OOK_ASCCT_SRCNG_GAP_COM',
    },
  },
  investment: {
    bexVariableTechname: 'YCOM_ML',
    title: 'Investments',
    global: {
      byCountry: 'YSCM_SCCT_INV_BY_COUNTRY',
      byCategory: 'YSCM_SCCT_INV_BY_COMMODITY',
    },
  },
}
const hueBaseMap = {
  directSpend: 214,
  indirectSpend: 280,
  totalSpend: 214,
  sourcingGap: 357,
  investment: 124,
}

export default function GeoSpendMap(props) {
  const { maskData } = useContext(maskContext)
  const [
    selectedCommodity,
    setSelectedCommodity,
  ] = useState(null)
  const [
    selectedSpendType,
    setSelectedSpendType,
  ] = useState('directSpend')
  const [
    selectedSpendMapArea,
    setSelectedSpendMapArea,
  ] = useState('global')
  const [
    mapForceRefresh,
    setMapForceRefresh,
  ] = useState(false)
  const shadowRef = useRef(null)

  const delayGen = () => {
    let timer = 0
    return (callback, ms = 300) => {
      try {
        clearTimeout(timer)
        timer = setTimeout(() => callback(), ms)
      } catch (e) {
        console.log({ e })
      }
    }
  }
  const showVisibilityDelay = delayGen()
  useEffect(() => {
    shadowRef.current?.addEventListener?.('mouseover', (e) => {
      showVisibilityDelay(async () => {
        shadowRef.current.style.opacity = '0'
        await new Promise((r) => setTimeout(r, 200))
        shadowRef.current.style.display = 'none'
      })
    })
    shadowRef.current?.addEventListener?.('mouseleave', (e) => {
      showVisibilityDelay(async () => {
        shadowRef.current.style.opacity = '0'
        shadowRef.current.style.display = 'block'
        await new Promise((r) => setTimeout(r, 200))
        shadowRef.current.style.opacity = '1'
      }, 5000)
    })
  }, [])

  useEffect(() => {
    setTimeout(async () => {
      setMapForceRefresh(true)
      console.log({ mapNoneForAlittleTime: true })
      await new Promise((r) => setTimeout(r, 20))
      console.log({ mapNoneDone: true })
      setMapForceRefresh(false)
    })
  }, [selectedSpendMapArea])
  return (
    <div
      style={{
        '--map-point-bg':
          selectedSpendMapArea === 'global'
            ? hueBaseMap[selectedSpendType]
            : hueBaseMap['directSpend'],
      }}
      className={styles.earthWrap}
    >
      <div className={styles.bg1}></div>
      <div className={styles.bg2}></div>
      <div className={styles.bg2}>
        <div
          className={styles.nav1}
          data-status={`${
            selectedSpendMapArea === 'global' ? 'active' : 'inActive'
          }`}
          onClick={() => setSelectedSpendMapArea('global')}
        >
          <img src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/global-icon.svg`} />
          <h4>GLOBAL</h4>
        </div>
        <div
          className={styles.nav2}
          data-status={`${selectedSpendMapArea === 'aoc' ? 'active' : 'inActive'}`}
          data-show={`${selectedSpendType === 'directSpend' ? 'show' : 'hide'}`}
          onClick={() => setSelectedSpendMapArea('aoc')}
        >
          <img src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/AOC-icon.svg`} />
          <h4>AOC</h4>
        </div>
        <div
          className={styles.nav3}
          data-show={`${selectedSpendType === 'directSpend' ? 'show' : 'hide'}`}
          data-status={`${selectedSpendMapArea === 'asc' ? 'active' : 'inActive'}`}
          onClick={() => setSelectedSpendMapArea('asc')}
        >
          <img src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/ASC-icon.svg`} />
          <h4>ASC</h4>
        </div>
        <div
          className={styles.nav4}
          data-show={`${selectedSpendType === 'directSpend' ? 'show' : 'hide'}`}
          data-status={`${selectedSpendMapArea === 'asia' ? 'active' : 'inActive'}`}
          onClick={() => setSelectedSpendMapArea('asia')}
        >
          <img width={44.5} src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/asia-icon.png`} />
          <h4>ASIA</h4>
        </div>

        <div
          className={styles.nav5}
          data-show={`${selectedSpendType === 'directSpend' ? 'show' : 'hide'}`}
          data-status={`${selectedSpendMapArea === 'asmo' ? 'active' : 'inActive'}`}
          onClick={() => setSelectedSpendMapArea('asmo')}
        >
          <img src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/logo-icon.svg`} />
          <h4>ASMO</h4>
        </div>
      </div>
      <div className={styles.bg3}></div>
      <div className={styles.earth}>
        {mapForceRefresh === false ? (
          selectedSpendType !== 'investment' ? (
            selectedSpendType !== 'sourcingGap' ? (
              <GeoSpenMapTiles
                query={mapQuery}
                selectedCommodity={selectedCommodity}
                spendType={
                  selectedSpendMapArea === 'global'
                    ? selectedSpendType
                    : 'directSpend'
                }
                spendMapArea={selectedSpendMapArea}
              />
            ) : (
              <GeoSpenMapTiles2
                query={mapQuery}
                selectedCommodity={selectedCommodity}
                spendType="sourcingGap"
                spendMapArea={selectedSpendMapArea}
              />
            )
          ) : (
            <img
              className={styles.investmentImg}
              src={`${
                process.env.NEXT_PUBLIC_SHAREK_INVESTMENT_URL
              }/${getCategoryInvMapImage(selectedCommodity)}${
                maskData ? '-masked' : ''
              }.jpg`}
              alt="spend investment"
            />
          )
        ) : null}
        <div
          style={{
            display: 'grid',
            alignContent: 'center',
            position: 'absolute',
            minWidth: '400px',
            justifyContent: 'center',
            insetInline: '0',
            height: '200px',
            marginBlockStart: 'auto',
            marginInline: 'auto',
          }}
        >
          <GeoSpendMapLegend
            query={mapQuery}
            spendType={
              selectedSpendMapArea === 'global' ? selectedSpendType : 'directSpend'
            }
          />
        </div>
      </div>
      <div ref={shadowRef} className={styles.earthShadow}></div>
      <div className={styles.commodity}>
        <GeoSpenMapCommodityNav
          query={mapQuery}
          spendType={
            selectedSpendMapArea === 'global' ? selectedSpendType : 'directSpend'
          }
          onSpendCommodityChange={(commodity) => {
            if (selectedSpendMapArea === 'global') setSelectedCommodity(commodity)
          }}
          selectedCommodity={selectedCommodity}
          spendMapArea={selectedSpendMapArea}
        />
      </div>
      <div className={styles.spendType}>
        <GeoSpendTypeNav
          query={{ totalMatSpendQry, totalSrvSpendQry, totalSpendQry, ...mapQuery }}
          onSpendTypeChange={(type) => {
            if (selectedSpendMapArea === 'global') setSelectedSpendType(type)
          }}
          spendMapArea={selectedSpendMapArea}
          spendType={
            selectedSpendMapArea === 'global' ? selectedSpendType : 'directSpend'
          }
        />
      </div>
    </div>
  )
}
