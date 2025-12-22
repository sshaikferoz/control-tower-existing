import React, { useContext } from 'react'

import { BarGauge, Margin, Label, Geometry } from 'devextreme-react/bar-gauge'

import styles from './SingleSource.module.css'
import useBexJson from '../../lib/useBexJson'
import formatNumber from '../../lib/helpers/formatNumber'
import { maskContext } from '../../lib/maskContext'
import FlippingFigure from '../common/FlippingFigure'
import { FlippingAnimationControlProvider } from '../../lib/flippingAnimationContext'

export default function SingleSource(props) {
  const { query, visible, click } = props
  const { withMask } = useContext(maskContext)

  const LFCQry = query[0]
  const MFCQry = query[1]
  const MatQry = query[2]

  const LFCData = useBexJson(LFCQry.techname)
  const MFCData = useBexJson(MFCQry.techname)
  const MatData = useBexJson(MatQry.techname)

  const LFC = LFCData?.data?.chartData || []
  const MFC = MFCData?.data?.chartData || []
  const Mat = MatData?.data?.chartData || []

  const MFCValue = MFC[0]?.VALUE001 || 0
  const MFCPercent = MFC[0]?.VALUE002 || 0

  const MatValue = Mat[0]?.VALUE002 || 0
  const MatPercent = Mat[0]?.VALUE001 || 0

  const LFCValue = LFC[0]?.VALUE001 || 0
  const LFCPercent = LFC[0]?.VALUE002 || 0

  const values = [MFCPercent, MatPercent, LFCPercent]

  return (
    <div data-place={props.dataAttr} className={styles.container} onClick={click}>
      <FlippingAnimationControlProvider>
        <table className={styles.legend}>
          <tbody>
            <tr className={styles.row}>
              <td>MFC / SFC:</td>
              <td className={styles.flipping}>
                <FlippingFigure
                  percent={`${formatNumber(MFCPercent, 0)}%`}
                  value={`$${withMask(formatNumber(MFCValue, 0))}`}
                  transformOriginShift="0.62em"
                />
              </td>
            </tr>
            <tr className={styles.row}>
              <td>Material:</td>
              <td className={styles.flipping}>
                <FlippingFigure
                  percent={`${formatNumber(MatPercent, 0)}%`}
                  value={`$${withMask(formatNumber(MatValue, 0))}`}
                />
              </td>
            </tr>
            <tr className={styles.row}>
              <td>LFC:</td>
              <td className={styles.flipping}>
                <FlippingFigure
                  percent={`${formatNumber(LFCPercent, 0)}%`}
                  value={`$${withMask(formatNumber(LFCValue, 0))}`}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </FlippingAnimationControlProvider>
      <BarGauge
        palette={props.theme.palette}
        startValue={0}
        endValue={100}
        values={values}
        relativeInnerRadius={0.5}
        backgroundColor="rgba(141, 141, 187, 0.2)"
      >
        <Margin top={10} />
        <Geometry startAngle={90} endAngle={90} />
        <Label visible={false} />
      </BarGauge>
    </div>
  )
}
