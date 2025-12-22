import React from 'react'

export default function Block({
  children,
  title,
  clickEvent,
  style = {},
  popup = false,
  transparent = false,
}) {
  const withoutPadding = transparent ? { padding: '0' } : {}
  return (
    <div
      className={`${transparent ? 'transparentBlock' : 'block'}`}
      {...clickEvent}
      style={{ ...withoutPadding, ...style }}
    >
      <h2 className={`${popup ? 'popupTitle' : 'blockTitle'}`}>
        {title || ''}
      </h2>
      <div style={{ display: 'grid', maxHeight: '98%' }}>{children}</div>
    </div>
  )
}
