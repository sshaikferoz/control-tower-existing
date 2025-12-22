import React from 'react'

import useBexJson from '../../lib/useBexJson'
import TransparentTable from './TransparentTable'
import formatNumber from '../../lib/helpers/formatNumber'
import LinearGaugeTable from './LinearGaugeTable'

export default function ServiceCountrySpend(props) {
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
    .filter((_, ind) => ind < 5)

  return <LinearGaugeTable delay={1} title={query.title} records={records} />
}
