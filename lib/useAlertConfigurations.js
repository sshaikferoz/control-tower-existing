import { useQuery } from 'react-query'
import { hanaRealtimeUrl } from './useHanaJson'
const getFilterParam = (filterOptions) => {
  const { category = 'IN', pageNo = '01' } = filterOptions
  return `&$filter=(Category%20eq%20%27${category}%27%20and%20PageNo%20eq%20%27${pageNo}%27%20and%20ShowOnCT%20eq%20true)`
}
const minimumFilter = `&$filter=(Category%20ne%20%27IP%27%20and%20ShowOnCT%20eq%20true)`
// const configrationOData = '/Alerts?$format=json'
const configrationOData =
  '/sap/opu/odata/sap/zscm_ct_config_srv/Alerts?$format=json&$expand=Level2Nav,DataSourceNav'
const fetchConfigWithRefetch = (
  options = {},
  category = 'IN',
  pageNo = '01',
  skipFilter = false
) => {
  const filterParam =
    skipFilter === true ? minimumFilter : getFilterParam({ category, pageNo })
  return [
    ['alertConfig'],
    () =>
      fetch(`${process.env.NEXT_PUBLIC_HOST_BASE}${configrationOData}${filterParam}`)
        .then((res) => {
          if (res.ok) return res.json()
          else return Promise.reject()
        })
        .then(async (res) => {
          const alertList = res?.d?.results
          if (!Array.isArray(alertList)) return []
          let valuesForHanaAlerts = []
          for (const alertItem of alertList) {
            const {
              TechnicalName = '',
              Source = 'B',
              AlertId,
              Value,
              ErrorMessage,
            } = alertItem
            if (!TechnicalName) continue
            if (Source !== 'H') continue
            if (ErrorMessage?.trim?.() === '' && Number(Value || 0) > 0) continue
            const hanaResult = await fetch(`${hanaRealtimeUrl}${TechnicalName}`, {
              credentials: 'include',
            })
              .then((res) => {
                if (res.ok) return res.json()
                else return Promise.reject()
              })
              .catch((e) => {
                return [{ error: e }]
              })
            console.log({ hanaResult })
            const value = !isNaN(hanaResult?.[0]?.COUNTER)
              ? hanaResult?.[0]?.COUNTER || 0
              : hanaResult?.[0]?.KPI_VALUE || 0
            valuesForHanaAlerts.push({ AlertId, Value: value })
          }

          return {
            alertList: alertList.map((item) => {
              const found = valuesForHanaAlerts.find(
                (hanaAlert) => hanaAlert.AlertId === item.AlertId
              )
              if (found) return { ...item, ...found }
              return item
            }),
          }
        }),
    options,
  ]
}
export default function useAlertConfigurations(category, pageNo, skipFilter) {
  return useQuery(
    ...fetchConfigWithRefetch(
      {
        refetchInterval: 18000000,
        staleTime: Infinity,
        refetchOnMount: false,
      },
      category,
      pageNo,
      skipFilter
    )
  )
}
