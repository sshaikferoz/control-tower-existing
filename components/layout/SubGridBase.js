import React, { useContext } from 'react'
import useScreenSize from '../../lib/hooks/useScreenSize'
import styles from './SubGridBase.module.css'
import { useHotkeys } from 'react-hotkeys-hook'
import { maskContext } from '../../lib/maskContext'
function SubGridBase(props) {
  const { toggleMask } = useContext(maskContext)
  useHotkeys('m', toggleMask)
  const { topBar = () => void 0, padding = 0, rowGap = 0, columnGap = 0 } = props
  const screenSize = useScreenSize()
  if (screenSize.width === 0) return null
  let cellSize = 32
  const numOfColumns = Math.ceil(screenSize.width / cellSize) + 1
  const numOfRows = Math.ceil(screenSize.height / cellSize)
  const bgShift = !isNaN(props.bgShift) ? { '--bg-shift': `${props.bgShift}` } : {}
  return (
    <div
      className={styles.base}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${numOfColumns},${cellSize - columnGap}px)`,
        gridTemplateRows: `repeat(${numOfRows},${cellSize - rowGap}px)`,
        rowGap: `${rowGap}px`,
        columnGap: `${columnGap}px`,
        ...bgShift,
      }}
    >
      <div
        className={styles.bg}
        style={{
          '--bg': `url(${process.env.NEXT_PUBLIC_BSP_NAME}/images/bg-ciruit.png)`,
        }}
      ></div>
      {/* KPIs/TopBar Zone */}
      <div className={styles.kpi}>{topBar}</div>
      <div
        style={{
          display: 'grid',
          gridColumn: '1/-1',
          gridRow: '4/-1',
          gridTemplateColumns: 'subgrid',
          gridTemplateRows: 'subgrid',
          paddingInline: `${padding}px`,
          paddingBlockStart: '0px',
          // overflow: 'auto',
        }}
      >
        {props.children}
      </div>
    </div>
  )
}
export default SubGridBase
