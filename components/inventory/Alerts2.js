import React, { useContext } from 'react'

import formatNumber from '../../lib/helpers/formatNumber'
import styles from './alerts.module.css'
import { maskContext } from '../../lib/maskContext'
import AlertBoxBex from '../common/AlertBoxBex'

export default function Alerts(props) {
  const { query } = props
  const { withMask } = useContext(maskContext)

  return (
    <div className={styles.alertsColumn}>
      <img
        className={styles.alertIcon}
        src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/white-alert.svg`}
        alt="alert sticker"
      />
      <AlertBoxBex
        title="Inventory Stock Out"
        unit={'items'}
        queryName={query.techname.stock}
        alertStyle={'danger'}
        StrokeColor="blue"
        formatter={(number) => formatNumber(number, 1, '')}
      />

      <AlertBoxBex
        title="Overdue Reservation"
        unit={''}
        queryName={query.techname.overdue}
        alertStyle={'normal'}
        StrokeColor="blue"
        formatter={(number) => withMask(formatNumber(number, 1, 'mm'))}
      />
      <AlertBoxBex
        title="Potential Slow Moving Items"
        unit={''}
        queryName={query.techname.potentialSlow}
        alertStyle={'warn'}
        StrokeColor="blue"
        formatter={(number) => withMask(formatNumber(number, 1, 'mm'))}
      />
      <AlertBoxBex
        title="Blocked Inventory"
        unit={''}
        queryName="YSCM_SCCT_INV_ALERT1"
        alertStyle={'warn'}
        StrokeColor="blue"
        formatter={(number) => withMask(formatNumber(number, 1, 'mm'))}
      />
      <AlertBoxBex
        title="Returned Inventory"
        unit={''}
        queryName="YSCM_SCCT_INV_ALERT2"
        alertStyle={'warn'}
        StrokeColor="blue"
        formatter={(number) => `${new Number(number).toFixed(0)}%`}
      />
    </div>
  )
}
