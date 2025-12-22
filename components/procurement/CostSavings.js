import React from 'react'
import useBexJson from '../../lib/useBexJson'
import DataGrid from '../common/DataGrid'
import { title, tableLayout } from './TransparentTable.module.css'
const ImageSticker = () => (
  <img
    style={{
      marginBlockStart: '-.7em',
      marginBlockEnd: '-.2em',
      maxWidth: '25%',
    }}
    src={`${process.env.NEXT_PUBLIC_BSP_NAME}/images/proc-total-spend-sticker.gif`}
    alt="bar-chart"
  />
)

const gridData = [
  { component: <ImageSticker /> },
  { text: 'Savings' },
  { text: 'Avoidance' },
  { text: 'Monthly' },
  { value: null },
  { value: null },
  { text: 'Year to Date' },
  { value: null },
  { value: null },
  { text: 'Target' },
  { value: null },
  { value: null },
]
export default function CostSavings(props) {
  const { data, isLoading, isError } = useBexJson(props.query.techname)
  let indCount = 1
  const gridDataWithValues = gridData.map((item) => {
    if (item.hasOwnProperty('value') && data)
      return { value: data.chartData?.[0][`VALUE00${indCount++}`] }
    return item
  })
  return (
    <div className={tableLayout}>
      <h1 className={title}>{props.query.title}</h1>
      <DataGrid
        data={gridDataWithValues}
        colNum={3}
        rowNum={4}
        transperentHeader={true}
      />
    </div>
  )
}
