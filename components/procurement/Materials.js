import React from 'react'

import useBexJson from '../../lib/useBexJson'
import LinearGaugeTable from './LinearGaugeTable'

export default function Materials({ query }) {
  const { data, isLoading, isError } = useBexJson(query?.techname)
  const title = 'Materials'
  const formattedData = data?.chartData
    .map(({ VALUE001, VALUE002, ...charField }) => ({
      header: Object.values(charField).pop().toString(),
      value: VALUE001,
      percent: Number(VALUE002).toFixed(0),
    }))
    .filter(
      ({ header }, ind) =>
        ind < 8 && header.match(/(not assign)|(overall result)/i) === null
    )
    .sort((a, z) => z.value - a.value)

  return data ? (
    <LinearGaugeTable delay={730} title={query.title} records={formattedData} />
  ) : null
}
