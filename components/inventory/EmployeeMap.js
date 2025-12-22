import { scaleSqrt } from 'd3-scale'
import mapsDataRaw from './../../lib/mapData'
import useBexJson from '../../lib/useBexJson'
import React, { useRef, useEffect, useState } from 'react'
import styles from './EmployeeMap.module.css'
import DataQuery from 'devextreme/data/query'
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

const delayGen = () => {
  let timer = 0
  return (callback, ms = 100) => {
    clearTimeout(timer)
    timer = setTimeout(() => callback(), ms)
  }
}

const thresholdDelay = delayGen()

const prettyNumber = new Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 4,
})
const RADIANS = Math.PI / 220
const WAGNER_6_P_LAT = Math.PI / Math.sqrt(3)
const WAGNER_6_U_LAT = 2 / Math.sqrt(3) - 0.1
const coordinatesMap = {
  999: { coordinates: [], name: ' Unknown' },
  AB: { coordinates: [], name: 'AB' },
  AF: {
    coordinates: [
      67.709953,
      33.93911,
    ],
    name: 'Afghanistan',
  },
  AL: {
    coordinates: [
      20.168331,
      41.153332,
    ],
    name: 'Albania',
  },
  DZ: {
    coordinates: [
      1.659626,
      28.033886,
    ],
    name: 'Algeria',
  },
  VI: {
    coordinates: [
      -64.896335,
      18.335765,
    ],
    name: 'Amer.Virgin Is.',
  },
  AD: {
    coordinates: [
      1.601554,
      42.546245,
    ],
    name: 'Andorra',
  },
  AO: {
    coordinates: [
      17.873887,
      -11.202692,
    ],
    name: 'Angola',
  },
  AI: {
    coordinates: [
      -63.068615,
      18.220554,
    ],
    name: 'Anguilla',
  },
  AQ: {
    coordinates: [
      -0.071389,
      -75.250973,
    ],
    name: 'Antarctica',
  },
  AG: {
    coordinates: [
      -61.796428,
      17.060816,
    ],
    name: 'Antigua/Barbuda',
  },
  AR: {
    coordinates: [
      -63.616672,
      -38.416097,
    ],
    name: 'Argentina',
  },
  AM: {
    coordinates: [
      45.038189,
      40.069099,
    ],
    name: 'Armenia',
  },
  AW: {
    coordinates: [
      -69.968338,
      12.52111,
    ],
    name: 'Aruba',
  },
  AU: {
    coordinates: [
      133.775136,
      -25.274398,
    ],
    name: 'Australia',
  },
  AT: {
    coordinates: [
      14.550072,
      47.516231,
    ],
    name: 'Austria',
  },
  AZ: {
    coordinates: [
      47.576927,
      40.143105,
    ],
    name: 'Azerbaijan',
  },
  BS: {
    coordinates: [
      -77.39628,
      25.03428,
    ],
    name: 'Bahamas',
  },
  BH: {
    coordinates: [
      50.637772,
      25.930414,
    ],
    name: 'Bahrain',
  },
  BD: {
    coordinates: [
      90.356331,
      23.684994,
    ],
    name: 'Bangladesh',
  },
  BB: {
    coordinates: [
      -59.543198,
      13.193887,
    ],
    name: 'Barbados',
  },
  BE: {
    coordinates: [
      4.469936,
      50.503887,
    ],
    name: 'Belgium',
  },
  BZ: {
    coordinates: [
      -88.49765,
      17.189877,
    ],
    name: 'Belize',
  },
  BJ: {
    coordinates: [
      2.315834,
      9.30769,
    ],
    name: 'Benin',
  },
  BM: {
    coordinates: [
      -64.75737,
      32.321384,
    ],
    name: 'Bermuda',
  },
  BT: {
    coordinates: [
      90.433601,
      27.514162,
    ],
    name: 'Bhutan',
  },
  BO: {
    coordinates: [
      -63.588653,
      -16.290154,
    ],
    name: 'Bolivia',
  },
  RS: {
    coordinates: [
      17.679076,
      43.915886,
    ],
    name: 'Serbia',
  },
  BA: {
    coordinates: [
      17.679076,
      43.915886,
    ],
    name: 'Bosnia-Herz.',
  },
  BW: {
    coordinates: [
      24.684866,
      -22.328474,
    ],
    name: 'Botswana',
  },
  BV: {
    coordinates: [
      3.413194,
      -54.423199,
    ],
    name: 'Bouvet Island',
  },
  BR: {
    coordinates: [
      -56.92528,
      -14.235004,
    ],
    name: 'Brazil',
  },
  IO: {
    coordinates: [
      71.876519,
      -6.343194,
    ],
    name: 'Brit.Ind.Oc.Ter',
  },
  VG: {
    coordinates: [
      -64.639968,
      18.420695,
    ],
    name: 'Brit.Virgin Is.',
  },
  BN: {
    coordinates: [
      114.727669,
      4.535277,
    ],
    name: 'Brunei Dar-es-S',
  },
  BG: {
    coordinates: [
      25.48583,
      42.733883,
    ],
    name: 'Bulgaria',
  },
  BF: {
    coordinates: [
      -1.561593,
      12.238333,
    ],
    name: 'Burkina-Faso',
  },
  BU: { coordinates: [], name: 'Burma' },
  BI: {
    coordinates: [
      29.918886,
      -3.373056,
    ],
    name: 'Burundi',
  },
  KH: {
    coordinates: [
      104.990963,
      12.565679,
    ],
    name: 'Cambodia',
  },
  CM: {
    coordinates: [
      12.354722,
      7.369722,
    ],
    name: 'Cameroon',
  },
  CA: {
    coordinates: [
      -106.346771,
      56.130366,
    ],
    name: 'Canada',
  },
  CV: {
    coordinates: [
      -24.013197,
      16.002082,
    ],
    name: 'Cape Verde',
  },
  KY: {
    coordinates: [
      -80.566956,
      19.513469,
    ],
    name: 'Cayman Islands',
  },
  CF: {
    coordinates: [
      20.939444,
      6.611111,
    ],
    name: 'Central Afr.Rep',
  },
  TD: {
    coordinates: [
      18.732207,
      15.454166,
    ],
    name: 'Chad',
  },
  CL: {
    coordinates: [
      -71.542969,
      -35.675147,
    ],
    name: 'Chile',
  },
  CN: {
    coordinates: [
      104.195397,
      35.86166,
    ],
    name: 'China',
  },
  CX: {
    coordinates: [
      105.690449,
      -10.447525,
    ],
    name: 'Christmas Islnd',
  },
  CC: {
    coordinates: [
      96.870956,
      -12.164165,
    ],
    name: 'Coconut Islands',
  },
  CO: {
    coordinates: [
      -74.297333,
      4.570868,
    ],
    name: 'Colombia',
  },
  KM: {
    coordinates: [
      43.872219,
      -11.875001,
    ],
    name: 'Comoros',
  },
  CD: {
    coordinates: [
      21.758664,
      -4.038333,
    ],
    name: 'Congo',
  },
  CG: {
    coordinates: [
      15.827659,
      -0.228021,
    ],
    name: 'Congo',
  },
  CK: {
    coordinates: [
      -159.777671,
      -21.236736,
    ],
    name: 'Cook Islands',
  },
  CR: {
    coordinates: [
      -83.753428,
      9.748917,
    ],
    name: 'Costa Rica',
  },
  HR: {
    coordinates: [
      15.2,
      45.1,
    ],
    name: 'Croatia',
  },
  CU: {
    coordinates: [
      -77.781167,
      21.521757,
    ],
    name: 'Cuba',
  },
  CY: {
    coordinates: [
      33.429859,
      35.126413,
    ],
    name: 'Cyprus',
  },
  CZ: {
    coordinates: [
      15.472962,
      49.817492,
    ],
    name: 'Czech Republic',
  },
  DK: {
    coordinates: [
      9.501785,
      56.26392,
    ],
    name: 'Denmark',
  },
  DJ: {
    coordinates: [
      42.590275,
      11.825138,
    ],
    name: 'Djibouti',
  },
  DM: {
    coordinates: [
      -61.370976,
      15.414999,
    ],
    name: 'Dominica',
  },
  DO: {
    coordinates: [
      -70.162651,
      18.735693,
    ],
    name: 'Dominican Rep.',
  },
  AN: {
    coordinates: [
      -69.060087,
      12.226079,
    ],
    name: 'Dutch Antilles',
  },
  TP: { coordinates: [], name: 'East Timor' },
  EC: {
    coordinates: [
      -78.183406,
      -1.831239,
    ],
    name: 'Ecuador',
  },
  EG: {
    coordinates: [
      30.802498,
      26.820553,
    ],
    name: 'Egypt',
  },
  SV: {
    coordinates: [
      -88.89653,
      13.794185,
    ],
    name: 'El Salvador',
  },
  GQ: {
    coordinates: [
      10.267895,
      1.650801,
    ],
    name: 'Equatorial Gui.',
  },
  ER: {
    coordinates: [
      39.782334,
      15.179384,
    ],
    name: 'Eritrea',
  },
  EE: {
    coordinates: [
      25.013607,
      58.595272,
    ],
    name: 'Estonia',
  },
  ET: {
    coordinates: [
      40.489673,
      9.145,
    ],
    name: 'Ethiopia',
  },
  FK: {
    coordinates: [
      -59.523613,
      -51.796253,
    ],
    name: 'Falkland Islnds',
  },
  FO: {
    coordinates: [
      -6.911806,
      61.892635,
    ],
    name: 'Faroe Islands',
  },
  FJ: {
    coordinates: [
      179.414413,
      -16.578193,
    ],
    name: 'Fiji',
  },
  FI: {
    coordinates: [
      25.748151,
      61.92411,
    ],
    name: 'Finland',
  },
  FR: {
    coordinates: [
      -2.213749,
      46.227638,
    ],
    name: 'France',
  },
  PF: {
    coordinates: [
      -149.406843,
      -17.679742,
    ],
    name: 'Frenc.Polynesia',
  },
  GF: {
    coordinates: [
      -53.125782,
      3.933889,
    ],
    name: 'French Guayana',
  },
  TF: {
    coordinates: [
      69.348557,
      -49.280366,
    ],
    name: 'French S.Territ',
  },
  GA: {
    coordinates: [
      11.609444,
      -0.803689,
    ],
    name: 'Gabon',
  },
  GM: {
    coordinates: [
      -15.310139,
      13.443182,
    ],
    name: 'Gambia',
  },
  GE: {
    coordinates: [
      43.356892,
      42.315407,
    ],
    name: 'Georgia',
  },
  DE: {
    coordinates: [
      11.451526,
      53.165691,
    ],
    name: 'Germany',
  },
  GH: {
    coordinates: [
      -1.023194,
      7.946527,
    ],
    name: 'Ghana',
  },
  GI: {
    coordinates: [
      -5.345374,
      36.137741,
    ],
    name: 'Gibraltar',
  },
  GR: {
    coordinates: [
      21.824312,
      39.074208,
    ],
    name: 'Greece',
  },
  GL: {
    coordinates: [
      -42.604303,
      71.706936,
    ],
    name: 'Greenland',
  },
  GD: {
    coordinates: [
      -61.604171,
      12.262776,
    ],
    name: 'Grenada',
  },
  GP: {
    coordinates: [
      -62.067641,
      16.995971,
    ],
    name: 'Guadeloupe',
  },
  GU: {
    coordinates: [
      144.793731,
      13.444304,
    ],
    name: 'Guam',
  },
  GT: {
    coordinates: [
      -90.230759,
      15.783471,
    ],
    name: 'Guatemala',
  },
  GN: {
    coordinates: [
      -9.696645,
      9.945587,
    ],
    name: 'Guinea',
  },
  GW: {
    coordinates: [
      -15.180413,
      11.803749,
    ],
    name: 'Guinea-Bissau',
  },
  GY: {
    coordinates: [
      -58.93018,
      4.860416,
    ],
    name: 'Guyana',
  },
  HT: {
    coordinates: [
      -72.285215,
      18.971187,
    ],
    name: 'Haiti',
  },
  HM: {
    coordinates: [
      73.504158,
      -53.08181,
    ],
    name: 'Heard/McDon.Isl',
  },
  HN: {
    coordinates: [
      -86.241905,
      15.199999,
    ],
    name: 'Honduras',
  },
  HK: {
    coordinates: [
      114.109497,
      22.396428,
    ],
    name: 'Hong Kong',
  },
  HU: {
    coordinates: [
      19.503304,
      47.162494,
    ],
    name: 'Hungary',
  },
  IS: {
    coordinates: [
      -19.020835,
      64.963051,
    ],
    name: 'Iceland',
  },
  IK: { coordinates: [], name: 'In Kingdom' },
  IN: {
    coordinates: [
      78.96288,
      20.593684,
    ],
    name: 'India',
  },
  ID: {
    coordinates: [
      113.921327,
      -0.789275,
    ],
    name: 'Indonesia',
  },
  IR: {
    coordinates: [
      53.688046,
      32.427908,
    ],
    name: 'Iran',
  },
  IQ: {
    coordinates: [
      43.679291,
      33.223191,
    ],
    name: 'Iraq',
  },
  IE: {
    coordinates: [
      -8.24389,
      53.41291,
    ],
    name: 'Ireland',
  },
  IL: {
    coordinates: [
      34.851612,
      31.046051,
    ],
    name: 'Israel',
  },
  IT: {
    coordinates: [
      8.56738,
      39.87194,
    ],
    name: 'Italy',
  },
  CI: {
    coordinates: [
      -5.54708,
      7.539989,
    ],
    name: 'Ivory Coast',
  },
  JM: {
    coordinates: [
      -77.297508,
      18.109581,
    ],
    name: 'Jamaica',
  },
  JP: {
    coordinates: [
      142.252924,
      46.204824,
    ],
    name: 'Japan',
  },
  JO: {
    coordinates: [
      36.238414,
      30.585164,
    ],
    name: 'Jordan',
  },
  KZ: {
    coordinates: [
      66.923684,
      48.019573,
    ],
    name: 'Kazakhstan',
  },
  KE: {
    coordinates: [
      37.906193,
      -0.023559,
    ],
    name: 'Kenya',
  },
  KI: {
    coordinates: [
      -168.734039,
      -3.370417,
    ],
    name: 'Kiribati',
  },
  KW: {
    coordinates: [
      47.481766,
      29.31166,
    ],
    name: 'Kuwait',
  },
  KG: {
    coordinates: [
      74.766098,
      41.20438,
    ],
    name: 'Kyrgyzstan',
  },
  LA: {
    coordinates: [
      102.495496,
      19.85627,
    ],
    name: 'Laos',
  },
  LV: {
    coordinates: [
      24.603189,
      56.879635,
    ],
    name: 'Latvia',
  },
  LB: {
    coordinates: [
      35.862285,
      33.854721,
    ],
    name: 'Lebanon',
  },
  LG: { coordinates: [], name: 'Lebanon Refugee' },
  LS: {
    coordinates: [
      28.233608,
      -29.609988,
    ],
    name: 'Lesotho',
  },
  LR: {
    coordinates: [
      -9.429499,
      6.428055,
    ],
    name: 'Liberia',
  },
  LY: {
    coordinates: [
      17.228331,
      26.3351,
    ],
    name: 'Libya',
  },
  LI: {
    coordinates: [
      9.555373,
      47.166,
    ],
    name: 'Liechtenstein',
  },
  LT: {
    coordinates: [
      23.881275,
      55.169438,
    ],
    name: 'Lithuania',
  },
  LM: { coordinates: [], name: 'LTN America(OT)' },
  LU: {
    coordinates: [
      6.129583,
      49.815273,
    ],
    name: 'Luxembourg',
  },
  MO: {
    coordinates: [
      113.543873,
      22.198745,
    ],
    name: 'Macau',
  },
  MK: {
    coordinates: [
      21.745275,
      41.608635,
    ],
    name: 'Macedonia',
  },
  MG: {
    coordinates: [
      46.869107,
      -18.766947,
    ],
    name: 'Madagascar',
  },
  MW: {
    coordinates: [
      34.301525,
      -13.254308,
    ],
    name: 'Malawi',
  },
  MY: {
    coordinates: [
      101.975766,
      4.210484,
    ],
    name: 'Malaysia',
  },
  MV: {
    coordinates: [
      73.22068,
      3.202778,
    ],
    name: 'Maldives',
  },
  ML: {
    coordinates: [
      -3.996166,
      17.570692,
    ],
    name: 'Mali',
  },
  MT: {
    coordinates: [
      14.375416,
      35.937496,
    ],
    name: 'Malta',
  },
  MH: {
    coordinates: [
      171.184478,
      7.131474,
    ],
    name: 'Marshall Islnds',
  },
  MQ: {
    coordinates: [
      -61.024174,
      14.641528,
    ],
    name: 'Martinique',
  },
  MR: {
    coordinates: [
      -10.940835,
      21.00789,
    ],
    name: 'Mauretania',
  },
  MU: {
    coordinates: [
      57.552152,
      -20.348404,
    ],
    name: 'Mauritius',
  },
  YT: {
    coordinates: [
      45.166244,
      -12.8275,
    ],
    name: 'Mayotte',
  },
  MX: {
    coordinates: [
      -102.552784,
      23.634501,
    ],
    name: 'Mexico',
  },
  FM: {
    coordinates: [
      150.550812,
      7.425554,
    ],
    name: 'Micronesia',
  },
  UM: { coordinates: [], name: 'Minor Outl.Ins.' },
  MD: {
    coordinates: [
      28.369885,
      47.411631,
    ],
    name: 'Moldavia',
  },
  MC: {
    coordinates: [
      7.412841,
      43.750298,
    ],
    name: 'Monaco',
  },
  MN: {
    coordinates: [
      103.846656,
      46.862496,
    ],
    name: 'Mongolia',
  },
  MS: {
    coordinates: [
      -62.187366,
      16.742498,
    ],
    name: 'Montserrat',
  },
  MA: {
    coordinates: [
      -7.09262,
      31.791702,
    ],
    name: 'Morocco',
  },
  MZ: {
    coordinates: [
      35.529562,
      -18.665695,
    ],
    name: 'Mozambique',
  },
  MM: {
    coordinates: [
      95.956223,
      21.913965,
    ],
    name: 'Myanmar',
  },
  MP: {
    coordinates: [
      145.38469,
      17.33083,
    ],
    name: 'N.Mariana Islnd',
  },
  NA: {
    coordinates: [
      18.49041,
      -22.95764,
    ],
    name: 'Namibia',
  },
  NR: {
    coordinates: [
      166.931503,
      -0.522778,
    ],
    name: 'Nauru',
  },
  NP: {
    coordinates: [
      84.124008,
      28.394857,
    ],
    name: 'Nepal',
  },
  NL: {
    coordinates: [
      5.291266,
      52.132633,
    ],
    name: 'Netherlands',
  },
  NC: {
    coordinates: [
      165.618042,
      -20.904305,
    ],
    name: 'New Caledonia',
  },
  NZ: {
    coordinates: [
      174.885971,
      -40.900557,
    ],
    name: 'New Zealand',
  },
  NI: {
    coordinates: [
      -85.207229,
      12.865416,
    ],
    name: 'Nicaragua',
  },
  NE: {
    coordinates: [
      8.081666,
      17.607789,
    ],
    name: 'Niger',
  },
  NG: {
    coordinates: [
      8.675277,
      9.081999,
    ],
    name: 'Nigeria',
  },
  NU: {
    coordinates: [
      -169.867233,
      -19.054445,
    ],
    name: 'Niue Islands',
  },
  NF: {
    coordinates: [
      167.954712,
      -29.040835,
    ],
    name: 'Norfolk Island',
  },
  KP: {
    coordinates: [
      127.510093,
      40.339852,
    ],
    name: 'North Korea',
  },
  NO: {
    coordinates: [
      8.468946,
      60.472024,
    ],
    name: 'Norway',
  },
  OM: {
    coordinates: [
      55.923255,
      21.512583,
    ],
    name: 'Oman',
  },
  OOK: { coordinates: [], name: ' Out Of Kingdom' },
  PK: {
    coordinates: [
      69.345116,
      30.375321,
    ],
    name: 'Pakistan',
  },
  PW: {
    coordinates: [
      134.58252,
      7.51498,
    ],
    name: 'Palau',
  },
  PS: {
    coordinates: [
      35.233154,
      31.952162,
    ],
    name: 'Palestine(ALL)',
  },
  PA: {
    coordinates: [
      -80.782127,
      8.537981,
    ],
    name: 'Panama',
  },
  PG: {
    coordinates: [
      143.95555,
      -6.314993,
    ],
    name: 'Papua Nw Guinea',
  },
  PY: {
    coordinates: [
      -58.443832,
      -23.442503,
    ],
    name: 'Paraguay',
  },
  PE: {
    coordinates: [
      -75.015152,
      -9.189967,
    ],
    name: 'Peru',
  },
  PH: {
    coordinates: [
      121.774017,
      12.879721,
    ],
    name: 'Philippines',
  },
  PN: {
    coordinates: [
      -127.439308,
      -24.703615,
    ],
    name: 'Pitcairn Islnds',
  },
  PL: {
    coordinates: [
      19.145136,
      51.919438,
    ],
    name: 'Poland',
  },
  PT: {
    coordinates: [
      -8.224454,
      39.399872,
    ],
    name: 'Portugal',
  },
  PR: {
    coordinates: [
      -66.590149,
      18.220833,
    ],
    name: 'Puerto Rico',
  },
  QA: {
    coordinates: [
      51.183884,
      25.354826,
    ],
    name: 'Qatar',
  },
  RE: {
    coordinates: [
      55.536384,
      -21.115141,
    ],
    name: 'Reunion',
  },
  RO: {
    coordinates: [
      24.96676,
      45.943161,
    ],
    name: 'Romania',
  },
  RW: {
    coordinates: [
      29.873888,
      -1.940278,
    ],
    name: 'Ruanda',
  },
  RU: {
    coordinates: [
      105.318756,
      61.52401,
    ],
    name: 'Russian Fed.',
  },
  GS: {
    coordinates: [
      -36.587909,
      -54.429579,
    ],
    name: 'S. Sandwich Ins',
  },
  ST: {
    coordinates: [
      6.613081,
      0.18636,
    ],
    name: 'S.Tome,Principe',
  },
  AS: {
    coordinates: [
      -170.132217,
      -14.270972,
    ],
    name: 'Samoa, American',
  },
  SM: {
    coordinates: [
      12.457777,
      43.94236,
    ],
    name: 'San Marino',
  },
  SA: {
    coordinates: [
      41.079162,
      15.885942,
    ],
    name: 'Saudi Arabia',
  },
  SN: {
    coordinates: [
      -14.452362,
      14.497401,
    ],
    name: 'Senegal',
  },
  SC: {
    coordinates: [
      55.491977,
      -4.679574,
    ],
    name: 'Seychelles',
  },
  SL: {
    coordinates: [
      -11.779889,
      8.460555,
    ],
    name: 'Sierra Leone',
  },
  SG: {
    coordinates: [
      103.819836,
      1.352083,
    ],
    name: 'Singapore',
  },
  SK: {
    coordinates: [
      19.699024,
      48.669026,
    ],
    name: 'Slovakia',
  },
  SI: {
    coordinates: [
      14.995463,
      46.151241,
    ],
    name: 'Slovenia',
  },
  SB: {
    coordinates: [
      160.156194,
      -9.64571,
    ],
    name: 'Solomon Islands',
  },
  SO: {
    coordinates: [
      46.199616,
      5.152149,
    ],
    name: 'Somalia',
  },
  ZA: {
    coordinates: [
      22.937506,
      -30.559482,
    ],
    name: 'South Africa',
  },
  KR: {
    coordinates: [
      127.766922,
      35.907757,
    ],
    name: 'South Korea',
  },
  ES: {
    coordinates: [
      -3.74922,
      40.463667,
    ],
    name: 'Spain',
  },
  LK: {
    coordinates: [
      80.771797,
      7.873054,
    ],
    name: 'Sri Lanka',
  },
  KN: {
    coordinates: [
      -62.782998,
      17.357822,
    ],
    name: 'St Kitts&Nevis',
  },
  SH: {
    coordinates: [
      -10.030696,
      -24.143474,
    ],
    name: 'St. Helena',
  },
  LC: {
    coordinates: [
      -60.978893,
      13.909444,
    ],
    name: 'St. Lucia',
  },
  VC: {
    coordinates: [
      -61.287228,
      12.984305,
    ],
    name: 'St. Vincent',
  },
  PM: {
    coordinates: [
      -56.27111,
      46.941936,
    ],
    name: 'St.Pier,Miquel.',
  },
  STL: { coordinates: [], name: ' stateless' },
  SD: {
    coordinates: [
      30.217636,
      12.862807,
    ],
    name: 'Sudan',
  },
  SR: {
    coordinates: [
      -56.027783,
      3.919305,
    ],
    name: 'Suriname',
  },
  SJ: {
    coordinates: [
      23.670272,
      77.553604,
    ],
    name: 'Svalbard',
  },
  SZ: {
    coordinates: [
      31.465866,
      -26.522503,
    ],
    name: 'Swaziland',
  },
  SE: {
    coordinates: [
      18.643501,
      60.128161,
    ],
    name: 'Sweden',
  },
  CH: {
    coordinates: [
      13.827512,
      45.818188,
    ],
    name: 'Switzerland',
  },
  SY: {
    coordinates: [
      38.996815,
      34.802075,
    ],
    name: 'Syria',
  },
  TW: {
    coordinates: [
      120.960515,
      23.69781,
    ],
    name: 'Taiwan',
  },
  TJ: {
    coordinates: [
      71.276093,
      38.861034,
    ],
    name: 'Tajikstan',
  },
  TZ: {
    coordinates: [
      34.888822,
      -6.369028,
    ],
    name: 'Tanzania',
  },
  TH: {
    coordinates: [
      100.992541,
      15.870032,
    ],
    name: 'Thailand',
  },
  TG: {
    coordinates: [
      0.824782,
      8.619543,
    ],
    name: 'Togo',
  },
  TK: {
    coordinates: [
      -171.855881,
      -8.967363,
    ],
    name: 'Tokelau Islands',
  },
  TO: {
    coordinates: [
      -175.198242,
      -21.178986,
    ],
    name: 'Tonga',
  },
  TT: {
    coordinates: [
      -61.222503,
      10.691803,
    ],
    name: 'Trinidad,Tobago',
  },
  TN: {
    coordinates: [
      9.537499,
      33.886917,
    ],
    name: 'Tunisia',
  },
  TR: {
    coordinates: [
      35.243322,
      38.963745,
    ],
    name: 'Turkey',
  },
  TM: {
    coordinates: [
      59.556278,
      38.969719,
    ],
    name: 'Turkmenistan',
  },
  TC: {
    coordinates: [
      -71.797928,
      21.694025,
    ],
    name: 'Turksh Caicosin',
  },
  TV: {
    coordinates: [
      177.64933,
      -7.109535,
    ],
    name: 'Tuvalu',
  },
  UG: {
    coordinates: [
      32.290275,
      1.373333,
    ],
    name: 'Uganda',
  },
  UA: {
    coordinates: [
      31.16558,
      48.379433,
    ],
    name: 'Ukraine',
  },
  UK: {
    coordinates: [
      -7.435973,
      55.378051,
    ],
    name: 'United Kingdom',
  },
  GB: {
    coordinates: [
      -7.435973,
      55.378051,
    ],
    name: 'United Kingdom',
  },
  UY: {
    coordinates: [
      -55.765835,
      -32.522779,
    ],
    name: 'Uruguay',
  },
  US: {
    coordinates: [
      -95.712891,
      37.09024,
    ],
    name: 'USA',
  },
  AE: {
    coordinates: [
      57.447818,
      26.424076,
    ],
    name: 'UAE',
  },
  UZ: {
    coordinates: [
      64.585262,
      41.377491,
    ],
    name: 'Uzbekistan',
  },
  VU: {
    coordinates: [
      166.959158,
      -15.376706,
    ],
    name: 'Vanuatu',
  },
  VA: {
    coordinates: [
      12.453389,
      41.902916,
    ],
    name: 'Vatican City',
  },
  VE: {
    coordinates: [
      -66.58973,
      6.42375,
    ],
    name: 'Venezuela',
  },
  VN: {
    coordinates: [
      108.277199,
      14.058324,
    ],
    name: 'Vietnam',
  },
  WF: {
    coordinates: [
      -177.156097,
      -13.768752,
    ],
    name: 'Wallis,Futuna',
  },
  EH: {
    coordinates: [
      -12.885834,
      24.215527,
    ],
    name: 'West Sahara',
  },
  WS: {
    coordinates: [
      -172.104629,
      -13.759029,
    ],
    name: 'Western Samoa',
  },
  BY: {
    coordinates: [
      27.953389,
      53.709807,
    ],
    name: 'White Russia',
  },
  YE: {
    coordinates: [
      48.516388,
      15.552727,
    ],
    name: 'Yemen',
  },
  YU: { coordinates: [], name: 'Yugoslavia' },
  ZR: { coordinates: [], name: 'Zaire' },
  ZM: {
    coordinates: [
      27.849332,
      -13.133897,
    ],
    name: 'Zambia',
  },
  ZW: {
    coordinates: [
      29.154857,
      -19.015438,
    ],
    name: 'Zimbabwe',
  },
}
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

const customMap = JSON.parse(mapsDataRaw)
const palette = [
  '#d4d3ea',
  '#b1add6',
  '#7f7dbb',
  '#7a5ca7',
  '#7f3f98',
  '#812e91',
]
function EmployeeBubble(props) {
  const { data = {} } = props
  if (isNaN(data.employeeTotal) || data.employeeTotal < data?.threshold) return ''
  const totalPercentage = Number((data.employeeTotal / data.totalSum) * 100).toFixed(
    1
  )
  const cx = 36
  const cy = 36
  let fontSize = 10
  const fontColor = 'white'
  const borderColor = '#8abdda'
  const bgColor = 'rgb(31 173 167)'
  return (
    <svg
      className={styles.svgBubble}
      id="customAnnotation"
      width={cx * 2}
      height={cx * 2}
    >
      <circle
        opacity={0.9}
        cx={cx}
        cy={cy}
        r={cx - 2}
        stroke={borderColor}
        strokeWidth={1}
        fill={bgColor}
      />
      <text
        x="50%"
        y={cy - fontSize - 3}
        textAnchor="middle"
        fill={fontColor}
        fontSize={fontSize + 1}
        fontFamily="'Poppins'"
        dy=".3em"
      >
        {data.name?.length > 11
          ? data.code === 'GB'
            ? 'UK'
            : data.code
          : data.name}
      </text>
      <text
        x="50% "
        y={cy + (fontSize - 6)}
        textAnchor="middle"
        fill={fontColor}
        fontWeight={500}
        fontSize={fontSize + 2}
        fontFamily="'Poppins'"
        dy=".3em"
      >
        {prettyNumber.format(data.employeeTotal)}
      </text>
      <text
        x="50% "
        y={cy + (fontSize + 11)}
        textAnchor="middle"
        fill={fontColor}
        fontWeight={200}
        fontSize={fontSize}
        fontFamily="'Poppins'"
        dy=".3em"
      >
        %{totalPercentage}
      </text>
    </svg>
  )
}

function EmployeeMap(props) {
  const { tileSize = 'lg' } = props
  const { data = {} } = useBexJson('YSCM_CT_EMP_EXTER_ASSIGNM_01&DISPLAY_KEY=X')
  let { chartData = [] } = data
  let styleForList = {}
  let styleForListItem = {}
  if (tileSize === 'sm') {
    styleForListItem = { scale: '.88', backgroundColor: 'oklab(0.39 -0.01 -0.13)' }
    styleForList = {
      gap: '0',
      marginBlockStart: '1.5em',
      marginInlineEnd: '0em',
      '--active-item-color': 'oklab(0.44 -0.02 -0.15)',
    }
  }

  const [
    pause,
    setPause,
  ] = useState(false)
  const [
    filter,
    setFilter,
  ] = useState(null)
  const [
    projection,
    setProjection,
  ] = useState(customProjection)
  const [
    threshold,
    setThreshold,
  ] = useState(72)
  const [
    typeList,
    setTypeList,
  ] = useState(null)

  const defaultCoordinates = [
    53,
    52,
  ]
  const defaultZoom = 1.5
  const defaultThresholdPercentage = 0.04
  const zoomFactorTracker = useRef(defaultZoom)
  const mapCenterTracker = useRef(defaultCoordinates)
  const combinedFormattedDataSaved = useRef(null)
  const thresholdPercentageTracker = useRef(defaultThresholdPercentage)
  const inputRef = useRef(null)
  const mapRef = useRef(null)
  const [
    formattedData,
    setFormattedData,
  ] = useState([])
  let totalEmployee = Number(0)
  const updateFilter = (combined) => {
    const isCountryFilter = Object.keys(coordinatesMap).includes(filter)
    if (isCountryFilter) {
      setFormattedData(combinedFormattedDataSaved.current || combined)
      return
    }
    let currentFilter = filter || 'all'
    refreshTrheshold({
      dataSetKey: currentFilter,
      localFormattedData: combinedFormattedDataSaved.current || combined,
    })
    thresholdDelay(() => {
      setFormattedData(combinedFormattedDataSaved.current || combined)
    })
  }
  useEffect(() => {
    setTimeout(async () => {
      if (chartData.length === 0) return
      if (combinedFormattedDataSaved.current === null) {
        let data = [...chartData]

        const processorByType = new DataQuery(data)
        const groupedByType = processorByType
          .groupBy('ZSACTTYP')
          .toArray()
          .map(({ key, items }) => {
            const detail = {
              total: items?.reduce?.((cum, cur) => cum + cur?.['VALUE001'] || 0, 0),
              emp: items?.reduce?.((cum, cur) => cum + cur?.['VALUE002'] || 0, 0),
              dep: items?.reduce?.((cum, cur) => cum + cur?.['VALUE003'] || 0, 0),
            }
            return { key, ...detail, items }
          })
          .sort((a, z) => z.total - a.total)
        console.log({ groupedByType })
        setTypeList(groupedByType)
        const groupedByTypeFormatted = groupedByType.map(({ key, items }) => {
          // console.log({ key, items })
          return {
            [key]: items.map((item) => ({
              countryCode: item?.['COUNTRY_key'],
              countryName: item?.['COUNTRY'],
              travelType: item?.['ZSACTTYP'],
              coordinates: coordinatesMap[item?.['COUNTRY_key']]?.coordinates || [],
              total: item?.['VALUE001'],
              emp: item?.['VALUE002'],
              dep: item?.['VALUE003'],
            })),
          }
        })

        const processorForGrouping = new DataQuery(data)
        const groupedEmployee = processorForGrouping.groupBy('COUNTRY_key').toArray()
        const formattedEmployeeAllContries = groupedEmployee.map(
          async ({ key, items }) => {
            if (key === 'SA') console.log({ SA_items: items })
            const processor = new DataQuery(items || [])
            return {
              countryCode: key,
              countryName: items?.[0]?.['COUNTRY'],
              coordinates: coordinatesMap[key]?.coordinates || [],
              total: await processor.sum('VALUE001'),
              emp: await processor.sum('VALUE002'),
              dep: await processor.sum('VALUE003'),
            }
          }
        )
        const formattedEmployeePerContry = groupedEmployee.map(({ key, items }) => {
          if (key === 'SA') console.log({ SA_items: items })
          return {
            [key]: items
              .map((item) => ({
                countryCode: key,
                countryName: item?.['COUNTRY'],
                travelType: item?.['ZSACTTYP'],
                coordinates: coordinatesMap[key]?.coordinates || [],
                total: item?.['VALUE001'],
                emp: item?.['VALUE002'],
                dep: item?.['VALUE003'],
              }))
              .sort((a, z) => z.total - a.total),
          }
        })
        const resolvedGroupedEmployee = await Promise.all(
          formattedEmployeeAllContries
        )
        console.log({ resolvedGroupedEmployee, groupedEmployee })
        const resolvedGroupedEmployeeSorted = resolvedGroupedEmployee.sort(
          (a, z) => {
            return z.total - a.total
          }
        )
        const [
          filter1 = {},
          filter2 = {},
          filter3 = {},
          filter4 = {},
          filter5 = {},
          filter6 = {},
          filter7 = {},
          filter8 = {},
          filter9 = {},
          filter10 = {},
          filter11 = {},
          filter12 = {},
          filter13 = {},
          filter14 = {},
          filter15 = {},
          filter16 = {},
          filter17 = {},
          filter18 = {},
        ] = groupedByTypeFormatted
        const [
          country1 = {},
          country2 = {},
          country3 = {},
          country4 = {},
          country5 = {},
          country6 = {},
          country7 = {},
          country8 = {},
          country9 = {},
          country10 = {},
          country11 = {},
          country12 = {},
          country13 = {},
          country14 = {},
          country15 = {},
          country16 = {},
          country17 = {},
          country18 = {},
          country19 = {},
          country20 = {},
          country21 = {},
          country22 = {},
          country23 = {},
          country24 = {},
          country25 = {},
          country26 = {},
          country27 = {},
          country28 = {},
          country29 = {},
          country30 = {},
          country31 = {},
          country32 = {},
          country33 = {},
          country34 = {},
          country35 = {},
          country36 = {},
          country37 = {},
          country38 = {},
          country39 = {},
          country40 = {},
          country41 = {},
          country42 = {},
          country43 = {},
          country44 = {},
          country45 = {},
          country46 = {},
          country47 = {},
          country48 = {},
          country49 = {},
          country50 = {},
          country51 = {},
          country52 = {},
          country53 = {},
          country54 = {},
          country55 = {},
          country56 = {},
          country57 = {},
          country58 = {},
          country59 = {},
        ] = formattedEmployeePerContry
        totalEmployee = resolvedGroupedEmployee.reduce(
          (cum, cur) => cum + cur.total,
          0
        )
        console.log({ totalEmployee })
        const combinedFormattedData = {
          all: resolvedGroupedEmployeeSorted,
          ...filter1,
          ...filter2,
          ...filter3,
          ...filter4,
          ...filter5,
          ...filter6,
          ...filter7,
          ...filter8,
          ...filter9,
          ...filter10,
          ...filter11,
          ...filter12,
          ...filter13,
          ...filter14,
          ...filter15,
          ...filter16,
          ...filter17,
          ...filter18,
          ...country1,
          ...country2,
          ...country3,
          ...country4,
          ...country5,
          ...country6,
          ...country7,
          ...country8,
          ...country9,
          ...country10,
          ...country11,
          ...country12,
          ...country13,
          ...country14,
          ...country15,
          ...country16,
          ...country17,
          ...country18,
          ...country19,
          ...country20,
          ...country21,
          ...country22,
          ...country23,
          ...country24,
          ...country25,
          ...country26,
          ...country27,
          ...country28,
          ...country29,
          ...country30,
          ...country31,
          ...country32,
          ...country33,
          ...country34,
          ...country35,
          ...country36,
          ...country37,
          ...country38,
          ...country39,
          ...country40,
          ...country41,
          ...country42,
          ...country43,
          ...country44,
          ...country45,
          ...country46,
          ...country47,
          ...country48,
          ...country49,
          ...country50,
          ...country51,
          ...country52,
          ...country53,
          ...country54,
          ...country55,
          ...country56,
          ...country57,
          ...country58,
          ...country59,
        }
        combinedFormattedDataSaved.current = combinedFormattedData
        updateFilter(combinedFormattedData)
      } else {
        updateFilter()
      }
    })
  }, [
    chartData.length,
    filter,
  ])
  console.log({
    formattedData,
    FilteredFormattedData: formattedData[filter || 'all'],
  })
  const customizeLayer = (elements) => {
    if (!formattedData?.['all']?.length > 0) return

    console.count('customizingLayer')
    elements?.forEach?.((element) => {
      let countryCode = element?.attribute?.('iso_a2')
      const dataSet = filter ? formattedData[filter] : formattedData['all']
      const found = dataSet?.find((i) => i.countryCode === countryCode)

      if (found) {
        element.applySettings({
          selectedColor: '#f7ce6b',
        })
        element.attribute?.('total', found.total)
        element.attribute?.('employee', found.emp)
        element.attribute?.('dependent', found.dep)
        // element.attribute?.(
        //   'customLabel',
        //   `${prettyNumber.format(found.total.toFixed(0))}
        // ${element.attribute?.('name')}
        // `
        // )
      }
    })
  }
  const calcThresholdPercentage = (zoomFactor) => {
    if (zoomFactor > 4) {
      return 0.005
    } else if (zoomFactor > 3) {
      return 0.015
    } else if (zoomFactor > 1.8) {
      return 0.025
    } else return 0.04
  }
  const refreshTrheshold = ({
    localFormattedData = null,
    dataSetKey = null,
  } = {}) => {
    const data = localFormattedData || formattedData

    const _totalSum = data[dataSetKey || filter || 'all']?.reduce?.(
      (cum, cur) => cum + cur.total,
      0
    )
    const totalSum = Math.max(_totalSum, 1000)
    // setText(`totalSum:${totalSum}, ${filter}`)
    setThreshold(totalSum * thresholdPercentageTracker.current)
  }
  if (!formattedData?.['all'] || formattedData?.['all']?.length === 0) return null
  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        className={styles.threshold}
        type="range"
        min="0"
        max="500"
        onChange={({ target }) => {
          thresholdDelay(() => {
            setThreshold(target.valueAsNumber)
          })
        }}
        style={{ visibility: 'hidden' }}
        data-value={inputRef?.current?.valueAsNumber}
      />
      {/* <input
        type="text"
        style={{ width: '333px' }}
        value={`${text}: ${threshold}`}
      /> */}
      <VectorMap
        className={styles.vectorMap}
        onZoomFactorChanged={(d) => {
          const isCountryFilter = Object.keys(coordinatesMap).includes(filter)
          if (isCountryFilter && d.zoomFactor <= defaultZoom) {
            setFilter(null)
          }
          zoomFactorTracker.current = d.zoomFactor
          // thresholdDelay(() => {
          thresholdPercentageTracker.current = calcThresholdPercentage(d.zoomFactor)
          if (!isCountryFilter) refreshTrheshold()
          // })
        }}
        ref={mapRef}
        onClick={({ target, component }) => {
          if (typeof target !== 'object') return
          const newFilter = target?.attribute?.('iso_a2')
          //is it already filtered but not by single country? return
          if (filter && !Object.keys(coordinatesMap).includes(filter)) {
            return
          }
          const currentFilter = filter
          const newCoordinate = coordinatesMap[newFilter]?.coordinates
          if (currentFilter !== newFilter) {
            mapCenterTracker.current = newCoordinate
            zoomFactorTracker.current = 4
          } else {
            mapCenterTracker.current = defaultCoordinates
            zoomFactorTracker.current = defaultZoom
          }

          component.center(mapCenterTracker.current)
          component.zoomFactor(zoomFactorTracker.current)
          setTimeout(() => {
            target?.selected?.(newFilter === currentFilter ? false : true)
          }, 400)
          setFilter(newFilter === currentFilter ? null : newFilter)
        }}
        height={`100%`}
        style={{
          opacity: '.92',
        }}
        elementAttr={{ id: 'vector-map' }}
        zoomFactor={zoomFactorTracker.current}
        center={mapCenterTracker.current}
      >
        <CommonAnnotationSettings render={EmployeeBubble} type="custom" />
        {formattedData?.[
          Object.keys(coordinatesMap).includes(filter) ? 'all' : `${filter || 'all'}`
          // 'all' || filter
        ]?.map?.((bubble) => (
          <Annotation
            key={bubble.countryName}
            arrowLength={0}
            arrowWidth={0}
            opacity={0.1}
            border={{ cornerRadius: '300%' }}
            coordinates={bubble.coordinates}
            data={{
              threshold: threshold,
              totalSum: formattedData.all?.reduce?.(
                (cum, cur) => cum + cur.total,
                0
              ),
              name: bubble.countryName,
              code: bubble.countryCode,
              employeeTotal: bubble.total,
              employeeOnly: bubble.emp,
              dependentOnly: bubble.dep,
            }}
          />
        ))}
        <ControlBar enabled={true} />
        {pause === true && (
          <Layer
            borderColor="#3345"
            name="areas2"
            selectionMode="none"
            dataSource={customMap}
            hoverEnabled={false}
            palette={palette}
            color="#e4deed"
            colorGroupingField="employee"
            colorGroups={[
              1,
              10,
              90,
              200,
              600,
              5000000000,
            ]}
          ></Layer>
        )}
        <Layer
          borderColor="#3345"
          name="areas"
          selectionMode="single"
          dataSource={customMap}
          // hoverEnabled={false}
          palette={palette}
          color="#e4deed"
          colorGroupingField="employee"
          colorGroups={[
            1,
            50,
            150,
            280,
            600,
            5000000000,
          ]}
          customize={customizeLayer}
        >
          {/* <Label alignmen="center" enabled={true} dataField="customLabel">
            <Font family="poppins" weight={400} size={12} />
          </Label> */}
        </Layer>
        <Tooltip
          arrowLength={0}
          arrowWidth={0}
          opacity={0}
          border={{ cornerRadius: '300%' }}
          enabled={true}
          contentRender={(props) => {
            let countryCode = props?.attribute?.('iso_a2')
            const dataSet =
              formattedData?.[
                Object.keys(coordinatesMap).includes(filter)
                  ? 'all'
                  : `${filter || 'all'}`
              ]
            const found = dataSet?.find((i) => i.countryCode === countryCode)
            if (!found) return
            return (
              <EmployeeBubble
                data={{
                  threshold: 1,
                  name: found.countryName,
                  code: found.countryCode,
                  totalSum: formattedData.all?.reduce?.(
                    (cum, cur) => cum + cur.total,
                    0
                  ),
                  employeeTotal: found.total,
                  employeeOnly: found.emp,
                  dependentOnly: found.dep,
                }}
              />
            )
          }}
        />
        {formattedData?.all?.length && (
          <Legend
            orientation="horizontal"
            horizontalAlignment="center"
            verticalAlignment="top"
            backgroundColor="transparent"
            border={false}
            // customizeText={customizeLegendText}
            margin={{ top: 3 }}
            title={{
              margin: { bottom: 0, right: 10 },
              font: {
                weight: '500',
                color: '#acabaf',
              },
              text: `Total Employee
              ${prettyNumber.format(
                formattedData.all?.reduce?.((cum, cur) => cum + cur.total, 0) || 0
              )}`,
            }}
          >
            <Margin top={30} left={33} />
            <Source layer="areas" grouping="color" />
          </Legend>
        )}
        <Background color="transparent" borderColor="transparent" />
      </VectorMap>
      {Object.keys(coordinatesMap).includes(filter) ? (
        <ul style={{ ...styleForList }} className={styles.typeCategory}>
          {formattedData?.[filter]
            ?.filter?.((i, ind) => ind < 5)
            .map?.((i) => (
              <li
                style={{ ...styleForListItem }}
                className={styles.unclickable}
                key={i.travelType}
              >
                <section>{i.travelType}</section>
                <section>
                  {Number(
                    (i.total /
                      formattedData.all?.reduce?.(
                        (cum, cur) => cum + cur.total,
                        0
                      )) *
                      100
                  ).toFixed(1)}
                  %
                </section>
                <section>{prettyNumber.format(i.total)}</section>
              </li>
            ))}
        </ul>
      ) : (
        <ul style={{ ...styleForList }} className={styles.typeCategory}>
          {typeList.map(
            (i, ind) =>
              ind < 5 && (
                <li
                  style={{ ...styleForListItem }}
                  className={filter === i.key ? styles.active : ''}
                  onClick={() => {
                    const zoomFactor = zoomFactorTracker.current
                    const currentFilter = filter
                    thresholdPercentageTracker.current =
                      calcThresholdPercentage(zoomFactor)
                    refreshTrheshold({
                      dataSetKey: currentFilter === i.key ? 'all' : i.key,
                    })
                    if (currentFilter !== i.key) {
                      setFilter(i.key)
                    }
                    if (currentFilter === i.key) {
                      setFilter(null)
                    }
                    setPause(true)
                    setTimeout(async () => {
                      await new Promise((r) => setTimeout(r, 30))
                      setPause(false)
                    })
                    //force refresh map colors with new filter apply
                  }}
                >
                  <section>{i.key}</section>
                  {filter === i.key ? (
                    <React.Fragment>
                      <section style={{ fontSize: '1rem' }}>
                        T: {prettyNumber.format(i.total)}
                      </section>
                      <section style={{ fontSize: '1rem' }}>
                        E: {prettyNumber.format(i.emp)} {` `}
                      </section>
                      <section style={{ fontSize: '1rem' }}>
                        D: {prettyNumber.format(i.dep)}
                      </section>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <section>
                        {Number(
                          (i.total /
                            formattedData.all?.reduce?.(
                              (cum, cur) => cum + cur.total,
                              0
                            )) *
                            100
                        ).toFixed(1)}
                        %
                      </section>
                      <section>{prettyNumber.format(i.total)}</section>
                    </React.Fragment>
                  )}
                </li>
              )
          )}
        </ul>
      )}
    </div>
  )
}

export default EmployeeMap
