import React from 'react'

import styles from './InventoryTrendFrame.module.css'

export default function InventoryTrendFrame(props) {
  return (
    <div className={styles.container}>
      <iframe
        className={styles.SACFrame}
        src={process.env.NEXT_PUBLIC_SAC_IFRAME_URL}
      ></iframe>
    </div>
  )
}
