import { useQuery } from 'react-query'

const hanaRealtimeUrl =
  'https://prwhana.aramco.com.sa:4300/Supply_Chain/Real_Time/Data_Sources/'
const fetchHanaWithRefetching = (hanaPath, refech) => {
  return [
    ['hanaQuery', hanaPath?.replace('.xsjs', '')],
    () =>
      fetch(`${hanaRealtimeUrl}${hanaPath}`, { credentials: 'include' }).then(
        (res) => {
          if (res.ok) return res.json()
          else return Promise.reject()
        }
      ),
    {
      refetchInterval: refech ? 14000 : false,
      refetchOnWindowFocus: false,
    },
  ]
}
export default function useHanaJson(alertPath, refech) {
  return useQuery(...fetchHanaWithRefetching(alertPath, refech))
}

export { hanaRealtimeUrl }
