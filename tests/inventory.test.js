import { find} from 'puppeteer-testing-library'
import 'puppeteer-testing-library/extend-expect'
jest.setTimeout(30000)
describe('inventory dashbord', () => {
  beforeAll(async () => {
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto('http://localhost:3000/')
  })
  it('should have overdue of 12.8K items', async () => {
    const el = await find({ role: 'heading', name: /inventory value/i })
    expect(el).toBeVisible()
    const elTextContent = await el.evaluate((e) => e.textContent)
    expect(elTextContent).toMatch(/inventory value/i)
  })
  it('should not show vertical scrollbar', async () => {
    await page.waitForTimeout(2000)
    const hasScrollBar = await page.evaluate(
      (el) => document.body.clientHeight > document.documentElement.clientHeight
    )
    expect(hasScrollBar).toBeFalsy()
  })
})
