import React from 'react'
import { IoAlertCircle } from 'react-icons/io5'
import styles from './AlertBox.module.css'

export default function Alerts({
  style = {},
  icon,
  title,
  figure,
  unit,
  alertStyle,
  StrokeColor,
}) {
  //prettier-ignore
  return (
    <div style={style} className={styles.alertItemSVG}>
      {/* <img className={styles.box} src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/alert-box-shadow.svg`} /> */}
      <svg className={styles.box} version="1.1" viewBox="0 0 275.08 117.61">
        <g className={styles.cls1}>
          <g>
            <image className={styles.cls2} width="267" height="112" transform="translate(7.86 5.83)" href="data:image/png;base64,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" />
            <polyline className={`${styles.cls3} ${StrokeColor === 'blue' ? styles.blue : ''}`} points="6.8 108.46 245.48 108.46 264.17 88.19 264.17 6.52 19 6.52 6.8 19.75 6.8 108.46" />
            <polyline className={`${styles.cls4} ${styles.blue}`} points="155.94 108.46 245.48 108.46 264.17 88.19 264.17 6.52 247.4 6.52" />
            <polyline className={`${styles.cls4} ${StrokeColor === 'blue' ? styles.blue : ''}`} points="57.73 108.46 6.8 108.46 6.8 19.75 19 6.52 82.16 6.52" />
            <ellipse className={`${styles.cls5} ${StrokeColor === 'blue' ? styles.blue : ''}`} cx="264.17" cy="6.52" rx="0.82" ry="0.88" />
            <ellipse className={`${styles.cls5} ${StrokeColor === 'blue' ? styles.blue : ''}`} cx="264.17" cy="88.19" rx="0.82" ry="0.88" />
            <ellipse className={`${styles.cls5} ${StrokeColor === 'blue' ? styles.blue : ''}`} cx="245.48" cy="108.46" rx="0.82" ry="0.88" />
            <ellipse className={`${styles.cls5} ${StrokeColor === 'blue' ? styles.blue : ''}`} cx="247.4" cy="6.41" rx="0.82" ry="0.88" />
            <ellipse className={`${styles.cls5} ${StrokeColor === 'blue' ? styles.blue : ''}`} cx="155.95" cy="108.46" rx="0.82" ry="0.88" />
            <ellipse className={`${styles.cls5} ${StrokeColor === 'blue' ? styles.blue : ''}`} cx="57.72" cy="108.46" rx="0.82" ry="0.88" />
            <ellipse className={`${styles.cls5} ${StrokeColor === 'blue' ? styles.blue : ''}`} cx="6.8" cy="108.46" rx="0.82" ry="0.88" />
            <ellipse className={`${styles.cls5} ${StrokeColor === 'blue' ? styles.blue : ''}`} cx="6.8" cy="20" rx="0.82" ry="0.88" />
            <ellipse className={`${styles.cls5} ${StrokeColor === 'blue' ? styles.blue : ''}`} cx="6.8" cy="100.14" rx="0.82" ry="0.88" />
            <ellipse className={`${styles.cls5} ${StrokeColor === 'blue' ? styles.blue : ''}`} cx="19.18" cy="6.58" rx="0.82" ry="0.88" />
            <ellipse className={`${styles.cls5} ${StrokeColor === 'blue' ? styles.blue : ''}`} cx="82.06" cy="6.58" rx="0.82" ry="0.88" />
          </g>
        </g>
      </svg>
      <div className={styles.content}>
        <IoAlertCircle
          className={styles[alertStyle || 'normal']}
          style={{
            '--danger-color': `${
                 Number(figure) === 0
                  ? 'var(--wh-accent1)'
                  : ''
            }`,
          }}
          size={50}
        />
        <div className={styles.text}>
          <h1>{title}</h1>
            <figure>
            <div>
            {figure} {unit !== undefined && <span>{unit}</span>}
            </div>
            </figure>
        </div>
      </div>
    </div>
  )
}
