import { waitFor } from '@testing-library/dom'
import { find, configure } from 'puppeteer-testing-library'
import 'puppeteer-testing-library/extend-expect'
jest.setTimeout(30000)
describe('Procurement 1 dashbord', () => {
  beforeEach(async () => {
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto('http://localhost:3000/procurement')
  })
  it('should not show vertical scrollbar', async () => {
    await page.waitForTimeout(2000)
    const hasScrollBar = await page.evaluate(
      (el) => document.body.clientHeight > document.documentElement.clientHeight
    )
    expect(hasScrollBar).toBeFalsy()
  })
})
