import React, { useState } from 'react'
import {
  withCrossfade,
  crossfadeIcon,
  crossfadeWrapper,
} from './../procurement/Procurement.module.css'
import Block from './Block'
import ComponentById from './ComponentById'
import DetailChart from './DetailChart'
import TrendChart from './TrendChart'

const CrossfadeTemplate = (props) => {
  const [
    hiddendElement,
    setHiddenElement,
  ] = useState('second')

  function blockedInventoryClicked() {
    if (hiddendElement === 'first') setHiddenElement('second')
    else {
      setHiddenElement('first')
    }
  }
  return (
    <div className={crossfadeWrapper}>
      <img
        className={crossfadeIcon}
        src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/flip-icon.png`}
      />
      <div
        data-hidden-place={hiddendElement}
        className={withCrossfade}
        onClick={blockedInventoryClicked}
      >
        {props.children}
      </div>
    </div>
  )
}
export default function DynamicComponent({ compId, results = [], setDetailFn }) {
  console.log(`running dynamic for component ${compId}`)
  let clickEvent = {}
  let style = {}
  let drilldownProps = {}
  const found = results.find(
    (comp) =>
      comp.ComponentKey === compId || comp.ComponentKey === compId?.toUpperCase?.()
  )
  if (!found || results.length === 0) return null
  const trendFound =
    found?.Level2Nav?.results?.[0] || found?.DataSourceNav?.results?.[0]

  if (trendFound) {
    const { IsCurrencyFormat = true, DecimalDigits = '0' } = found || {}
    const renderDelay = found?.ComponentKey ? { renderDelay: 680 } : {}
    style = { cursor: 'pointer', userSelect: 'none' }
    if (trendFound?.Crossfade !== true)
      clickEvent = {
        onClick: () => {
          setDetailFn({
            ...trendFound,
            IsCurrencyFormat,
            DecimalDigits,
            ...renderDelay,
          })
        },
      }

    drilldownProps = { ...trendFound, IsCurrencyFormat, DecimalDigits }
  }

  const ComponentProps = {
    componentId: compId,
    componentProps: found || {},
    drilldownProps,
  }

  const drilldownBlockProps =
    { title: trendFound?.Title || found?.Title, clickEvent, style } || {}
  const BlockProps = { title: found?.Title, clickEvent, style } || {}
  const isGeneric = found?.IsGeneric
  if (trendFound?.Crossfade !== true)
    return isGeneric ? (
      <DetailChart
        background="transparent"
        textColor="light"
        key={`${found.TechnicalName}`}
        {...ComponentProps.componentProps}
      />
    ) : (
      <Block {...BlockProps}>
        <ComponentById {...ComponentProps} />
      </Block>
    )
  return (
    <CrossfadeTemplate>
      <Block {...BlockProps}>
        {isGeneric ? (
          <DetailChart
            background="transparent"
            textColor="light"
            key={`${found.TechnicalName}`}
            {...ComponentProps.componentProps}
          />
        ) : (
          <ComponentById {...ComponentProps} />
        )}
      </Block>
      <Block {...drilldownBlockProps} title={trendFound.Title || found.Title}>
        {trendFound?.Trend ? (
          <TrendChart
            background="transparent"
            textColor="light"
            key={`${trendFound.TechnicalName || found.TechnicalName}`}
            aggregationType={trendFound?.trendAggrType}
            {...drilldownProps}
          />
        ) : (
          <DetailChart
            background="transparent"
            textColor="light"
            key={`${trendFound.TechnicalName || found.TechnicalName}`}
            {...drilldownProps}
          />
        )}
      </Block>
    </CrossfadeTemplate>
  )
}
