import mirageServer from './../lib/mirage/server'
import 'devextreme/dist/css/dx.dark.css'
import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
const queryClient = new QueryClient()
import { MaskProvider } from '../lib/maskContext'
import React, { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
// import DarkStyles from '../styles/darkStyles'
import FontStyle from '../styles/fontStyle'

if (
  process.env.NODE_ENV === 'development' ||
  process.env.NEXT_PUBLIC_BSP_NAME?.includes('ALTHBA0A')
) {
  mirageServer()
}

function MyApp({ Component, pageProps }) {
  // to enable multitheme
  // const [theme, toggle] = useState('blue')
  // useHotkeys('t', () => toggle((_theme) => (_theme === 'blue' ? 'dark' : 'blue')))
  return (
    <QueryClientProvider client={queryClient}>
      {/* {theme === 'dark' && <DarkStyles />} */}
      <MaskProvider>
        <FontStyle />
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </MaskProvider>
    </QueryClientProvider>
  )
}
export default MyApp
