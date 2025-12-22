import React, { useState, useEffect, useContext } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import {
  flippingAnimationContext,
  FlippingAnimationControlProvider,
} from '../../lib/flippingAnimationContext'

const ChildComponent = () => {
  const { resetAnimation } = useContext(flippingAnimationContext)
  useEffect(() => console.log({ resetAnimation }), [resetAnimation])
  return <div>0</div>
}

test('how resetAnimation render first time', async () => {
  render(
    <FlippingAnimationControlProvider>
      <ChildComponent />
    </FlippingAnimationControlProvider>
  )
})
