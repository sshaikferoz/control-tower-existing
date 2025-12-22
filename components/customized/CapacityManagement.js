import React, { useState } from 'react'
import styles from './CapacityManagement.module.css'
import CapacityLevel1 from './CapacityLevel1'
import EndToEnd from './EndToEnd'
import CapacityGauges from './CapacityGauges'
import Block from '../common/Block'
import CardChartToggle from './CardChartToggle'
import ProcessingTimeForEGR from './ProcessingTimeForEGR'
import ProcessingTimeForSES from './ProcessingTimeForSES'
import BlockToggleHeader from '../common/BlockToggleHeader'
import { Border } from 'devextreme-react/bar-gauge'
import BlockToggleHeaderModern from '../common/BlockToggleHeaderModern'
const SESPrTimeQry = {
  title: 'SES Processing Time (Days)',
  techname: 'YSCM_PSCCT_PROC_SES_TIME',
}
const eGRPrTimeQry = {
  title: 'eGRs Processing Time (Days)',
  techname: 'YCUS_MOB_PROC_EGR_TIME',
}
const curPalette = {
  titleColor: 'var(--unify-accent1)',
  palette: [
    'var(--unify-accent1)',
    'var(--unify-accent2)',
    'var(--unify-accent3)',
    'var(--unify-accent4)',
    'var(--inv-accent4)',
    'var(--inv-accent5)',
    'var(--inv-accent6)',
    'var(--proc-accent1)',
    'var(--proc-accent2)',
  ],
}

export default function CapacityManagement(props) {
  const [
    capacityManagementLevel,
    setCapacityManagementLevel,
  ] = useState(1)
  const count = capacityManagementLevel === 1 ? 3 : 1
  const span = capacityManagementLevel === 1 ? 1 : 3
  const spanRow = capacityManagementLevel === 4 ? 'span 2' : 'span 1'
  console.log({ capacityManagementLevel })

  return (
    <div style={{ '--item-count': `${count}` }} className={styles.wrap}>
      <div
        className={styles.gauge}
        style={{ '--span': `${span}`, '--span-row': `${spanRow}` }}
      >
        <CapacityGauges
          navBack={(n) => setCapacityManagementLevel(n)}
          navTo={(n) => setCapacityManagementLevel(n || 2)}
        />
      </div>
      {capacityManagementLevel === 1 && (
        <React.Fragment>
          <div className={styles.timeProcessingToggle}>
            <Block transparent={true} title={'Processing Time (Days)'}>
              <BlockToggleHeaderModern
                transparent={true}
                title1={'SES'}
                title2={'EGRS'}
              >
                <ProcessingTimeForSES theme={curPalette} query={SESPrTimeQry} />
                <ProcessingTimeForEGR theme={curPalette} query={eGRPrTimeQry} />
              </BlockToggleHeaderModern>
            </Block>
          </div>
          <div className={styles.indexCharts}>
            <Block
              transparent={true}
              title={'Market Intelligence'}
              style={{ ' placeSelf': ' center' }}
            >
              <CardChartToggle />
            </Block>
          </div>
        </React.Fragment>
      )}
      {capacityManagementLevel !== 4 && (
        <div className={styles.endToEnd}>{props.children}</div>
      )}
    </div>
  )
}
