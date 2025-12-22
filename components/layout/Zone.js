import React from 'react'
import styles from './Zone.module.css'
function Zone(props) {
  const titleStyle = {
    display: 'grid',
    gridRow: 'span 2',
    gridColumn: '1/-1',
    lineHeight: '1',
    translate: ' 0 18px',
    paddingInlineStart: '.4em',
    color: 'var(--unify-font-light)',
    fontWeight: '400',
    fontSize: '1.35rem',
    justifyContent: props.centerTitle ? 'center' : 'left',
    alignItems:'center',
  }
  const { handleTitle = true } = props
  return (
    <div
      style={{
        display: 'grid',
        gridColumn: props.GridColumns,
        gridRow: props.GridRows,
        gridTemplateRows: 'subgrid',
        gridTemplateColumns: 'subgrid',
        border: 'solid 1px tranparent',
      }}
    >
      {handleTitle ? (
        <React.Fragment>
          <h2 style={titleStyle}>{props.title || ''}</h2>
          <div className={styles.zoneContent} data-handle-title>
            {props.children}
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className={styles.zoneContent}>{props.children}</div>
        </React.Fragment>
      )}
    </div>
  )
}
export default Zone
