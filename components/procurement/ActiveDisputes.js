import React from 'react'
import { IoSquareSharp } from 'react-icons/io5'

import useBexJson from '../../lib/useBexJson'
import styles from './ActiveDisputes.module.css'

export default function ActiveDisputes(props) {
  const { query } = props

  const { data } = useBexJson(query.techname)

  const results = data?.chartData || []

  const dispObj = results.find((item) => item.ZHRATTRIC.toLowerCase() === 'disupute')
  const claimObj = results.find((item) => item.ZHRATTRIC.toLowerCase() === 'claims')
  const appealObj = results.find((item) => item.ZHRATTRIC.toLowerCase() === 'appeal')

  const disputes = dispObj?.VALUE001 || 0
  const claims = claimObj?.VALUE001 || 0
  const appeals = appealObj?.VALUE001 || 0

  return (
    <div className={styles.container}>
      <div className={styles.disputes}>
        <h1>{disputes}</h1>
        <span>Disputes</span>
        <svg className={styles.disputeSVG} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 143.14 89.5">
          <g style={{ isolation: 'isolate' }}>
            <g id="Layer_1" data-name="Layer 1">
              <path
                style={{ opacity: 0.3, fill: 'var(--proc-accent2)' }}
                d="M29.39,80l60.09-5h0a38.08,38.08,0,0,1-16.22-7.7c-.19-.15-.38-.29-.55-.44A38.18,38.18,0,0,1,68,13.05L17.76,47.15A68.35,68.35,0,0,1,29.39,80Z"
              />
              <path
                style={{ fill: 'var(--proc-accent2)' }}
                d="M10,81.65l17-1.43A66.06,66.06,0,0,0,15.81,48.48L1.65,58.09A49.22,49.22,0,0,1,10,81.65Z"
              />
            </g>
          </g>
        </svg>
        <div className={styles.claims}>
          <h1>{claims}</h1>
          <span>Claims</span>
          <svg className={styles.claimsSVG} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 143.14 89.5">
            <g style={{ isolation: 'isolate' }}>
              <g id="Layer_1" data-name="Layer 1">
                <path
                  style={{ fill: 'var(--proc-accent3)' }}
                  d="M10,81.65l17-1.43A66.06,66.06,0,0,0,15.81,48.48L1.65,58.09A49.22,49.22,0,0,1,10,81.65Z"
                />
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div className={styles.legend}>
        <ul>
          <li>
            <IoSquareSharp color="var(--proc-accent2)" size={15} />
            Claims
          </li>
          <li>
            <IoSquareSharp color="var(--proc-accent1)" size={15} />
            Disputes
          </li>
          <li>
            <IoSquareSharp color="var(--proc-accent3)" size={15} />
            Appeals
          </li>
        </ul>
      </div>
    </div>
  )
}
