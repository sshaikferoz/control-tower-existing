import React, { useState, useContext } from 'react'
import useBexJson from '../../lib/useBexJson'
import styles from './Sustainability.module.css'
import formatNumber, {
  formatNumberInMM,
  formatToThousand,
} from '../../lib/helpers/formatNumber'
import { maskContext } from '../../lib/maskContext'
const prettyNumber = new Intl.NumberFormat('en-US', {
  maximumSignificantDigits: 5,
})

function Sustainability(props) {
  const { withMask } = useContext(maskContext)
  const { queryTechnicalName = 'YSCM_CIRCULAR_ECO' } = props
  const { data, error: networkError } = useBexJson(queryTechnicalName, {
    parser: 'new',
  })
  const [
    rotateStep,
    setRotateStep,
  ] = useState('none')
  const {
    chartData = [],
    error: executeQueryError,
    charKeys = [],
    keyFigureKeys = [],
    headerText = {},
    charUniqueValues = {},
  } = data || {}
  const stepsIndForDataGrid = [
    'three',
    'two',
    'one',
    'four',
  ]
  const stepsInd = [
    'one',
    'two',
    'three',
    'four',
  ]
  const groupedBy = charKeys[1]
  const dataFormatted =
    (charUniqueValues.hasOwnProperty(groupedBy) &&
      charUniqueValues[groupedBy].map((groupedByKey) => {
        const filter = { [groupedBy]: groupedByKey }
        const filtered = chartData.filter((i) => {
          if (Object.keys(filter).length === 0) return true
          const hasFilter = Object.keys(i).filter((currentKey) => {
            return (
              filter.hasOwnProperty(currentKey) &&
              filter[currentKey] === i[currentKey]
            )
          })
          return hasFilter.length === Object.keys(filter).length
        })
        return Object.fromEntries([
          [
            'key',
            groupedByKey,
          ],
          [
            'items',
            filtered,
          ],
        ])
      })) ||
    []
  if (chartData.length === 0) return <div></div>
  const dataForCurrentStep =
    rotateStep === 'none'
      ? dataFormatted.map(({ key, items }) => {
        const foundEntry = items?.find?.((i) => i.Title?.match(/result/i))
        return foundEntry
      })
      : dataFormatted.find(({ key, items }, ind) => {
        return rotateStep === stepsIndForDataGrid[ind]
      })?.items
  console.log({ dataFormatted })
  let ytdActualKey = keyFigureKeys[0]
  let ytdEstKey = keyFigureKeys[1]
  let qntActualKey = keyFigureKeys[2]
  console.log({ dataForCurrentStep })
  let ytdActualSum = dataForCurrentStep.reduce(
    (cum, cur) => cur[ytdActualKey] + cum,
    0
  )
  let qntActualSum = dataForCurrentStep.reduce(
    (cum, cur) => cur[qntActualKey] + cum,
    0
  )

  let ytdEstSum = dataForCurrentStep.reduce((cum, cur) => cur[ytdEstKey] + cum, 0)
  let summaryHeaderText = 'Total Value Creation'

  const getPrevious = () => {
    const currentStep = rotateStep
    const indCurrentStep = stepsInd.findIndex((i) => i === currentStep)
    if (indCurrentStep === 0) return 'none'
    return stepsInd[indCurrentStep - 1]
  }

  const getNext = () => {
    const currentStep = rotateStep
    const indCurrentStep = stepsInd.findIndex((i) => i === currentStep)
    if (indCurrentStep === 3) return 'none'
    return stepsInd[indCurrentStep + 1]
  }

  const prevBtnDisabled = rotateStep === 'none' ? { disabled: true } : {}
  const nextBtnDisabled = rotateStep === 'four' ? { disabled: true } : {}
  let rotateDataset = rotateStep === 'none' ? {} : { 'data-rotate-step': rotateStep }
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        {/* <div className={styles.co2}>
          <h3>CO2 Emission Targets</h3>
          <div className={styles.co2__body}>
            <img
              src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/CO2-sustainability.png`}
            />
            <img
              src={`${process.env.NEXT_PUBLIC_SHAREK_SCCT_URL}/CO2-chart2X.png`}
              alt="CO2 target"
            />
          </div>
        </div> */}
        <div className={styles.circularTableWrap}>
          <div className={styles.circulNav}>
            <h4 className={styles.circulNav__midTitle}>Circular Economy</h4>
            <div {...rotateDataset} className={styles.circulNav__body}>
              <div className={styles.sustainability}>
                <img
                  src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/sustainability.png`}
                />
              </div>
              <div className={styles.refuse}>
                <img src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/refuse.png`} />
              </div>
              <div className={styles.reduce}>
                <img src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/reduce.png`} />
              </div>
              <div className={styles.recycle}>
                <img
                  src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/recycle.png`}
                />
              </div>
              <div className={styles.reuse}>
                <img src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/reuse.png`} />
              </div>
            </div>
          </div>
          <div className={styles.tableWrapper}>
            {rotateStep === 'none' ? (
              <div className={styles.table}>
                <h2 className={styles.table__title}>{summaryHeaderText}</h2>
                <div className={styles.img}>
                  <img
                    src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/value-creation.png`}
                    alt="${summaryHeaderText}"
                  />
                </div>
                <section className={styles.summaryItems}>
                  <section className={styles.summaryItem}>
                    <h4 className={styles.summaryItem__desc}>
                      {headerText[ytdActualKey]}
                    </h4>
                    <h4 className={styles.summaryItem__value}>
                      $
                      {withMask(
                        formatNumber(ytdActualSum * 1000_000, 0, 'mm', true)
                      )}
                    </h4>
                  </section>
                  <section className={styles.summaryItem}>
                    <h4 className={styles.summaryItem__desc}>
                      {headerText[ytdEstKey]}
                    </h4>
                    <h4 className={styles.summaryItem__value}>
                      ${withMask(formatNumber(ytdEstSum * 1000_000, 0, 'mm', true))}
                    </h4>
                  </section>
                </section>
              </div>
            ) : (
              <div className={styles.gridTable}>
                <React.Fragment>
                  <div className={styles.gridHeader}>
                    <div className={styles.descCell}></div>
                    <div className={styles.ytdCell}>{headerText[ytdActualKey]}</div>
                    <div className={styles.yeCell}>{headerText[ytdEstKey]}</div>
                    {qntActualSum > 0 ? (
                      <div className={styles.yeCell}>{headerText[qntActualKey]}</div>
                    ) : null}
                  </div>
                  <div className={styles.gridContent}>
                    {dataForCurrentStep
                      .filter((item) => !item.Title.match?.(/result/i))
                      .map((item, ind) => {
                        return (
                          <React.Fragment key={`${ind}${Math.random()}`}>
                            <div className={styles.descCell}>{item.Title}</div>
                            <div className={styles.ytdCell}>{item.YTDActual}</div>
                            <div className={styles.yeCell}>{item.YEEst}</div>
                            {qntActualSum > 0 ? (
                              <div className={styles.yeCell}>
                                {prettyNumber.format(item.QtyTn)}
                              </div>
                            ) : null}
                          </React.Fragment>
                        )
                      })}
                  </div>
                  <div className={styles.gridFooter}>
                    {dataForCurrentStep
                      .filter((item) => item.Title.match?.(/result/i))
                      .map((item, ind) => {
                        return (
                          <React.Fragment key={`${ind}${Math.random()}`}>
                            <div className={styles.descCell}> </div>
                            <div className={styles.ytdCell}>
                              ${withMask(Number(item.YTDActual).toFixed(1))}MM
                            </div>
                            <div className={styles.yeCell}>
                              ${withMask(Number(item.YEEst).toFixed(1))}MM
                            </div>
                            {qntActualSum > 0 ? (
                              <div className={styles.yeCell}>
                                {withMask(prettyNumber.format(item.QtyTn))}
                              </div>
                            ) : null}
                          </React.Fragment>
                        )
                      })}
                  </div>
                </React.Fragment>
              </div>
            )}
            <fieldset
              style={{
                '--home-icon-src': `url(${process.env.NEXT_PUBLIC_BSP_NAME}/images/home-icon.svg)`,
              }}
              className={styles.circulNav__btns}
            >
              <section>
                <input
                  {...prevBtnDisabled}
                  onClick={() => {
                    setRotateStep(getPrevious())
                  }}
                  type="button"
                  value="⟨"
                />
                <input
                  onClick={() => {
                    setRotateStep('none')
                  }}
                  type="button"
                  value=""
                />
                <input
                  {...nextBtnDisabled}
                  onClick={() => {
                    setRotateStep(getNext())
                  }}
                  type="button"
                  value="⟩"
                />
              </section>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Sustainability
