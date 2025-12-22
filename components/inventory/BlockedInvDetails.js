import React, { useContext } from 'react'

import useBexJson from '../../lib/useBexJson'
import formatNumber from '../../lib/helpers/formatNumber'
import { maskContext } from '../../lib/maskContext'

import styles from './BlockedInvDetails.module.css'

export default function BlockedInvDetails(props) {
  const { query } = props

  const { withMask } = useContext(maskContext)

  const warehouseQry = query.q[0]
  const customerQry = query.q[1]

  const warehouseData = useBexJson(warehouseQry.techname)
  const customerData = useBexJson(customerQry.techname)

  const warehouse = warehouseData?.data?.chartData || []
  const customer = customerData?.data?.chartData || []

  const warehouseValue = warehouse?.[0]?.VALUE001
  const customerValue = customer?.[0]?.VALUE001

  return (
    <div data-place={props.dataAttr} className={styles.detailsContainer}>
      <div className={styles.detailsItem}>
        <div className={styles.itemTitle}>{warehouseQry.title}:</div>
        <div className={styles.itemValue}>
          {withMask(formatNumber(warehouseValue, 0))}
        </div>
      </div>
      <div className={styles.detailsItem}>
        <div className={styles.itemTitle}>{customerQry.title}: </div>
        <div className={styles.itemValue}>
          {withMask(formatNumber(customerValue, 0))}
        </div>
      </div>
    </div>
  )
}
