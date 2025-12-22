import React, { useContext } from 'react'
import CapacityManagement from '../customized/CapacityManagement'
import EndToEnd from '../customized/EndToEnd'
import Chatbot from '../customized/Chatbot'
import layoutStyles from './LayoutStyle.module.css'
import KPIBarFullWidth from '../customized/KPIBarFullWidth'
import { useHotkeys } from 'react-hotkeys-hook'
import { maskContext } from '../../lib/maskContext'
export default function Screen3Procurement() {
  const { toggleMask } = useContext(maskContext)
  useHotkeys('m', toggleMask)
  return (
    <React.Fragment>
      <div className="kpi" style={{ height: '119px' }}>
        <KPIBarFullWidth skip={8} />
      </div>
      <CapacityManagement>
        <EndToEnd></EndToEnd>
      </CapacityManagement>

      <Chatbot />
      <div className={`${layoutStyles.bgParent} ${layoutStyles.bgScreen3}`}>
        <div
          className={layoutStyles.bg}
          style={{
            '--bg': `url(${process.env.NEXT_PUBLIC_BSP_NAME}/images/bg-ciruit.png)`,
          }}
        ></div>
      </div>
    </React.Fragment>
  )
}
