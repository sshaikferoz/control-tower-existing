import React, { useEffect } from 'react'

import styles from './ShipmentTracking.module.css'

export default function ShipmentTracking(props) {
  /* useEffect(() => {
    Array.from(document.getElementsByTagName('iframe')).forEach((iframe) => {
      iframe.contentWindow.addEventListener(
        'load',
        () => {
          const doc = iframe.contentWindow.document
          iframe.height = doc.body.scrollHeight
        },
        true
      )
      iframe.contentWindow.addEventListener(
        'resize',
        () => {
          const doc = iframe.contentWindow.document
          iframe.height = doc.body.scrollHeight + 40
        },
        true
      )
    })
  }, []) */

  const data = {
    title: 'Shipment Tracking',
  }
  return (
    <div className={styles.container}>
      <div
        style={{
          margin: '1.3em',
          marginBottom: '5px',
          backgroundImage: `url(https://sharek.aramco.com.sa/orgs/30002047/Documents/SCCT/Map.jpg)`,
        }}
        className={styles.image}
      ></div>
    </div>
  )
}
