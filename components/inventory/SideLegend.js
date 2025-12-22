import React from 'react'
import styles from './sideLegend.module.css'

export default function SideLegend({ color, label, image }) {
  return (
    <div className={styles.container}>
      <img src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/${image}`} />
      <sm style={{ color }} className={styles.color}></sm>
      <sm>{`${label}`}</sm>
    </div>
  )
}
