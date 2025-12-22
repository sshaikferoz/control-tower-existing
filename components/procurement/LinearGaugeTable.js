import React, { useContext } from 'react'
import { ProgressBar } from 'devextreme-react/progress-bar'

import ttStyles from './TransparentTable.module.css'
import styles from './LinearGaugeTable.module.css'
import formatNumber from '../../lib/helpers/formatNumber'
import { maskContext } from '../../lib/maskContext'
import FlippingFigure from '../common/FlippingFigure'

export default function LinearGaugeTable({ title, records, delay }) {
  const { withMask } = useContext(maskContext)
  const formattedRecords = records?.map(({ value, percent, header }) => ({
    value: withMask(formatNumber(value, 0)),
    percent,
    header,
  }))
  return (
    <div className={ttStyles.tableContainer}>
      <div className={styles.preTitle}></div>
      <h1 className={styles.title}>{title}</h1>
      <table className={styles.table}>
        <tbody style={{ display: 'contents' }}>
          {formattedRecords?.map((record, index) => (
            <tr style={{ display: 'contents' }} key={index}>
              <th style={{marginInlineStart:'-12em'}} className={styles.heading}>{record.header}</th>
              <td className={styles.gauge}>
                <ProgressBar
                  className="progressBar"
                  min={0}
                  max={100}
                  value={parseInt(record.percent)}
                  showStatus={false}
                />
              </td>
              <td className={styles.value}>
                <FlippingFigure
                  delay={delay + index * 60}
                  value={`$${record.value}`}
                  percent={`${record.percent}%`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
