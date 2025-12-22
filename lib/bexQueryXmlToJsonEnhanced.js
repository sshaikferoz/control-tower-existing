import { XMLParser } from 'fast-xml-parser'
const options = {
  ignoreDeclaration: true,
  ignorePiTags: true,
  ignoreAttributes: true,
  removeNSPrefix: true,
  isArray: (arg) => arg === 'item',
}
const parser = new XMLParser(options)

export default function parseBExQueryXML(xml) {
  let error = null
  let result = {}
  try {
    result = parser.parse(xml) //?.
    error = result.abap.error
  } catch (e) {
    if (e && e.toString()) error = e?.toString() //?
    else error = 'unknown error'
  }
  if (error) return { error }
  let headerKeys = []
  let headerKeysExpanded = []
  let header = []

  const { metadata = {} } = result.abap.values
  const { description = '', load_date = '' } = metadata
  let loadDate
  if (new Date(load_date).toString().match(/invalid/i) === null)
    loadDate = new Date(load_date)

  result.abap.values.META.ZBW_QUERY_OUTPUT_METADATA.forEach((i) => {
    let headerItem = { keyField: null, textField: null, desc: null, type: null }
    const key = i.SCRTEXT_L.replace(/[\W]/g, '')
    headerItem.desc = i.SCRTEXT_L
    headerItem.type = i.TYPE

    if (headerKeys.includes(key)) {
      headerKeys.push(i.FIELDNAME)
      headerItem.textField = i.FIELDNAME
    } else {
      headerKeys.push(key)
      headerItem.textField = key
    }

    if (i.ZBW_QUERY_OUTPUT_METADATA && i.ZBW_QUERY_OUTPUT_METADATA.SCRTEXT_L) {
      headerKeysExpanded.push(
        `${i.ZBW_QUERY_OUTPUT_METADATA.SCRTEXT_L.replace(/[\W]/g, '')}Key`
      )
      headerItem.keyField = `${i.ZBW_QUERY_OUTPUT_METADATA.SCRTEXT_L.replace(
        /[\W]/g,
        ''
      )}Key`
    }
    header.push(headerItem)
  })

  const keyFigureKeys = result.abap.values.META.ZBW_QUERY_OUTPUT_METADATA.map(
    (i, ind) => {
      if (i.TYPE === 'KF') return headerKeys[ind]
    }
  ).filter(Boolean)

  let headerText = result.abap.values.META.ZBW_QUERY_OUTPUT_METADATA.reduce(
    (cum, cur, ind) => {
      return { ...cum, [headerKeys[ind]]: cur.SCRTEXT_L }
    },
    {}
  )

  //merge expanded keys into headerKeys
  headerKeysExpanded.forEach((extraKey) => {
    const found = headerKeys.findIndex((key) => extraKey?.startsWith(key))
    headerKeys = [
      ...headerKeys.slice(0, found),
      extraKey,
      ...headerKeys.slice(found),
    ]
  })

  // expand the text header also
  headerKeysExpanded.forEach((extraKey) => {
    const found = Object.keys(headerText).find((key) => extraKey?.startsWith(key))
    if (found) headerText = { ...headerText, [extraKey]: `${headerText[found]} Key` }
  })

  const chartData = result.abap.values.OUTPUT.item
    .map((item) => {
      const values = Object.values(item)
      if (values.join('').includes('Overall Result')) return
      return headerKeys.reduce((cum, cur, ind) => {
        cum[cur] = values[ind]
        return cum
      }, {})
    })
    .filter(Boolean)

  let charKeys = result.abap.values.META.ZBW_QUERY_OUTPUT_METADATA.map((i, ind) => {
    if (i.TYPE !== 'KF')
      return headerKeys.filter((k) => !headerKeysExpanded.includes(k))[ind]
  })
    .filter(Boolean)
    .sort((a, z) => {
      const uniqueCountForA = [...new Set(chartData.map((i) => i[a]))]
      const uniqueCountForZ = [...new Set(chartData.map((i) => i[z]))]
      const aCount = uniqueCountForA?.length || 0
      const zCount = uniqueCountForZ.length || 0
      return zCount - aCount
    })
  // expand the charKeys also
  headerKeysExpanded.forEach((extraKey) => {
    const found = charKeys.findIndex((key) => extraKey?.startsWith(key))
    charKeys = [
      ...charKeys.slice(0, found),
      extraKey,
      ...charKeys.slice(found),
    ]
  })

  const charUniqueValues = charKeys
    .map((i, ind) => {
      if (ind === 0) return
      return { [i]: [...new Set(chartData.map((l) => l[i]))] }
    })
    .reduce((cum, cur) => {
      if (!cur || typeof cur !== 'object') return cum
      return { ...cum, ...cur }
    }, {})
  charUniqueValues

  return {
    header,
    chartData,
    headerKeys,
    headerText,
    keyFigureKeys,
    charKeys,
    charUniqueValues,
    metadata: { description, loadDate },
  }
}
