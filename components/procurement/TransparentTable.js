import React, { useContext } from 'react'

import styles from './TransparentTable.module.css'
import formatNumber from '../../lib/helpers/formatNumber'
import { maskContext } from '../../lib/maskContext'
import FlippingFigure from '../common/FlippingFigure'

export default function TransparentTable({
  title,
  delay,
  records,
  small,
  titleLeftAlign,
}) {
  const { withMask } = useContext(maskContext)
  const formattedRecords = records?.map(({ value, percent, header }) => ({
    value: withMask(formatNumber(value, 0)),
    percent,
    header,
  }))
  return (
    <div className={styles.tableContainer}>
      <div className={styles.preTitle}></div>
      <h1 className={styles.title}>{title}</h1>
      <table className={`${styles.table} ${small && styles.fontSm}`}>
        <tbody style={{ display: 'contents' }}>
          {formattedRecords?.map((record, index) => (
            <tr style={{ display: 'contents' }} key={index}>
              <td></td>
              <th className={styles.heading}>{record.header}</th>
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
