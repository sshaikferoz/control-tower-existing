import React, { useRef, useState, useContext } from 'react'

import styles from './TotalSpend.module.css'
import useBexJson from '../../lib/useBexJson'
import formatNumber from '../../lib/helpers/formatNumber'
import getFirstValueOfChartData from '../../lib/helpers/getFirstValueOfChartData'
import { maskContext } from '../../lib/maskContext'
import { spendTitle } from './Procurement2.module.css'
import Dialog from '../common/Dialog'

export default function TotalSpend(props) {
  const dialogRef3 = useRef(null)
  const { withMask } = useContext(maskContext)
  const { query } = props

  const totalQry = query[0]
  const servicesQry = query[1]
  const materialQry = query[2]

  const totalData = useBexJson(totalQry.techname)
  const srvData = useBexJson(servicesQry.techname)
  const matData = useBexJson(materialQry.techname)
  const { data: serviceData } = useBexJson('YSCM_CT_PROC_CONTRACT_SPEND')

  const values = totalData?.data?.chartData || []
  const srvValues = srvData?.data?.chartData || []
  const matValues = matData?.data?.chartData || []

  const value = values.length && getFirstValueOfChartData(values)
  const srvValue = srvValues[0]?.VALUE001 || 0
  const srvPrcnt = srvValues[0]?.VALUE002 || 0
  const matValue = matValues[0]?.VALUE001 || 0
  const matPrcnt = matValues[0]?.VALUE002 || 0

  const {
    VALUE001: contSpendData,
    VALUE002: contSpenValue1,
    VALUE003: contSpenValue2,
  } = serviceData?.chartData?.[0] || {}
  const keyFigureLabels = serviceData?.header?.filter((i) => i.type === 'KF')
  const [, label1, label2] = keyFigureLabels?.map?.((d) => d.label) || []
  const contractSpendPercent = (new Number(contSpendData || 1) / value) * 100
  const contSpendPercent1 =
    (new Number(contSpenValue1 || 1) / new Number(contSpendData || 1)) * 100
  const contSpendPercent2 =
    (new Number(contSpenValue2 || 1) / new Number(contSpendData || 1)) * 100

  const [serviceSpend, setServiceSpend] = useState(false)

  return (
    <div className={styles.container}>
      <Dialog
        size="20em"
        offsetLeft={410}
        offsetTop={-24}
        popupAt="middle-left"
        radius="14px"
        modalState={serviceSpend === true ? 'show' : 'close'}
        ref={dialogRef3}
        onModalClose={() => setServiceSpend(false)}
      >
        <div className={styles.contractSpendContainer}>
          <div className={styles.contractSpend}>
            <h3>Contract Spend</h3>
            <p>{withMask(formatNumber(contSpendData))}</p>
            <p>{contractSpendPercent.toFixed(1)}%</p>
          </div>
          <div className={styles.contractSplit}>
            <h3>{label1}</h3>
            <p>{withMask(formatNumber(contSpenValue1))}</p>
            <p>{contSpendPercent1.toFixed(0)}%</p>
          </div>
          <div className={styles.contractSplit}>
            <h3>{label2}</h3>
            <p>{withMask(formatNumber(contSpenValue2))}</p>
            <p>{contSpendPercent2.toFixed(0)}%</p>
          </div>
        </div>
      </Dialog>
      <section
        onClick={() => props.onSpendTypeChange('totalSpend')}
        className={styles.totalSpend}
      >
        <h1
          style={{ lineHeight: '1.2', paddingBlockStart: '1em' }}
          className={spendTitle}
        >
          {totalQry.title}
        </h1>
        <h4 className={styles.subTitle}>Last 12 Months</h4>
        <figure>${!isNaN(value) && withMask(formatNumber(value, 0))}</figure>
      </section>
      <div className={styles.spendBreakdown}>
        <section
          onClick={() =>
            setServiceSpend(true) || props.onSpendTypeChange('indirectSpend')
          }
          className={styles.spendBreakdownItem}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/contract-spend-gif.gif`}
            alt="bar-chart"
          />
          <h1 className={styles.title}>{servicesQry.title}</h1>
          <div className={styles.breakdownValue}>
            <h4>{'$' + withMask(formatNumber(srvValue))}</h4>
            <h4 style={{ opacity: 0.6, lineHeight: 1.2, width: 'max-content' }}>
              {Math.round(srvPrcnt) + '%'}
            </h4>
          </div>
        </section>

        <section
          onClick={() => props.onSpendTypeChange('directSpend')}
          className={styles.spendBreakdownItem}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/material-spend-gif.gif`}
            alt="bar-chart"
          />
          <h1 className={styles.title}>{materialQry.title}</h1>
          <div className={styles.breakdownValue}>
            <h4>{'$' + withMask(formatNumber(matValue))}</h4>
            <h4 style={{ opacity: 0.6, lineHeight: 1.2 , width: 'max-content' }}>
              {Math.round(matPrcnt) + '%'}
            </h4>
          </div>
        </section>
        <section
          // onClick={() => setTrendVisible(true)}
          onClick={() => props.onSpendTypeChange('sourcingGap')}
          className={styles.spendBreakdownItem}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/sourcing_gap.png`}
            alt="bar-chart"
          />
          <h1 className={styles.title}>Sourcing Coverage</h1>
        </section>
        <section
          onClick={() => props.onSpendTypeChange('investment')}
          className={styles.spendBreakdownItem}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/investment.png`}
            alt="bar-chart"
          />
          <h1 className={styles.title}>INVESTMENTS</h1>
        </section>
      </div>
    </div>
  )
}
