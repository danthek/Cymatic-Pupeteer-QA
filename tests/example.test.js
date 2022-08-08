const puppeteer = require('puppeteer')

//"describe" is a wrapper for out test suite/steps
describe('My first puppeteer test', () => {
  it('should launch the browser', async function () {
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 10,
      devtools: false,
    })
    const page = await browser.newPage()
    await page.goto('https://devexpress.github.io/testcafe/example/')
    await page.type('#developer-name', 'Abraham', {delay:0})
    await page.click('#tried-test-cafe', {clickCount: 1})
    await page.waitForTimeout(3000) 
    await page.select('#preferred-interface', 'JavaScript API')
    await page.waitForTimeout(3000) 
    await browser.close()
  })
})
