import React, { Fragment, useContext, useEffect } from 'react'
import {
  IoCaretDownSharp,
  IoCaretUpSharp,
  IoSquare,
  IoTimeOutline,
} from 'react-icons/io5'

import FlippingFigure from './FlippingFigure'
import styles from './KPIBar.module.css'

export default function KPIBarConfigurableUI(props) {
  const { KPIList = [] } = props

  return (
    <div
      style={{ '--items-count': KPIList.length || 0 }}
      className={styles.kpiTiles}
    >
      {KPIList.map((item, ind) => {
        const {
          Value,
          Uom,
          Target,
          Title,
          TechnicalName,
          style,
          Inversed = false,
          onClick,
        } = item
        const onClickObject =
          typeof onClick === 'function' ? { onClick: onClick } : {}
        const styleObject = typeof style === 'object' ? { style: style } : {}
        const unit =
          Uom === '%' ? (
            <span style={{ display: 'contents' }}>%</span>
          ) : (
            <span style={{ display: 'contents', fontSize: 'var(--font-md)' }}>
              {` `}
              {Uom}
            </span>
          )
        return (
          <div
            key={`${TechnicalName || ''}${ind}`}
            {...onClickObject}
            {...styleObject}
            className={styles.kpiTile}
          >
            <div className={styles.kpiTileTitle}>
              {Title} {Uom === 'days' && <IoTimeOutline size={28} />}
            </div>
            <div className={styles.kpiTileValue}>
              <FlippingFigure
                flipTime={3000}
                transformOriginShift=".71em"
                percent={
                  <span>
                    FYP = {(Number(Target) || 0).toFixed(0)}
                    {unit}
                  </span>
                }
                value={
                  <div className={styles.withIcon}>
                    {Number(Value) < Number(Target) && !Inversed ? (
                      <IoCaretDownSharp color="var(--kpiRed)" />
                    ) : Number(Value) > Number(Target) && Inversed ? (
                      <IoCaretUpSharp color="var(--kpiRed)" />
                    ) : Number(Value) > Number(Target) && !Inversed ? (
                      <IoCaretUpSharp color="var(--kpiGreen)" />
                    ) : Number(Value) < Number(Target) && Inversed ? (
                      <IoCaretDownSharp color="var(--kpiGreen)" />
                    ) : (
                      <IoSquare color="var(--kpiGreen)" size={22} />
                    )}
                    <small>
                      {Number(Value).toFixed(0)}
                      {unit}
                    </small>
                  </div>
                }
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
