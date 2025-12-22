import styles from './TestAndInspStatic.module.css'
export default function TestAndInspStatic(props) {
  return (
    <div
      className={styles.wrap}
      style={{
        '--static-chart-src': `url(${process.env.NEXT_PUBLIC_BSP_NAME}/images/RefinaryBG.svg)`,
      }}
    >
      <h3>Test & Inspection (T&I)</h3>
      {/* <img src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/TI-Chart2x.svg`} />{' '} */}
      <img
        src={`${process.env.NEXT_PUBLIC_SHAREK_SCCT_URL}/TI_image.svg`}
        alt="Test and Inspection"
      />
    </div>
  )
}
