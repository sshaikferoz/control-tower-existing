import React, { useContext } from 'react'
import GeoSpendMap from '../customized/GeoSpendMap'
import RSSFeeds2 from '../common/RSSFeeds-2'
import layoutStyles from './LayoutStyle.module.css'
import styles from './Screen4Procurement.module.css'
import { useHotkeys } from 'react-hotkeys-hook'
import { maskContext } from '../../lib/maskContext'
export default function Screen4Procurement() {
  const { toggleMask } = useContext(maskContext)
  useHotkeys('m', toggleMask)
  return (
    <React.Fragment>
      <div
        className="kpi"
        style={{
          height: '119px',
          display: 'grid',
          alignContent: 'center',
          paddingBlockStart: '1.4em',
        }}
      >
        <RSSFeeds2 />
      </div>
      <div className={`${layoutStyles.wrapper} ${styles.grid}`}>
        <div className={`${layoutStyles.bgParent} ${layoutStyles.bgScreen4}`}>
          <div
            className={layoutStyles.bg}
            style={{
              '--bg': `url(${process.env.NEXT_PUBLIC_BSP_NAME}/images/bg-ciruit.png)`,
            }}
          ></div>
        </div>

        <GeoSpendMap />
      </div>
    </React.Fragment>
  )
}
