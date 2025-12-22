import React, { useContext, useRef, useEffect, useState } from 'react'
import styles from './GeoSpendTypeNav.module.css'
import useBexJson from '../../lib/useBexJson'
import formatNumber, { formatToBillion } from '../../lib/helpers/formatNumber'
import {
  getQueryCountryKey,
  getCountryCodeByCountryName,
} from '../../lib/helpers/getQueryCountryName'
import { maskContext } from '../../lib/maskContext'

const delayGen = () => {
  let timer = 0
  return (callback, ms = 500) => {
    try {
      clearTimeout(timer)
      timer = setTimeout(() => callback(), ms)
    } catch (e) {
      console.log({ e })
    }
  }
}
const pointGenerationDelay = delayGen()

export default function GeoSpendTypeNav(props) {
  const { withMask, maskData } = useContext(maskContext)
  const [
    serviceSpendDialog,
    setServiceSpendDialog,
  ] = useState(false)
  const { query = {}, spendMapArea = 'global',spendType='directSpend' } = props

  const totalSpendQueries = Object.keys(query)
    .slice(0, 3)
    .map((typeKey) => {
      return {
        techname: query[typeKey][spendMapArea].techname,
        title: query[typeKey].title,
      }
    })
  const [
    materialTechname,
    serviceTechname,
    totalTechname,
  ] = totalSpendQueries.map((i) => i.techname)
  console.log({ totalSpendQueries })
  const { data: materialData, status: statusForMaterialData } = useBexJson(
    materialTechname,
    {
      parser: 'new',
      staleTime: 60000,
    }
  )
  const { data: serviceData, status: statusForServiceData } = useBexJson(
    serviceTechname,
    {
      parser: 'new',
      staleTime: 60000,
    }
  )
  const { data: totalData, status: statusForTotalData } = useBexJson(totalTechname, {
    parser: 'new',
    staleTime: 60000,
  })
  const { indirectSpend: indirectSpendQuery } = props.query
  const indirectSpendByCountryTechname = indirectSpendQuery?.['global']?.byCountry
  const indirectSpendByCountryTitle = indirectSpendQuery?.title
  const { data: byCountryIndirectData, status: statusForByCountryIndirectData } =
    useBexJson(indirectSpendByCountryTechname, {
      parser: 'new',
      staleTime: 60000,
    })

  console.log({ indirectSpendByCountryTitle })
  const chartDataForMaterial = materialData?.chartData || []
  const chartDataForService = serviceData?.chartData || []
  const chartDataForTotal = totalData?.chartData || []
  const chartDataForIdirectByCountry = byCountryIndirectData?.chartData || []

  console.log({ serviceData, totalData })
  const valueFieldForMaterial = materialData?.keyFigureKeys?.[0] || 'none'
  const valueFieldForService = serviceData?.keyFigureKeys?.[0] || 'none'
  const valueFieldForTotal = totalData?.keyFigureKeys?.[0] || 'none'
  const valueFieldForIndirectByCountry =
    byCountryIndirectData?.keyFigureKeys?.[0] || 'none'
  const getTotal = (chartData, kfKey) => {
    return chartData.reduce((cum, cur) => cum + cur[kfKey], 0)
  }
  const totals = [
    getTotal(chartDataForTotal, valueFieldForTotal),
    getTotal(chartDataForService, valueFieldForService),
    getTotal(chartDataForMaterial, valueFieldForMaterial),
    getTotal(chartDataForIdirectByCountry, valueFieldForIndirectByCountry),
  ]
  const [
    totalSpend,
    totalServiceSpend,
    totalMaterialSpend,
    totalIndirectSpend,
  ] = totals
  const serviceSpendPercentage = (totalServiceSpend / totalSpend) * 100
  const materialSpendPercentage = (totalMaterialSpend / totalSpend) * 100
  console.log({ totalIndirectSpend })
  const indirectSpendDialogVisible = spendType==='indirectSpend'

  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <section
          onClick={() => props.onSpendTypeChange('totalSpend')}
          className={styles.totalSpend}
        >
          <h1
            style={{ lineHeight: '1.2', paddingBlockStart: '1em' }}
            className={styles.spendTitle}
          >
            Total Spend <span> (Last 12 Months)</span>
          </h1>
          <h1>${!isNaN(totalSpend) && withMask(formatNumber(totalSpend, 0))}</h1>
        </section>
        <section
          onClick={async () => {
            setServiceSpendDialog((state) => !state)
            await new Promise((r) => setTimeout(r, 200))
            props.onSpendTypeChange('indirectSpend')
          }}
          className={styles.spendBreakdownItem}
        >
          <React.Fragment>
            <div data-indirectSpend className={styles.image}>
              <img
                src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/contractspend-icon.png`}
                alt="bar-chart"
              />
            </div>
            <h1 className={styles.title}>Contracts Spend</h1>
            <h3>{'$' + withMask(formatNumber(totalServiceSpend))}</h3>
            <h4 style={{ opacity: 0.6, lineHeight: 1.2, width: 'max-content' }}>
              {Math.round(serviceSpendPercentage) + '%'}
            </h4>
          </React.Fragment>
          {serviceSpendDialog === false && indirectSpendDialogVisible && (

            <div className={styles.indirectDialog}>
              <h4>{indirectSpendByCountryTitle}</h4>
              <h2>${withMask(formatToBillion(totalIndirectSpend))}</h2>
            </div>
          )}
        </section>

        <section
          onClick={() => props.onSpendTypeChange('directSpend')}
          className={styles.spendBreakdownItem}
        >
          <div data-directSpend className={styles.image}>
            <img
              src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/materialspend-icon.png`}
              alt="bar-chart"
            />
          </div>
          <h1 className={styles.title}>Material Spend</h1>
          <h3>{'$' + withMask(formatNumber(totalMaterialSpend))}</h3>
          <h4 style={{ opacity: 0.6, lineHeight: 1.2, width: 'max-content' }}>
            {Math.round(materialSpendPercentage) + '%'}
          </h4>
        </section>
        <section
          // onClick={() => setTrendVisible(true)}
          onClick={() => props.onSpendTypeChange('sourcingGap')}
          className={styles.spendBreakdownItem}
        >
          <div data-sourcinggap className={styles.image}>
            <img
              src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/sourcinggap-icon.png`}
              alt="bar-chart"
            />
          </div>
          <h1 className={styles.title}>Sourcing Coverage</h1>
        </section>
        <section
          onClick={() => props.onSpendTypeChange('investment')}
          className={styles.spendBreakdownItem}
        >
          <div data-investment className={styles.image}>
            <img
              src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/saudimade-icon.png`}
              alt="bar-chart"
            />
          </div>
          <h1 className={styles.title}>Investments</h1>
        </section>
      </div>
    </div>
  )
}
