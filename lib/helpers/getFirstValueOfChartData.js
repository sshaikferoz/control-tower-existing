export default function getFirstValueOfChartData(data) {
  let chartData = data
  if (data && data.chartData) chartData = data.chartData
  return Array.isArray(chartData) && chartData.length
    ? Object.entries(chartData[0])
        .filter(([k, v]) => k.startsWith('VALUE0'))
        .map(([k, v]) => v)
        .pop()
    : 'error'
}
