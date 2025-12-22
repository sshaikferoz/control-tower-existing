import React, { useRef, useState, useContext, useEffect } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import layoutStyles from './LayoutStyle.module.css'
import styles from './Screen1Inventory.module.css'
import KPIBarFullWidth from '../customized/KPIBarFullWidth'
import InventoryValueTrend from '../customized/InventoryValueTrend'
import OutsourcedInv from '../customized/OutsourcedInv'
import TestAndInspStatic from '../customized/TestAndInspStatic'
import Dialog from '../common/Dialog'
import { maskContext } from '../../lib/maskContext'
const sleep = async (ms) => {
  return new Promise((r) => setTimeout(r, ms))
}
const fileName = 'digital-inventory.png'
export default function Screen1Inventory() {
  const { toggleMask } = useContext(maskContext)
  useHotkeys('m', toggleMask)
  const dialogRef = useRef(null)
  const [
    dialogOpen,
    setDialogOpen,
  ] = useState(false)

  useHotkeys('e', () => {
    setDialogOpen(true)
  })

  const [
    dialogContentVisible,
    setDialogContentVisible,
  ] = useState(false)
  useEffect(() => {
    async function runEffect() {
      await sleep(80)
      if (dialogOpen === false) await sleep(200)
      setDialogContentVisible(dialogOpen)
    }
    runEffect()
  }, [dialogOpen])

  return (
    <React.Fragment>
      <Dialog
        size="80%"
        onModalClose={() => setDialogOpen(false)}
        modalState={dialogOpen ? 'show' : 'close'}
        ref={dialogRef}
      >
        {dialogContentVisible && (
          <iframe
            className={styles.iframe}
            src={process.env.NEXT_PUBLIC_EECC_IFRAME_SRC}
          ></iframe>
        )}
      </Dialog>
      <div className="kpi" style={{ height: '119px' }}>
        <KPIBarFullWidth />
      </div>
      <div className={`${layoutStyles.wrapper} ${styles.grid}`}>
        <div className={`${layoutStyles.bgParent} ${layoutStyles.bgScreen1}`}>
          <div
            className={layoutStyles.bg}
            style={{
              '--bg': `url(${process.env.NEXT_PUBLIC_BSP_NAME}/images/bg-ciruit.png)`,
            }}
          ></div>
        </div>
        <div className={styles.prediction}>
          <h2 style={{ justifyContent: 'start' }} className={layoutStyles.title}>
            Inventory Value
          </h2>
          <InventoryValueTrend />
        </div>
        <OutsourcedInv />
        <div className={styles.digitalInv}>
          <h2 className={layoutStyles.title}> Digital Inventory </h2>
          {/* <img src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/${fileName}`} /> */}
          <img src={`https://sharek.aramco.com.sa/orgs/30002047/Documents/SCCT/DINV.png`}/>
        </div>
        <div className={styles.testAndInsp}>
          <TestAndInspStatic />
        </div>
      </div>
    </React.Fragment>
  )
}
