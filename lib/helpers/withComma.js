export default function withComma(number, DecimalDigits) {
  const cleanNumber = `${number}`.replace(',', '')
  if (isNaN(cleanNumber)) return ''
  return Number(cleanNumber).toLocaleString('en-US', {
    maximumFractionDigits: DecimalDigits || 0,
  })
}
