/**
 *
 * @returns
 * calculate the sum per column and returns the "total row with same headerSources"
 */
export default function getSumForBexData(data) {
  const { chartData = [], headerSources } = data
  return {
    headerSources,
    chartData: [
      chartData.reduce((cum, cur) => {
        const entries = Object.entries(cur)
        const xsltField = entries
          .filter(([k, v]) => !k?.startsWith('VALUE0'))
          .pop()?.[0]
        if (cum['total'] === undefined) cum['total'] = { [xsltField]: 'total' }
        let obj = cum['total']
        entries
          .filter(([k, v]) => k?.startsWith('VALUE0'))
          .forEach(([k, v]) => {
            if (!isNaN(v)) obj[k] = obj[k] ? obj[k] + v : v
          })
        cum['total'] = obj
        return cum
      }, {}).total,
    ],
  }
}
