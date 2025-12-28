import React, { useContext, useRef, useEffect, useState } from 'react'
import styles from './GeoSpendTypeNav.module.css'
import useBexJson from '../../lib/useBexJson'
import formatNumber, { formatToBillion } from '../../lib/helpers/formatNumber'
import {
  getQueryCountryKey,
  getCountryCodeByCountryName,
} from '../../lib/helpers/getQueryCountryName'
import { maskContext } from '../../lib/maskContext'
import Dialog from '../common/Dialog'
import Block from '../common/Block'
import SpendPredictionLineChart from './SpendPredictionLineChart'

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

// AI Icon with Star
const AIIcon = ({ className }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* AI Neural Network */}
    <path
      d="M12 2L2 7L12 12L22 7L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 17L12 22L22 17"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12L12 17L22 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
    {/* Star Icon */}
    <path
      d="M18 3L19.09 6.26L22 7L19.09 7.74L18 11L16.91 7.74L14 7L16.91 6.26L18 3Z"
      fill="currentColor"
      opacity="0.9"
    />
  </svg>
)

// Popup Template for Prediction Dialog
const PopupTemplate = ({ title, children }) => {
  const blockRef = useRef(null)
  
  useEffect(() => {
    if (blockRef.current) {
      const titleElement = blockRef.current.querySelector('.popupTitle')
      if (titleElement) {
        titleElement.style.color = '#ffffff'
      }
    }
  }, [title])
  
  return (
    <div ref={blockRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Block
        style={{
          boxShadow: 'unset',
          background: 'var(--block-bg)',
          backgroundColor: 'rgba(21, 57, 122, 0.95)',
          padding: 'var(--space-lg)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
        popup={true}
        title={title}
        transparent={true}
      >
        <div style={{ marginBlockEnd: '1em', display: 'grid', flex: 1, overflow: 'hidden' }}>{children}</div>
      </Block>
    </div>
  )
}

// Spend Prediction Dialog Component
const SpendPredictionDialog = ({ isOpen, onClose, technicalName, title, buttonPosition }) => {
  const dialogRef = useRef(null)
  const contentRef = useRef(null)
  const [dialogContentVisible, setDialogContentVisible] = useState(false)
  const [shouldShowDialog, setShouldShowDialog] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      // Set fixed dimensions and hide scrollbar
      const dialog = dialogRef.current
      dialog.style.width = '63em'
      dialog.style.height = '32em'
      dialog.style.aspectRatio = 'unset'
      dialog.style.overflow = 'hidden'
    }
  }, [isOpen])

  useEffect(() => {
    // Clear any pending timeouts when isOpen changes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (isOpen) {
      // Ensure content is visible first
      setDialogContentVisible(true)
      
      // Wait for content to be rendered in DOM before showing dialog
      // Use a small delay to ensure DOM is ready, especially when reopening immediately
      timeoutRef.current = setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Check if content is actually in the DOM
            if (contentRef.current || dialogRef.current?.querySelector('.popupTitle')) {
              setShouldShowDialog(true)
            } else {
              // Fallback: show after brief delay if content check fails
              timeoutRef.current = setTimeout(() => {
                setShouldShowDialog(true)
                timeoutRef.current = null
              }, 100)
            }
          })
        })
        timeoutRef.current = null
      }, 50) // Small delay to ensure previous close animation completes
    } else {
      // Hide dialog first, then content
      setShouldShowDialog(false)
      timeoutRef.current = setTimeout(() => {
        setDialogContentVisible(false)
        timeoutRef.current = null
      }, 200)
    }

    // Cleanup function to clear timeout on unmount or when isOpen changes
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [isOpen])

  return (
    <Dialog
      ref={dialogRef}
      size="63em"
      radius="14px"
      modalState={shouldShowDialog ? 'show' : 'close'}
      clientX={buttonPosition?.x}
      clientY={buttonPosition?.y}
      onModalClose={async () => {
        // Clear any pending timeouts
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
        setShouldShowDialog(false)
        setDialogContentVisible(false)
        await new Promise((r) => setTimeout(r, 400))
        onClose()
      }}
    >
      {dialogContentVisible && technicalName && (
        <div 
          ref={contentRef}
          style={{
            width: '63em',
            height: '32em',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className={styles.hideScrollbar}>
            <PopupTemplate title={title || 'AI Prediction'}>
              <SpendPredictionLineChart
                TechnicalName={technicalName}
                key={`${technicalName}-${isOpen}`}
              />
            </PopupTemplate>
          </div>
        </div>
      )}
    </Dialog>
  )
}

export default function GeoSpendTypeNav(props) {
  const { withMask, maskData } = useContext(maskContext)
  const [
    serviceSpendDialog,
    setServiceSpendDialog,
  ] = useState(false)
  const [totalSpendPredictionDialog, setTotalSpendPredictionDialog] = useState(false)
  const [contractSpendPredictionDialog, setContractSpendPredictionDialog] = useState(false)
  const [materialSpendPredictionDialog, setMaterialSpendPredictionDialog] = useState(false)
  const [totalSpendButtonPosition, setTotalSpendButtonPosition] = useState(null)
  const [contractSpendButtonPosition, setContractSpendButtonPosition] = useState(null)
  const [materialSpendButtonPosition, setMaterialSpendButtonPosition] = useState(null)
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
      <SpendPredictionDialog
        isOpen={totalSpendPredictionDialog}
        onClose={() => {
          setTotalSpendPredictionDialog(false)
          setTotalSpendButtonPosition(null)
        }}
        technicalName="YSCM_ALL_SPEND_PRED_01"
        title="Total Spend Prediction"
        buttonPosition={totalSpendButtonPosition}
      />
      <SpendPredictionDialog
        isOpen={contractSpendPredictionDialog}
        onClose={() => {
          setContractSpendPredictionDialog(false)
          setContractSpendButtonPosition(null)
        }}
        technicalName="YSCM_SRV_SPEND_PRED_01"
        title="Contracts Spend Prediction"
        buttonPosition={contractSpendButtonPosition}
      />
      <SpendPredictionDialog
        isOpen={materialSpendPredictionDialog}
        onClose={() => {
          setMaterialSpendPredictionDialog(false)
          setMaterialSpendButtonPosition(null)
        }}
        technicalName="YSCM_MAT_SPEND_PRED_01"
        title="Material Spend Prediction"
        buttonPosition={materialSpendButtonPosition}
      />
      <div className={styles.wrap}>
        <section
          onClick={(e) => {
            // Prevent onClick from firing if prediction dialog is open
            if (totalSpendPredictionDialog) {
              e.stopPropagation()
              return
            }
            props.onSpendTypeChange('totalSpend')
          }}
          className={styles.totalSpend}
        >
          <h1
            style={{ lineHeight: '1.2', paddingBlockStart: '1em', display: 'flex', alignItems: 'center', gap: '0.5em' }}
            className={styles.spendTitle}
          >
            Total Spend <span> (Last 12 Months)</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                const rect = e.currentTarget.getBoundingClientRect()
                setTotalSpendButtonPosition({
                  x: rect.right,
                  y: rect.top + rect.height / 2
                })
                setTotalSpendPredictionDialog(true)
              }}
              className={styles.predictionButton}
              title="AI Prediction"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/ai-prediction.png`}
                alt="AI prediction"
              />
            </button>
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
            <h1 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
              Contracts Spend
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const rect = e.currentTarget.getBoundingClientRect()
                  setContractSpendButtonPosition({
                    x: rect.right,
                    y: rect.top + rect.height / 2
                  })
                  setContractSpendPredictionDialog(true)
                }}
                className={styles.predictionButton}
                title="AI Prediction"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/ai-prediction.png`}
                  alt="AI prediction"
                />
              </button>
            </h1>
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
          <h1 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '0.5em' }}>
            Material Spend
            <button
              onClick={(e) => {
                e.stopPropagation()
                const rect = e.currentTarget.getBoundingClientRect()
                setMaterialSpendButtonPosition({
                  x: rect.right,
                  y: rect.top + rect.height / 2
                })
                setMaterialSpendPredictionDialog(true)
              }}
              className={styles.predictionButton}
              title="AI Prediction"
            >
              <img
                src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/ai-prediction.png`}
                alt="AI prediction"
              />
            </button>
          </h1>
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
