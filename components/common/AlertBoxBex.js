import React, { useState, useEffect } from 'react'
import { IoAlertCircle } from 'react-icons/io5'
import getSumForBexData from '../../lib/helpers/getSumForBexData'
import useBexJson from '../../lib/useBexJson'
import styles from './AlertBox.module.css'
import withComma from '../../lib/helpers/withComma'
import { differenceWrapper } from './AlertAnimation.module.css'
const ALERT_ANIMATION_ACTIVE_TIME = 20000

export default function AlertBoxBex({
  title,
  queryName,
  unit,
  figure,
  StrokeColor,
  alertStyle,
  isHidden,
  valueKey = 'VALUE001',
  formatter = (number) => number,
  withTrend = false,
  onShowTrend = (e) => console.log(e),
}) {
  const bexData = useBexJson(queryName)
  const bexDataFigure = bexData?.data?.chartData?.[0]?.[valueKey]
  const isPercentageOrCurrencyUnit = [
    '$',
    '%',
  ].includes(`${unit || ''}`.trim())
  const isPercentageUnit = [
    '%',
  ].includes(`${unit || ''}`.trim())
  const isCurrencyUnit = [
    '$',
  ].includes(`${unit || ''}`.trim())

  const data = {
    text: { title },
    unit,
    figure: figure,
  }

  //prettier-ignore
  const clickable = withTrend
    ? { onClick: onShowTrend, style: { cursor: 'pointer' } }
    : {}
  const style = { '--alert-box-visible': `${isHidden ? 'hidden' : 'visible'}` }

  return (
    <div style={style} className={styles.wrapper} {...clickable}>
      <div className={styles.content}>
        <div className={styles.iconContent}>
          <IoAlertCircle
            className={styles[alertStyle || 'normal']}
            style={
              Number(data?.figure) === 0 && {
                '--danger-color': 'var(--unify-font-light)',
              }
            }
            size={50}
          />
          <div
            style={{
              '--live-change-animation2': `${withTrend ? '0' : '0'}`,
            }}
            className={differenceWrapper}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/arrow-green.svg`}
            />
          </div>
        </div>
        <h1>{title}</h1>
        <div className={styles.figureContent}>
          <figure>
            {isCurrencyUnit && `${unit}`}
            {data?.figure ? formatter(data.figure) : 0}
            {isPercentageUnit && `${unit}`}
          </figure>
          <small>
            {' '}
            <span>{!isPercentageOrCurrencyUnit && `${unit || ''}`}</span>
          </small>
        </div>
      </div>
    </div>
  )
}
