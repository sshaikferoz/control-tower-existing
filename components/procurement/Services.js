import React from 'react'

import useBexJson from '../../lib/useBexJson'
import LinearGaugeTable from './LinearGaugeTable'

export default function Services({ query }) {
  const { data, isLoading, isError } = useBexJson(query?.techname)
  //prettier-ignore
  const title = 'Materials'
  const formattedData = data?.chartData
    .map(({ VALUE001, VALUE002, ...charField }) => ({
      header: Object.values(charField).pop().toString(),
      value: VALUE001,
      percent: VALUE002,
    }))
    .filter(
      ({ header }, ind) =>
        ind < 5 && header.match(/(not assign)|(overall result)/i) === null
    )
    .sort((a, z) => z.value - a.value)

  return data ? (
    <LinearGaugeTable delay={860} title={query.title} records={formattedData} />
  ) : null
}
