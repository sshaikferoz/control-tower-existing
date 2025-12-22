import { Border } from 'devextreme-react/chart'
import styles from './ShipmentTrackingStatic.module.css'
export default function ShipmentTrackingStatic(props) {
  return (
    <div className={styles.wrap}>
      <img
        className={styles.fixRatio}
        src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/ShippingTrackingX2.jpg`}
      />{' '}
    </div>
  )
}
