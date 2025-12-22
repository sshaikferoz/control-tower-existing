export default function selectBexColumnByFieldName(data, fieldName) {
  if (!data) return data
  const { headerSources = [], chartData = [] } = data
  const byFieldName = new RegExp(fieldName, 'i')
  const foundFields = headerSources.filter((item) => {
    return item.name.match(byFieldName)
  })
  if (foundFields.length === 0) return data
  const fieldKey = foundFields[0]
  const filteredChartData = chartData.map((item) => {
    const [xsltField, xsltLabel] = Object.entries(item)
      .filter(([k, v]) => !k.startsWith('VALUE0'))
      .pop()
    return { [xsltField]: xsltLabel, [fieldKey.value]: item[fieldKey.value] }
  }, [])
  const filteredHeaderSources = headerSources.filter(
    (item) => item.value === fieldKey.value
  )
  return { headerSources: filteredHeaderSources, chartData: filteredChartData }
}
