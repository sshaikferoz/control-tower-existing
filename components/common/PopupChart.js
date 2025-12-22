import React, { useEffect, useRef, useState, useContext } from 'react'
import withComma from '../../lib/helpers/withComma'
import AlertBoxBex from './AlertBoxBex'
import Dialog from './Dialog'
import Block from './Block'
import TrendChart from './TrendChart'
import formatNumber, { formatToThousand } from '../../lib/helpers/formatNumber'
import { maskContext } from '../../lib/maskContext'
import DetailChart from './DetailChart'
import sleep from '../../lib/helpers/sleep'
import PredictionLineChart from '../customized/PredictionLineChart'
// import PredictionChart from '../inventory/PredictionChart'
const PopupTemplate = (props) => {
  return (
    <Block
      style={{
        boxShadow: 'unset',
        backgroundColor: 'var(--popup-bg)',
        padding: 'var(--space-lg)',
        minHeight: '100%',
      }}
      popup={true}
      title={props.title}
      transparent={true}
    >
      <div style={{ marginBlockEnd: '1em', display: 'grid' }}>{props.children}</div>
    </Block>
  )
}

const ChartTypeSelector = (props) => {
  switch (true) {
    case props &&
      Boolean(props.ChartType) === false &&
      props.ComponentCategory === 'A':
      return <TrendChart {...props} />
    case props.ChartType === 'G':
      return <DetailChart {...props} />
    case props.ChartType === 'T':
      return <TrendChart {...props} />
    case props.ChartType === 'P':
      return <PredictionLineChart {...props} />
  }
  //else
  return <DetailChart {...props} />
}
export default function PopupChart(props) {
  const dialogRef = useRef(null)
  const { popupChartDetail } = props
  const [
    showDialog,
    setShowDialog,
  ] = useState(false)
  useEffect(() => {
    if (popupChartDetail?.TechnicalName) setShowDialog(true)
  }, [popupChartDetail?.Title])

  const [
    dialogContentVisible,
    setDialogContentVisible,
  ] = useState(false)
  useEffect(() => {
    setTimeout(async () => {
      await new Promise((r) => setTimeout(r, 100))
      if (showDialog === false) await new Promise((r) => setTimeout(r, 200))
      setDialogContentVisible(showDialog)
    })
  }, [showDialog])

  return (
    <Dialog
      ref={dialogRef}
      size="30em"
      radius="14px"
      clientX={popupChartDetail?.mouseTrack?.[0]}
      clientY={popupChartDetail?.mouseTrack?.[1]}
      modalState={showDialog ? 'show' : 'close'}
      onModalClose={async () => {
        setShowDialog(false)
        await sleep(400)
        props?.onClose?.()
      }}
    >
      {dialogContentVisible && popupChartDetail.TechnicalName && (
        <PopupTemplate title={popupChartDetail.Title}>
          <ChartTypeSelector {...popupChartDetail} />
        </PopupTemplate>
      )}
    </Dialog>
  )
}
