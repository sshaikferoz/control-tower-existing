import React from 'react'

import useBexJson from '../../lib/useBexJson'

import styles from './EndToEndDialog.module.css'
import formatNumber from '../../lib/helpers/formatNumber'

export default function EndToEndDialog(props) {

  const { query, name } = props
  const { data = {} } = useBexJson(query?.techname, { parser: 'new' })
  if (name === '') return null
  const { keyFigureKeys = [], charKeys = [], chartData = [], headerText = {} } = data
  const ArwaKeys = keyFigureKeys
    .filter((i) => i?.toLowerCase?.()?.includes?.(name?.toLowerCase?.()))
    .map((fieldName) => {
      return {
        label: headerText?.[fieldName]?.replace(/\({0,1}(arwa|roba)\){0,1}/i, ''),
        value: formatNumber(chartData?.[0]?.[fieldName], 1, 'm'),
      }
    })

  return (
    <section className={styles.component} style={{ alignItems: 'center' }}>
      <h2 className={styles.title}>{name}</h2>
      {ArwaKeys.map((item) => (
        <li key={item.label}>
          <span className={styles.labelCell}> {item.label} </span>
          <span> ⟩ </span>
          <span className={styles.valueCell}> {item.value} </span>
        </li>
      ))}
    </section>
  )
}
