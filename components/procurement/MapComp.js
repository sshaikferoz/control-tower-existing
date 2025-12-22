import React, { useRef, useMemo, useContext, useState, useEffect } from 'react'
import { scaleSqrt } from 'd3-scale'
import VectorMap, {
  Layer,
  Label,
  Background,
  ControlBar,
  Legend,
  Tooltip,
  Source,
  Annotation,
  CommonAnnotationSettings,
  Title,
  Margin,
  Font,
} from 'devextreme-react/vector-map'
import {
  LinearGauge,
  RangeContainer,
  Range,
  ValueIndicator,
} from 'devextreme-react/linear-gauge'

import mapsDataRaw from './../../lib/mapData'
import westEuropeRegion from './../../lib/mapDataWestEurope'
import eastEuropeRegion from './../../lib/mapDataEastEurope'
import canadaUSARegion from './../../lib/mapDataCanadaUSA'
import southAmericaRegion from './../../lib/mapDataSouthAmerica'
import GCCRegion from './../../lib/mapDataGCC'

import withComma from '../../lib/helpers/withComma'
import useBexJson from '../../lib/useBexJson'
import styles from './MapComp.module.css'
import getQueryCountryName, {
  findCoordinates,
  findDXCountryName,
} from '../../lib/helpers/getQueryCountryName'
import Dialog from '../common/Dialog'
import formatNumber, {
  formatToBillion,
  formatNumberInMM,
} from '../../lib/helpers/formatNumber'
import { useHotkeys } from 'react-hotkeys-hook'
import { maskContext } from '../../lib/maskContext'
import { getArgumentField } from '../../lib/dashboardConfig/helpers'
const RADIANS = Math.PI / 220
const WAGNER_6_P_LAT = Math.PI / Math.sqrt(3)
const WAGNER_6_U_LAT = 2 / Math.sqrt(3) - 0.1

const delayGen = () => {
  let timer = 0
  return (callback, ms = 1000) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(), ms)
  }
}
const hoverDelay = delayGen()
function AnnotationTemplate(annotation) {
  const { data, minSpend, maxSpend, isCurrencyFormat } = annotation
  let scale = scaleSqrt()
    .domain([
      minSpend,
      maxSpend,
    ])
    .range([
      55,
      80,
    ])
  let countryName = data.name
  let region = data.region
  if (countryName === 'United States') countryName = 'USA'
  if (countryName === 'Saudi Arabia') countryName = 'KSA'
  if (countryName === 'United Arab Emirates') {
    if (data?.spendType === 'sourcingGap' || data?.spendType === 'investment')
      countryName = 'UAE'
    else return null
  }
  if (countryName === 'Ireland') return null
  if (countryName === 'United Kingdom') countryName = 'UK'
  let TwoLineName = () => null
  if (countryName === 'South America' || countryName === 'South Africa') {
    scale = scaleSqrt()
      .domain([
        minSpend,
        maxSpend,
      ])
      .range([
        55,
        80,
      ])
    TwoLineName = () => (
      <>
        <text
          x="50%"
          y={cy - fontSize - 7}
          textAnchor="middle"
          fill={fontColor}
          fontSize={fontSize + 1}
          fontFamily="'Poppins'"
          dy=".3em"
        >
          {countryName.split(' ')[0]}
        </text>
        <text
          x="50%"
          y={cy - fontSize + 2}
          textAnchor="middle"
          fill={fontColor}
          fontSize={fontSize + 1}
          fontFamily="'Poppins'"
          dy=".3em"
        >
          {countryName.split(' ')[1]}
        </text>
      </>
    )
  }
  const spendForWidth = data.unMaskedSpend
  const widthHeight = scale(spendForWidth)
  const cx = widthHeight / 2
  const cy = widthHeight / 2
  let fontSize = 10
  if (widthHeight < 65) fontSize = 8

  let bgColor = data?.spendType === 'indirectSpend' ? '#8a8c8ddd' : '#5E8B77'
  if (data?.spendType === 'totalSpend') bgColor = 'var(--unify-accent2)'
  if (data?.spendType === 'investment') bgColor = 'rgb(48, 160 ,244,.88)'
  const fontColor = '#f9fafe'
  const borderColor = '#f4f6fa59'
  // sourcingGap svg template
  if (data?.spendType === 'sourcingGap') {
    // console.log({ data }, data.gapPercentage)
    const reminingPercentage = 100 - data.processPercentage
    const reminingPercentageFormatted = new Number(reminingPercentage).toFixed(0)
    const isZeroRemining = reminingPercentageFormatted === '0'

    return (
      <svg height="80" width="80" viewBox="-20 -20 90 90">
        <circle r="30" cx="30" cy="30" fill={`#ff797d`} />
        <circle
          r="15"
          cx="30"
          onMouseOut={(e) => hoverDelay(() => data.highlightRegion(null))}
          onMouseOver={(e) => data.highlightRegion(region)}
          cy="30"
          fill="transparent"
          stroke="#66bb6a"
          stroke-width="30"
          stroke-dasharray={`calc(${data?.gapPercentage} * 94.25 / 100) 94.25 `}
          // transform="rotate(-90) translate(-60)"
        />
        {!isZeroRemining && (
          <text
            x="48%"
            y="24%"
            textAnchor="middle"
            fill="black"
            fontFamily="'Poppins'"
            dy=".3em"
          >
            {reminingPercentageFormatted}%
          </text>
        )}
        <text
          x="35%"
          y={`${isZeroRemining ? '35%' : '47%'}`}
          textAnchor="middle"
          fill="black"
          fontFamily="'Poppins'"
          dy=".3em"
        >
          {new Number(data?.processPercentage).toFixed(0)}%
        </text>
      </svg>
    )
  }
  return (
    <svg id="customAnnotation" width={widthHeight} height={widthHeight}>
      <circle
        opacity={0.9}
        cx={cx}
        cy={cy}
        r={cx - 2}
        stroke={borderColor}
        strokeWidth={1}
        fill={bgColor}
      />
      {countryName === 'South America' || countryName === 'South Africa' ? (
        <TwoLineName />
      ) : (
        <text
          x="50%"
          y={cy - fontSize - 3}
          textAnchor="middle"
          fill={fontColor}
          fontSize={fontSize + 1}
          fontFamily="'Poppins'"
          dy=".3em"
        >
          {countryName}
        </text>
      )}
      <text
        x="50% "
        y={cy + (fontSize - 4)}
        textAnchor="middle"
        fill={fontColor}
        fontWeight={500}
        fontSize={fontSize + 4}
        fontFamily="'Poppins'"
        dy=".3em"
      >
        {isCurrencyFormat || data?.investmentPercentage
          ? `$${formatToBillion(data.spend, 2, 2)}`
          : formatNumber(data.spend, 0, '')}
      </text>
      <text
        x="50%"
        y={cy + fontSize * 2.3}
        textAnchor="middle"
        fill={fontColor}
        fontSize={fontSize}
        fontFamily="'Poppins'"
        dy=".3em"
      >
        {data?.investmentPercentage || `${data?.percentage}`}%
      </text>
    </svg>
  )
}
//queries map with categories
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
const getEcnodedVariable = (
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
const queriesCategoriesMap = [
  { YPDO_SCCT_MFR_PROFILE_01: 'drilling' },
  { YPDO_SCCT_MFR_PROFILE_02: 'chemicals' },
  { YPDO_SCCT_MFR_PROFILE_03: 'pipe' },
  { YPDO_SCCT_MFR_PROFILE_04: 'electrical' },
  { YPDO_SCCT_MFR_PROFILE_05: 'compressors' },
  { YPDO_SCCT_MFR_PROFILE_07: 'instrumentation' },
  { YPDO_SCCT_MFR_PROFILE_10: 'turbines' },
  { NOT_SPECIFIED01: 'Heat Transfer Equip' },
  { NOT_SPECIFIED02: 'Pipe Fittings' },
  { NOT_SPECIFIED03: 'Safety & Security Equip' },
  { NOT_SPECIFIED04: 'Valves' },
]

// categories statics
const materialCategories = [
  { MATL_GROUP__ZSBCOMMCD: 'Drilling' },
  { MATL_GROUP__ZSBCOMMCD: 'Chemicals' },
  { MATL_GROUP__ZPRCOMMCD: 'Static Equipment' },
  { MATL_GROUP__ZSBCOMMCD: 'Electrical' },
  { MATL_GROUP__ZPRCOMMCD: 'Machinery Equipment' },
  { MATL_GROUP__ZSBCOMMCD: 'Industrial Services' },
  { MATL_GROUP__ZPRCOMMCD: 'Instrumentation & IT' },
  { MATL_GROUP__ZSBCOMMCD: 'Pumps' },
  { MATL_GROUP__ZPRCOMMCD: 'Safety & Health' },
]
const customProjection = {
  aspectRatio: 1,

  to(coordinates) {
    const x = coordinates[0] * RADIANS
    const y = Math.min(
      Math.max(coordinates[1] * RADIANS, -WAGNER_6_P_LAT),
      +WAGNER_6_P_LAT
    )
    const t = (y / Math.PI) * 1.22
    return [
      (x / Math.PI) * Math.sqrt(1 - 3 * t * t),
      (y * 1.5) / Math.PI,
    ]
  },
  from(coordinates) {
    const x = coordinates[0]
    const y = Math.min(Math.max(coordinates[1], -WAGNER_6_U_LAT), +WAGNER_6_U_LAT)
    const t = y / 2
    return [
      (x * Math.PI) / Math.sqrt(1 - 3 * t * t) / RADIANS,
      (y * Math.PI) / 2 / RADIANS,
    ]
  },
}

export default function MapComp(props) {
  const { query, children, spendType: propsSpendType } = props
  const { withMask, maskData } = useContext(maskContext)

  let materialQueries = {}
  const [
    categoryLayerToShow,
    setCategoryLayerToShow,
  ] = useState(null)
  const [
    highlighted,
    setHighlighted,
  ] = useState(null)
  const [
    projection,
    setProjection,
  ] = useState(customProjection)
  const zoomFactorTracker = useRef(2)
  const dialogRef = useRef(null)
  const totalInvTrack = useRef(null)
  useEffect(() => {
    setCategoryLayerToShow(null)
  }, [propsSpendType])
  // useHotkeys('1', () => {
  //   setCategoryLayerToShow(null)
  // })
  // useHotkeys('2', () => {
  //   setCategoryLayerToShow('YPDO_SCCT_MFR_PROFILE_01')
  // })
  // useHotkeys('3', () => {
  //   setCategoryLayerToShow('YPDO_SCCT_MFR_PROFILE_02')
  // })
  // useHotkeys('4', () => {
  //   setCategoryLayerToShow('YPDO_SCCT_MFR_PROFILE_03')
  // })
  // useHotkeys('5', () => {
  //   setCategoryLayerToShow('YPDO_SCCT_MFR_PROFILE_07')
  // })
  // useHotkeys('6', () => {
  //   setCategoryLayerToShow('YPDO_SCCT_MFR_PROFILE_04')
  // })
  // useHotkeys('7', () => {
  //   setCategoryLayerToShow('YPDO_SCCT_MFR_PROFILE_10')
  // })
  // useHotkeys('8', () => {
  //   setCategoryLayerToShow('YPDO_SCCT_MFR_PROFILE_05')
  // })
  let queryForData = query?.[propsSpendType]?.byCountry
  const propsSpendTypeIsGapOrInvestment =
    propsSpendType === 'investment' || propsSpendType === 'sourcingGap'
  if (categoryLayerToShow !== null && propsSpendTypeIsGapOrInvestment)
    queryForData = getEcnodedVariable(categoryLayerToShow, queryForData, 'YSCM_TEXT')
  if (categoryLayerToShow !== null && !propsSpendTypeIsGapOrInvestment)
    queryForData = getEcnodedVariable(categoryLayerToShow)

  const spendData = useBexJson(queryForData, {
    staleTime: 60000,
  })
  const { data: categorySpendData } = useBexJson(
    query?.[propsSpendType]?.byCategory,
    {
      staleTime: 60000,
    }
  )
  // console.log({ spendData, categorySpendData })
  const { chartData = [] } = spendData?.data || {}
  const countryField = getArgumentField(spendData?.data?.chartData)
  const categoryField = getArgumentField(categorySpendData?.chartData)
  const GCC_ME = [
    'Jordan',
    'KSA',
    'Egypt',
    'Bahrain',
    'Oman',
    'UAE',
    'Kuwait',
    'Qatar',
  ]
  const regions = {
    'GCC & ME': GCC_ME,
    'GCC amp; ME': GCC_ME,
    'GCC  amp; ME': GCC_ME,
    'West Europe': [
      'France',
      'Germany',
      'Austria',
      'Belgium',
      'Czech Republic',
      'Denmark',
      'Finland',
      'Greece',
      'Ireland',
      'Italy',
      'Luxembourg',
      'Monaco',
      'Netherlands',
      'Norway',
      'Portugal',
      'Spain',
      'Sweden',
      'Switzerland',
      'United Kingdom',
    ],
    'North & South America': [],
    Europe: [
      'Poland',
      'Ukraine',
      'Romania',
      'Spain',
      'France',
      'Germany',
      'Austria',
      'Belgium',
      'Czech Republic',
      'Denmark',
      'Finland',
      'Greece',
      'Ireland',
      'Italy',
      'Luxembourg',
      'Monaco',
      'Netherlands',
      'Norway',
      'Portugal',
      'Sweden',
      'Switzerland',
      'United Kingdom',
      'Turkey',
      'Bulgaria',
      'Hungary',
      'Russian Fed.',
      'Slovakia',
      'White Russia',
    ],
    'East Europe': [
      'Poland',
      'Turkey',
      'Bulgaria',
      'Hungary',
      'Romania',
      'Russian Fed.',
      'Slovakia',
      'Ukraine',
      'White Russia',
    ],
    'US & Canada': [
      'Canada',
      'USA',
    ],
    'North & South America': [
      'USA',
      'Canada',
      'Brazil',
      'Mexico',
      'Argentina',
      'Colombia',
    ],
    'South America & Mexico': [
      'Brazil',
      'Mexico',
      'Argentina',
      'Colombia',
    ],
    'Others-Asia': [
      'Indonesia',
      'Malaysia',
      'Singapore',
      'Taiwan',
      'Thailand',
    ],
    'Others Asia': [
      'Indonesia',
      'Malaysia',
      'Singapore',
      'Taiwan',
      'Thailand',
    ],
  }

  const regionsCoordinates = {
    Europe: [
      31.16558,
      48.379433,
    ],
    'East Europe': [
      31.16558,
      48.379433,
    ],
    'South America & Mexico': [
      -102.552784,
      23.634501,
    ],
    'North & South America': [
      -102.552784,
      23.634501,
    ],
  }
  function customizeLayer(elements) {
    if (chartData.length === 0) return
    const queryCountriesMappedWithArray = chartData?.map((bexCountry) => {
      const spendValueKey = propsSpendType === 'investment' ? 'VALUE002' : 'VALUE001'
      const countryKey =
        categoryLayerToShow === null || propsSpendTypeIsGapOrInvestment
          ? countryField
          : 'MANUFACTOR__0COUNTRY'
      if (regions[bexCountry[countryKey]])
        return regions[bexCountry[countryKey]].map((item) => {
          return {
            country: findDXCountryName(item),
            spend: bexCountry[spendValueKey],
          }
        })
      return {
        country: findDXCountryName(bexCountry[countryKey]),
        spend: bexCountry[spendValueKey],
      }
    })
    const queryCountriesMapped = queryCountriesMappedWithArray.reduce((cum, cur) => {
      if (Array.isArray(cur)) {
        cur.forEach((item) => {
          cum.push(item)
        })
      } else {
        cum.push(cur)
      }
      return cum
    }, [])
    elements.map((element) => {
      let dxCountryName = element.attribute('name')

      const qCountryNameSpend = queryCountriesMapped.find(
        (item) => item.country === dxCountryName
      )
      // console.log({ qCountryNameSpend, dxCountryName })
      if (qCountryNameSpend) element.attribute('spend', qCountryNameSpend.spend)
    })
  }
  const getSortedFormatedCounties = useMemo(() => {
    if (!Array.isArray(spendData?.data?.chartData)) return []
    // by country
    let spendKey = propsSpendType === 'investment' ? 'VALUE002' : 'VALUE001'

    const totalSpend =
      chartData.reduce((cum, cur) => cum + Number(cur.VALUE001), 0) || 0
    const allCountiesSorted = chartData
      .filter((item) => item[countryField]?.match?.(/overall result/i) === null)
      .sort?.((a, z) => {
        return Number(z[spendKey]) - Number(a[spendKey])
      })
    const totalCountries = allCountiesSorted?.length || 0
    const countryKey =
      categoryLayerToShow === null || propsSpendTypeIsGapOrInvestment
        ? countryField
        : 'MANUFACTOR__0COUNTRY'

    const allSpendCounties = allCountiesSorted.map((country) => ({
      percentage: Number((country.VALUE001 / totalSpend) * 100)?.toFixed(0),
      spend: Number(country[spendKey]),
      investmentCount: propsSpendType === 'investment' && country?.VALUE001,
      investmentValue: propsSpendType === 'investment' && Number(country[spendKey]),
      investmentPercentage:
        propsSpendType === 'investment' && Number(country?.VALUE003).toFixed(0),

      countryName:
        findDXCountryName(country[countryKey]) ||
        regions?.[country[countryKey]]?.[0],
      countryBexName: country[countryKey],
      coordinates:
        findCoordinates(country[countryKey]) || regionsCoordinates[countryKey],
      VALUE002: country.VALUE002 || null,
      VALUE003: country.VALUE003 || null,
      VALUE004: country.VALUE004 || null,
      VALUE005: country.VALUE005 || null,
    }))
    const [
      brazil = {},
      argentina = {},
    ] = allSpendCounties.filter(
      ({ countryName }) => countryName === 'Brazil' || countryName === 'Argentina'
    )
    const [southAfrica] = allSpendCounties.filter(
      ({ countryName }) => countryName === 'South Africa'
    )
    const { spend: brazilSpend = 0 } = brazil
    const { spend: argentinaSpend = 0 } = argentina
    let totalBrazilArgentina = argentinaSpend + brazilSpend

    const southAmericaAndAfrica = [
      {
        ...argentina,
        ...brazil,
        spend: totalBrazilArgentina,
        countryName: 'South America',
      },
      {
        ...southAfrica,
      },
    ]
    const minSpend = allCountiesSorted?.[totalCountries - 1]?.[spendKey] || 0
    const maxSpend = allCountiesSorted?.[0]?.[spendKey] || 0
    const spendRange = allCountiesSorted?.map((country) => country.spend)
    return {
      allSpendCounties,
      minSpend,
      maxSpend,
      spendRange,
      southAmericaAndAfrica,
    }
  }, [spendData])
  const getSortedCategories = useMemo(() => {
    if (
      !Array.isArray(categorySpendData?.chartData) ||
      categorySpendData?.chartData?.length === 0
    )
      return []
    // by category
    const totalSpendByCategory =
      categorySpendData?.chartData?.reduce?.(
        (cum, cur) => cum + Number(cur.VALUE001),
        0
      ) || 0
    totalInvTrack.current =
      categorySpendData?.chartData
        ?.filter((item) => item[categoryField]?.match?.(/overall result/i) === null)
        ?.reduce?.((cum, cur) => cum + Number(cur.VALUE002), 0) || 0
    const allCategoriesSorted =
      categorySpendData.chartData
        .filter((item) => item[categoryField]?.match?.(/overall result/i) === null)
        .sort?.((a, z) => {
          if (propsSpendType === 'investment') {
            const valProp = 'VALUE002'
            if (z.VALUE002) return Number(z[valProp]) - Number(a[valProp])
          }
          if (propsSpendType === 'sourcingGap') {
            const valProp = 'VALUE005'
            if (z.VALUE005) return Number(a[valProp]) - Number(z[valProp])
          }
          const valProp = 'VALUE001'
          return Number(z[valProp]) - Number(a[valProp])
        }) || []

    const allspendCategories = allCategoriesSorted?.map?.((category) => ({
      percentage:
        propsSpendType === 'sourcingGap'
          ? `${new Number(category.VALUE002).toFixed(0)}%`
          : `${Number((category.VALUE001 / totalSpendByCategory) * 100)?.toFixed(
              0
            )}%`,
      percentageWithDecimal:
        propsSpendType === 'sourcingGap'
          ? `${new Number(category.VALUE002).toFixed(1)}%`
          : `${Number((category.VALUE001 / totalSpendByCategory) * 100)?.toFixed(
              1
            )}%`,
      spend: Number(category.VALUE001),
      count: propsSpendType === 'investment' && Number(category.VALUE001),
      investment:
        propsSpendType === 'investment' &&
        `$${formatNumber(Number(category.VALUE002))}`,
      categoryName: category[categoryField],
      gapProcessed: category.VALUE004,
      gapApproved: category.VALUE003,
    }))
    const smallList =
      !isNaN(allspendCategories?.length) && allspendCategories.length < 7
    return allspendCategories
      .map((i, ind) => {
        const [
          title = '',
          variableKey = '',
        ] =
          Object.entries(categoryTextVariablemap).find((c) => {
            const [
              key,
              val,
            ] = c
            if (key) return key.match(new RegExp(i.categoryName, 'i'))
            return false
          }) || []
        if (title)
          return {
            variableTechname: variableKey,
            title,
            ...i,
          }
        return i
      })
      .filter((i, ind) => ind < 7)
      .filter(Boolean)
      .map((category, ind) => {
        const categoryItemSelected =
          category.variableTechname === categoryLayerToShow ||
          category.categoryName === categoryLayerToShow
        return (
          <li
            key={category?.variableTechname || category?.categoryName}
            className={styles.materialCategory}
            onClick={() => {
              if (categoryItemSelected) setCategoryLayerToShow(null)
              else
                setCategoryLayerToShow(
                  propsSpendTypeIsGapOrInvestment
                    ? category?.categoryName
                    : category?.variableTechname
                )
            }}
            style={{
              '--material-category-min-height': smallList ? '9em' : 'unset',
              '--material-category-bg': categoryItemSelected ? '#143a7b' : '#195494',
              '--material-category-shadow': categoryItemSelected
                ? '2px 2px 0px rgba(26, 40, 97,.7),  -2px -2px 0px rgba(46, 89, 175,.7)'
                : 'var(--block-shadow)',
            }}
          >
            <h4>{category?.categoryName?.replace?.('amp;', '&')}</h4>
            {categoryItemSelected && propsSpendType === 'sourcingGap' ? (
              <div style={{ position: 'relative', marginTop: '-2.4em' }}>
                <div className={styles.gapLegendsForSelected}>
                  <ul>
                    <li>Closed</li>
                    <li>In-Process</li>
                  </ul>
                </div>
                <LinearGauge
                  scale={{
                    label: {
                      format: (arg) => (arg === 100 ? `${arg}%` : arg),
                    },
                  }}
                  tooltip={{
                    enabled: true,
                    format: (arg) => `${new Number(arg).toFixed(1)}%`,
                  }}
                  id="c1"
                  value={
                    100 - category?.gapApproved > 1
                      ? category?.gapApproved
                      : Math.floor(category?.gapApproved)
                  }
                >
                  <RangeContainer>
                    <Range
                      startValue={0}
                      endValue={`${
                        100 - category?.gapApproved > 1
                          ? category?.gapApproved
                          : Math.floor(category?.gapApproved)
                      }`}
                      color="rgb(163, 200, 61)"
                    />
                    <Range
                      startValue={
                        100 - category?.gapApproved > 1
                          ? category?.gapApproved
                          : Math.floor(category?.gapApproved)
                      }
                      endValue={100}
                      color="#ff797d"
                    />
                  </RangeContainer>
                  <ValueIndicator
                    type="rectangle"
                    color="rgb(163, 200, 61)"
                    width={`${100 - category?.gapApproved > 1 ? '2' : '1'}`}
                  ></ValueIndicator>
                </LinearGauge>
              </div>
            ) : (
              <div className={styles.categoryValuePercent}>
                <span>
                  {propsSpendType === 'sourcingGap'
                    ? `${withComma(category?.spend, 0)} Gaps`
                    : category.count ||
                      `$${formatToBillion(withMask(category?.spend, 0))}`}
                </span>
                <span>
                  {category?.investment
                    ? withMask(category?.investment)
                    : `${
                        category?.percentage === '0%'
                          ? category?.percentageWithDecimal
                          : category?.percentage
                      }`}
                </span>
              </div>
            )}
          </li>
        )
      })
  }, [
    categorySpendData,
    categoryLayerToShow,
    maskData,
  ])

  function getCategoryInvMapImage() {
    if (typeof categoryLayerToShow !== 'string') return 'OverallInvestment'
    console.log({ categoryLayerToShow })
    switch (true) {
      case Boolean(categoryLayerToShow.match(/static/i)):
        return 'Static&Rotating'
      case Boolean(categoryLayerToShow.match(/electrical/i)):
        return 'ElectricalInstrumentation&IT'
      case Boolean(categoryLayerToShow.match(/chemical/i)):
        return 'Chemicals'
      case Boolean(categoryLayerToShow.match(/drilling/i)):
        return 'Drilling'
      case Boolean(categoryLayerToShow.match(/Nonmetallic/i)):
        return 'Nonmetallic'
      case Boolean(categoryLayerToShow.match(/offshore/i)):
        return 'Offshore'
      case Boolean(categoryLayerToShow.match(/fire/i)):
        return 'FireProtectionSystems'
    }
    return 'OverallInvestment'
  }

  function customizeLegendText(arg) {
    if (arg.start === minColorRange) return 'Low'
    else if (arg.end === maxColorRange) return 'High'
  }

  function equalCoord(coord1, coord2) {
    return (
      Array.isArray(coord1) &&
      Array.isArray(coord2) &&
      coord1.length === 2 &&
      coord2.length === 2 &&
      coord1[0] === coord2[0] &&
      coord1[1] === coord2[1]
    )
  }

  // Removing unnecessary areas from the map
  const customMap = JSON.parse(mapsDataRaw)
  const westEuropeMap = JSON.parse(westEuropeRegion)
  const eastEuropeMap = JSON.parse(eastEuropeRegion)
  const canadaUSAMap = JSON.parse(canadaUSARegion)
  const southAmericaMap = JSON.parse(southAmericaRegion)
  const gccMap = JSON.parse(GCCRegion)

  // const colorGroups = [99999 ,1000000,8000000,99999999,400000000,2000000000,3000000000,4000000000]
  const colorGroups = [
    1,
    1000000,
    60000000,
    1000000000,
    2500000000,
    95000000000,
  ]
  const colorGroupsForGaps = [
    1,
    50,
    110,
    170,
    200,
    5000000000,
  ]
  const colorGroupsForInvestment = [
    1,
    100000,
    4000000,
    10000000,
    56000000,
    95000000000,
  ]
  const colorGroupsForFactories = [
    1,
    20,
    65,
    170,
    270,
    95000000000,
  ]

  // const palette = ['#e4daf1','#efdbff','#dbc4ed','#b397cb','#9f81ba','#8c6ca9','#795798','#664388','#532f78']
  const palette =
    propsSpendType === 'investment'
      ? ['#b1add6'] // ['#d4d3ea', '#c6def1', '#a6cae5', '#90b8d7', '#6597bd', '#1274bd']
      : [
          '#d4d3ea',
          '#b1add6',
          '#7f7dbb',
          '#7a5ca7',
          '#7f3f98',
          '#812e91',
        ]
  // const palette = ['#d4d3ea', '#b1add6', '#7f7dbb', '#7a5ca7', '#7f3f98', '#812e91']

  const minColorRange = colorGroups[0]
  const maxColorRange = colorGroups[colorGroups.length - 1]

  // Original Bounds: [-180, 85, 180, -60]
  // Custom Bounds: [-280, 85, 100, -100]
  // Original Center: [-38, 49]
  const center = [
    0.0,
    46.036,
  ]

  // const formatNumber = new Intl.NumberFormat('en-US', {
  //   minimumFractionDigits: 0,
  // }).format

  const getCategoryDescription = () => {
    const found = queriesCategoriesMap.find((r, ind) => r[categoryLayerToShow])
    if (!found) return ''
    const description = Object.values(found)[0]
    if (categorySpendData?.chartData) {
      const found = categorySpendData.chartData.find((i) => {
        const key = Object.keys(i).find((v) => v && !v.startsWith('VALUE0'))
        return description.match(new RegExp(i[key], 'i'))
      })
      if (found) return Object.values(found)[0]
    }
    return description || ''
  }
  let topLimit = 5
  if (categoryLayerToShow === null) topLimit = 10

  if (propsSpendType === 'sourcingGap') topLimit = 13
  if (propsSpendType === 'investment') topLimit = 11
  const minSpend = getSortedFormatedCounties?.minSpend
  const maxSpend = getSortedFormatedCounties?.maxSpend
  const spendRange = getSortedFormatedCounties?.spendRange
  const scale = scaleSqrt()
    .domain([
      minSpend,
      maxSpend,
    ])
    .range([
      78,
      105,
    ])
  // if (!Array.isArray(chartData) || chartData?.length === 0) return null
  return (
    <div className={styles.container}>
      <div
        style={{
          '--globe-path': `url(${process.env.NEXT_PUBLIC_BSP_NAME}/images/globe.png)`,
        }}
        className={styles.mapWrapper}
      >
        <span></span>
        <span></span>
        <span></span>
        <div className={styles.mapAnimation}>
          {propsSpendType !== 'investment' ? (
            <VectorMap
              style={{
                opacity: '.92',
              }}
              elementAttr={{ id: 'vector-map' }}
              zoomFactor={zoomFactorTracker.current}
              center={[
                13,
                32,
              ]}
              projection={projection}
              onZoomFactorChanged={(d) => {
                if (d.zoomFactor < 2.8) {
                  zoomFactorTracker.current = d.zoomFactor
                  setTimeout(async () => {
                    setProjection(customProjection)
                  })
                } else {
                  zoomFactorTracker.current = d.zoomFactor
                  setTimeout(async () => {
                    setProjection('mercator')
                  })
                }
              }}
            >
              <ControlBar enabled={false} />
              <CommonAnnotationSettings render={AnnotationTemplate} type="custom" />
              {getSortedFormatedCounties?.allSpendCounties
                ?.filter?.((country, ind) => {
                  return ind < topLimit
                })
                ?.reverse?.()
                ?.map(
                  (
                    {
                      percentage,
                      spend,
                      investmentCount,
                      investmentValue,
                      investmentPercentage,
                      countryName,
                      countryBexName,
                      coordinates,
                      VALUE002,
                      VALUE004,
                      VALUE005,
                    },
                    ind
                  ) => (
                    <Annotation
                      key={ind}
                      arrowLength={0}
                      arrowWidth={0}
                      opacity={0.5}
                      isCurrencyFormat={categoryLayerToShow === null}
                      minSpend={getSortedFormatedCounties?.minSpend}
                      maxSpend={getSortedFormatedCounties?.maxSpend}
                      // color={palette[ind]}
                      offsetY={scale?.(spend) / 6}
                      border={{ cornerRadius: '300%' }}
                      coordinates={coordinates || findCoordinates(countryName)}
                      range={spendRange}
                      data={{
                        spendType: propsSpendType,
                        name: countryName,
                        percentage,
                        spend: withMask(spend),
                        investmentCount: investmentCount,
                        investmentValue: investmentValue,
                        investmentPercentage: investmentPercentage,
                        unMaskedSpend: spend,
                        gapPercentage: VALUE002,
                        processPercentage: VALUE002,
                        numOfGap: VALUE004,
                        approveGap: VALUE005,
                        region: countryBexName,
                        highlightRegion: (region) => setHighlighted(region),
                      }}
                    />
                  )
                )}

              <Layer
                borderColor="#3334"
                name="areas"
                dataSource={customMap}
                hoverEnabled={false}
                palette={palette}
                colorGroups={
                  propsSpendTypeIsGapOrInvestment
                    ? propsSpendType === 'investment'
                      ? colorGroupsForInvestment
                      : colorGroupsForGaps
                    : categoryLayerToShow === null
                    ? colorGroups
                    : colorGroupsForFactories
                }
                color="#e4deed"
                colorGroupingField="spend"
                customize={customizeLayer}
                hoveredBorderColor={'red'}
              >
                <Label enabled={false} dataField="name"></Label>
              </Layer>
              <Layer
                name="gcc"
                borderWidth={0}
                hoverEnabled={false}
                dataSource={gccMap}
                color={`${
                  highlighted === 'GCC  amp; ME' || highlighted === 'GCC & ME'
                    ? '#3334'
                    : 'transparent'
                }`}
              />
              <Layer
                name="NSA"
                borderWidth={0}
                hoverEnabled={false}
                dataSource={southAmericaMap}
                color={`${
                  highlighted === 'North & South America' ? '#3334' : 'transparent'
                }`}
              />
              <Layer
                name="EU"
                borderWidth={0}
                hoverEnabled={false}
                dataSource={eastEuropeMap}
                color={`${highlighted === 'Europe' ? '#3334' : 'transparent'}`}
              />
              <Tooltip
                arrowLength={0}
                arrowWidth={0}
                opacity={0}
                border={{ cornerRadius: '300%' }}
                contentRender={(props) => {
                  let dxCountryName = props?.attribute?.('name')
                  const qCountryName = getQueryCountryName(dxCountryName)

                  const founCountryItem =
                    getSortedFormatedCounties?.allSpendCounties?.find(
                      (item) => item.countryName === props.attribute('name')
                    )
                  const {
                    percentage,
                    spend,
                    investmentCount,
                    investmentValue,
                    investmentPercentage,
                    countryName,
                    coordinates,
                    name_short,
                  } = founCountryItem || {}
                  if (countryName)
                    return (
                      <div>
                        <AnnotationTemplate
                          isCurrencyFormat={categoryLayerToShow === null}
                          minSpend={getSortedFormatedCounties?.minSpend}
                          maxSpend={getSortedFormatedCounties?.maxSpend}
                          coordinates={coordinates}
                          range={spendRange}
                          data={{
                            spendType: propsSpendType,
                            investmentCount: investmentCount,
                            investmentValue: investmentValue,
                            investmentPercentage: investmentPercentage,
                            name: countryName,
                            percentage,
                            spend: withMask(spend),
                            unMaskedSpend: spend,
                          }}
                        />
                      </div>
                    )
                }}
                enabled={propsSpendType !== 'sourcingGap'}
              />
              <Legend
                visible={propsSpendTypeIsGapOrInvestment ? false : true}
                orientation="horizontal"
                horizontalAlignment="center"
                verticalAlignment="top"
                backgroundColor="transparent"
                border={false}
                customizeText={customizeLegendText}
                margin={{ top: 70 }}
                title={{
                  margin: { bottom: 10, right: 10 },
                  font: {
                    weight: '500',
                    color: '#acabaf',
                  },

                  text: query[propsSpendType].title,
                }}
              >
                <Margin top={30} left={33} />
                <Source layer="areas" grouping="color" />
              </Legend>
              {/* <Tooltip contentRender={() => <div>hello</div>} enabled={true} /> */}
              <Background color="transparent" borderColor="transparent" />
            </VectorMap>
          ) : (
            <div className={styles.invMap}>
              <img
                src={`${
                  process.env.NEXT_PUBLIC_SHAREK_INVESTMENT_URL
                }/${`${getCategoryInvMapImage()}${maskData ? '-Masked' : ''}`}.png`}
                alt="spend investment"
              />
            </div>
          )}
        </div>
        {propsSpendTypeIsGapOrInvestment && (
          <div className={styles.gapLegends}>
            <h4>{query[propsSpendType].title}</h4>
            {propsSpendType === 'sourcingGap' && (
              <ul>
                <li>Closed</li>
                <li>In-Process</li>
              </ul>
            )}
            {propsSpendType === 'investment' && (
              <h4
                style={{
                  lineHeight: '.0',
                  color: 'white',
                  opacity: '.8',
                  fontWeight: '300',
                }}
              >
                ${formatNumber(withMask(totalInvTrack.current))}
              </h4>
            )}{' '}
            <div
              style={{
                marginInlineStart: '1.8em',
                marginTop: propsSpendTypeIsGapOrInvestment ? '2em' : '0em',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {highlighted?.replace('amp;', '&')}
            </div>
          </div>
        )}
      </div>
      <div className={styles.stack}>
        {/* <h3 className={styles.spendTitle}>Commodity Spend</h3> */}
        <ul className={styles.materialCategoryWrap}>{getSortedCategories}</ul>
      </div>
    </div>
  )
}
