import styles from './KPI.module.css'
function KPI(props) {
  const { Title, Value, Target, Uom, Inversed = false } = props
  const isDown =
    (Number(Value) < Number(Target) && Inversed === false) ||
    (Number(Value) > Number(Target) && Inversed === true)
  return (
    <div className={styles.wrap}>
      <section>
        <h3>{Title}</h3>{' '}
        <h5>{`FYP ${Number(Target).toFixed(0)}${Uom === '%' ? '%' : ` ${Uom}`}`}</h5>
      </section>
      <section>
        <img
          src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/${
            isDown ? 'downRed' : 'upGreen'
          }Arr.png`}
        />
      </section>
      <h2>
        {`${Number(Value).toFixed(0)}`}
        <span className={Uom === '%' ? '' : styles.smallUnit}>{Uom}</span>
      </h2>
    </div>
  )
}

export default KPI
