import axios from 'redaxios'
import { useQuery } from 'react-query'
import bexToJsonFastParser from './bexQueryXmlToJsonEnhanced'
import bexToJsonParser from './bexQueryXmlToJson'
const fetchBexQuery = async (queryName, options = {}) => {
  const { data } = await axios.get(
    // `http://localhost:3300/sap/bc/bsp/sap/zbw_reporting/execute_report_oo.htm?query=${queryName}`
    `/sap/bc/bsp/sap/zbw_reporting/execute_report_oo.htm?query=${queryName}`
  )
  if (options.parser === 'new') return bexToJsonFastParser(data, options)
  return bexToJsonParser(data, options)
}
export default function useBexJson(queryName = '', options = {}) {
  return useQuery(
    [
      'Bex',
      queryName,
    ],
    () => fetchBexQuery(queryName, options),
    options
  )
}
