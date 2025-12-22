import React from 'react'

import Procurement from '../components/procurement/Procurement2-rss'

// prettier-ignore
const queries = [
  { title: 'Logistics OTD', techname: 'YIMO_CT_LOG_ANA_OTD' },
]

const curPalette = {
  titleColor: '#a7d65b',
  palette: ['#a7d65b', '#a56eff', '#4d4d4d', '#808080', '#cccccc', '#ffffff'],
}

export default function ProcurementPage() {
  return <Procurement theme={curPalette} queries={queries} />
}
