import { xml2json } from 'xml-js'

export default function parseXMLToJson(rawXml) {
  let xmlRaw = rawXml
  if (typeof xmlRaw !== 'string') return { chartData: [] }
  const badChars = rawXml.match(/>[^><&]*&./i)?.[0] //?
  if (badChars) xmlRaw = xmlRaw.replace(/>[^><&]*&./i, badChars.replace('&', ' '))

  const jsonAsString = xml2json(xmlRaw, { compact: true, nativeType: true })
  const json = JSON.parse(jsonAsString)

  const topLevelTag = 'asx:abap'
  const topLevelValuesTag = 'asx:values'
  const queryName = 'ZBW_QUERY_OUTPUT_METADATA'
  const topLevel = json[topLevelTag] || {}
  const topLevelValues = topLevel[topLevelValuesTag] || {}
  const { metadata = {}, META = {}, PAGING_INFO = {}, OUTPUT = {} } = topLevelValues
  const header =
    META[queryName]?.map?.(({ TYPE, FIELDNAME, SCRTEXT_L }) => ({
      type: TYPE._text,
      label: SCRTEXT_L._text,
      fieldName: FIELDNAME._text,
    })) || []
  const isSingleArgumentField =
    header.filter((headerItem) => {
      return headerItem.fieldName.match(/value0\d\d/i) === null
    }).length === 1
  const singleRaw = Array.isArray(OUTPUT.item) === false
  const items = singleRaw
    ? OUTPUT && Array.from({ length: 1 }, () => OUTPUT.item)
    : OUTPUT && OUTPUT.item
  return {
    header,
    chartData: items?.map?.((i) => {
      const reformattedEntries = Object.entries(i || {}).map(([key, val]) => {
        return [key, val?._text]
      })
      return Object.fromEntries(reformattedEntries || {})
    }),
  }
}

