import axios from 'redaxios'
import { useQuery } from 'react-query'
// import { hanaRealtimeUrl } from './useHanaJson'
const getFilterParam = (filterOptions) => {
  const { category = 'IN', pageNo = '01' } = filterOptions
  return `&$expand=Level2Nav&$filter=(Category%20eq%20%27${category}%27%20)`
}
const configrationOData =
  '/sap/opu/odata/sap/zscm_ct_config_srv/Overviews?$format=json'
const fetchConfigWithRefetch = (options = {}, category = 'IN', pageNo = '01') => {
  return [
    ['componentConfig'],
    async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_BASE}${configrationOData}${getFilterParam({
          category,
          pageNo,
        })}`
      )
      return data
    },
    options,
  ]
}
export default function useComponentConfigurations(category, pageNo) {
  return useQuery(
    ...fetchConfigWithRefetch(
      {
        refetchInterval: 18000000,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      },
      category,
      pageNo
    )
  )
}
