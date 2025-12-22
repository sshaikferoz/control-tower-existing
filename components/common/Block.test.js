import React from 'react'
import { render, screen } from '@testing-library/react'
import Block from './Block'
describe('testing library', () => {
  it('should display title', () => {
    render(
      <Block title="title">
        <div>Chart</div>
      </Block>
    )
   const titleEl = screen.getByRole(/heading/)
   expect(titleEl.textContent).toMatch(/title/i)
  })
})
