import React from 'react'

import styles from './WorkloadActivities.module.css'
import WarehouseActivities from './WarehouseActivities'
import IKActivities from './IKActivities'
import GlobalLogisticsActivities from './GlobalLogisticsActivities'

export default function WorkloadActivities(props) {
  const data = { title: 'Workload Activities', titleClass: 'titleWH' }
  return (
      <div className={styles.wlContainer}>
          <WarehouseActivities theme={props.theme} query={props.query[0]} />
          <GlobalLogisticsActivities theme={props.theme} query={props.query[2]} />
          <IKActivities theme={props.theme} query={props.query[1]} />
      </div>
  )
}
