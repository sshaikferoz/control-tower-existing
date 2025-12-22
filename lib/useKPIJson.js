import { useQuery } from 'react-query'
import axios from 'redaxios'
// const KPIRealtimeUrl = `/KPIs?$format=json&$expand=Level2Nav,DataSourceNav`
const KPIRealtimeUrl = `/sap/opu/odata/sap/zscm_ct_config_srv/KPIs?$format=json&$expand=Level2Nav,DataSourceNav`
const fetchKPIWithRefetching = (options = {}) => {
  return [
    ['KPIs'],
    async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_HOST_BASE}${KPIRealtimeUrl}`
      )
      return { KPIList: data?.d?.results }
    },
    options,
  ]
}
export default function useKPIJson(refech) {
  return useQuery(
    ...fetchKPIWithRefetching({
      refetchInterval: 18000000,
      staleTime: Infinity,
      refetchOnMount: false,
    })
  )
}
