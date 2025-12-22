import React, { useContext } from 'react'
import { ProgressBar } from 'devextreme-react/progress-bar'

import styles from './SpendByCountry.module.css'
import formatNumber from '../../lib/helpers/formatNumber'
import { maskContext } from '../../lib/maskContext'
import useBexJson from '../../lib/useBexJson'

export default function SpendByCountry(props) {
  const { withMask } = useContext(maskContext)
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
  const formattedRecords = records?.map(({ value, percent, header }) => ({
    value: withMask(formatNumber(value, 0)),
    percent,
    header,
  }))
  return (
    <div className={styles.container}>
      {formattedRecords?.map((record, index) => (
        <section key={index} className={styles.wrap}>
          <h3>{record.header}</h3>
          <div className={styles.bar}>
            <ProgressBar
              className="progressBar"
              min={0}
              max={100}
              value={parseInt(record.percent)}
              showStatus={false}
            />
          </div>
          <div className={styles.valuePercent}>
            <figure className={styles.value}>{`$${record.value}`}</figure>
            <figure className={styles.percent}>{`${record.percent}%`}</figure>
          </div>
        </section>
      ))}
    </div>
  )
}
