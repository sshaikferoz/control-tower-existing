import React, { useState } from 'react'
import styles from './BlockToggleHeaderModern.module.css'

export default function BlockToggleHeaderModern({
  children,
  title1,
  title2,
  clickEvent,
  style = {},
  popup = false,
  transparent = false,
}) {
  const [
    hiddendElement,
    setHiddenElement,
  ] = useState('second')

  function blockedInventoryClicked(selected = 'first') {
    setHiddenElement(selected)
  }
  const withoutPadding = transparent ? { padding: '0' } : {}
  return (
    <div
      className={`${transparent ? 'transparentBlock' : 'block'} `}
      {...clickEvent}
      style={{ ...withoutPadding, ...style }}
    >
      <section className={styles.buttonsBase}>
        <h2
          data-unset={hiddendElement === 'second'}
          className={`${popup ? 'popupTitle' : 'blockTitle'}`}
          onClick={() => blockedInventoryClicked('first')}
        >
          {title2?.toUpperCase() || ''}
        </h2>
        <h2
          data-unset={hiddendElement === 'first'}
          className={`${popup ? 'popupTitle' : 'blockTitle'}`}
          onClick={() => blockedInventoryClicked('second')}
        >
          {title1?.toUpperCase() || ''}
        </h2>
      </section>
      <div style={{ display: 'grid', maxHeight: '98%' }}>
        <div data-hidden-place={hiddendElement} className="withCrossfade">
          {children}
        </div>
      </div>
    </div>
  )
}
