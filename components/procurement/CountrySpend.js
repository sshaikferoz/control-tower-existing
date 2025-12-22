import React from 'react'

import useBexJson from '../../lib/useBexJson'
import TransparentTable from './TransparentTable'
import formatNumber from '../../lib/helpers/formatNumber'
import LinearGaugeTable from './LinearGaugeTable'

export default function CountrySpend(props) {
  const { query } = props

  const { data, error, isLoading } = useBexJson(query.techname)

  const values = data?.chartData || []

  const records = values
    ?.map((item) => ({
      header: item.COUNTRY.toString(),
      value: item.VALUE001,
      percent: formatNumber(item.VALUE002),
    }))
    .filter(({ header }) => header.match(/(not assign)|(overall result)/i) === null)
    .sort((a, z) => z.value - a.value)

  return <LinearGaugeTable delay={360} title={query.title} records={records} />
}
