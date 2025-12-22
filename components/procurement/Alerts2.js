import React from 'react'
import styles from './Alerts.module.css'
import { alertIcon } from '../inventory/Alerts.module.css'
import useBexJson from '../../lib/useBexJson'
import AlertBoxBex from '../common/AlertBoxBex'

export default function Alerts(props) {
  const { query } = props

  const nonCompliantCont = query[0]
  const releasedPOsQry = query[1]
  const openVerQry = query[2]
  const consContQry = query[3]
  const pendingSESQry = query[4]
  const agedGRs = query[5]

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <AlertBoxBex
          title={nonCompliantCont.title}
          unit={' '}
          queryName={nonCompliantCont.techname}
          alertStyle={'danger'}
          StrokeColor="blue"
        />

        <AlertBoxBex
          title={releasedPOsQry.title}
          unit={' '}
          queryName={releasedPOsQry.techname}
          alertStyle={'danger'}
          StrokeColor="blue"
        />
        <AlertBoxBex
          title={openVerQry.title}
          unit={' '}
          queryName={openVerQry.techname}
          alertStyle={'normal'}
          StrokeColor="blue"
        />
        <AlertBoxBex
          title={consContQry.title}
          unit={' '}
          queryName={consContQry.techname}
          alertStyle={'warn'}
          StrokeColor="blue"
        />

        <AlertBoxBex
          title={pendingSESQry.title}
          unit={' '}
          queryName={pendingSESQry.techname}
          alertStyle={'danger'}
          StrokeColor="blue"
        />
        <AlertBoxBex
          title={agedGRs.title}
          unit={' '}
          queryName={agedGRs.techname}
          alertStyle={'normal'}
          StrokeColor="blue"
        />
      </div>
    </div>
  )
}
