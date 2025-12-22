import React, { useState } from 'react'
import SelectBox from 'devextreme-react/select-box'
import {
  Chart,
  CommonSeriesSettings,
  Series,
  Legend,
  ArgumentAxis,
  ValueAxis,
  Font,
  Label,
  Grid,
  ConstantLine,
  ZoomAndPan,
  Tooltip,
  Format,
  Width,
} from 'devextreme-react/chart'

import useBexJson from '../../lib/useBexJson'

function SampleChart(props) {
  const { queryTechnicalName = 'YSCM_CIRCULAR_ECO' } = props
  const { data, error: networkError } = useBexJson(queryTechnicalName, {
    parser: 'new',
  })
  const {
    chartData = [],
    error: executeQueryError,
    charKeys = [],
    keyFigureKeys = [],
    headerText = {},
    charUniqueValues = {},
    mainAxisUniqueValues = [],
  } = data || {}
  console.log({ data })
  const [
    filter,
    setFilter,
  ] = useState({})


  return (
    <div>
      {Object.keys(charUniqueValues).map((charKey) => {
        return (
          <div
            key={charKey}
            style={{
              color: 'white',
              display: 'flex',
              gap: '1em',
              paddingBlockEnd: '.4em',
            }}
          >
            <h4 style={{ alignSelf: 'center' }}> {headerText[charKey]}</h4>
            <SelectBox
              onOptionChanged={(selected) => {
                // if (selected.name === 'text') console.log({ selected })
                if (
                  selected?.value &&
                  selected?.name === 'text' &&
                  charUniqueValues[charKey].includes(selected.value)
                )
                  setFilter({ ...filter, [charKey]: selected.value })
              }}
              items={charUniqueValues[charKey]}
            />
          </div>
        )
      })}
      <Chart
        argumentAxis={{
          grid: { visible: false },
          label: { alignment: 'center', displayMode: 'standard' },
          endOnTick: false,
        }}
        valueAxis={{ grid: { visible: false } }}
        dataSource={chartData.filter((i) => {
          if (Object.keys(filter).length === 0) return true
          const hasFilter = Object.keys(i).filter((currentKey) => {
            return (
              filter.hasOwnProperty(currentKey) &&
              filter[currentKey] === i[currentKey]
            )
          })
          return hasFilter.length === Object.keys(filter).length
        })}
      >
        <CommonSeriesSettings type="scatter" />
        {keyFigureKeys.map((sKey, ind) => (
          <Series
            key={sKey}
            argumentField={charKeys?.[0]}
            valueField={sKey}
            name={headerText?.[sKey]}
          >
            <Label visible={true} backgroundColor="none">
              <Font />
            </Label>
          </Series>
        ))}
        <ValueAxis endOnTick={false} />
      </Chart>
    </div>
  )
}
export default SampleChart
