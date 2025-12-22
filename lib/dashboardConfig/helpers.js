export const PALETTE = [
  'var(--unify-accent1)',
  'var(--unify-accent2)',
  'var(--unify-accent4)',
  'var(--inv-accent4)',
  'var(--inv-accent5)',
  'var(--inv-accent6)',
  'var(--proc-accent1)',
  'var(--proc-accent2)',
  'var(--unify-accent3)',
]
export const PALETTE2 = [
  'var(--unify-accent2)',
  'var(--unify-accent1)',
  'var(--unify-accent4)',
  'var(--inv-accent4)',
  'var(--inv-accent5)',
  'var(--inv-accent6)',
  'var(--proc-accent1)',
  'var(--proc-accent2)',
  'var(--unify-accent3)',
]

const MONTH_SHORT = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OCT',
  'NOV',
  'DEC',
]

export const getMonthDigit = (monthShort) => {
  const foundInd = MONTH_SHORT.indexOf(monthShort?.toUpperCase?.())
  if (foundInd >= 0) return `${Number(foundInd + 1)}`.padStart(2, '0')
  return ''
}

export function formatChartDataWithShortMonth(chartData) {
  const fieldName = getArgumentField(chartData) || 'CALMONTH'
  const firstobj = chartData?.[0]
  let [
    argField,
    ...keys
  ] = firstobj ? Object.keys(firstobj).filter((k) => k?.match?.(/value0\d\d/i) === null) : []

  const firstObjArgEntries = firstobj
    ? Object.entries(firstobj).filter((item) => {
        return item?.[0]?.match?.(/value0\d\d/i) === null
      })?.[0]
    : null
  const [
    ,
    firstObjValue,
  ] = firstObjArgEntries || []
  const isShortMonth = firstObjValue?.split?.(' ').lenght === 2
  const isNumericFormat = `${firstObjValue || ''}`.match?.(/\d\d\d\d\d\d/i) !== null

  if (isNumericFormat)
    return chartData
      .map((item) => {
        const yearMonth = `${item[fieldName]}`
        const [
          month,
          year = new Date().getFullYear(),
        ] = [
          yearMonth.substring(4),
          yearMonth.substring(0, 4),
        ]
        if (month?.match?.(/\d\d/) === null || year?.match?.(/\d\d\d\d/) === null)
          return console.log({ item }) || null
        return {
          ...item,
          [fieldName]: new Date(`${year}${month ? '/' : ''}${month}`),
        }
      })
      .filter(Boolean)
      .sort((a, z) => a[fieldName].getTime() - z[fieldName].getTime()) //?

  if (!isShortMonth) return chartData
  return chartData
    .map((item) => {
      const [
        month,
        year = new Date().getFullYear(),
      ] = item[fieldName].split(' ')
      const monthDigit = getMonthDigit(month)
      return {
        ...item,
        [fieldName]: new Date(`${year}${monthDigit ? '/' : ''}${monthDigit}`),
      }
    })
    .sort((a, z) => a[fieldName].getTime() - z[fieldName].getTime()) //?
}
export function isHanaSource({ source }) {
  return source && source === 'H'
}

export function isLogisticsAlert({ category, Category }) {
  return (category && category == 'LG') || (Category && Category === 'LG')
}

export function isProcurementAlert({ category, Category }) {
  return (category && category == 'PR') || (Category && Category === 'PR')
}
export function isInventoryAlert({ category, Category }) {
  return (category && category == 'IN') || (Category && Category === 'IN')
}

export function filterByCategory(category) {
  if (category === 'LG') return isLogisticsAlert
  if (category === 'PR') return isProcurementAlert
  if (category === 'IN') return isInventoryAlert
  return (item) => false
}

export function filterShowOnCT(item) {
  if (item.ShowOnCT === false || item.ShowOnCT === 'false') {
    return false
  }
  return true
}

export function getArgumentField(chartData) {
  if (!chartData || !Array.isArray(chartData) || chartData?.lenght === 0) return null
  const [firstItem] = chartData
  if (typeof firstItem !== 'object') return null
  return Object.keys(firstItem).find((item) => !item.startsWith('VALUE0'))
}

/**
 *
 * @param {string[]} chartData
 * @param {string} key
 * @param {number} itemsToSkip
 * @returns
 */
export function getChartDataValue00(chartData, key = 'VALUE001', itemsToSkip = 0) {
  if (!chartData || !Array.isArray(chartData) || chartData.length === 0) return null

  const data =
    itemsToSkip === 0
      ? chartData?.[0]
      : chartData.find((item, ind) => ind === itemsToSkip)
  return data?.[key] || 0
}

export function isNonZeroNumber(num) {
  return isNaN(num) === false && Boolean(Number(num)) === true
}
export function formatQuarterYear(date) {
  if (typeof date !== 'object' || typeof date.getMonth !== 'function')
    throw Error('invalid date')

  // Calculate the quarter

  const quarter = Math.floor(date.getMonth() / 3) + 1 // +1 because getMonth() starts from 0

  // Get the last two digits of the year
  const year = date.getFullYear()

  return `Q${quarter} ${year}`
}

export function formatToDateObject(yearMonth) {
  const [
    y1,
    y2,
    y3,
    y4,
    m1,
    m2,
  ] = `${yearMonth}`
  return new Date(`${y1}${y2}${y3}${y4}-${m1}${m2}`)
}
