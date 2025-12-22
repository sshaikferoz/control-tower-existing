import styles from './OpenClaims.module.css'
import LogisticsOC from './LogisticsOC'
import WarehouseOC from './WarehouseOC'

export default function OpenClaims(props) {
  return (
    <div className={styles.container}>
      <LogisticsOC theme={props.theme} query={props.query[0]} />
      <WarehouseOC theme={props.theme} query={props.query[1]} />
    </div>
  )
}
