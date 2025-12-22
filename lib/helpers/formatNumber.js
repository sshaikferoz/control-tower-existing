export default function formatNumber(
  number,
  digits = 1,
  mode = 'mm',
  withSpace = false
) {
  if (isNaN(number)) return number
  const num = Math.abs(Number(number))
  let inserttedSpace = withSpace ? ' ' : ''

  return num >= 1.0e9
    ? (num / 1.0e9).toFixed(digits) + inserttedSpace + 'B'
    : num >= 1.0e6
    ? (num / 1.0e6).toFixed(digits) + inserttedSpace + (mode == 'mm' ? 'MM' : 'M')
    : num >= 1.0e3
    ? (num / 1.0e3).toFixed(digits) + inserttedSpace + (mode == 'mm' ? 'M' : 'K')
    : num.toFixed(digits)
}

export function formatNumberInMM(number, digits = 1, mode = 'mm') {
  if (isNaN(number)) return number
  const num = Math.abs(Number(number))

  const prettyNumber = new Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 5,
  })

  return num >= 1.0e6
    ? prettyNumber.format((num / 1.0e6).toFixed(digits)) +
        (mode == 'mm' ? 'MM' : 'M')
    : num >= 1.0e3
    ? (num / 1.0e3).toFixed(digits) + (mode == 'mm' ? 'M' : 'K')
    : num.toFixed(digits)
}

export function formatToBillion(number, digits = 1, leadingZeros = 1) {
  if (isNaN(number)) return number
  const num = Math.abs(Number(number))

  const billions = num / 1.0e9
  let billionCondition = num >= 1.0e8
  if (leadingZeros === 2) billionCondition = num >= 1.0e7
  if (leadingZeros > 2) billionCondition = num >= 1.0e6
  if (billionCondition) return `${new Number(billions).toFixed(digits)}B`
  return formatNumber(number)
}

export function formatToThousand(number, digits = 1) {
  if (isNaN(number)) return 0
  const num = Math.abs(Number(number))

  const thousand = num / 1.0e3
  if (num >= 1.0e3) return `${new Number(thousand).toFixed(digits)}`
  return `${new Number(thousand).toFixed(digits + 1)}`
}
