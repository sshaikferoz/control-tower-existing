export default function getLastValueOfChartData(data) {
  let chartData = data
  if (data && data.chartData) chartData = data.chartData
  return Array.isArray(chartData)
    ? Object.entries(chartData[chartData.length - 1])
        .filter(([k, v]) => k.startsWith('VALUE0'))
        .map(([k, v]) => v)
        .pop()
    : 'error'
}
