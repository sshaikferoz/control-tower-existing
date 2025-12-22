import React, { useContext } from 'react'
import formatNumber from '../../lib/helpers/formatNumber'
import { maskContext } from '../../lib/maskContext'
import styles from './DataGrid.module.css'

export default function DataGrid({
  colNum,
  rowNum,
  data,
  transperentHeader,
  style,
  small,
}) {
  const { withMask } = useContext(maskContext)
  const numOfColumns = isNaN(Number(colNum)) ? 2 : Number(colNum)
  const numOfRows = isNaN(Number(rowNum)) ? 2 : Number(rowNum)
  const dataFormatted = data.map((item) => {
    if (item.hasOwnProperty('value'))
      return { value: `$${withMask(formatNumber(item.value || 0))}` }
    return item
  })
  let indCount = 0
  return (
    <div
      style={style}
      data-colnum={numOfColumns}
      data-rownum={numOfRows}
      className={`${styles.container} ${small ? styles.small : ''}`}
    >
      {Array.from({ length: numOfRows }, (i, rowInd) =>
        Array.from({ length: numOfColumns }, (i, colInd) => (
          <div
            key={indCount}
            data-colind={colInd}
            data-rowind={rowInd}
            data-bg={transperentHeader ? 'transparent' : ''}
            className={`${styles.cell} ${
              data[indCount]?.bg ? styles[data[indCount].bg] : ''
            }`}
          >
            {Object.values(dataFormatted[indCount++])?.[0]}
          </div>
        ))
      )}
    </div>
  )
}
