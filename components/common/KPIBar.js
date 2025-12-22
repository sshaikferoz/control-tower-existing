import React, { useEffect, useRef } from 'react'
import {
  IoCaretDownSharp,
  IoCaretUpSharp,
  IoSquare,
  IoTimeOutline,
} from 'react-icons/io5'

import { Number } from 'react-intl-number-format'
import styles from './KPIBar.module.css'

export default function KPIBar({ children, items, component }) {
  const intervalRef = useRef(null)
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const kpiItems = document.querySelectorAll('*[id^="flippingKPI"]')
      for (const item of kpiItems) {
        item.classList.toggle(styles.flipped)
      }
    }, 3000)
    return () => clearInterval(intervalRef?.current)
  }, [])

  return (
    <div className={`${styles.KpiBar} ${styles[component]}`}>
      {items?.map((item, index) => (
        <div className={styles.kpiItem} key={index}>
          {item.stickerPath && (
            <div className={styles.kpiItemSticker}>
              <img src={item.stickerPath} alt="KPI Item" width={40} height={40} />
              <p>{item.stickerText}</p>
            </div>
          )}
          {/******** TITLE ********/}
          {item.title && (
            <div className={styles.kpiItemTitle}>
              {item.title}
              {item.days !== undefined && <IoTimeOutline size={28} />}
            </div>
          )}
          {/******** VALUE ********/}
          {item.value !== undefined && (
            <div className={styles.kpiValue}>
              <Number notation="compact">{item.value}</Number>
            </div>
          )}
          {/******** PERCENTAGE WITHOUT TARGET ********/}
          {item.percent !== undefined && item.target === undefined && (
            <div className={styles.kpiPercent}>{item?.percent?.toFixed?.(0)}%</div>
          )}
          {/******** PERCENTAGE WITH TARGET ********/}
          {item.percent !== undefined && item.target !== undefined && (
            <div
              id={`flippingKPI${index}`}
              className={`${styles.vertical} ${styles.flipContainer}`}
            >
              <div className={styles.flipper}>
                <div className={`${styles.front} ${styles.actual}`}>
                  {item.percent < item.target && !item.reverseDirection ? (
                    <IoCaretDownSharp color="var(--kpiRed)" />
                  ) : item.percent > item.target && item.reverseDirection ? (
                    <IoCaretUpSharp color="var(--kpiRed)" />
                  ) : item.percent > item.target && !item.reverseDirection ? (
                    <IoCaretUpSharp color="var(--kpiGreen)" />
                  ) : item.percent < item.target && item.reverseDirection ? (
                    <IoCaretDownSharp color="var(--kpiGreen)" />
                  ) : (
                    <IoSquare color="var(--kpiGreen)" size={22} />
                  )}
                  {item.percent?.toFixed?.(0)}%
                </div>
                <div className={styles.back}>FYP = {item.target}%</div>
              </div>
            </div>
          )}
          {/******** DAYS WITHOUT TARGET ********/}
          {item.days !== undefined && item.target === undefined && (
            <div className={styles.kpiDays}>
              {item.days}
              <span> days</span>
            </div>
          )}
          {/******** DAYS WITH TARGET ********/}
          {item.days !== undefined && item.target !== undefined && (
            <div
              id={`flippingKPI${index}`}
              className={`${styles.vertical} ${styles.flipContainer}`}
            >
              <div className={styles.flipper}>
                <div className={`${styles.front} ${styles.actual}`}>
                  {item.days > item.target ? (
                    <IoCaretUpSharp color="var(--kpiRed)" />
                  ) : item.days < item.target ? (
                    <IoCaretDownSharp color="var(--kpiGreen)" />
                  ) : (
                    <IoSquare color="var(--kpiGreen)" size={22} />
                  )}
                  {item.days}
                  <span>&nbsp;days</span>
                </div>
                <div className={styles.back}>
                  FYP = {item.target}
                  <span> days</span>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
