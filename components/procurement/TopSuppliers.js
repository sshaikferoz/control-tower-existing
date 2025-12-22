import React from 'react'

import useBexJson from '../../lib/useBexJson'
import TransparentTable from './TransparentTable'

export default function TopSuppliers(props) {
  const { query } = props

  const { data, error, isLoading } = useBexJson(query.techname)

  const values = data?.chartData || []

  const records = values
    ?.map((item) => ({
      header: item.VENDOR.toString(),
      value: item.VALUE001,
      percent: item.VALUE002,
    }))
    .filter(
      ({ header }, ind) =>
        ind < 5 && header.match(/(not assign)|(overall result)/i) === null
    )
    .sort((a, z) => z.value - a.value)

  return <TransparentTable delay={430} title={query.title} records={records} />
}
