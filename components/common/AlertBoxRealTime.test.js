import React, { useState, useEffect } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import AlertRealTime from './AlertBoxRealTime'
import * as useHanaJson from '../../lib/useHanaJson'
const queryClient = new QueryClient()
const genMockResponses = (responses) => {
  function* dummyResponseGen() {
    for (const d of responses) {
      yield d
    }
  }
  const dummyResponse = dummyResponseGen()
  return () =>
    jest
      .requireActual('react-query')
      .useQuery(
        ['hanaQuery', 'somequery'],
        () => Promise.resolve([{ COUNTER: dummyResponse.next().value }]),
        {
          refetchInterval: 100,
        }
      )
}

jest.mock('../../lib/useHanaJson', () => ({
  __esModule: true,
  default: null,
}))

function setup() {
  const playsound = jest.fn()
  const utils = render(
    <QueryClientProvider client={queryClient}>
      <AlertRealTime title="alert1" queryName="somequery" playSound={playsound} />
    </QueryClientProvider>
  )
  return { playsound, ...utils }
}

test('realtime changes of alert figure 3 --100ms--> 4 --100ms--> 8', async () => {
  useHanaJson.default = genMockResponses([3, 4, 8])
  const { playsound } = setup()
  const figure = await screen.findByRole(/figure/i)
  expect(figure).toHaveTextContent(/3 0/i)
  await new Promise((r) => setTimeout(r, 120))
  expect(figure).toHaveTextContent(/4 1/i)
  await new Promise((r) => setTimeout(r, 100))
  expect(figure).toHaveTextContent(/8 4/i)
  await new Promise((r) => setTimeout(r, 100))
  expect(playsound).toHaveBeenCalledTimes(2)
})

test('realtime changes of alert figure getting undefined response ', async () => {
  useHanaJson.default = genMockResponses([undefined, undefined, 33, 34])
  const { playsound } = setup()
  const figure = await screen.findByRole(/figure/i)
  expect(figure).toHaveTextContent(/0 0/i)
  await new Promise((r) => setTimeout(r, 120))
  expect(figure).toHaveTextContent(/0 0/i)
  await new Promise((r) => setTimeout(r, 100))
  expect(figure).toHaveTextContent(/33 0/i)
  expect(playsound).toHaveBeenCalledTimes(0)
  await new Promise((r) => setTimeout(r, 100))
  expect(figure).toHaveTextContent(/34 1/i)
  expect(playsound).toHaveBeenCalledTimes(1)
})
