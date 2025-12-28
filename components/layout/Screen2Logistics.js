import React, { useContext } from 'react'
import BlockToggleHeader from '../common/BlockToggleHeader'
import KPIBarFullWidth from '../customized/KPIBarFullWidth'
import AlertList from '../customized/AlertList'
import Sustainability from '../customized/Sustainability'
import EmployeeMap from '../customized/EmployeeMap'
import InventoryMap from '../customized/InventoryMap'
import layoutStyles from './LayoutStyle.module.css'
import styles from './Screen2Logistics.module.css'
import { useHotkeys } from 'react-hotkeys-hook'
import { maskContext } from '../../lib/maskContext'
export default function Screen2Logistics() {
    const { toggleMask } = useContext(maskContext)
    useHotkeys('m', toggleMask)
    return (
        <React.Fragment>
            <div className="kpi" style={{ height: '119px' }}>
                <KPIBarFullWidth skip={4} />
            </div>
            <div className={`${layoutStyles.wrapper} ${styles.grid}`}>
                <div className={styles.map}>
                    <BlockToggleHeader
                        transparent={true}
                        title2="Employee Travel Care"
                        title1="Inventory Map"
                    >
                        <EmployeeMap tileSize="sm" />
                        <InventoryMap />
                    </BlockToggleHeader>
                </div>
                <div className={styles.alert}>
                    <h2 className={layoutStyles.title}>Alert Intelligence</h2>
                    <AlertList />
                </div>
                <div className={styles.sustainability}>
                    <h2 className={layoutStyles.title} style={{ position: 'relative', left: '303px', top: '6px' }}>Sustainability</h2>
                    <Sustainability />
                </div>
                <div className={`${layoutStyles.bgParent} ${layoutStyles.bgScreen2}`}>
                    <div
                        className={layoutStyles.bg}
                        style={{
                            '--bg': `url(${process.env.NEXT_PUBLIC_BSP_NAME}/images/bg-ciruit.png)`,
                        }}
                    ></div>
                </div>
            </div>
        </React.Fragment>
    )
}
