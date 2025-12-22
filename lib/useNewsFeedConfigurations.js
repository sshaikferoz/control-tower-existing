import { useQuery } from 'react-query'
import axios from 'redaxios'
const KPIRealtimeUrl = `/sap/opu/odata/sap/zscm_ct_config_srv/NewsFeedSet?$format=json&$filter=Expired eq false`
const fetchKPIWithRefetching = (options = {}) => {
  return [
    ['NewsFeeds'],
    async () => {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_BASE}${KPIRealtimeUrl}`
      )
        .then((r) => (r.ok ? r.json() : []))
        .catch((e) => console.log(e))
      return data
    },
    options,
  ]
}
export default function useNewsFeedConfigurations(refech) {
  return useQuery(
    ...fetchKPIWithRefetching({
      refetchInterval: 18000000,
      staleTime: Infinity,
      refetchOnMount: false,
    })
  )
}
